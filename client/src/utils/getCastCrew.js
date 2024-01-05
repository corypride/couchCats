import axios from 'axios'

const getCastCrew = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
    //const apiKey = process.env.REACT_APP_API_ACCESS_TOKEN; - is this the token or the key? if token, should we update variable name?
    const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDBmZDBjOGEzZWY0MjIyOGM2NjI5ODMzN2Y0MzVlZCIsInN1YiI6IjY1OTQzZDNjMDNiZjg0NDMxMzJiZDU2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vF0FZBaNt7rjxYHHFl0rWvr2YwJZU1ST5IaKvwNC4F4';

    
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

export default getCastCrew;