require("dotenv").config();
const { Main } = require("./lib/Main");

const app = new Main(process.argv[2]);
app.excute();

