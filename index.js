import express from "express";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

let posts = [];
app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/newPost", (req, res) => {
  res.render("newPosts.ejs");
});

app.post("/newPosts", (req, res) => {
  const post = {
    title: req.body.title,
    content: req.body.content,
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/edit-post/:index", (req, res) => {
  const index = req.params.index; // Get the index from the route parameters
  const post = posts[index]; // Retrieve the post by its index from the posts array

  // Check if the post exists to avoid errors
  if (post) {
    res.render("edit-post", { post, index }); // Pass the post and index to the EJS template
  } else {
    res.status(404).send("Post not found");
  }
});

app.post("/edit-post/:index", (req, res) => {
  const index = req.params.index;
  posts[index] = {
    title: req.body.title,
    content: req.body.content,
  };
  res.redirect("/");
});

app.post("/delete-post/:index", (req, res) => {
  const index = req.params.index;

  posts.splice(index, 1); // Remove post at the given index
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
