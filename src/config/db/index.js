const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
async function connect() {
    try {
        
        await mongoose.connect('mongodb://localhost:27017/pets_web_dev',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useNewUrlParser: true
        });
        console.log("Connect Successfully!");
    } catch (error) {
        console.log("Connect Failure!");
    }
}

module.exports = {connect};