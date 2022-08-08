const env = 'development' // development / production

const devConfig={
    PORT:'5000',
    JWT_SECRET: "t6w9z$C&F)J@NcRfUjXnZr4u7x!A%D*G",
    HOST: 'localhost',
    DATABASE: 'member_db',
    USERNAME: 'postgres',
    PASSWORD: 'umn123',
    SERVER_ENDPOINT: 'http://localhost:5000'   
}

if(env==='development'){
    module.exports = devConfig
}
// else if(env ==='production'){
//     module.exports = prodConfig
// }