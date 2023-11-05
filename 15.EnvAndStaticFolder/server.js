const app = require("./index");
require("dotenv").config({ path: './config.env' });
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port no ${PORT}`)
})