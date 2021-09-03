const mongoose = require('mongoose')

const url = 'mongodb+srv://anubhav:8jeAOWvX35EmC6Zs@cluster0.xgrk9.mongodb.net/WHATSAPP-CLONE?retryWrites=true&w=majority'
mongoose.connect(url,{
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>{
    console.log("connect success");
}).catch(err =>{
    console.log("error in connecting db")
})