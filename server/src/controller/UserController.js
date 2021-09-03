const UserSchema = require('../model/UserSchema')

const UserController = async (req,res)=> {
    try {
        const data = await UserSchema.find({googleId: req.body.googleId})
        if(data.length==0){
            const newUser = new UserSchema(req.body)
            await newUser.save();
            res.status(200).json("User added successfully")
            console.log("User added successfully")
        }else{
            res.status(200).json('User already exists')
            console.log('User already exists')
        }
    } catch (error) {
        console.log("error in adding user to db", error)
        res.status(404).json(error)
    }
}


module.exports = UserController