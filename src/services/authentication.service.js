import { BehaviorSubject } from 'rxjs';
import { utils } from '../utils/contant';
import { decodeToken, isExpired } from 'react-jwt';
import axios from 'axios';

const currentUserSubject = new BehaviorSubject(decodeToken(localStorage.getItem('token')));
const loggedSubject = new BehaviorSubject(false);

export const authenticationService = {
    login,
    logout,
    loggedObservable: loggedSubject.asObservable(),
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value },
    get token() { return localStorage.getItem('token') },
    get logged () { return localStorage.getItem('token') != null && logged(); },
    refreshLogged
}

function login(email, password) {
    return axios.post(`${utils.api}users/login`, { email, password }).then(response => {
        localStorage.setItem('token', response.data.token);
        currentUserSubject.next(decodeToken(response.data.token));
        loggedSubject.next(true);
        return;
    });
}

function logout() {
    localStorage.removeItem('token');
    currentUserSubject.next(null);
    loggedSubject.next(false);
}

function logged() {
    var decode = decodeToken(localStorage.getItem('token'));
    var parsedate = decode.exp.toString().padEnd(13, '0');
    
    return new Date(parseInt(parsedate.padEnd(13, '0'), 10)) > new Date();
}

function refreshLogged() {
    loggedSubject.next(localStorage.getItem('token') != null && logged());
}