import { utils } from '../utils/contant';
import axios from 'axios';

export const usersService = {
    register
}

function register(name, email, password) {
    return axios.post(`${utils.api}users`, { name, email, password });
}