const linearSearch = (arr, value) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === value) return true;
    }
    return false;
}

const binarySearch = (arr, value) => {
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
        let middleIndex = Math.floor((start + end) / 2);
        const comparison = arr[middleIndex].localeCompare(value);

        if (comparison === 0) {
            return true;
        }

        if (comparison > 0) {
            end = middleIndex - 1;
        } else {
            start = middleIndex + 1;
        }
    }

    return false;
}


function insertionSortMovies(arr) {

    for (let i = 1; i < arr.length; i++) {
        let currentElement = arr[i];
        let j = i - 1;

        // Compare currentElement with the elements before it
        while (j >= 0 && arr[j].localeCompare(currentElement) > 0) {
            arr[j + 1] = arr[j];
            j--;
        }

        // Place currentElement at its correct position
        arr[j + 1] = currentElement;
    }
    return arr
}

const heapSortMovies = (list) => {
    let array = list.slice();
    buildMaxHeap(array);
    for (let i = array.length - 1; i >= 0; i--) {
        [array[0], array[i]] = [array[i], array[0]];
        heapify(array, i, 0);
    }
    return array;
}

const buildMaxHeap = (array) => {
    const size = array.length;
    for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
        heapify(array, size, i);
    }
}

const heapify = (array, n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && array[left].localeCompare(array[largest]) > 0) {
        largest = left;
    }
    if (right < n && array[right].localeCompare(array[largest]) > 0) {
        largest = right;
    }

    if (largest !== i) {
        [array[i], array[largest]] = [array[largest], array[i]];
        heapify(array, n, largest);
    }
}


const mergeSortMovies = (moviesList) => {
    if (moviesList.length <= 1) {
        return moviesList
    }

    const medio = Math.floor(moviesList.length / 2);
    const mitadIzquierda = moviesList.slice(0, medio);
    const mitadDerecha = moviesList.slice(medio);

    const subArregloIzquierda = mergeSortMovies(mitadIzquierda);
    const subArregloDerecha = mergeSortMovies(mitadDerecha);

    return merge(subArregloIzquierda, subArregloDerecha)
}

const merge = (list1, list2) => {
    let resultado = []
    let i = 0;
    let j = 0;

    while (i < list1.length && j < list2.length) {
        if (list1[i].localeCompare(list2[j]) < 0) {
            resultado.push(list1[i]);
            i++;
        } else {
            resultado.push(list2[j]);
            j++;
        }
    }
    return resultado.concat(list1.slice(i), list2.slice(j));
}

const quickSortMovies = (moviesList) => {
    if (moviesList.length <= 1) return moviesList;

    let pivot = moviesList[moviesList.length - 1];
    let leftArray = [];
    let rightArray = [];
    let equalsArray = [];

    for (const movie of moviesList) {
        const result = movie.localeCompare(pivot);
        if (result < 0) {
            leftArray.push(movie);
        } else if (result > 0) {
            rightArray.push(movie);
        } else {
            equalsArray.push(movie);
        }
    }

    const subLeftArray = quickSortMovies(leftArray);
    const subRightArray = quickSortMovies(rightArray);

    return [
        ...subLeftArray,
        ...equalsArray,
        ...subRightArray
    ]
}

function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j].localeCompare(arr[j + 1]) >= 0) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

const module = { quickSortMovies, bubbleSort, mergeSortMovies, heapSortMovies, insertionSortMovies, binarySearch, linearSearch };
export default module;
