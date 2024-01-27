const {exec} = require("child_process");
const fs = require('fs');
const path = require('path');
const outputPath = path.join(__dirname,"outputs");

if(!fs.existsSync(outputPath)){
    fs.mkdirSync((outputPath),{recursive:true});
}
const execCpp = (filepath)=>{
    const jobId = path.basename(path.dirname(filepath));
    const filefolder = `${jobId}`;
    const initoutfilepath = path.join(outputPath,filefolder);
    if(!fs.existsSync(initoutfilepath)){
        fs.mkdirSync(initoutfilepath,{recursive:true});
    }
    const outPath = path.join(initoutfilepath, `Main.exe`);
    return new Promise((resolve,reject)=>{
        exec(`g++ ${filepath} -o ${outPath} && cd ${initoutfilepath} && Main.exe`,((error,stdout,stderr)=>{
            error && reject({error,stderr});
            stderr && reject(stderr);
            resolve(stdout);
        }
        )
        );
    });
}; 
module.exports = {
    execCpp
}