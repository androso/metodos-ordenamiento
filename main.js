import algos from "./algorithms.js";

const getDuration = (sortingFn, listado, valorBusqueda = null) => {
    if (valorBusqueda) {
        // algoritmo de busqueda
        const startTime = performance.now();
        const result = sortingFn(listado, valorBusqueda);
        const endTime = performance.now();

        return `${(endTime - startTime).toFixed(3)}ms`;
    }

    const startTime = performance.now();
    const result = sortingFn(listado);
    const endTime = performance.now();

    return `${(endTime - startTime).toFixed(3)}ms`;
}

const startBenchmark = async ({ searchingAlgorithm = false }) => {
    // Obtenemos listado de peliculas y lo limitamos a 6,000
    const allMoviesJson = await (await fetch("./listMovies.json")).json();
    const allMoviesTitles = allMoviesJson.slice(0, 6000);

    const lotes = []
    let resultados = {
        quickSortTime: [],
        mergeSortTime: [],
        heapSortTime: [],
        insertionSortTime: [],
        binarySearchTime: [],
        linearSearchTime: [],
    }

    // creamos lotes de 1000, 2000, 3000 hasta 6000
    for (let i = 1; i < 9; i++) {
        lotes.push(allMoviesTitles.slice(0, Number(`${i}000`)));
    }

    // Medimos el tiempo de ejecución de cada algoritmos sobre cada lote de peliculas
    lotes.forEach((lote, i) => {
        if (searchingAlgorithm === true) {
            const binarySearchTime = getDuration(algos.binarySearch, lote, "Pelicula no-existente");
            const linearSearchTime = getDuration(algos.linearSearch, lote, "Pelicula no-existente");
            resultados.binarySearchTime.push({ cantidad: lote.length, duracion: binarySearchTime });
            resultados.linearSearchTime.push({ cantidad: lote.length, duracion: linearSearchTime });

        } else {
            // QuickSort
            const quickSortTime = getDuration(algos.quickSortMovies, lote);

            // MergeSort
            const mergeSortTime = getDuration(algos.mergeSortMovies, lote);

            // heapSort
            const heapSortTime = getDuration(algos.heapSortMovies, lote);

            // insertionSort
            const insertionSortTime = getDuration(algos.insertionSortMovies, lote.slice())

            resultados.quickSortTime.push({ cantidad: lote.length, duracion: quickSortTime });
            resultados.mergeSortTime.push({ cantidad: lote.length, duracion: mergeSortTime });
            resultados.heapSortTime.push({ cantidad: lote.length, duracion: heapSortTime });
            resultados.insertionSortTime.push({ cantidad: lote.length, duracion: insertionSortTime });
        }

    })

    return resultados;
}

const $startSortBenchmarkBtn = document.getElementById("startSortBenchmark")
const $startSearchBenchmarkBtn = document.getElementById("startSearchBenchmark")

$startSortBenchmarkBtn.addEventListener("click", async () => {
    const data = await startBenchmark({ searchingAlgorithm: false });
    const $graph = document.getElementById('comparisonAlgorithmsGraph');

    // Formateando los datos obtenidos para graficarlos
    const quickSortFormattedData = {
        x: data.quickSortTime.map(item => item.cantidad),
        y: data.quickSortTime.map(item => parseFloat(item.duracion.replace('ms', ''))),
        name: "quicksort",
        type: 'scatter', // or 'line' depending on the desired plot type
    };

    const heapSorted = {
        x: data.heapSortTime.map(item => item.cantidad),
        y: data.heapSortTime.map(item => parseFloat(item.duracion.replace('ms', ''))),
        type: 'scatter', // or 'line' depending on the desired plot type     
        name: "heapsort"
    }

    const mergeSorted = {
        x: data.mergeSortTime.map(item => item.cantidad),
        y: data.mergeSortTime.map(item => parseFloat(item.duracion.replace('ms', ''))),
        type: 'scatter', // or 'line' depending on the desired plot type       
        name: "mergesort"
    }

    const insertionSorted = {
        x: data.insertionSortTime.map(item => item.cantidad),
        y: data.insertionSortTime.map(item => parseFloat(item.duracion.replace('ms', ''))),
        type: 'scatter', // or 'line' depending on the desired plot type              
        name: "insertionsort"
    }

    // labels para eje X, eje Y
    const layout = {
        height: 800,
        title: "Comparando Algoritmos de Ordenamiento",
        xaxis: {
            title: 'Datos (Numero de Datos usados para el ordenamiento)',
        },
        yaxis: {
            title: 'Tiempo en milisegundos',
        }
    };

    Plotly.newPlot($graph, [quickSortFormattedData, heapSorted, mergeSorted, insertionSorted], layout);
})

$startSearchBenchmarkBtn.addEventListener("click", async () => {
    console.log("hi");
    const data = await startBenchmark({ searchingAlgorithm: true });
    const $graph = document.getElementById('comparisonAlgorithmsGraph');

    const binarySearchData = {
        x: data.binarySearchTime.map(item => item.cantidad),
        y: data.binarySearchTime.map(item => parseFloat(item.duracion.replace('ms', ''))),
        type: "scatter",
        name: "binary search"
    }

    const linearSearchData = {
        x: data.linearSearchTime.map(item => item.cantidad),
        y: data.linearSearchTime.map(item => parseFloat(item.duracion.replace('ms', ''))),
        type: "scatter",
        name: "linear search"
    }

    // labels para eje X, eje Y
    const layout = {
        height: 800,
        title: "Comparando Algoritmos de Busqueda",
        xaxis: {
            title: 'Datos (Numero de Datos usados para el ordenamiento)',
        },
        yaxis: {
            title: 'Tiempo en milisegundos',
        }
    }

    Plotly.newPlot($graph, [binarySearchData, linearSearchData], layout);
})