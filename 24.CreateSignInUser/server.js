const app = require("./index");
require("dotenv").config({ path: './config.env' });
const mongoose = require("mongoose");
const db_url = process.env.ATLAS_URL.replace('<password>', process.env.ATLAS_PASSWORD)
console.log("xxxx", db_url)

mongoose.connect((db_url)).then(() => {
    console.log("DB connect is successfull")
}).catch((error) => {
    console.error("Error is connecting mongo atlas database ", error)
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port no ${PORT}`)
})