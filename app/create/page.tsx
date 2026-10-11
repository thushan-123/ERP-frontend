"use client";
import { useState, useEffect } from "react";
import { create_request } from "../apiCall";
import { useRouter } from "next/navigation";

export default function CreateUOM () {

    const router = useRouter()

    const [uomCode, setUomCode] = useState("")
    const [uomState, setUomState] = useState("")
    const [uomCategory, setUomCategory] = useState("")
    const [decimalPlaces, setDecimalPlaces] = useState("")
    const [description, setDescription] = useState("")

    const create = async () => {
        const token = localStorage.getItem("token")
        if (token){
            const res = await create_request(uomCode,uomState,uomCategory,decimalPlaces,description,token)
            if (res){
                alert("Create Successfull")
                router.push("/master")
            }else {
                alert("Create Fail")
            }
        }else{
            console.log("token fetch fail")
            alert("token fetch fail")
            return
        }
        
    }

// {
//   "uom_code": "string",
//   "uom_name": "string",
//   "uom_category": "string",
//   "decimal_places": 0,
//   "description": "string",
//   "active": true
// }
    return (
        <div>
            <h2>create UOM Master</h2>
            <label htmlFor="">uom code : </label>
            <input type="text" name="" id="" onChange={(e) => {setUomCode(e.target.value)}} /><br />

            <label htmlFor="">uom name : </label>
            <input type="text" name="" id="" onChange={(e) => {setUomState(e.target.value)}}/><br />

            <label htmlFor="">uom category : </label>
            <input type="text" name="" id="" onChange={(e) => {setUomCategory(e.target.value)}}/><br />

            <label htmlFor="">decimal_places : </label>
            <input type="number" name="" id="" onChange={(e) => {setDecimalPlaces(e.target.value)}}/><br />

            <label htmlFor="">description</label>
            <input type="text" name="" id="" onChange={(e) => {setDescription(e.target.value)}}/><br />

            <button type="button" onClick={create}>Create New UOM</button>
        </div>
    );
}