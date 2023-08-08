let page = 1;
const btnShowmore = document.querySelector(".s__btnShow");
async function listPeople() {
    let promise = await fetch(` https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&page=${page}`);
    let data = await promise.json();
    console.log("data: ", data);
    const renderList = document.querySelector("#listPeople");
    data.results.forEach((item) => {
        console.log("data.results: ", data.results);
        renderList.innerHTML += `
        <a href="" class="s__item">
            <div class="s__thump">
                <img src="https://image.tmdb.org/t/p/w300${item.profile_path}" alt="" />
            </div>
        <h2>${item.name}</h2>
            <div class="s__rate">
                <i class="fa-solid fa-star"></i>
                <p>popularity :</p>
                <p>${item.popularity}</p>
            </div>
        </a>
        `;
    });
}
btnShowmore.addEventListener("click", () => {
    ++page;
    listPeople();
});
listPeople();
