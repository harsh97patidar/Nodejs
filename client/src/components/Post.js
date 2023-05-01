import { usePost } from "../contexts/PostContext";
import { useAsyncFn } from "../hooks/useAsync";
import { createComment } from "../services/comments";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";

export function Post() {
  const { post, rootComments, createLocalComment } = usePost();
  const {
    loading,
    error,
    execute: createCommentFn,
  } = useAsyncFn(createComment);

  function onCommentCreate(message) {
    return createCommentFn({ postId: post.id, message, userId: 1 }).then(
      createLocalComment
    );
  }

  console.log("hara>>", post?.images);

  return (
    <>
      <h1>{post.title}</h1>
      {post?.images?.length > 0 &&
        post?.images?.map((i) => {
          return (
            <img
              src={`http://localhost:8000/v1/image/${i.filename}`}
              alt="Card"
              height="350"
            />
          );
        })}
      <article>{post.body}</article>
      <h3 className="comments-title">Comments</h3>
      <section>
        <CommentForm
          loading={loading}
          error={error}
          onSubmit={onCommentCreate}
        />
        {rootComments != null && rootComments.length > 0 && (
          <div className="mt-4">
            <CommentList comments={rootComments} />
          </div>
        )}
      </section>
    </>
  );
}
