import algos from "./algorithms.js";

const getDuration = (sortingFn, listado) => {
    const startTime = performance.now();
    const result = sortingFn(listado);
    const endTime = performance.now();

    return `${(endTime - startTime).toFixed(3)}ms`;
}

const startBenchmark = async () => {
    // Obtenemos listado de peliculas y lo limitamos a 6,000
    const allMoviesJson = await (await fetch("./listMovies.json")).json();
    const allMoviesTitles = allMoviesJson.slice(0, 6000);

    const lotes = []
    let resultados = {
        quickSortTime: [],
        mergeSortTime: [],
        heapSortTime: [],
        insertionSortTime: [],
    }
    // creamos lotes de 1000, 2000, 3000 hasta 6000
    for (let i = 1; i < 9; i++) {
        lotes.push(allMoviesTitles.slice(0, Number(`${i}000`)));
    }

    // Medimos el tiempo de ejecución de cada algoritmos sobre cada lote de peliculas
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

    return resultados;
}

const $startBenchmarkBtn = document.getElementById('startBenchmark')

$startBenchmarkBtn.addEventListener("click", async () => {
    const data = await startBenchmark();
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

