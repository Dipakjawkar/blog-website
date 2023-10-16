const express = require('express');
const {userSignup, userSignin, users, userSignout} = require('../controller/userController')

const userRoutes = express.Router()

// This route for signup process of user
userRoutes.post('/signup',userSignup)

// This route for signin process of user
userRoutes.post('/signin',userSignin)

// This route for Get all users
userRoutes.get('/',users)

// logout route
userRoutes.get('/signout',userSignout)

module.exports = userRoutes