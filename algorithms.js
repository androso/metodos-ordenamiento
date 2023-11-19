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

    const subLeftArray = quickSort(leftArray);
    const subRightArray = quickSort(rightArray);

    return [
        ...subLeftArray,
        ...equalsArray,
        ...subRightArray
    ]
}

module.exports = { quickSortMovies };
