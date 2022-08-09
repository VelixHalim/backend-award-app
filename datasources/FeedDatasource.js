const {Response} = require('../models/CommonModel')
const CommonFunction = require('../function/CommonFunction');
// const { default: axios } = require('axios');
const { response } = require('express');

class TweetDatasource{
    constructor({awardPGDB}){
        this.awardPGDB = awardPGDB
    }

    async createFeed(nama, awardtype, poin ){
        const t = await this.awardPGDB.sequelize.transaction();
        let sql =`
            insert into public.feed (nama,awardType, poin,createddate, updateddate)
            values ('${nama}','${awardtype}',${poin},current_timestamp,current_timestamp)
        `
        const [Ostatus, Oresult, Ometadata] = await CommonFunction.DoTransactionQueryNonArray(this.awardPGDB,sql,{},t)
        if(Ostatus == 1){
            t.rollback()
            return Response(553,"Terjadi kesalahan pada data Feed",null);
        } else if(Ometadata.rowCount==0) {
            t.rollback()
            return Response(553,"Data tidak ditemukan",null);
        }else{
            t.commit()
            return Response("0","Berhasil",Oresult)
        }
    }

    async getFeed(min, type1,type2, type3, limit){
        // let sql =`
        //     select u.nama,u.username,c.* from "user" u join "chat" c on (u.id=c.iduser) 
        //     -- where c.tweet LIKE '%${cari}%'
        //     // order by c.createddate ${order}
        // `
        console.log(type1,type2,type3, limit)
        let sql = ``
        if(type1==''&&type2==''&&type3==''){
            sql =`
            select f.nama as nama_award, m.nama as nama_type, f.awardtype , f.poin  from public.feed f join public.master_award_type m on (f.awardtype=m.kode)
            where f.poin >= ${min} limit ${limit}
            `    
        }else{
            sql =`
            select f.nama as nama_award, m.nama as nama_type, f.awardtype , f.poin  from public.feed f join public.master_award_type m on (f.awardtype=m.kode)
            where f.poin >= ${min} and f.awardtype in ('${type1}','${type2}','${type3}') limit ${limit}
            `
        }
        
        const [Ostatus, Oresult, Ometadata] = await CommonFunction.DoQuery(this.awardPGDB,sql,{})
        if(Ostatus == 1){
            return Response(553,"Terjadi kesalahan pada data feed",null);
        } 
        if(Ometadata.rowCount==0) {
            return Response(553,"Data tidak ditemukan",null);
        }
        return Response("0","Berhasil",Oresult)
    }
    // async updateChat(id,iduser, tweet){
    //     const t = await this.tweetPGDB.sequelize.transaction();
    //     let sql =`
    //         update "chat" set tweet = '${tweet}', updateddate = current_timestamp
    //         where "id" = '${id}' and "iduser"='${iduser}'
    //     `
    //     const [Ostatus, Oresult, Ometadata] = await CommonFunction.DoTransactionQueryNonArray(this.tweetPGDB,sql,{},t)
    //     if(Ostatus == 1){
    //         t.rollback()
    //         return Response(553,"Terjadi kesalahan pada data Chat",null);
    //     } else if(Ometadata.rowCount==0) {
    //         t.rollback()
    //         return Response(553,"Data tidak ditemukan",null);
    //     }else{
    //         t.commit()
    //         return Response("0","Berhasil",Oresult)
    //     }
    // }
    async deleteFeed(id){
        const t = await this.awardPGDB.sequelize.transaction();
        let sql = `
            delete from public.feed where "id" ='${id}'
        `
        const [Ostatus, Oresult, Ometadata] = await CommonFunction.DoTransactionQueryNonArray(this.awardPGDB,sql,{},t)
        if(Ostatus == 1){
            t.rollback()
            return Response(553,"Terjadi kesalahan pada data Feed",null);
        } else if(Ometadata.rowCount==0) {
            t.rollback()
            return Response(553,"Data tidak ditemukan",null);
        }else{
            t.commit()
            return Response("0","Berhasil",Oresult)
        }
    }
}
module.exports = TweetDatasource