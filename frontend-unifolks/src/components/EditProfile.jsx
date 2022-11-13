import React, { useState } from 'react';
import axios from 'axios'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function EditProfile() {

  const createHeader = () => {
    const authAxios = axios.create({
        baseURL: "http://localhost:5000",
        headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
            email: cookies.get("email"),
            "Content-Type" : 'application/json'
        }
    });
    return authAxios;
}

  const [base64decoded , setBAse64Decoded] = useState("");
  const [file, setFile] = useState();

  const handleFileInput = (event) => {
    const selectedfile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(selectedfile);
    reader.onloadend = () => {
       setBAse64Decoded(JSON.stringify({ data: reader.result }));
       setFile(selectedfile);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const x = {
      // Here change email to current user
      email: "lcs2019022@iiitl.ac.in",
      data : base64decoded
    }
     
    createHeader(cookies.get("token")).post("/api/user/changePicture", x).then((res) => {
        setFile();
        setBAse64Decoded()
    }).catch((e) => {

    })
}


    return (
      <form onSubmit={handleSubmit}>
          <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label"><b>Choose DP 😉 </b> </label>
              <input type="file" onChange = {handleFileInput}  className="form-control" id="exampleFormControlInput1" placeholder="Attach File" required/>
           </div>
           <button type="submit" class="btn btn-primary" style={{"margin-bottom":10}}> Submit</button>
      </form>
  )
}