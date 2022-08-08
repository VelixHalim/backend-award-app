//Database
const {awardPG}=require('../configs/awardPGDB')

//Datasource
const FeedDatasource = require('./FeedDatasource');
const UserDatasource = require("./UserDatasource")

//Initiate Database
const awardPGDB =awardPG();

const Datasource = () => ({
    FeedDatasource : new FeedDatasource({awardPGDB}),
    UserDatasource : new UserDatasource({awardPGDB})
})

module.exports = Datasource;