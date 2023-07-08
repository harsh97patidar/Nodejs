import { useState } from "react";

export function CommentForm({
  loading,
  error,
  onSubmit,
  autoFocus = false,
  initialValue = "",
}) {
  const [message, setMessage] = useState(initialValue);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(message).then(() => {
      setMessage("");
      window.location.reload();
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="comment-form-row">
        <textarea
          autoFocus={autoFocus}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="message-input"
        />
        <button
          className="btn bg-indigo-500 w-20"
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading" : "Post"}
        </button>
      </div>
      <div className="error-msg">{error}</div>
    </form>
  );
}
