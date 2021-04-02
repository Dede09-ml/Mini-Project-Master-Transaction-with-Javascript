import axios from 'axios'
import {config} from '../config/config'


const pasienService = {

    getBlood:() => {
        //http://localhost:8181/api/category
        const result = axios.get(config.apiURL + '/blood')
            .then(respon => {
                return{
                    success : respon.data.success,
                    result : respon.data.result
                }
            })
            .catch(error=>{
                return{
                    success : false,
                    error : error
                }
            })
        return result
    },

    getRelation:() => {
        //http://localhost:8181/api/category
        const result = axios.get(config.apiURL + '/getrelation')
            .then(respon => {
                return{
                    success : respon.data.success,
                    result : respon.data.result
                }
            })
            .catch(error=>{
                return{
                    success : false,
                    error : error
                }
            })
        return result
    },

    add1:(name) => {
        //http://localhost:8181/api/category
        const result = axios.post(config.apiURL + '/add1',name)
            .then(respon => {
                return{
                    success : respon.data.success,
                    result : respon.data.result
                }
            })
            .catch(error=>{
                return{
                    success : false,
                    error : error
                }
            })
        return result
    },

    add2:(data) => {
        //http://localhost:8181/api/category
        const result = axios.post(config.apiURL + '/add2',data)
            .then(respon => {
                return{
                    success : respon.data.success,
                    result : respon.data.result
                }
            })
            .catch(error=>{
                return{
                    success : false,
                    error : error
                }
            })
        return result
    },
 
    add3:(data) => {
        //http://localhost:8181/api/category
        const result = axios.post(config.apiURL + '/add3',data)
            .then(respon => {
                return{
                    success : respon.data.success,
                    result : respon.data.result
                }
            })
            .catch(error=>{
                return{
                    success : false,
                    error : error
                }
            })
        return result
    },

    getPasien:(filter) => {
        //http://localhost:8181/api/category
        const result = axios.post(config.apiURL + '/pasien', filter)
            .then(respon => {
                return{
                    success : respon.data.success,
                    result : respon.data.result
                }
            })
            .catch(error=>{
                return{
                    success : false,
                    error : error
                }
            })
        return result
    },

    countPasien:(data) => {
        //http://localhost:8181/api/category
        const result = axios.post(config.apiURL + '/countpasien',data)
            .then(respon => {
                return{
                    success : respon.data.success,
                    result : respon.data.result
                }
            })
            .catch(error=>{
                return{
                    success : false,
                    error : error
                }
            })
        return result
    },

    delete1 : (data) => {
        const result = axios.put(config.apiURL + '/delete1/' + data.id , data)
        .then(respon => {
            return{
                success : respon.data.success,
                result : respon.data.result
            }
        })
        .catch(error=>{
            return{
                success : false,
                result : error
            }
        })
        return result
    },

    multidelete1 : (data) => {
        const result = axios.put(config.apiURL + '/multidelete1/' + data)
        .then(respon => {
            return{
                success : respon.data.success,
                result : respon.data.result
            }
        })
        .catch(error=>{
            return{
                success : false,
                result : error
            }
        })
        return result
    },

    delete2 : (data) => {
        const result = axios.put(config.apiURL + '/delete2/' + data.id, data)
        .then(respon => {
            return{
                success : respon.data.success,
                result : respon.data.result
            }
        })
        .catch(error=>{
            return{
                success : false,
                result : error
            }
        })
        return result
    },

    multidelete2 : (data) => {
        const result = axios.put(config.apiURL + '/multidelete2/' + data)
        .then(respon => {
            return{
                success : respon.data.success,
                result : respon.data.result
            }
        })
        .catch(error=>{
            return{
                success : false,
                result : error
            }
        })
        return result
    },

    delete3 : (data) => {
        const result = axios.put(config.apiURL + '/delete3/' + data.id , data)
        .then(respon => {
            return{
                success : respon.data.success,
                result : respon.data.result
            }
        })
        .catch(error=>{
            return{
                success : false,
                result : error
            }
        })
        return result
    },

    multidelete3 : (data) => {
        const result = axios.put(config.apiURL + '/multidelete3/' + data)
        .then(respon => {
            return{
                success : respon.data.success,
                result : respon.data.result
            }
        })
        .catch(error=>{
            return{
                success : false,
                result : error
            }
        })
        return result
    },

    getById: (id) => {
        console.log(id)

        const result = axios.get(config.apiURL + '/getpasienid/' + id)
        .then(respon => {
            return{
                success : respon.data.success,
                result : respon.data.result
            }
        })
        .catch(error=>{
            return{
                success : false,
                result : error
            }
        })
        console.log(result)
        return result
    },

    edit1 : (data) => {
        const result = axios.put(config.apiURL + '/update1/' + data.id, data)
        .then(respon => {
            return{
                success : respon.data.success,
                result : respon.data.result
            }
        })
        .catch(error=>{
            return{
                success : false,
                result : error
            }
        })
        return result
    },

    edit2 : (data) => {
        const result = axios.put(config.apiURL + '/update2/' + data.id, data)
        .then(respon => {
            return{
                success : respon.data.success,
                result : respon.data.result
            }
        })
        .catch(error=>{
            return{
                success : false,
                result : error
            }
        })
        return result
    },

    edit3 : (data) => {
        const result = axios.put(config.apiURL + '/update3/' + data.id, data)
        .then(respon => {
            return{
                success : respon.data.success,
                result : respon.data.result
            }
        })
        .catch(error=>{
            return{
                success : false,
                result : error
            }
        })
        return result
    },

    getSelf:(data) => {
        //http://localhost:8181/api/category
        const result = axios.post(config.apiURL + '/self',data)
            .then(respon => {
                return{
                    success : respon.data.success,
                    result : respon.data.result
                }
            })
            .catch(error=>{
                return{
                    success : false,
                    error : error
                }
            })
        return result
    },

}

export default pasienService