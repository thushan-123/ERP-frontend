
"use client";

import { useState } from "react";
import { login_request } from "./apiCall";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter()

  const login = async () => {
    const res = await login_request(username, password)

    if (res){
      localStorage.setItem("token", res.access_token)
      toast.success("Login successful")
      router.push("/master")
    }else {
      toast.error("Incorrect credentials")
    }
  }

  return (
    <div>
      <Toaster />
      <h1>ERP Login</h1>

      <label>Username :</label>
      <input type="text" name="" id="" onChange={(e) => {setUsername(e.target.value)}} /><br/>
      <label htmlFor="">Password</label>
      <input type="password" name="" id="" onChange={(e) => {setPassword(e.target.value)}} /> <br/>
      <button onClick={login} type="button">Login</button>
    </div>
  );
}
