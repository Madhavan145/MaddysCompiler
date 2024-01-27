const {exec} = require("child_process");
const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname,"outputs");

if(!fs.existsSync(outputPath)){
    fs.mkdirSync((outputPath),{recursive:true});
}
const execJava = (filepath)=>{
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}`);
    return new Promise((resolve,reject)=>{
        exec(`javac ${filepath} -d ${outPath} && cd ${outPath} && java Main`,((error,stdout,stderr)=>{
            error && reject({error,stderr});
            stderr && reject(stderr);
            resolve(stdout);
        }
        )
        );
    });
}; 
module.exports = {
    execJava
}