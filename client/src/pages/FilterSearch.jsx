import useFetch from "../hooks/useFetch";

const FilterSearch = () => {

    // Use fetch is calling 6 times
    const genreRequest = useFetch('https://api.themoviedb.org/3/genre/movie/list?language=en', process.env.REACT_APP_API_ACCESS_TOKEN);
    const genres = genreRequest.data?.genres;

    const subscriptionRequest = useFetch('https://api.themoviedb.org/3/streaming_services', process.env.REACT_APP_API_ACCESS_TOKEN);
   // const subscriptions = subscriptionRequest.data?.request;
    console.log(subscriptionRequest)

    return (
        <div>
          <form >
            <h1>Genre</h1>
            {genres ? genres.map((genre) => (
              <button>{genre.name}</button>
            )) : (
              "Loading"
            )}
          </form>
        </div>
      );
}

export default FilterSearch;