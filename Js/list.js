const showBtn = document.querySelector(".showMore");
let page = 1;
const flexTittle = document.querySelector("#flexTittle h3");
const url = new URL(window.location.href);
const urlType = url.searchParams.get("type");
const urlGenres = url.searchParams.get("idgenres");
const genrestitle = url.searchParams.get("title");
const querySearch = url.searchParams.get("queryString");
async function displayList() {
    let apiListMovie;
    if (urlGenres) {
        apiListMovie = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${urlGenres}&page=${page}`;
    } else if (querySearch) {
        apiListMovie = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${querySearch}`;
    } else {
        apiListMovie = `https://api.themoviedb.org/3/discover/${urlType}?api_key=${API_KEY}&page=${page}`;
    }

    const listMovie = document.querySelector("#listMovie");
    let data = await getData(apiListMovie);
    renderListMovie(data, listMovie);
}
if (genrestitle) {
    flexTittle.innerHTML = genrestitle;
} else if (querySearch) {
    flexTittle.innerHTML = querySearch;
} else {
    if (urlType == "movie") {
        flexTittle.innerHTML = "Movie";
    } else {
        flexTittle.innerHTML = "TV";
    }
}
showBtn.addEventListener("click", () => {
    ++page;
    displayList();
});
displayList();
