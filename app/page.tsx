
"use client";

import { useState } from "react";
import { login_request } from "./apiCall";
import { useRouter } from "next/navigation";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter()

  const login = async () => {
    const res = await login_request(username, password)

    if (res){
      localStorage.setItem("token", res.access_token)
      alert("login success")
      router.push("/master")
    }else {
      alert("incorrect credentials");
    }
  }

  return (
    <div>
      <h1>ERP Login</h1>

      <label>Username :</label>
      <input type="text" name="" id="" onChange={(e) => {setUsername(e.target.value)}} /><br/>
      <label htmlFor="">Password</label>
      <input type="password" name="" id="" onChange={(e) => {setPassword(e.target.value)}} /> <br/>
      <button onClick={login} type="button">Login</button>
    </div>
  );
}
