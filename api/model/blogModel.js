const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    img:{
        type:String
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref: 'user'
    }
},{timestamps:{
    createAt:'create-at',
    updateAt:'update-at'
}})

module.exports = mongoose.model('blogs',blogSchema)