const app = require("./index");
require("dotenv").config({ path: './config.env' });
const mongoose = require("mongoose");
const db_url = process.env.ATLAS_URL.replace('<password>',process.env.ATLAS_PASSWORD)
console.log("xxxx",db_url)

mongoose.connect((db_url)).then(()=>{
    console.log("DB connect is successfull")
    // mongoose.connection.db.collection('notes').insertOne({
    //     "title":"HTML",
    //     "description":"html is hyper text markup language ",
    //     "created_at":"23-2-2022",
    //     "updated_at":"23-12-2022",
    //     "important":false,
    //     "priority":1
    // }).then(()=>{console.log("New Note is added")})
}).catch((error)=>{
    console.error("Error is connecting mongo atlas database ",error)
})


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port no ${PORT}`)
})