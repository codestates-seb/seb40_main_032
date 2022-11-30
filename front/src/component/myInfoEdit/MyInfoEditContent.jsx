import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import userDataApi from '../../api/userDataApi';
import { DefaultButton, TransparentButton } from '../common/button/ButtonStyle';
import myInfoEditApi from '../../api/myInfoEditApi';
import ConfirmModal from '../common/modal/ConfirmModal';
import { getCookie } from '../../util/cookie';

const Container = styled.div``;

const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 30rem;
  gap: 4vh 0;
  @media screen and (max-width: 549px) {
    justify-content: center;
    width: 80vw;
  }
`;

const Item = styled(SectionContent)`
  flex-direction: row;
  justify-content: start;
  @media screen and (max-width: 549px) {
    justify-content: center;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid var(--holder-base-color);
  outline: 0;
  width: 20rem;
  ::placeholder {
    color: var(--holder-base-color);
  }
  &:focus {
    border-color: var(--button-theme);
  }
  @media screen and (max-width: 549px) {
    width: 50vw;
    min-width: 40vw;
  }
`;

const Label = styled.label`
  display: flex;
  margin-right: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  margin-top: 6rem;
`;

const SubmitButton = styled(DefaultButton)`
  &:disabled {
    background-color: var(--holder-base-color);
    color: var(--font-base-grey);
  }
`;
const CancelButton = styled(TransparentButton)``;

const ErrorMsg = styled.span`
  color: red;
  font-size: 1rem;
`;

function MyInfoEditContent({ formData, setFormData }) {
  const accountId = getCookie('accountId');
  const navigate = useNavigate();
  const [nicknameError, setNicknameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    nickname: '',
    password: '',
  });
  const [confirmModalOpened, setConfirmModalOpened] = useState(false);

  const confirmModalCloser = () => {
    setConfirmModalOpened(false);
  };

  const onChange = event => {
    const InputName = event.target.name;
    const InputValue = event.target.value.trim();
    const InputLength = InputValue.length;

    if (InputName === 'nickname') {
      if (InputLength === 0) {
        setErrorMessage(prev => ({
          ...prev,
          nickname: '1글자 이상 입력하세요',
        }));
        setNicknameError(true);
      } else setNicknameError(false);
    }
    if (InputName === 'password') {
      if (InputLength < 8) {
        setErrorMessage(prev => ({
          ...prev,
          password: '8글자 이상 입력하세요',
        }));
        setPasswordError(true);
      } else setPasswordError(false);
    }

    setFormData({
      ...formData,
      [InputName]: InputValue,
    });
  };

  const editRequest = event => {
    event.preventDefault();
    /* eslint-disable */
    if (formData.nickname === defaultNickname) delete formData.nickname;

    myInfoEditApi(formData)
      .then(res => {
        if (res.status === 200) {
          setConfirmModalOpened(true);
          setTimeout(() => {
            navigate(`/mypage/mypost/${accountId}`);
          }, 1000);
        }
      })
      .catch(error => {
        console.log(error.response.data.message);
        if (error.response.data.code === '014') {
          setErrorMessage(prev => ({
            ...prev,
            nickname: error.response.data.message,
          }));
          setNicknameError(true);
        }
      });
  };

  // 닉네임을 변경하지 않고 제출할때 서버의 닉네임 중복검사 테스트를 통과시키기 위한 목적
  const [defaultNickname, setDefaultNickname] = useState();

  useEffect(() => {
    userDataApi(accountId)
      .then(res => {
        setFormData({
          password: res.data.password,
          nickname: res.data.nickname,
          intro: res.data.intro,
          profile: res.data.profile,
        });
        setDefaultNickname(res.data.nickname);
      })
      .catch(err => console.log(err));
    return () => {
      //// 프로필 수정 후 userinfo탭에도 반영되게 하기 위
      window.location.reload();
    };
  }, []);

  return (
    <Container>
      <SectionContent>
        <Item>
          <Label htmlFor="nickname">닉네임 &nbsp;</Label>
          <InputContainer>
            <Input
              id="nickname"
              name="nickname"
              type="text"
              defaultValue={defaultNickname}
              onChange={event => {
                onChange(event);
              }}
              maxLength={20}
            />
            {nicknameError ? (
              <ErrorMsg>{errorMessage.nickname}</ErrorMsg>
            ) : null}
          </InputContainer>
        </Item>
        <Item>
          <Label htmlFor="password">비밀번호</Label>
          <InputContainer>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="변경할 비밀번호를 입력하세요"
              onChange={event => {
                onChange(event);
              }}
              minLength={8}
            />
            {passwordError ? (
              <ErrorMsg>{errorMessage.password}</ErrorMsg>
            ) : null}
          </InputContainer>
        </Item>
        <Item>
          <Label htmlFor="intro">자기소개</Label>
          <InputContainer>
            <Input
              id="intro"
              name="intro"
              type="text"
              placeholder={
                formData.intro === ''
                  ? '자기소개를 입력해주세요'
                  : formData.intro
              }
              defaultValue={formData.intro}
              onChange={event => {
                onChange(event);
              }}
              maxLength={30}
            />
          </InputContainer>
        </Item>
      </SectionContent>
      <ButtonGroup>
        <SubmitButton
          width="6rem"
          height="3rem"
          onClick={editRequest}
          disabled={nicknameError || passwordError}
        >
          적용
        </SubmitButton>
        <CancelButton
          width="6rem"
          height="3rem"
          onClick={() => {
            navigate(`/mypage/mypost/${accountId}`);
          }}
        >
          취소
        </CancelButton>
      </ButtonGroup>
      {confirmModalOpened ? (
        <ConfirmModal
          modalMessage={'프로필 수정이 완료되었습니다.'}
          modalCloser={confirmModalCloser}
        />
      ) : null}
    </Container>
  );
}

export default MyInfoEditContent;
