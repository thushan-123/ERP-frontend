// import axios from "axios";
import axios, { type AxiosRequestConfig } from "axios";

const URL: string = "http://localhost:8000/api";

const login_request = async (username: string, password: string) => {
    const data = JSON.stringify({
        "username": username,
        "password" : password
    })

    const config: AxiosRequestConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        url: URL + "/auth/login",
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    }

    try {
        const res = await axios(config)
        console.log(res.data)
        if (res) {
            return res.data;
        }else {
            return null
        }
    }catch(error){
        console.error(error)
        return null;
    }
}

const get_data = async (token: string) => {
    

    const config: AxiosRequestConfig = {
        method: 'get',
        maxBodyLength: Infinity,
        url: URL + "/uom",
        headers: { 
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        
    }

    try {
        const res = await axios(config)
        console.log(res.data)
        if (res) {
            return res.data.data;
        }else {
            return null
        }
    }catch(error){
        console.error(error)
        return null;
    }
}

const create_request = async (uom_code:string,uom_name :string,uom_category: string,decimal_places:string,description:string,token:string) => {
    const data = JSON.stringify({
        "uom_code" : uom_code,
        "uom_name" : uom_name,
        "uom_category" : uom_category,
        "decimal_places" : decimal_places,
        "description" : description,
        "active" : true
    })

    const config: AxiosRequestConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        url: URL + "/uom",
        headers: { 
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        data : data
    }

    try {
        const res = await axios(config)
        console.log(res.data)
        if (res) {
            return res.data;
        }else {
            return null
        }
    }catch(error){
        console.error(error)
        return null;
    }
}


const update_request = async (uom_id: number ,uom_code:string,uom_name :string,uom_category: string,decimal_places:string,description:string,token:string) => {
    const data = JSON.stringify({
        "uom_code" : uom_code,
        "uom_name" : uom_name,
        "uom_category" : uom_category,
        "decimal_places" : decimal_places,
        "description" : description,
        "active" : true
    })

    const config: AxiosRequestConfig = {
        method: 'put',
        maxBodyLength: Infinity,
        url: URL + "/uom"+"/"+uom_id,
        headers: { 
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        data : data
    }

    try {
        const res = await axios(config)
        console.log(res.data)
        if (res) {
            return res.data;
        }else {
            return null
        }
    }catch(error){
        console.error(error)
        return null;
    }
}

export {login_request, get_data , create_request, update_request}