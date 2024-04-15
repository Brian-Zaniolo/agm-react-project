import "./App.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Router, Route } from "react-router-dom";
import {
  addPost,
  deletePost,
  getAllPosts,
  fetchAllposts,
} from "./store/postsSlice";

const App = () => {
  const dispatch = useDispatch();

  const posts = useSelector(getAllPosts);
  const [inputValues, setInputValues] = useState({ title: "", content: "" });
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    dispatch(fetchAllposts(limit));
  }, [limit]);

  const handleChange = (e) => {
    setInputValues({
      ...inputValues,
      //computed object properties
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addPost(inputValues.title, inputValues.content));

    setInputValues({ title: "", content: "" });
  };

  const handleLimit = (e) => {
    setLimit(e.target.value);
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
        <select onChange={(e) => handleLimit(e)}>
          <option value={10}> 10 </option>
          <option value={20}> 20 </option>
          <option value={30}> 30 </option>
          <option value={40}> 40 </option>
          <option value={50}> 50 </option>
          <option value={60}> 60 </option>
          <option value={70}> 70 </option>
          <option value={80}> 80 </option>
          <option value={90}> 90 </option>
          <option value={100}> 100 </option>
        </select>
        <button type="submit">Save post</button>
      </form>
      <div>{posts.length}</div>
      {/* <div>
        {posts.length > 0 &&
          posts.map((p) => (
            <div key={p.id}>
              <h3> {p.title} </h3>
              <p> {p.content} </p>
              <p> {p.id} </p>
              <button onClick={() => dispatch(deletePost(p.id))}>Delete</button>
            </div>
          ))}
      </div> */}
    </div>
  );
};

export default App;
