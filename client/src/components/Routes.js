import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./login";
import { PostProvider } from "../contexts/PostContext";
import { Post } from "./Post";
import { PostList } from "./PostLists";

function RequireAuth({ children, redirectTo, token }) {
  let isAuthenticated = token;
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

function AppRoute() {
  const token = localStorage.getItem("token");

  console.log("token", token);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <RequireAuth redirectTo="/login" token={token}>
            <PostList />
          </RequireAuth>
        }
      />

      <Route
        path="/posts/:id"
        element={
          <RequireAuth redirectTo="/login" token={token}>
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
