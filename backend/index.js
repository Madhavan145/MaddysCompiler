const express = require("express");
const { generateFile } = require("./generateFile");
const {addJobToQueue} = require("./jobQueue");
const mongoose = require('mongoose');
const job = require("./models/job")
const app = express();
const PORT = 3001;
const CORS = require("cors");

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(CORS());

async function connectToDatabase() {
    try {
        await mongoose.connect("mongodb://localhost/compiler");
        console.log("Db connection established");
    } catch (error) {
        console.error(error);
        process.exit(1); 
    }
}
connectToDatabase();
app.get('/status',async(req,res)=>{
    const jobbId = req.query.id;

    if(jobbId == undefined){
        return res.status(400).json({success:false, error:"Missing query param"});
    }
    try{
        const jobb = await job.findById(jobbId);
        if(jobbId == undefined){
            return res.status(404).json({success:false, error:"Invalid query param"});
        }
        return res.status(200).json({success:true,jobb});
    }
    catch(err){
        return res.status(400).json({succes:false,error:JSON.stringify(err)});
    }
})

app.post('/run', async (req,res)=>{
    const {language = "cpp",code}= req.body;
    if(code === undefined){
        return res.status(400).json({success:false , error:"Empty code"})
    }
    let jobb;
    try{
        const filepath = generateFile(language,code);
        jobb = await new job({language,filepath}).save();
        const jobbId = jobb["_id"];
        addJobToQueue(jobbId);
        res.status(201).json({success:true ,jobbId});
}
    catch(e){
        res.status(400).json({success:false,e:JSON.stringify(e)});
    }});
   

app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`);
});
