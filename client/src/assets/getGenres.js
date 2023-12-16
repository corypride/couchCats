import axios from 'axios';


const getGenres = async () => {
    let genres = [];

    try {
        const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list?language=en', {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`
        });
        const data = await response.data; // Access data directly from response object
        genres = data;
    } catch (error) {
        console.error(error);
    }
    return genres;
}

export default getGenres;


