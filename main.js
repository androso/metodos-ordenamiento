// TODO: Quick sort
// TODO: Merge sort
// TODO: Heap sort
// TODO: Insertion sort
// TODO: Binary search
// TODO: Linear search

require('dotenv').config();

const API_KEY = process.env.API_KEY;
const algos = require('./algorithms');

(async () => {
    let primerLote = []; // 20 peliculas
    let segundoLote = []; // 60 peliculas
    let tercerLote = []; // 100 peliculas
    let cuartoLote = []; // 200 peliculas
    const allMoviesTitles = [];
    const urls = [
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${API_KEY}`,
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=2&api_key=${API_KEY}`,
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=3&api_key=${API_KEY}`,
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=4&api_key=${API_KEY}`,
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=5&api_key=${API_KEY}`,
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=6&api_key=${API_KEY}`,
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=7&api_key=${API_KEY}`,
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=8&api_key=${API_KEY}`,
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=9&api_key=${API_KEY}`,
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=10&api_key=${API_KEY}`
    ];


    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        const response = await fetch(url);
        const data = await response.json();
        allMoviesTitles.push(...data.results.map((pelicula) => pelicula.title));
    }

    primerLote = allMoviesTitles.slice(0, 20);
    segundoLote = allMoviesTitles.slice(0, 60);
    tercerLote = allMoviesTitles.slice(0, 100);
    cuartoLote = allMoviesTitles.slice(0, 200);

    // Procedemos a utilizar metodos de ordenamiento 
    
})();