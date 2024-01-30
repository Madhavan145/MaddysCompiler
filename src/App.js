import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';
import stubs from './defaultStubs';

function App() {
  const [code, setCode] = useState('');
  //const [disp,setDisp] = useState("");
  const [language, setLanguage] = useState('cpp');
  const [op, setOp] = useState('');
  const [jobid,setJobid] = useState(''); 
  const [sts,setSts]=useState(""); 

  useEffect(()=>{
    setCode(stubs[language]);
  },[language]);

  useEffect(()=>{
    const defLang = localStorage.getItem("Default Language") || "Java";
    setLanguage(defLang);
  },[])
  const setDefaultLang =() =>{
    localStorage.setItem("Default Language",language);
  }
  const saveCode =()=>{
    sessionStorage.setItem("Code",code);
  }

  const handleSubmit = async () => {
    const config = {
      language: language,
      code: code,
    };

    try {
      const { data } = await Axios.post('http://localhost:3001/run', config);
      let intervalId;

      intervalId = setInterval(async () => {
        try
        {const { data: dataRes } = await Axios.get('http://localhost:3001/status', {
          params: { id: data.jobbId },
        });
          setOp("");
          setJobid(data.jobbId);
          setSts("");
        const { success, jobb, error } = dataRes;
        if (success) {
          const { status: jobStatus, output: jobOutput } = jobb;
          setOp(jobOutput);
          setJobid(data.jobbId);
          setSts(jobStatus);
          if (jobStatus === 'pending') return;
          clearInterval(intervalId);
        } else {
          console.error(error);
          clearInterval(intervalId);
          setOp(error);
        }}
        catch(e){
          setOp(e);
        }
      }, 1000);
    } catch ({ response }) {
      if (response) {
        setOp(response.data.stderr);
      } else {
        window.alert('Error in server connection');
      }
    }
  };

  return (
    <div>
    <div className="App">
      <div className="left">
        <h1>Maddy's Code Compiler</h1>
          <select
            value={language}
            onChange={(event) => {
              let resp = window.confirm("Are you sure you want to change the language? Your data will be lost.");
              if (resp) {
                setLanguage(event.target.value);
              }
            }}
          >
            <option value="cpp">C++</option>
            <option value="py">Python</option>
            <option value="java">Java</option>
          </select>
        <div>
          <button onClick={setDefaultLang}>Set Default Language</button>
        </div>
        <br/>
        <textarea
          rows="15"
          cols="75"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
          }}
        ></textarea>
      <div className="left-buttons">
          <button onClick={saveCode}>Save</button>
          <button onClick={handleSubmit}>Run</button>
        </div>
        </div>
      <div className="right">
        <div className="text-input">
        <h2>Input</h2>
        <textarea
          rows="10"
          cols="10"
          placeholder="Still working on getting and processing inputs"
          readOnly
        ></textarea>
        </div>
        <div className="execution-details">
          <h2>Execution Details</h2>
          <p>{`Your Job id is :${jobid}`}</p>
          <p>{`Your job Status is : ${sts}`}</p>
        </div>
        <div className="output">
          <h2>Output</h2>
          <p>{op}</p>
        </div>
      </div>
    </div>
    </div>
  );
}


export default App;
