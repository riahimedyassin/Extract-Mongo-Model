const {Main} = require("./lib/Main")
require("dotenv").config();


const app = new Main(process.argv[2]);
app.excute();
