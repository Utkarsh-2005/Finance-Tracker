const mongoos = require('mongoose');
const connectDB = async()=>{
    try {
        await mongoos.connect(process.env.URL)
            console.log("Connected!!!")
    } catch (error) {
        console.log("Not Connected!!")
    }
}
module.exports = connectDB