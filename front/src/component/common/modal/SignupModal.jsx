import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { loginModalActions } from '../../../redux/loginModalSlice';
import signupApi from '../../../api/signupApi';
import ModalCard from './ModalCard';
import Backdrop from './Backdrop';
import { DefaultButton, TransparentButton } from '../button/ButtonStyle';
import ConfirmModal from './ConfirmModal';
import defaultUserImgArr from '../../../assets/defaultUserImg';

const SignupModalStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem;
  width: 40rem;

  @media screen and (max-width: 549px) {
    width: 100%;
  }

  .title {
    display: flex;
    justify-content: center;
    color: var(--font-base-black);
    font-size: 1.7rem;
    font-weight: var(--font-bold);
    margin-bottom: 1rem;
  }

  .login__form {
    color: var(--font-base-black);
    display: flex;
    flex-direction: column;
    > div {
      font-size: 1.5rem;
      margin-top: 1rem;
    }
    input {
      border: none;
      border-bottom: 1px solid var(--font-base-grey);
      padding: 0.5rem 0.5rem 0.5rem 0;
      margin: 1rem 0;
    }
    .input__validation {
      color: red;
      font-size: 1.2rem;
    }
    .checkbox__wrapper {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .checkbox {
        margin-right: 0.5rem;
      }
      div {
        display: flex;
        font-size: 1.2rem;
        align-items: center;
      }
    }
    .termsbutton__wrapper {
      display: flex;
      justify-content: flex-end;
    }
  }
`;

const SignupButton = styled(DefaultButton)`
  &:disabled {
    background: var(--button-font-color);
    color: var(--font-base-grey);
    cursor: not-allowed;
  }
