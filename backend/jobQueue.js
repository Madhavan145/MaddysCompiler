const Queue = require("bull");
const { execCpp } = require("./execCpp");
const { execPy } = require('./execPy');
const { execJava } = require("./execJava");
const job = require('./models/job');

const jobQueue = new Queue('job-queue');

jobQueue.process(5, async ({ data }) => {
  try {
    const { id: jobId } = data;
    const jobb = await job.findById(jobId);
    
    if (!jobb) {
      throw Error("Job not found");
    }

    let output;
    jobb.startedAt = new Date();

    if (jobb.language === "cpp") {
      output = await execCpp(jobb.filepath);
    } else if (jobb.language === "py") {
      output = await execPy(jobb.filepath);
    } else if (jobb.language === "java") {
      output = await execJava(jobb.filepath);
    }

    jobb.completedAt = new Date();
    jobb.status = "success";
    jobb.output = output;
    await jobb.save();
  } catch (err) {
    console.error(err);
    const { id: jobId } = data;
    const jobb = await job.findById(jobId); // Re-fetch the jobb to handle errors properly
    jobb.completedAt = new Date();
    jobb.status = "error";
    jobb.output = JSON.stringify(err);
    await jobb.save();
  }
});

const addJobToQueue = async (jobId) => {
  await jobQueue.add({ id: jobId });
};

jobQueue.on('failed', (job, err) => {
  console.log(job.id, "failed", err);
});

module.exports = {
  addJobToQueue,
};
