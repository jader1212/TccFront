import axios from 'axios';

// import { isAuthenticated } from './auth';

const BASE_URL = "http://localhost:8080";
const API_BASE_URL = BASE_URL + "/contas";

// const token = localStorage.getItem('token');

// const HEADERS = {
//     headers: {
//          // Authorization: token ? `Bearer ${token}` : '',
//     }
// }

class ContaService {

    /*    auth   */
    authLogin(params) {
        return axios.post(BASE_URL + '/authenticate', params);
    }

    authRegister(params) {
        return axios.post(BASE_URL + '/register', params);
    }

    /*   events   */

    // list all
    getContas(){
        return axios.get(API_BASE_URL);
    }

    // create
    createConta(params){
        return axios.post(API_BASE_URL + '-add', params);
    }

    // list by id
    getContaById(contaId){
        return axios.get(API_BASE_URL + '-get/' + contaId);
    }

    // update
    updateConta(params, contaId){
        return axios.put(API_BASE_URL + '-upd/' + contaId, params);
    }

    // delete
    deleteConta(contaId){
        return axios.delete(API_BASE_URL + '-del/' + contaId);
    }

    // get by type
    getContaByType(contaType){
        return axios.get(API_BASE_URL + '-tipo/' + contaType);
    }

    // sum total
    getContaTotal() {
        return axios.get(API_BASE_URL + '-soma');
    }
}

export default new ContaService();