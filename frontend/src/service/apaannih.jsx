const axios = require('axios')

const posts = async () => {
    try {
        const result = await axios.get("https://jsonplaceholder.typicode.com/posts");
        console.log(result.data);

        // result.map(item =>{
        //     if(item.userId==1){
        //         console.log(item)
        //     }
        // })

    } catch (error) {
        console.log({ error });
    }
};


posts()