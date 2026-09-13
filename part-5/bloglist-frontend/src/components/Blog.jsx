import { useState } from "react";

const Blog = ({ blog }) => {
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
            <button style={{ marginLeft: 5 }}>like</button>
          </div>
          <div>{blog.user ? blog.user.name : "Unknown User"}</div>
        </div>
      )}
    </div>
  );
};

export default Blog;
