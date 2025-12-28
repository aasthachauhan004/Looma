import { colors } from "../styles/colors";
import AuthForm from "../components/AuthForm/AuthForm";

function Auth() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
        padding: "20px",
      }}
    >
      <AuthForm />
    </div>
  );
}

export default Auth;
