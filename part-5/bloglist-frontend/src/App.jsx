import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./index.css";
import Notification from "./components/Notification";
import Blog from "./components/Blog";
import Togglable from "./components/Toggable";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    // Buscamos si existe un usuario guardado en la "caja fuerte"
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");

    if (loggedUserJSON) {
      // Si existe, lo transformamos de nuevo a un objeto de JavaScript
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (e) {
      setMessage("wrong username or password");
      setMessageType("error");
      console.error("Error:", e);

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");

    setUser(null);
    blogService.setToken(null);
  };

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();

      const returnedBlog = await blogService.create(blogObject);

      setBlogs(blogs.concat(returnedBlog));
      setMessage(
        `a new blog ${blogObject.title} by ${blogObject.author} added`,
      );
      setMessageType("success");

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      console.error("Error al crear el blog:", error);
    }
  };

  const addLike = async (id, blogObject) => {
    try {
      const returnedBlog = await blogService.update(id, blogObject);

      const originalBlog = blogs.find((b) => b.id === id);
      // Actualizamos el estado reemplazando el blog viejo con el nuevo

      const updatedBlogWithUser = {
        ...returnedBlog,
        user: originalBlog.user,
      };

      setBlogs(
        blogs.map((blog) => (blog.id !== id ? blog : updatedBlogWithUser)),
      );
    } catch (error) {
      console.error("Error al dar like:", error);
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} type={messageType} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} type={messageType} />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {/* LISTA DE BLOGS */}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} addLike={addLike} />
      ))}
    </div>
  );
};

export default App;
