import "./App.css";
import { useState } from "react";
import {useSelector, useDispatch} from 'react-redux'
import { addPost, deletePost, getAllPosts } from "./store/postsSlice";

const App = () => {
  const dispatch = useDispatch()

  const posts = useSelector(getAllPosts)

  const [inputValues, setInputValues] = useState({ title: "", content: "" });

  const handleChange = (e) => {
    setInputValues({
      ...inputValues,
      //computed object properties
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addPost(inputValues.title, inputValues.content))

    setInputValues({ title: "", content: "" })
  };

  

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
              <button onClick={()=>dispatch(deletePost(p.id))}>Delete</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
