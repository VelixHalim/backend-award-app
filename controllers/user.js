const Datasource= require('../datasources/Datasource')
const asyncHandler = require('../middlewares/async')

exports.postUser = asyncHandler(async (req,res,next)=>{
    const email = req.body.email
    // const password = req.body.password
    const result = await Datasource().UserDatasource.postUser(email)
    res.status(200).json({
        success:true,
        data:result
    })
})

exports.getUser = asyncHandler(async (req,res,next)=>{
    const email = req.query.email
    // const password = req.query.password
    const result = await Datasource().UserDatasource.getUser(email)
    res.status(200).json({
        success:true,
        data:result
    })
})

// exports.updateUser = asyncHandler(async (req,res,next)=>{
//     const id = req.body.id
//     const username = req.body.username
//     const result = await Datasource().UserDatasource.updateUser(id, username)
//     res.status(200).json({
//         success:true,
//         data:result
//     })
// })