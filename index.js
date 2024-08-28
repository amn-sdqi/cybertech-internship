const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

// express app
const app = express();

// setting up view engine

app.set("view engine", "ejs");

const port1 = 2000;
//connect to MongoDb
const uri =
	"mongodb+srv://amn_sdqi:1234@projects.g12m2.mongodb.net/?retryWrites=true&w=majority&appName=Projects";
mongoose
	.connect(uri)
	.then((result) =>
		app.listen(port1, () => {
			console.log(`connected to database &and listening at port ${port1}`);
		})
	)
	.catch((err) => console.log(err));

//serving file statically
app.use(express.static("public"));

//setting up logs
app.use(morgan("dev"));

// Listening to port from localhost

//get request for Home page
app.get("/", (req, res) => {
	const blogs = [
		{
			title: "Mario gets the Stars",
			snippet: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
		},
		{
			title: "Lugia sees a Ghost",
			snippet: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
		},
		{
			title: "Princes has the Fire power",
			snippet: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
		},
	];

	res.render("home", { title: "HOME", blogs: blogs });
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

//get request for 404 ntfnd page
app.use((req, res) => {
	console.log("File Not Found");
	res.statusCode = 404;
	res.render("404", { title: "404 Error" });
});
