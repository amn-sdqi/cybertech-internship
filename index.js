const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const Blog = require("./models/blog");

// express app
const app = express();

// setting up view engine

app.set("view engine", "ejs");

const port1 = 2000;
//connect to MongoDb
const uri =
	"mongodb+srv://amn_sdqi:1234@projects.g12m2.mongodb.net/blog-site?retryWrites=true&w=majority&appName=Projects";
mongoose
	.connect(uri)
	.then((result) =>
		app.listen(port1, () => {
			console.log(`connected to database & and listening at port ${port1}`);
		})
	)
	.catch((err) => console.log(err));

//serving file statically
app.use(express.static("public"));

//To convert & access the form data into human readable format back and fort
// if not used it you can not access the submited form data
app.use(express.urlencoded({ extended: true }));

//setting up logs
app.use(morgan("dev"));

// Listening to port from localhost

//get request for Home page
app.get("/", (req, res) => {
	res.redirect("allBlogs");
});

//get request for about page
app.get("/about", (req, res) => {
	res.statusCode = 200;
	res.render("about", { title: "About" });
});

//get request for create page

app.get("/createBlog", (req, res) => {
	res.statusCode = 200;
	res.render("creatBlog", { title: "Create" });
});

app.get("/allBlogs", (req, res) => {
	Blog.find()
		.then((result) => {
			res.render("home", { title: "All-Blogs", blogs: result });
		})
		.catch((err) => {
			console.log(err);
		});
});

//post request for blogs
app.post("/blogs", (req, res) => {
	const blog = new Blog(req.body);

	blog
		.save()
		.then((result) => {
			res.redirect("/");
		})
		.catch((err) => {
			res.send(err);
		});
});

//get request for 404 ntfnd page
app.use((req, res) => {
	console.log("File Not Found");
	res.statusCode = 404;
	res.render("404", { title: "404 Error" });
});

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//----------------------------------------------------------------------------------------------------------
//get request for create blog
// app.get("/blog-create", (req, res) => {
// 	const blog = new Blog({
// 		title: "New 3",
// 		snippet: "This is 3rd New",
// 		body: "This is a Newly added blog",
// 	});

// 	blog
// 		.save()
// 		.then((result) => {
// 			res.send(result);
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});
// });

//----------------------------------------------------------------------------------------------------------
