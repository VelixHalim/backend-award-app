const {Response} = require('../models/CommonModel')
const CommonFunction = require('../function/CommonFunction');
// const { default: axios } = require('axios');
const { response } = require('express');

class UserDatasource{
    constructor({awardPGDB}){
        this.awardPGDB = awardPGDB
    }

    async postUser(email){
        const t = await this.awardPGDB.sequelize.transaction();
        let sqlcheck = `
            select * from public.user where email='${email}'
        `
        const [Cstatus, Cresult, Cmetadata] = await CommonFunction.DoTransactionQueryNonArray(this.awardPGDB,sqlcheck,{},t)
        if(Cstatus == 1){
            t.rollback()
            return Response(553,"Terjadi kesalahan pada data User",null);
        } else if(Cmetadata.rowCount>0) {
            t.rollback()
            return Response(553,"Data sudah ada",null);
        }

        let id=Date.now().toString()
        let sql = `
            insert into public.user (id,email,createddate,updateddate)
            values ('${id}','${email}',current_timestamp,current_timestamp)
        `
        const [Ostatus, Oresult, Ometadata] = await CommonFunction.DoTransactionQueryNonArray(this.awardPGDB,sql,{},t)
        if(Ostatus == 1){
            t.rollback()
            return Response(553,"Terjadi kesalahan pada data User",null);
        } else if(Ometadata.rowCount==0) {
            t.rollback()
            return Response(553,"Data tidak ditemukan",null);
        }else{
            t.commit()
            return Response("0","Berhasil",Oresult)
        }
    }

    async getUser(email){
        let sql = `
            select * from public.user
            where "email"='${email}'
        `

        const [Ostatus, Oresult, Ometadata] = await CommonFunction.DoQueryNonArray(this.awardPGDB,sql,{})
        if(Ostatus == 1){
            return Response(553,"Terjadi kesalahan pada data User",null);
        } 
        if(Ometadata.rowCount==0) {
            return Response(553,"Data tidak ditemukan",null);
        }
        return Response("0","Berhasil",Oresult)
    }

    // async updateUser(id, username){
    //     const t = await this.tweetPGDB.sequelize.transaction();
    //     let sql = `
    //         update "user" set username='${username}', updateddate = current_timestamp
    //         where "id" = '${id}'
    //     `
    //     const [Ostatus, Oresult, Ometadata] = await CommonFunction.DoTransactionQueryNonArray(this.tweetPGDB,sql,{},t)
    //     if(Ostatus == 1){
    //         t.rollback()
    //         return Response(553,"Terjadi kesalahan pada data User",null);
    //     } else if(Ometadata.rowCount==0) {
    //         t.rollback()
    //         return Response(553,"Data tidak ditemukan",null);
    //     }else{
    //         t.commit()
    //         return Response("0","Berhasil",Oresult)
    //     }
    // }
}

module.exports = UserDatasource