import { FunctionComponent, useCallback } from "react";
import HeaderStart from "../components/HeaderStart";
import RecoverForm from "../components/RecoverAccountSite/RecoverAccountForm";
import { useNavigate } from "react-router-dom";
import styles from "./RecoverAccountSite.module.css";

const SingUpSite: FunctionComponent = () => {
  const navigate = useNavigate();

  const onGoBackFrameClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onRegisterNavigationContainerClick = useCallback(() => {
    navigate("/register-site");
  }, [navigate]);

  return (
    <div className={styles.recoverAccountSite}>
      <HeaderStart instructionT="Please enter your email address to recover your account via email." />
      <RecoverForm />
      <div className={styles.goBack}>
        <div className={styles.goBackFrame} onClick={onGoBackFrameClick}>
          <div className={styles.goBackT}>Go back</div>
        </div>
      </div>
      <div
        className={styles.registerNavigation}
        onClick={onRegisterNavigationContainerClick}
      >
      </div>
      <div className={styles.space} />
    </div>
  );
};

export default SingUpSite;
