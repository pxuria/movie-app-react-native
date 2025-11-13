// const url = '/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';

export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
};

export const fetchMovies = async ({ query }: { query: string }) => {
    const endpoint = query
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${TMDB_CONFIG.BASE_URL}/discover/movies?sort_by=popularity.desc`;
    const res = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers
    });

    if (!res.ok) {
        // @ts-ignore
        throw new Error('Failed to fetch movies', res.statusText);
    }

    const data = await res.json();

    return data.results;
};