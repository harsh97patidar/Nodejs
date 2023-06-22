import { makeRequest } from "./makeRequest";

export function getPosts() {
  return makeRequest("/posts");
}

export function getPost(id) {
  return makeRequest(`/posts/${id}`);
}

export function createPost(formData) {
  return makeRequest("post", {
    method: "POST",
    data: formData,
  });
}
