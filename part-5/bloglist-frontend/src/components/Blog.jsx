import { useState } from "react";

const Blog = ({ blog, addLike, removeBlog, currentUser }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = () => {
    const updateBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user ? blog.user.id : "",
    };

    addLike(blog.id, updateBlog);
  };

  const showRemoveButton = blog.user?.username === currentUser.username;

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility} style={{ marginLeft: 5 }}>
          {visible ? "hide" : "view"}
        </button>
      </div>

      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={handleLike} style={{ marginLeft: 5 }}>
              like
            </button>
          </div>
          <div>{blog.user ? blog.user.name : "Unknown User"}</div>

          {showRemoveButton && (
            <button
              onClick={() => removeBlog(blog)}
              style={{
                backgroundColor: "#008CBA",
                color: "white",
                marginTop: 5,
              }}
            >
              remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
