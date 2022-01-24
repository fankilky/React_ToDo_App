import { loginUserThunk } from "../Redux/auth/actions";
import LoginForm from "./LoginForm";

function Login() {
  return (
    <div className="landingPage center">
      <LoginForm
        name="Login"
        thunk={loginUserThunk}
        link="/"
        linkText="Don't have an account? Sign Up"
      />
    </div>
  );
}

export default Login;
