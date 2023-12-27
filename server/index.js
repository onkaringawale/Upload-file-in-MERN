const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const UserModel = require('./models/Users')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

mongoose.connect('mongodb://127.0.0.1:27017/test')

const storage = multer.diskStorage({
    destination : (req,res,cb)=>{
        cb(null,'public/Images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+ path.extname(file.originalname))
    }
})

const upload = multer({
    storage:storage
})

app.post('/upload',upload.single('file'), (req,res)=>{
    UserModel.create({image : req.file.filename})
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

app.get('/getImage',(req,res)=>{
UserModel.find()
.then(user => res.json(user))
.catch(err => console.log(err))
})

app.delete('/deleteImage/:id',(req,res)=>{
    const {id} = req.params;
    console.log(req.params)
    UserModel.findByIdAndDelete({_id :id})
    .then(user => res.json(user))
    .catch(err => console.log(err))
})


app.listen(3001,()=>{
    console.log("server was running")
})