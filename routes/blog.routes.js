const express = require("express");
const blogController = require("../controller/blog.controller");

const router = express.Router();

//post request for blogs
router.get("/", blogController.blog_index);

//get request for create page
router.get("/create", blogController.blog_create_get);

//post request for creating a new blog and save it
router.post("/", blogController.blog_create_post);

//get req for a single blog detailed page
router.get("/:id", blogController.blog_details);

//delete req for a single blog
router.delete("/:id", blogController.blog_delete);

module.exports = router;
