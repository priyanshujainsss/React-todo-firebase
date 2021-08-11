import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { db } from "./firebase";

let unsubscribe=()=>{}

function Todo({ user }) {
//   console.log(user);
  const [text, settext] = useState("");
  const [mytodos, setmytodos] = useState([]);


  const handleTodo = () => {
    if (user && text) {
      db.collection("todos")
        .doc(user.uid)
        .set({
          todos: [...mytodos, text],
        });
      settext("");
    }
  };
  useEffect(() => {
    if (user) {
      const docref = db.collection("todos").doc(user.uid);
     unsubscribe = docref.onSnapshot((docsnap) => {
        if (docsnap.data()) {
        //   console.log(docsnap.data().todos);
          setmytodos(docsnap.data().todos);
        } else {
          console.log("no data");
        }
      });
    }
    return()=>{
        unsubscribe();
    }
    // eslint-disable-next-line
  }, []);
  const handleDelete = (todo) => {
    var docref = db.collection("todos").doc(user.uid);
    docref.get().then((docsnap) => {
      var result = docsnap.data().todos.filter((item) => item !== todo);
      docref.update({
        todos: result,
      });
    });
  };
  if (!user) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="center container" style={{ maxWidth: "500px" }}>
      <h2>Add Todos</h2>
      <div className="input-field" >
        <input
          placeholder="Enter Todo"
          value={text}
          onChange={(e) => settext(e.target.value)}
          onKeyPress={(e) => (e.key === "Enter" ? handleTodo() : null)}
          required
        />
        <button onClick={handleTodo} >Add Todo</button>
      </div>
      <ul className="collection">
        {mytodos.map((todo) => {
          return (
            <li className="collection-item" key={todo}>
              {todo}
              <i
                className="material-icons right"
                onClick={()=> handleDelete(todo)}
                style={{ cursor: "pointer" }}
              >
                delete
              </i>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Todo;
