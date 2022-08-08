const express = require("express")
const {postUser, getUser} = require("../controllers/user")
const router = express.Router()

router
    .route("/postUser")
    .post(postUser)

router
    .route("/getUser")
    .get(getUser)

// router
//     .route("/updateUser")
//     .put(updateUser)

module.exports = router