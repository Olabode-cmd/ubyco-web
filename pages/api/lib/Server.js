import axios from 'axios';
import { getSession } from 'next-auth/client';
const Server = axios.create({
    baseURL: "http://42163adee1bf.ngrok.io" 
})

Server.interceptors.request.use(async (config, req) => {

    const session = "MTky.u_Z9XHIm4Nj-cycmiHZK1gsp_jojLEJyjHJbwT-0q0a2wbVyLx2reOnaMjcO";
    const trial = await getSession()
    console.log(trial)
    if(session){
        config.headers.Authorization = `Bearer ${session}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config
})

 

export default Server;