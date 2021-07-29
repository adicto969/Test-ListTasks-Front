import axios from "axios";
import { authHeader } from "../utils/auth-header"
import { utils } from "../utils/contant";
import { handleResponse } from "../utils/handle-response";

export const taskservice = {
    get,
    getById,
    update,
    create
}

function get() {
    return axios.get(`${utils.api}tasks`, { 
        headers: authHeader()
    }).then(handleResponse);
}

function getById(id) {
    return axios.get(`${utils.api}tasks/${id}`, { 
        headers: authHeader()
    }).then(handleResponse);
}

function update(task) {
    return axios.put(`${utils.api}tasks/${task._id}`, task, { 
        headers: authHeader()
    }).then(handleResponse);
}

function create(task) {
    return axios.post(`${utils.api}tasks`, task, { 
        headers: authHeader()
    }).then(handleResponse);
}