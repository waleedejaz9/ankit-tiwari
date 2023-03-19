import { customInterIceptors } from "../../../lib/AxiosProvider"

const API = customInterIceptors();

export const addOrg = (payload)=>{
    return API.post('/organization',payload)
}

export const getOrgs = ()=>{
    return API.get('/organization')
}

export const getOrg = (id)=>{
    return API.get(`/organization/${id}`)
}

export const updateOrg = (id,payload) =>{
    return API.put(`/organization/${id}`,payload)
}

export const addLocation = (id,payload) =>{
    return API.post(`/organization/${id}/location`,payload)
}

