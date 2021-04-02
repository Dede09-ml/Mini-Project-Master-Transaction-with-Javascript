const axios = require('axios')


const getAddress = async () => {
    const result = (await axios.get("https://mul14.github.io/data/employees.json")).data
    const add = result.map(e => {
        var satu = e.addresses
        // return satu
        for(let i=0; i<satu.length; i++){
            if(satu[i].city == 'DKI Jakarta'){
            console.log(satu[i])
            }
        }

    })
    // console.log(add)

    
}

getAddress()