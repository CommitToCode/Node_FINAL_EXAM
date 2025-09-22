const mongoose = require('mongoose');
 const dbCon = async()=>{
    try {
        const db = await mongoose.connect(process.env.MONGO_URL)
        if(db){
            console.log("database connected successfully");
        }
    }catch (error){
        console.log(`connection failed ${error}`);        
    }
 }
 module.exports = dbCon;
