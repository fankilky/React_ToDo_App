import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm(props) {
  let [loginInfo, setLoginInfo] = useState({
    username: "",
    email: "",
    passwords: "",
  });

  let dispatch = useDispatch();
  let navigate = useNavigate();

  let authenticated = useSelector((state) => state.authStore.auth);

  useEffect(() => {
    if (authenticated) {
      navigate("/todo");
    }
  }, [authenticated, navigate]);

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginInfo((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  return (
    <div className="login">
      <h1>{props.name}</h1>
      <form>
        {props.signup && (
          <div className="formGroup">
            <label>Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email Here"
              value={loginInfo.email}
              onChange={(e) => handleChange(e)}
            />
          </div>
        )}
        <div className="formGroup">
          <label>Username</label>
          <input
            type="username"
            name="username"
            id="username"
            placeholder="Enter username Here"
            value={loginInfo.username}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="formGroup">
          <label>Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password Here"
            value={loginInfo.password}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="center">
          <button
            type="submit"
            onClick={(e) => {
              console.log(`clicked`);
              e.preventDefault();
              loginInfo.username.length > 0 &&
                loginInfo.password.length > 0 &&
                dispatch(
                  props.signup
                    ? props.thunk(
                        loginInfo.username,
                        loginInfo.email,
                        loginInfo.password
                      )
                    : props.thunk(loginInfo.username, loginInfo.password)
                );
              props.signup &&
                loginInfo.username.length > 0 &&
                loginInfo.email.length > 0 &&
                loginInfo.password.length > 0 &&
                navigate("/login");
            }}
          >
            Submit
          </button>
        </div>
      </form>
      <div className="link">
        <Link to={props.link}>{props.linkText}</Link>
      </div>
    </div>
  );
}
