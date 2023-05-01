import { Link } from "react-router-dom";
import { useAsync } from "../hooks/useAsync";
import { getPosts } from "../services/posts";
import UploadImage from "./uploadImage";

import "./PostList.css";
import { useState } from "react";
import axios from "axios";

function Card({ images, title, body }) {
  return (
    <div className="card">
      {images?.length > 0 &&
        images?.map((i) => {
          <img
            src={`http://localhost:8000/v1/image/${i.fileName}`}
            alt="Card"
            className="card-img-top"
          />;
        })}
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{body}</p>
      </div>
    </div>
  );
}

function PopupInput(props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState();

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleBody = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = (event) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("body", body);

    axios.post("http://localhost:8000/v1/post", formData);

    event.preventDefault();
    props.onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="App">
          <h1>Create Post</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="post-title">Title</label>
              <input
                type="text"
                className="form-control"
                id="post-title"
                value={title}
                onChange={handleTitle}
              />
            </div>
            <div className="form-group">
              <label htmlFor="post-body">Body</label>
              <textarea
                className="form-control"
                id="post-body"
                rows="4"
                value={body}
                onChange={handleBody}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="post-image">Image</label>
              <UploadImage setFile={setFile} />
              {/* <input
                type="file"
                className="form-control-file"
                id="post-image"
                onChange={handleImageChange}
              /> */}
            </div>
            <button type="submit" className="btn btn-primary">
              Create Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function PostList() {
  const { loading, error, value: posts } = useAsync(getPosts);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1 className="error-msg">{error}</h1>;

  return (
    <div className="block-grid">
      {posts?.data.map((post) => {
        return (
          <h1 key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <div className="card-container">
                <Card
                  title={post.title}
                  body={post.body}
                  images={post.images}
                />
              </div>
            </Link>
          </h1>
        );
      })}
      <button onClick={handleButtonClick}>Add Post</button>
      {isPopupOpen && <PopupInput onClose={handlePopupClose} />}
    </div>
  );
}
