const url = new URL(window.location.href);
const actorId = url.searchParams.get("actorId");
const inforActor = document.querySelector(".s__left");
const detail = document.querySelector(".s__filmActor");
const filmActor = document.querySelector(".s__filmActor");
const wrapper = document.querySelector(".s__wrapper");
async function renderActor() {
    let apiActor = await fetch(`https://api.themoviedb.org/3/person/${actorId}?api_key=${API_KEY}`);
    let dataActor = await apiActor.json();
    inforActor.innerHTML = `
    <div class="s__thumb">
    <img src="https://image.tmdb.org/t/p/w300${dataActor.profile_path}" alt="" />
    <div class="s__shadow">
        <div class="s__item">
            <p>Known For :</p>
            <span>-${dataActor.known_for_department}</span>
        </div>
        <div class="s__item">
            <p>Popularity :</p>
            <span>-${dataActor.popularity}</span>
        </div>
        <div class="s__item">
            <p>Gender :</p>
            <span>-${dataActor.gender}</span>
        </div>
        <div class="s__item">
            <p>BirhthDay :</p>
            <span>-${dataActor.birthday}</span>
        </div>
        <div class="s__item">
            <p>Place of Birth :</p>
            <span>-${dataActor.place_of_birth}</span>
        </div>
        <div class="s__item">
            <p>Also Know As :</p>
            <span>-${dataActor.also_known_as}</span>
        </div>
    </div>
</div>
    `;
}
async function renderFilm() {
    let apiFilm = await fetch(`https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${API_KEY}`);
    let dataFilm = await apiFilm.json();
    dataFilm.cast.forEach((item) => {
        detail.innerHTML = `
        <h3 class="title">${item.title}</h3>
        <p class="sub">Biography : ${item.overview}</p>
        <span class="content">Known For :</span>
        `;
    });
    dataFilm.cast.forEach((item) => {
        wrapper.innerHTML += `
        <div class="s__card">
        <div class="s__list">
            <a href="detailMovie.html?id=${item.id}&type=movie">
                <img src="https://image.tmdb.org/t/p/w300${item.poster_path}" alt="" />
                <h3>${item.title}</h3>
                <p>${item.release_date}</p>
            </a>
        </div>
    </div>
        `;
    });
}
renderFilm();
renderActor();
