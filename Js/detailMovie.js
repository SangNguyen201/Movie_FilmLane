const url = new URL(window.location.href);
const urlId = url.searchParams.get("id");
const urlType = url.searchParams.get("type");
async function detailMovies() {
    let promise = await fetch(`https://api.themoviedb.org/3/${urlType}/${urlId}?api_key=${API_KEY}`);
    let data = await promise.json();
    const wrapper = document.querySelector(".s-wrapper");
    const background = document.querySelector("#s-detailMovie");
    background.style.backgroundImage = `linear-gradient(to top, rgba(17, 29, 29, 0.93), rgba(17, 29, 29, 0.93)),url("https://image.tmdb.org/t/p/w500${data.backdrop_path}")`;
    wrapper.innerHTML = `
    <div class="s__thump">
    <img src="https://image.tmdb.org/t/p/w300${data.poster_path}" alt="" />
    </div>
    <div class="s__inforFilm">
    <h3>${data.name ? data.name : data.title}</h3>
    <p class="s__date">Date :${data.first_air_date ? data.first_air_date : data.release_date}</p>
    <p class="s__moviegenre">Movie genre : </p>
    <p class="s__time">Time : <i class="fa-regular fa-clock"></i> <span>${data.number_of_episodes ? data.number_of_episodes + " esp" : data.runtime + "min"} </span></p>
    <div class="s__rate">
        <p class="s__round">${data.vote_average}%</p>
        <p>user score</p>
        <button style="display: ${urlType == "tv" ? "none" : ""}" onclick="openPopup()" class="btn_popup">
            <i class="fa-solid fa-play"></i>
            Play Trailer
        </button>
    </div>
    <p>Worlds collide.</p>
    <h3>Overview</h3>
    <p class="s__desc">
    ${data.overview}
    </p>
</div>
    `;
}
const popupVideo = document.querySelector(".s-popupVideo");
const trailerVideo = document.querySelector(".s__video");
async function openPopup() {
    popupVideo.classList.add("active");
    let promise = await fetch(`https://api.themoviedb.org/3/movie/${urlId}/videos?api_key=${API_KEY}`);
    let data = await promise.json();
    let trailer = data.results.find((item) => item.type == "Trailer");
    console.log("trailer: ", trailer);
    trailerVideo.innerHTML = `
            <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/${trailer.key}"
            title='Phim "The Flash" Trailer 2 | Dự Kiến Khởi Chiếu 15.06.2023'
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            ></iframe>;
            `;
}

const closeVideo = document.querySelector(".loseTrailer");

closeVideo.addEventListener("click", () => {
    popupVideo.classList.remove("active");
    trailerVideo.innerHTML = "";
});
popupVideo.addEventListener("click", () => {
    popupVideo.classList.remove("active");
    trailerVideo.innerHTML = "";
});
async function actorMovie() {
    let promise = await fetch(`https://api.themoviedb.org/3/${urlType}/${urlId}/credits?api_key=${API_KEY}`);
    let getData = await promise.json();
    console.log(getData);
    const actorMovie = document.querySelector("#actorMovie");
    getData.cast.forEach((item) => {
        actorMovie.innerHTML += `
            <a href="detailActor.html?actorId=${item.id}" class="s__item" >
                <div class="s__thump">
                    <img src="https://image.tmdb.org/t/p/w300${item.profile_path}" alt="" />
                </div>
            <h2>${item.name}</h2>
            <p>${item.character}</p>
            </a>
      `;
    });
}
async function reviewMovie() {
    let promise = await fetch(`https://api.themoviedb.org/3/${urlType}/${urlId}/reviews?api_key=${API_KEY}`);
    let data = await promise.json();
    let renderReview = document.querySelector(".s__wrapperReviewer");
    data.results.forEach((item) => {
        renderReview.innerHTML += `
        <div class="s__itemReviewer">
        <div class="s__thump"><img src="${item.author_details.avatar_path ? `https://image.tmdb.org/t/p/w300${item.author_details.avatar_path}` : `assets/avatar.jpg`}"  alt="" /></div>
        <div class="s__content">
            <p>${item.author}</p>
            <p>Written by mooney ${item.created_at}</p>
            <span class="spanRemove">
            ${item.content.substring(0, 10)}${item.content.length > 10 ? "..." : ""}
            </span>
            <span class="spanAdd" onclick="showMoreContent(event)">
                Show more...
            </span>
        </div>
    </div>
        `;
    });
}
function showMoreContent(event) {
    let parentReview = event.target.closest(".s__itemReviewer");
    let descRv = parentReview.querySelector(".spanRemove");
    descRv.classList.toggle("active");
}
detailMovies();
actorMovie();
reviewMovie();
