async function displayMovieHome() {
    const APInow = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=1`;
    const listnowplaying = document.querySelector("#nowplaying");
    let dataNow = await getData(APInow);
    renderListMovie(dataNow, listnowplaying);

    const APIupComing = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=1`;
    const listupComing = document.querySelector("#upComing");
    let dataUpcoming = await getData(APIupComing);
    renderListMovie(dataUpcoming, listupComing);

    const APIrate = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=1`;
    const listrate = document.querySelector("#listWorld");
    let datarate = await getData(APIrate);
    renderListMovie(datarate, listrate);

    const listWorld = document.querySelector("#listRate");
    const APIWorld = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=1`;
    let dataWorld = await getData(APIWorld);
    renderListMovie(dataWorld, listWorld);
}

displayMovieHome();
