const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const blogRoutes = require("./routes/blog.routes");

// express app
const app = express();
// setting up view engine
app.set("view engine", "ejs");

//serving file statically
app.use(express.static("public"));

//connect to MongoDb
const port1 = 2000;
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

//To convert & access the form data into human readable format back and fort
// if not used it you can not access the submited form data
app.use(express.urlencoded({ extended: true }));

//setting up logs
app.use(morgan("dev"));
app.use((req, res, next) => {
	res.locals.path = req.path;
	next();
});

//get request for Home page
app.get("/", (req, res) => {
	res.redirect("/blogs");
});

//get request for about page
app.get("/about", (req, res) => {
	res.statusCode = 200;
	res.render("about", { title: "About" });
});

app.use("/blogs", blogRoutes);

//get request for 404 ntfnd page
app.use((req, res) => {
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
