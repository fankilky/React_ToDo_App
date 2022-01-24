import { logoutNowThunk } from "../Redux/auth/actions";
import { CLEAR_TODOS } from "../Redux/todos/actions";
import { useDispatch } from "react-redux";

export default function LogoutButton() {
  let dispatch = useDispatch();
  return (
    <div>
      <button
        onClick={() => {
          dispatch({ type: CLEAR_TODOS });
          dispatch(logoutNowThunk());
        }}
      >
        Log Out
      </button>
    </div>
  );
}
