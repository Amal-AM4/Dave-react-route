import Header from "./Header";
import Footer from "./Footer";
import Nav from "./Nav";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";

import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";

function App() {
  let title = "React JS Blog";
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2025 11:17:34 AM",
      body: "This is my very first post. Just testing the blog setup.",
    },
    {
      id: 2,
      title: "Learning React Basics",
      datetime: "July 03, 2025 09:45:10 AM",
      body: "Today I learned about components, props, and state in React.",
    },
    {
      id: 3,
      title: "Understanding useState Hook",
      datetime: "July 05, 2025 06:30:55 PM",
      body: "useState helps manage local component state in a clean way.",
    },
    {
      id: 4,
      title: "React Router Practice",
      datetime: "July 07, 2025 02:15:20 PM",
      body: "Implemented routing using react-router-dom for navigation.",
    },
    {
      id: 5,
      title: "Building a Simple Blog App",
      datetime: "July 10, 2025 08:05:40 PM",
      body: "Started building a simple blog application using React.",
    },
  ]);

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults([...filteredResults].reverse());
  }, [posts, search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle("");
    setPostBody("");
    navigate("/");
  };

  const handleDelete = (id) => {
    const postList = posts.filter((post) => post.id !== id);
    setPosts(postList);
    navigate("/");
  };

  return (
    <div className="App">
      <Header title={title} />
      <Nav search={search} setSearch={setSearch} />

      <Routes>
        <Route path="/" element={<Home posts={searchResults} />} />
        <Route
          path="/post"
          element={
            <NewPost
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
            />
          }
        />
        <Route
          path="/post/:id"
          element={<PostPage posts={posts} handleDelete={handleDelete} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