`;

function SignupModal() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [successSignup, setSuccessSignup] = useState(false);
  const [confirmTerms, setConfirmTerms] = useState(false);
  const [signupError, setSignupError] = useState({
    nicknameError: false,
    emailError: false,
  });
  const [validationCorrect, setValidationCorrect] = useState({
    emailCorrect: true,
    passwordCorrect: true,
    nicknameCorrect: true,
  });
  const dispatch = useDispatch();

  // 인풋값 상태 저장 함수
  const onChangeNickname = e => {
    setNickname(e.target.value);
  };
  const onChangeEmail = e => {
    setEmail(e.target.value);
  };
  const onChangePassword = e => {
    setPassword(e.target.value);
  };
  const onChangerCheckbox = e => {
    setCheckbox(e.target.checked);
    console.log(e.target.checked);
    console.log(e.target);
  };
  console.log(checkbox);

  // 랜덤 숫자 생성 함수 - 랜덤이미지 선택에 사용
  const ramdomNumber = Math.floor(Math.random() * 10);

  // 이미지 포멧
  const dataURLtoFile = (dataurl, fileName) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n >= 0) {
      u8arr[n] = bstr.charCodeAt(n);
      n -= 1;
    }

    return new File([u8arr], fileName, { type: mime });
  };
  const getImage = async () => {
    const b64data = defaultUserImgArr[ramdomNumber];
    const imagefile = dataURLtoFile(b64data, 'profileImage.png');
    return imagefile;
  };

  // 회원가입 axios 요청
  async function postSingup() {
    const formData = new FormData();
    const profileImg = await getImage();
    formData.append('profile', profileImg);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('nickname', nickname);
    await signupApi(formData)
      .then(res => {
        setSignupError('');
        setSuccessSignup(true);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
        // 백엔드에서 받은 중복이메일 유효성 검사 표시
        if (err.response.data.code === '005') {
          setSignupError(prev => {
            return { ...prev, emailError: true, nicknameError: false };
          });
        }
        // 백엔드에서 받은 중복닉네임 유효성 검사 표시
        if (err.response.data.code === '014') {
          setSignupError(prev => {
            return { ...prev, emailError: false, nicknameError: true };
          });
        }
      });
  }

  const onSubmitHandler = e => {
    e.preventDefault();
    // 닉네임 유효성 검사
    if (nickname.trim().length < 2 || nickname.trim().length > 20) {
      setValidationCorrect(prev => {
        return { ...prev, nicknameCorrect: false };
      });
      return;
    }
    setValidationCorrect(prev => {
      return { ...prev, nicknameCorrect: true };
    });
    // 이메일 유효성 검사
    if (email.trim().length === 0 || !email.includes('@')) {
      setValidationCorrect(prev => {
        return { ...prev, emailCorrect: false };
      });
      return;
    }
    setValidationCorrect(prev => {
      return { ...prev, emailCorrect: true };
    });
    // 비밀번호 유효성 검사
    if (password.length < 8) {
      setValidationCorrect(prev => {
        return { ...prev, passwordCorrect: false };
      });
      return;
    }
    setValidationCorrect(prev => {
      return { ...prev, passwordCorrect: true };
    });
    postSingup();
  };

  const signupModalCloser = () => {
    dispatch(loginModalActions.closeSignupModal());
  };
  // 컨펌 모달 닫기 함수
  // UX를 위해 회원가입 모달도 같이 닫힌다.
  const onConfirmModalCloser = () => {
    setSuccessSignup(false);
    signupModalCloser();
  };

  // 약관 모달 오프너 클로저
  const termsOpener = e => {
    e.preventDefault();
    setConfirmTerms(true);
  };
  const termsCloser = e => {
    e.preventDefault();
    setConfirmTerms(false);
  };

  return (
    <>
      <Backdrop onClick={signupModalCloser}>
        <ModalCard
          onStopPropagation={e => {
            e.stopPropagation();
          }}
          onClick={signupModalCloser}
        >
          <SignupModalStyle>
            <div className="title">회원가입</div>
            <form className="login__form">
              <div>닉네임</div>
              <input
                name="nickname"
                type="text"
                placeholder="닉네임을 입력하세요"
                onChange={onChangeNickname}
                value={nickname}
              />
              {!validationCorrect.nicknameCorrect && (
                <div className="input__validation">
                  닉네임은 2자이상 20자이하만 가능합니다.
                </div>
              )}
              {signupError.nicknameError && (
                <div className="input__validation">중복 닉네임 입니다.</div>
              )}
              <div>아이디</div>
              <input
                name="email"
                type="text"
                placeholder="이메일 주소를 입력하세요"
                onChange={onChangeEmail}
                value={email}
              />
              {!validationCorrect.emailCorrect && (
                <div className="input__validation">
                  아이디는 이메일 형식이여야 합니다.
                </div>
              )}
              {signupError.emailError && (
                <div className="input__validation">중복 이메일 입니다.</div>
              )}
              <div>비밀번호</div>
              <input
                name="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                onChange={onChangePassword}
                value={password}
              />
              {!validationCorrect.passwordCorrect && (
                <div className="input__validation">
                  비밀번호는 8자 이상으로 입력해주세요.
                </div>
              )}
              <div className="checkbox__wrapper">
                <input
                  className="checkbox"
                  type="checkbox"
                  onChange={onChangerCheckbox}
                />
                <div htmlFor="check">개인정보 이용방침에 동의합니다.</div>
              </div>
              <div className="termsbutton__wrapper">
                <TransparentButton
                  fontSize="1.2rem"
                  onClick={termsOpener}
                  type="button"
                >
                  약관확인 &gt;
                </TransparentButton>
              </div>
              <SignupButton
                width="100%"
                height="4rem"
                fontSize="1.7rem"
                onClick={onSubmitHandler}
                type="submit"
                margin="1.5rem 0"
                disabled={!checkbox}
              >
                회원가입
              </SignupButton>
            </form>
          </SignupModalStyle>
        </ModalCard>
      </Backdrop>
      {successSignup && (
        <ConfirmModal
          modalMessage="회원가입이 완료되었습니다."
          modalCloser={onConfirmModalCloser}
        />
      )}
      {confirmTerms && (
        <ConfirmModal modalMessage="이용약관" modalCloser={termsCloser} />
      )}
    </>
  );
}

export default SignupModal;
