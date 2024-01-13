import axios from 'axios'

const getReleaseDate = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}/`;
    const apiKey = process.env.REACT_APP_API_ACCESS_TOKEN;
    
    try {
        const response = await axios.get(url, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiKey}`,
        },
        });
        const data = await response.data;
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export default getReleaseDate;