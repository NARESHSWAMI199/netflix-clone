import axios from 'axios';



// create() will create a object of axios and you can use this after'
const instance = axios.create({
    baseURL : 'https://api.themoviedb.org/3',
});

// simply you can use like this
// instance.get('/foo/bar/')
// then like will be
// https//api.themoviedb.org/3//foo/bar/

export default instance;