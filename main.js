// require('dotenv').config();

// const API_KEY = process.env.API_KEY;
// const algos = require('./algorithms');

// const getDuration = (sortingFn, listado) => {
//     const startTime = performance.now();
//     const result = sortingFn(listado);
//     const endTime = performance.now();

//     return `${(endTime - startTime).toFixed(3)}ms`;
// }

const startBenchmark = async () => {
    console.log("hey")
    let primerLote = []; // 100 peliculas
    let segundoLote = []; // 500 peliculas
    let tercerLote = []; // 1000 peliculas
    let cuartoLote = []; // 1500 peliculas

    const allMoviesJson = await (await fetch("./listMovies.json")).json();
    console.log({ allMoviesJson });
    return;
    primerLote = allMoviesTitles.slice(0, 20);
    segundoLote = allMoviesTitles.slice(0, 60);
    tercerLote = allMoviesTitles.slice(0, 100);
    cuartoLote = allMoviesTitles.slice(0, 200);

    // Procedemos a utilizar metodos de ordenamiento 
    const lotes = [primerLote, segundoLote, tercerLote, cuartoLote]
    let resultados = {
        quickSortTime: [],
        mergeSortTime: [],
        heapSortTime: [],
        insertionSortTime: [],
    }

    lotes.forEach((lote, i) => {
        // QuickSort
        const quickSortTime = getDuration(algos.quickSortMovies, lote);

        // MergeSort
        const mergeSortTime = getDuration(algos.mergeSortMovies, lote);

        // heapSort
        const heapSortTime = getDuration(algos.heapSortMovies, lote);

        // insertionSort
        const insertionSortTime = getDuration(algos.insertionSortMovies, lote)

        resultados.quickSortTime.push({ cantidad: lote.length, duracion: quickSortTime });
        resultados.mergeSortTime.push({ cantidad: lote.length, duracion: mergeSortTime });
        resultados.heapSortTime.push({ cantidad: lote.length, duracion: heapSortTime });
        resultados.insertionSortTime.push({ cantidad: lote.length, duracion: insertionSortTime });
    })

    console.log(resultados);
}

document.getElementById('startBenchmark').addEventListener("click", () => {
    console.log("?")
    // const data = await startBenchmark();
    // console.log({ data });
})

