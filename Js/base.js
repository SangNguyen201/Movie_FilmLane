const API_KEY = "e9e9d8da18ae29fc430845952232787c";

//sroll header change color
const scrollSticky = document.querySelector("header");
window.addEventListener("scroll", () => {
    let sticky = scrollSticky.offsetTop;
    if (window.pageYOffset > sticky) {
        scrollSticky.classList.add("active");
    } else {
        scrollSticky.classList.remove("active");
    }
});

function renderHeader() {
    const header = document.querySelector("#header");
    header.innerHTML = `<div class="container">
    <section class="s-nav">
        <div class="s__logo">
            <a href="index.html" class="s__img">
                <img src="assets/logo.svg" alt="" />
            </a>
        </div>
        <div class="s__listmenu">
            <ul>
                <li><a href="index.html">HOME</a></li>
                <li><a href="moviePage.html?type=movie">MOVIES</a></li>
                <li><a href="moviePage.html?type=tv">TV SHOWS</a></li>
                <li><a href="people.html">PEOPLE</a></li>
                <li>
                    <a href="">GENRE</a>
                    <div class="s__submenu">
                        <ul>
                            
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
        <div class="s__search">
            <div class="s__inputSearch">
                <input class="findMovie" type="text" placeholder="Search for a movie" />
            </div>
            <div class="s__icon"><i class="fa-solid fa-magnifying-glass"></i></div>
            <div class="hiddenMenu">
            <i class="fa-solid fa-bars"></i>
        </div>
        </div>
        
    </section>
</div>`;
}
renderHeader();
//open hidden menu
const hiddenMenu = document.querySelector(".hiddenMenu");
const sListMenu = document.querySelector(".s__listmenu");
hiddenMenu.addEventListener("click", () => {
    sListMenu.classList.toggle("active");
});
async function getData(apiLink) {
    let promise = await fetch(apiLink);
    let data = await promise.json();
    return data;
}
function renderListMovie(dataWhat, selectorList) {
    dataWhat.results.forEach((item) => {
        selectorList.innerHTML += `<a href='detailMovie.html?id=${item.id}&type=${item.title ? "movie" : "tv"}' class="s__item">
            <div class="s__thump">
                <img src="https://image.tmdb.org/t/p/w300${item.poster_path}" alt="" />
            </div>
            <h2>${item.title ? item.title : item.name}</h2>
            <div class="s__date">
                <p>${item.release_date ? item.release_date : item.first_air_date}</p>
                <div class="s__rate">
                    <i class="fa-solid fa-star"></i>
                    <p>${item.vote_average}</p>
                </div>
            </div>
        </a>`;
    });
}

//sub Menu
const subMenu = document.querySelector(".s__submenu ul");

async function rendersubMenu() {
    let apiListMenu = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
    let data = await apiListMenu.json();
    data.genres.forEach((item) => {
        subMenu.innerHTML += `
        <li><a href="moviePage.html?idgenres=${item.id}&title=${item.name}">${item.name}</a></li>                   
        `;
    });
}
rendersubMenu();
//search
const inputSearch = document.querySelector(".s__inputSearch input");

inputSearch.addEventListener("keydown", (e) => {
    if (e.keyCode == 13) {
        window.location.href = `moviePage.html?queryString=${inputSearch.value}`;
    }
});
