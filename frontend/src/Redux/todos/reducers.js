import {
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
  GET_TODOS,
  CLEAR_TODOS,
  GET_INFO,
} from "./actions";

const initialState = {
  todos: [],
  name: "",
};

export function todoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_INFO:
      console.log(action.payload, "reducer");
      return {
        todos: state.todos,
        name: action.payload,
      };
    case ADD_TODO:
      return {
        todos: state.todos.concat([action.payload]),
        name: state.name,
      };
    case EDIT_TODO:
      let newTodo = action.payload[0];
      let index = state.todos.findIndex((i) => i.id === newTodo.id);

      state.todos.splice(index, 1, newTodo);
      return {
        todos: state.todos,
        name: state.name,
      };
    case DELETE_TODO:
      return {
        name: state.name,
        todos: state.todos.filter((todo) => {
          console.log(action.payload);
          return todo.id !== action.payload;
        }),
      };
    case GET_TODOS:
      return {
        name: state.name,
        todos: state.todos.concat(action.payload).sort((a, b) => a.id - b.id),
      };
    case CLEAR_TODOS:
      return {
        name: state.name,
        todos: [],
      };
    default:
      return state;
  }
}
