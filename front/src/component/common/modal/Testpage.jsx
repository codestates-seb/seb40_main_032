import React, { useState } from 'react';
import { DefaultButton, NegativeButton } from '../button/ButtonStyle';
import ConfirmModal from './ConfirmModal';
import YesNoModal from './YesNoModal';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

function Testpage() {
  const [confirmModalOpened, setConfirmModalOpened] = useState(false);
  const [yesNoModalOpened, setYesNoModalOpened] = useState(false);
  const [loginModalOpened, setLoginModalOpened] = useState(false);
  const [signupModalOpened, setSignupModalOpened] = useState(false);

  const confirmModalOpener = () => {
    setConfirmModalOpened(true);
  };

  const confirmModalCloser = () => {
    setConfirmModalOpened(false);
  };

  const yesNoModalOpener = () => {
    setYesNoModalOpened(true);
  };

  const yesNoModalCloser = () => {
    setYesNoModalOpened(false);
  };

  const loginModalOpener = () => {
    setLoginModalOpened(true);
  };

  const loginModalCloser = () => {
    setLoginModalOpened(false);
  };

  const signupModalOpener = () => {
    setSignupModalOpened(true);
  };

  const signupModalCloser = () => {
    setSignupModalOpened(false);
  };

  return (
    <>
      <DefaultButton
        height="110vh"
        width="23%"
        fontSize="1.5rem"
        onClick={confirmModalOpener}
      >
        ConfirmModal
      </DefaultButton>
      <NegativeButton
        height="110vh"
        width="23%"
        fontSize="1.5rem"
        onClick={yesNoModalOpener}
      >
        YesNoModal
      </NegativeButton>
      <DefaultButton
        height="110vh"
        width="23%"
        fontSize="1.5rem"
        onClick={loginModalOpener}
      >
        Login
      </DefaultButton>
      <NegativeButton
        height="110vh"
        width="23%"
        fontSize="1.5rem"
        onClick={signupModalOpener}
      >
        Signup
      </NegativeButton>
      {confirmModalOpened && <ConfirmModal modalCloser={confirmModalCloser} />}
      {yesNoModalOpened && <YesNoModal modalCloser={yesNoModalCloser} />}
      {loginModalOpened && <LoginModal modalCloser={loginModalCloser} />}
      {signupModalOpened && <SignupModal modalCloser={signupModalCloser} />}
    </>
  );
}

export default Testpage;
