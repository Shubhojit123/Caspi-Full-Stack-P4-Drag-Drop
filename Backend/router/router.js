const express = require('express');
const router = express.Router();
const {createTodo,editTodo,getAllTodos} = require("../controller/userController");

router.post("/create",createTodo);
router.put("/edit",editTodo);
router.get("/get",getAllTodos);


module.exports = router;
