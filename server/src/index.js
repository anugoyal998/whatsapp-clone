const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000
const cors = require('cors');
const Routes = require('./routes/router')
require('./db/connection')
//middleware
app.use(cors());
app.use(express.json())
app.use("/",Routes)




//listen on PORT
app.listen(PORT,()=> {console.log(`listening on PORT ${PORT}`)});