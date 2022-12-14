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
  const [isLoading, setIsLoading] = useState(false);
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
  };

  const ramdomNumber = Math.floor(Math.random() * 10);

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

  async function postSingup() {
    const formData = new FormData();
    const profileImg = await getImage();
    formData.append('profile', profileImg);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('nickname', nickname);
    setIsLoading(true);
    await signupApi(formData)
      .then(() => {
        setSignupError('');
        setSuccessSignup(true);
        setIsLoading(false);
      })
      .catch(err => {
        if (err.response.data.code === '005') {
          setSignupError(prev => {
            return { ...prev, emailError: true, nicknameError: false };
          });
        }
        if (err.response.data.code === '014') {
          setSignupError(prev => {
            return { ...prev, emailError: false, nicknameError: true };
          });
        }
        setIsLoading(false);
      });
  }

  const onSubmitHandler = e => {
    e.preventDefault();
    if (nickname.trim().length < 2 || nickname.trim().length > 20) {
      setValidationCorrect(prev => {
        return { ...prev, nicknameCorrect: false };
      });
      return;
    }
    setValidationCorrect(prev => {
      return { ...prev, nicknameCorrect: true };
    });
    if (email.trim().length === 0 || !email.includes('@')) {
      setValidationCorrect(prev => {
        return { ...prev, emailCorrect: false };
      });
      return;
    }
    setValidationCorrect(prev => {
      return { ...prev, emailCorrect: true };
    });
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
  const onConfirmModalCloser = () => {
    setSuccessSignup(false);
    signupModalCloser();
  };

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
            <div className="title">????????????</div>
            <form className="login__form">
              <div>?????????</div>
              <input
                name="nickname"
                type="text"
                placeholder="???????????? ???????????????"
                onChange={onChangeNickname}
                value={nickname}
              />
              {!validationCorrect.nicknameCorrect && (
                <div className="input__validation">
                  ???????????? 2????????? 20???????????? ???????????????.
                </div>
              )}
              {signupError.nicknameError && (
                <div className="input__validation">?????? ????????? ?????????.</div>
              )}
              <div>?????????</div>
              <input
                name="email"
                type="text"
                placeholder="????????? ????????? ???????????????"
                onChange={onChangeEmail}
                value={email}
              />
              {!validationCorrect.emailCorrect && (
                <div className="input__validation">
                  ???????????? ????????? ??????????????? ?????????.
                </div>
              )}
              {signupError.emailError && (
                <div className="input__validation">?????? ????????? ?????????.</div>
              )}
              <div>????????????</div>
              <input
                name="password"
                type="password"
                placeholder="??????????????? ???????????????"
                onChange={onChangePassword}
                value={password}
              />
              {!validationCorrect.passwordCorrect && (
                <div className="input__validation">
                  ??????????????? 8??? ???????????? ??????????????????.
                </div>
              )}
              <div className="checkbox__wrapper">
                <input
                  className="checkbox"
                  type="checkbox"
                  onChange={onChangerCheckbox}
                />
                <div htmlFor="check">???????????? ??????????????? ???????????????.</div>
              </div>
              <div className="termsbutton__wrapper">
                <TransparentButton
                  fontSize="1.2rem"
                  onClick={termsOpener}
                  type="button"
                >
                  ???????????? &gt;
                </TransparentButton>
              </div>
              <SignupButton
                width="100%"
                height="4rem"
                fontSize="1.7rem"
                onClick={onSubmitHandler}
                type="submit"
                margin="1.5rem 0"
                disabled={!checkbox || isLoading}
              >
                {isLoading ? '???????????????' : '????????????'}
              </SignupButton>
            </form>
          </SignupModalStyle>
        </ModalCard>
      </Backdrop>
      {successSignup && (
        <ConfirmModal
          modalMessage="??????????????? ?????????????????????."
          modalCloser={onConfirmModalCloser}
        />
      )}
      {confirmTerms && (
        <ConfirmModal modalMessage="????????????" modalCloser={termsCloser} />
      )}
    </>
  );
}

export default SignupModal;
