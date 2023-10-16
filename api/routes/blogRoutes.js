const express = require('express');
const {getBlog,postBlog,updateBlog,deleteBlog ,getBlogByid} = require('../controller/blogController')
const {userMiddlwere} = require('../middleware/userMiddlewere')
const blogRoutes = express.Router()

blogRoutes.get('/',getBlog)
blogRoutes.put('/post',userMiddlwere,postBlog)
blogRoutes.patch('/update/:id',userMiddlwere,updateBlog)
blogRoutes.delete('/delete/:id',userMiddlwere,deleteBlog)
blogRoutes.get('/get-blog/:id',userMiddlwere,getBlogByid)
module.exports = blogRoutes