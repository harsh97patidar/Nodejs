import { Link } from "react-router-dom";
import { useAsync } from "../hooks/useAsync";
import { getPosts } from "../services/posts";
import UploadImage from "./uploadImage";

import "./PostList.css";
import { useState } from "react";
import axios from "axios";

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
          <button
            type="submit"
            className="btn btn-secondary"
            onClick={() => {
              props.onClose();
            }}
          >
            Close
          </button>
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
    <div className="list-contianer">
      {/* <div className="background-image"></div>{" "} */}
      <button className="add-post-btn" onClick={handleButtonClick}>
        Add Post
      </button>
      <div className="card-page card-container">
        <div className="card-list">
          {isPopupOpen && <PopupInput onClose={handlePopupClose} />}
          {posts?.data.map((card) => (
            <Link to={`/posts/${card.id}`}>
              <div className="card" key={card.id}>
                {card.image ? (
                  <img
                    src={card.image}
                    alt={card.title}
                    className="card-image"
                  />
                ) : (
                  <div className="dummy-image" />
                )}
                <div className="card-content">
                  <h3 className="card-heading">{card.title}</h3>
                  <p className="card-text">{card.body}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <button className="add-post-button" onClick={handleButtonClick}>
          Add Post
        </button>
      </div>
    </div>
  );
}
