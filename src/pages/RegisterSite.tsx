import { FunctionComponent, useCallback } from "react";
import HeaderStart from "../components/HeaderStart";
import RegisterForm from "../components/RegisterSite/RegisterForm";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterSite.module.css";

const RegisterSite: FunctionComponent = () => {
  const navigate = useNavigate();

  const onGoBackFrameClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className={styles.registerSite}>
      <HeaderStart instructionT="Please enter your details to sign up" />
      <RegisterForm />
      <div className={styles.goBack}>
        <div className={styles.goBackFrame} onClick={onGoBackFrameClick}>
          <div className={styles.goBackT}>Go back</div>
        </div>
      </div>
      <div className={styles.space} />
    </div>
  );
};

export default RegisterSite;
