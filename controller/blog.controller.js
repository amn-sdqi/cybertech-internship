const Blog = require("../models/blog");

//post request for blogs

function blog_index(req, res) {
	Blog.find()
		.sort({ createdAt: -1 })
		.then((result) => {
			res.render("home", { title: "All-Blogs", blogs: result });
		})
		.catch((err) => {
			console.log(err);
		});
}

//get request for create page
function blog_create_get(req, res) {
	res.statusCode = 200;
	res.render("creatBlog", { title: "Create" });
}

//post request for creating a new blog and save it
function blog_create_post(req, res) {
	const blog = new Blog(req.body);

	blog
		.save()
		.then((result) => {
			res.redirect("/");
		})
		.catch((err) => {
			console.log(err);
		});
}

//get req for a single blog detailed page
function blog_details(req, res) {
	const id = req.params.id;

	Blog.findById(id)
		.then((blog) => {
			res.render("details", { title: id, blog: blog });
		})
		.catch((err) => {
			res.status(404).render("404", { title: "Blog Does Not Exist" });
		});
}

//delete req for a single blog
function blog_delete(req, res) {
	const id = req.params.id;
	Blog.findByIdAndDelete(id)
		.then((response) => {
			res.json({ redirect: "/blogs" });
		})
		.catch((err) => {
			console.log(err);
		});
}

module.exports = {
	blog_index: blog_index,
	blog_create_get: blog_create_get,
	blog_create_post: blog_create_post,
	blog_details: blog_details,
	blog_delete: blog_delete,
};
