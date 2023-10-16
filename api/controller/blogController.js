const blogModel = require('../model/blogModel')
const userModel = require('../model/userModel')

exports.getBlog = async (req,res)=>{
try{
    const blogs = await blogModel.find()
    return res.send({
        success:true,
        message:'all blogs',
        blogs
    })
}catch(error){
    return res.status(404).send({
        success:false,
        message:'getBlog callback is failed '
    })
}
}



exports.postBlog = async (req,res)=>{
try{
    const {title , description} = req.body
    if(!title || !description){
        return res.status(200).send({
            message:'fill all fields',
            success:false
        })
    }
    const userId = req.userId

    const isUser = await userModel.findOne({"email": userId})

    const blog = await new blogModel({title, description, "user":isUser})
    await blog.save()
    console.log(blog);
    await userModel.findOneAndUpdate({"email":isUser.email},{$push:{"blogs":blog}})

    return res.status(200).send({
        success:true,
        message:'blog is posted ',
        blog
    })  
    /// pending.............................................

}catch(error){
    return res.status(404).send({
        success:false,
        message:'postBlog callback failed '
    })
}
}




exports.updateBlog = async (req,res)=>{
    const id = req.params.id
    const userId = req.userId
    const {title, description} = req.body;
    
    const isUser = await userModel.findOne({"email": userId, "blogs":id})
    if(!isUser){
        return res.status(200).send({
            success:false,
            message:'blog not found !'
        })
    }

    const blog = await blogModel.findOneAndUpdate({_id:id},{title, description})
    if(!blog){
        return res.status(404).send({
            success:false,
            message:'blog update error !'
        })
    }
    return res.status(200).send({
        message:'blog is updated !',
        success:true,
        blog
    })

}
exports.deleteBlog = async (req,res)=>{
    const id = req.params.id
    const userId = req.userId
    
    const isUser = await userModel.findOne({"email": userId, "blogs":id})
    if(!isUser){
        return res.status(200).send({
            success:false,
            message:'blog not found !'
        })
    }
    
    const blog = await blogModel.findByIdAndDelete({ _id : id}).populate('user')
    await blog.user.blogs.pull(blog)
    await blog.user.save()
    if(!blog){
        return res.status(200).send({
            success:false,
            message:'blog not found !'
        })
    }
    return res.status(200).send({
        success:true,
        message:'blog deleted',
        blog
    })
    
}

exports.getBlogByid = async (req,res) =>{
    const id = req.params.id

    const blog = await blogModel.findOne({_id:id})
    if(!blog){
        return res.status(404).send({
            message:'blog not found !',
            success : false
        })
    }
    return res.status(200).send({
        message:'blog',
        success:true,
        blog
    })
}