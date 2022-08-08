const Datasource= require('../datasources/Datasource')
const asyncHandler = require('../middlewares/async')

exports.postFeed = asyncHandler(async (req,res,next)=>{
    const nama = req.body.nama
    const awardtype = req.body.awardtype
    const poin =req.body.poin
    const result = await Datasource().FeedDatasource.createFeed(nama, awardtype, poin)
    res.status(200).json({
        success:true,
        data:result
    })
})

exports.getFeed = asyncHandler(async (req,res,next)=>{
    const min = req.query.min
    const type1 = req.query.type1
    const type2 = req.query.type2
    const type3 = req.query.type3

    const result = await Datasource().FeedDatasource.getFeed(min, type1,type2,type3)
    res.status(200).json({
        success:true,
        data:result
    })
})

// exports.updateChat = asyncHandler(async (req,res,next)=>{
//     const tweet = req.body.tweet
//     const id = req.body.id
//     const iduser = req.body.iduser
//     const result = await Datasource().TweetDatasource.updateChat(id, iduser, tweet)
//     res.status(200).json({
//         success:true,
//         data:result
//     })
// })

exports.deleteFeed = asyncHandler(async (req,res,next)=>{
    const id = req.params.id
    const result = await Datasource().FeedDatasource.deleteFeed(id)
    res.status(200).json({
        success:true,
        data:result
    })
})
