import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EditTodoThunk,
  DeleteTodoThunk,
  GetTodosThunk,
  AddTodoThunk,
  GetInfoThunk,
} from "../Redux/todos/actions";

export default function TodoList() {
  const [items, setItems] = useState("");
  const [editedItems, setEditedItems] = useState("");

  const dispatch = useDispatch();

  const todoFromRedux = useSelector((state) => state.todoStore.todos);

  const submitTodo = (e) => {
    e.preventDefault();
    const newTodo = { items };
    // items.length > 0 && dispatch(AddTodoThunk(newTodo));
    if (items.length > 0) {
      dispatch(AddTodoThunk(newTodo));
    }
    setItems("");
  };

  const editTodoItems = (e, id) => {
    e.preventDefault();
    if (editedItems.length > 0) {
      dispatch(EditTodoThunk({ items: editedItems, id: id }));
    }
    setEditedItems("");
  };

  const deleteTodo = (e, i) => {
    dispatch(DeleteTodoThunk(i));
  };

  useEffect(() => {
    console.log(`in useEffect`);
    dispatch(GetTodosThunk());
    dispatch(GetInfoThunk());
  }, [dispatch]);

  return (
    <div className="todo-container center">
      <h1 className="heading">ToDo List</h1>
      <form className="todo_input" onSubmit={submitTodo}>
        <input
          type="text"
          name="text"
          placeholder="Do Something"
          value={items}
          onChange={(e) => {
            let newValue = e.target.value;
            setItems(newValue);
          }}
        ></input>
        <button type="submit"> ADD</button>
      </form>
      <div>
        {todoFromRedux && todoFromRedux.length > 0
          ? todoFromRedux.map((todo) => (
              <div className="center" key={todo.id}>
                <input
                  className="list_container"
                  type="text"
                  value={todo.items}
                  onChange={(e) => {
                    setEditedItems(e.currentTarget.value);
                  }}
                  onBlur={(e) => {
                    editTodoItems(e, todo.id);
                  }}
                />
                <button onClick={(e) => deleteTodo(e, todo.id)}> X </button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
