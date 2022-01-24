import axios from "axios";

// Action Constants
export const ADD_TODO = "ADD_TODO";
export const EDIT_TODO = "EDIT TODO";
export const DELETE_TODO = "DELETE TODO";
export const GET_TODOS = "GET_TODOS";
export const CLEAR_TODOS = "CLEAR_TODOS";
export const GET_INFO = "GET_INFO";

export function GetInfo(info) {
  return {
    type: GET_INFO,
    payload: info,
  };
}

export function AddTodo(todo) {
  return {
    type: ADD_TODO,
    payload: todo,
  };
}

export function EditTodo(todo) {
  return {
    type: EDIT_TODO,
    payload: todo,
  };
}

export function DeleteTodo(id) {
  return (dispatch) => {
    dispatch({
      type: DELETE_TODO,
      payload: id,
    });
  };
}

export function GetTodos(todos) {
  return {
    type: GET_TODOS,
    payload: todos,
  };
}

export function GetInfoThunk() {
  return (dispatch) => {
    let token = localStorage.getItem("LoggedInToken");

    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response, "thunk action");
        dispatch(GetInfo(response.data[0].username));
      });
  };
}
export function GetTodosThunk() {
  console.log("thunk todos");
  return (dispatch) => {
    let token = localStorage.getItem("LoggedInToken");
    console.log("Getting todoss");
    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        dispatch(GetTodos(response.data));
      });
  };
}

export function AddTodoThunk(todo) {
  console.log(" add todo thunk:", todo);

  return (dispatch) => {
    let token = localStorage.getItem("LoggedInToken");
    console.log("Adding todo");
    console.log(token);
    axios
      .post(
        `${process.env.REACT_APP_API_SERVER}/api/todos`,
        { items: todo.items },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        dispatch(AddTodo(response.data));
      });
  };
}

// Edit and Delete To Do List

export function EditTodoThunk(todo) {
  return (dispatch) => {
    let token = localStorage.getItem("LoggedInToken");
    axios
      .put(
        `${process.env.REACT_APP_API_SERVER}/api/todos`,
        { items: todo.items, id: todo.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch(EditTodo(response.data));
      });
  };
}

export function DeleteTodoThunk(id) {
  console.log("removing todo");
  return (dispatch) => {
    let token = localStorage.getItem("LoggedInToken");
    console.log("Deleting todo");
    axios
      .delete(`${process.env.REACT_APP_API_SERVER}/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(DeleteTodo(response.data));
      });
  };
}
