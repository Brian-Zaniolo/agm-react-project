import "./App.css";
import { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

const App = () => {
  const [inputValues, setInputValues] = useState({ title: "", content: "" });
  const [posts, setPosts] = useState(
    localStorage.getItem("posts")
      ? JSON.parse(localStorage.getItem("posts"))
      : []
  );
  localStorage.setItem("posts", JSON.stringify(posts));

  const handleChange = (e) => {
    setInputValues({
      ...inputValues,
      //computed object properties
      [e.target.name]: e.target.value,
      id: nanoid(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPosts([inputValues, ...posts]);
  };

  const handleDelete = (id) => {
    setPosts(
      posts.filter(p => p.id !== id)
    )
  }

  return (
    <div className="div">
      <form onSubmit={handleSubmit}>
        <input
          id="title"
          name="title"
          value={inputValues.title}
          onChange={handleChange}
        />
        <textarea
          id="content"
          name="content"
          value={inputValues.content}
          onChange={handleChange}
        />
        <button type="submit">Save post</button>
      </form>
      <div>
        {posts.length > 0 &&
          posts.map((p) => (
            <div key={p.id}>
              <h3> {p.title} </h3>
              <p> {p.content} </p>
              <p> {p.id} </p>
              <button onClick={()=>handleDelete(p.id)}>Delete</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
