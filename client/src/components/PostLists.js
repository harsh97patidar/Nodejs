import { Link, useNavigate } from "react-router-dom";
import { useAsync } from "../hooks/useAsync";
import { getPosts } from "../services/posts";
import UploadImage from "./uploadImage";
import { GrClose } from "react-icons/gr";

import "./PostList.css";
import { useState } from "react";
import axios from "axios";
import CircleInitials from "./Logout/logout";
import { getToken } from "../utils";

const PopupInput = (props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState();

  // const createPostFn = useAsyncFn(createPost);

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

    // createPostFn(formData);

    const requestOptions = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/post`,
        formData,
        requestOptions
      )
      .then(() => {
        window.location.reload();
      });
    event.preventDefault();
    props.onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="App relative">
          <GrClose
            className="absolute right-1 top-0"
            onClick={() => {
              props.onClose();
            }}
          />
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
};

export function PostList() {
  const { loading, error, value: posts } = useAsync(getPosts);

  const navigate = useNavigate();

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
      <div className="header-container">
        <div className="flex flex-col ">
          <span className="heading">What would you like to post ?</span>
          <button className="add-post-button mt-1" onClick={handleButtonClick}>
            Add Post
          </button>
        </div>

        <div className="logout-button">
          <CircleInitials />
        </div>
      </div>

      <div className="card-page card-container">
        <div className="card-list">
          {isPopupOpen && <PopupInput onClose={handlePopupClose} />}
          {posts?.data.map((card) => (
            <Link to={`/posts/${card.id}`}>
              <div className="card" key={card.id}>
                {card?.filename ? (
                  <img
                    src={`${process.env.REACT_APP_SERVER_URL}/image/${card?.filename}`}
                    alt="card"
                    className="card-image"
                    headers={{
                      Authorization: getToken(),
                    }}
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
      </div>
    </div>
  );
}
