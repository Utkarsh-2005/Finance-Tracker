const mongoos = require('mongoose');
const connectDB = async()=>{
    try {
        await mongoos.connect('mongodb+srv://utkarshjha4009:fAOM73aaiHMLqXTr@cluster0.70ben.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
            console.log("Connected!!!")
    } catch (error) {
        console.log("Not Connected!!")
    }
}
module.exports = connectDB