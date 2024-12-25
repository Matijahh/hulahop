import { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import ModalComponent from "../ModalComponent";
import SignIn from "../../views/Authentication/SignIn";
import SignUp from "../../views/Authentication/SignUp";

const SignInModalContainer = styled.div`
  .info-text {
    margin-top: 16px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    span {
      color: #7e7e7e;
      margin-right: 10px;
    }

    div {
      color: rgb(241, 103, 109);
      font-weight: 600;
      font-size: 16px;
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const SignInModal = ({ open, handleClose }) => {
  const [toggleAuth, setToggleAuth] = useState(true);

  const { t } = useTranslation();

  const handleToggleAuth = () => {
    setToggleAuth(!toggleAuth);
  };

  let RedirectUrl = window?.location?.href;

  return (
    <ModalComponent handleClose={handleClose} open={open} size={"md"}>
      <SignInModalContainer>
        {toggleAuth ? (
          <SignIn RedirectUrl={RedirectUrl} maxWidth="465px" />
        ) : (
          <SignUp RedirectUrl={RedirectUrl} maxWidth="465px" />
        )}

        {toggleAuth ? (
          <div className="info-text">
            <span>{t("Don't have an account?")}</span>
            <div onClick={handleToggleAuth}>{t("Sign Up")}</div>
          </div>
        ) : (
          <div className="info-text">
            <span>{t("already have an account?")}</span>
            <div onClick={handleToggleAuth}>{t("Sign In")}</div>
          </div>
        )}
      </SignInModalContainer>
    </ModalComponent>
  );
};

export default SignInModal;
