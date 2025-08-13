const saveTodo  = require("../model/User");

exports.createTodo = async (req, res) => {
    try {
        const { title, username } = req.body;

        const savetodo = new saveTodo({ title, username });
        const response = await savetodo.save();

        return res.status(200).json({ success: true, msg: response });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
};

exports.editTodo = async (req, res) => {
    try {
        const { state, id } = req.body;
        const response = await saveTodo.findByIdAndUpdate(id, { state: state },{new:true});
        return res.status(200).json({ success: true, msg: response });
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,msg:"Internal Server error"});
    }
}


exports.getAllTodos = async (req,res)=>{
    try {
        const data = await saveTodo.find({});
        return res.status(200).json({success:true,msg:data});
    } catch (error) {
        return res.state(500).json({success:false,msg:"Server error"});
    }
}