const fs = require('fs');
const {v4:uuid} = require('uuid');//version 4 given the name uuid
const path = require('path');
const dirCodes = path.join(__dirname,"codes");

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes,{recursive:true});
}
const generateFile =  (format,content)=>{
    const jobId = uuid();//unique id generator uuid
    const filefolder = `${format}${jobId}`;
    const initfilepath = path.join(dirCodes,filefolder);
    if(!fs.existsSync(initfilepath)){
        fs.mkdirSync(initfilepath,{recursive:true});
    }
    const filename = `Main.${format}`;
    const filepath = path.join(initfilepath,filename);
    fs.writeFileSync(filepath,content);
    return filepath;
};
module.exports = {
    generateFile
};