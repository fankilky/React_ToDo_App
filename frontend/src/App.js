import { Routes, BrowserRouter, Link, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//  Components import
import TodoList from "./Components/TodoList";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import LogoutButton from "./Components/LogoutButton";

function RequireAuth({ children, redirectTo }) {
  let isAuthenticated = useSelector((state) => state.authStore.auth);
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

export default function App() {
  let isAuthenticated = useSelector((state) => state.authStore.auth);
  return (
    <BrowserRouter>
      <div className="App">
        <nav className="center">
          {isAuthenticated ? (
            <div>
              <div>
                <LogoutButton />
              </div>
            </div>
          ) : (
            <div>
              <Link className="nostyle navitems" to="/">
                Signup
              </Link>
              <Link className="nostyle navitems" to="/todo">
                Todo
              </Link>
              <Link className="nostyle navitems" to="/login">
                Login
              </Link>
            </div>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/todo"
            element={
              <RequireAuth redirectTo="/login">
                <TodoList />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
