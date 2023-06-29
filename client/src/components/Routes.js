import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./login";
import { PostProvider } from "../contexts/PostContext";
import { Post } from "./Post";
import { PostList } from "./PostLists";

function RequireAuth({ children, redirectTo }) {
  let isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/posts" />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/posts"
        element={
          <RequireAuth redirectTo="/login">
            <PostList />
          </RequireAuth>
        }
      />

      <Route
        path="/posts/:id"
        element={
          <RequireAuth redirectTo="/login">
            <PostProvider>
              <Post />
            </PostProvider>
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default AppRoute;
