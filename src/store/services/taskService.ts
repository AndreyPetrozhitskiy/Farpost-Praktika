// services/taskService.ts
import axios from 'axios';
import { API_BASE_URL } from '../../../config';


export const GetTask = async (token:string,reqData:{
    page: number,
    priority: string | null,
    sort: string | null,
    tags: string[] | null
}) => {
    const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
    };
    const data = {
        Data: reqData
    };
    const response = await axios.post(`${API_BASE_URL}/task/get-tasks`,data, config);
    return response.data;
}
export const NewTask = async (token: string,reqdata:string[]) => {
    const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
    };
    const data = {
        Data: reqdata
    };
    const response = await axios.post(`${API_BASE_URL}/task/get-tasks`,data, config);
    return response.data;
}