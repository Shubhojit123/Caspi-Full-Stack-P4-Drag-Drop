const express = require("express")
const app = express();
app.use(express.json());
const dbConnection = require("./config/dbConnection");
const router = require("./router/router");
const cors = require("cors");

require("dotenv").config();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


const PORT = process.env.PORT || 4000;

app.use("/api",router);

app.listen(PORT,()=>{
    console.log(`Server Startd Port ${PORT}`);
});

dbConnection();