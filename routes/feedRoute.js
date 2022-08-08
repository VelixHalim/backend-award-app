const express = require("express")
const {postFeed, getFeed, deleteFeed } =require("../controllers/feed")
const router = express.Router()

router 
    .route("/createFeed")
    .post(postFeed)

router
    .route("/getFeed")
    .get(getFeed)

// router
//     .route("/updateFeed")
//     .put(updateFeed)

router
    .route("/deleteFeed/:id")
    .delete(deleteFeed)

module.exports = router