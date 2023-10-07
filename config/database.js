const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/project-8');
const Database = mongoose.connection;
Database.on('connected',(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    else{
        console.log("Database Connected");
    }
})
module.exports = Database;