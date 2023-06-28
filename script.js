const movies = document.querySelector("#movies");
const btnAdd = document.querySelector("#btnAdd");
const addInput = document.querySelector("#addInput");

const getMovieList = () => {
    if(localStorage.getItem("movieList") !== null) {
        let a = JSON.parse(localStorage.getItem("movieList"));

        setter.movieList = [];

        for(let item of a) {
            setter.movieList.push(new Movies(item.name, item.condition));
        }

    }
}

window.addEventListener("load", () => {
    displayList(getFilter());
});

const addMovie = () => {
    if(addInput.value == "") {
        addInput.placeholder = "Please enter a valid movie...";
        return;
    }

    const name = addInput.value;
    setter.movieList.push(new Movies(name, "watchlist"));
    localStorage.setItem("movieList", JSON.stringify(setter.movieList));
    addInput.value = "";
    displayList(getFilter());
}

addInput.addEventListener("keypress", (e) => {
    if(e.key =="Enter") {
        btnAdd.click();
    }
});

const displayList = (filter) => {

    getMovieList();

    movies.innerHTML = "";

    for(let movie of setter.movieList) {
        if((filter == "all")) {

            if(movie.condition == "watchlist") {
                const li = `
                    <li class="movie">
                        <span>${setter.movieList.indexOf(movie) + 1} - ${movie.name}</span>
                        <div>
                            <div class="condition dropdown watchlist">Watchlist <i class="fa-solid fa-ellipsis"></i>
                                
                                <div class="dropdown-content">
                                    <div class="1" onclick="changeCondition(this)">None</div>
                                    <div class="2" onclick="changeCondition(this)">Watched</div>
                                    <div class="3" onclick="changeCondition(this)">Watch List</div>
                                </div>
                            </div>
                            <i class="fa-solid fa-xmark" onclick="deleteMovie(this)"></i>
                        
                        </div>
                    </li>
                `;
                movies.insertAdjacentHTML("beforeend", li);

            } else if(movie.condition == "watched") {
                const li = `
                <li class="movie">
                        <span>${setter.movieList.indexOf(movie) + 1} - ${movie.name}</span>
                        
                        <div>
                            <div class="condition dropdown watched">Watched <i class="fa-solid fa-ellipsis"></i>
                                <div class="dropdown-content">
                                    <div class="1" onclick="changeCondition(this)">None</div>
                                    <div class="2" onclick="changeCondition(this)">Watched</div>
                                    <div class="3" onclick="changeCondition(this)">Watch List</div>
                                </div>
                            </div>
                            <i class="fa-solid fa-xmark" onclick="deleteMovie(this)"></i>
                        </div>
                        
                    </li> 
                `;
                movies.insertAdjacentHTML("beforeend", li);

            } else {
                const li = `
                    <li class="movie">
                        <span>${setter.movieList.indexOf(movie) + 1} - ${movie.name}</span>

                        <div>
                            <div class="condition dropdown none"> <i class="fa-solid fa-ellipsis"></i>
                                <div class="dropdown-content">
                                    <div class="1" onclick="changeCondition(this)">None</div>
                                    <div class="2" onclick="changeCondition(this)">Watched</div>
                                    <div class="3" onclick="changeCondition(this)">Watch List</div>
                                </div>
                            </div>
                            <i class="fa-solid fa-xmark" onclick="deleteMovie(this)"></i>
                        </div>
                    </li>
                `;
                movies.insertAdjacentHTML("beforeend", li);
            }

        } else if(filter == "watched") {

            if(movie.condition == "watched") {
                
                const li = `
                <li class="movie">
                        <span>${setter.movieList.indexOf(movie) + 1} - ${movie.name}</span>

                        <div>
                            <div class="condition dropdown watched">Watched <i class="fa-solid fa-ellipsis"></i>
                                <div class="dropdown-content">
                                    <div class="1" onclick="changeCondition(this)">None</div>
                                    <div class="2" onclick="changeCondition(this)">Watched</div>
                                    <div class="3" onclick="changeCondition(this)">Watch List</div>
                                </div>
                            </div>
                            <i class="fa-solid fa-xmark" onclick="deleteMovie(this)"></i>
                        </div>

                    </li> 
                `;
                movies.insertAdjacentHTML("beforeend", li);
            }
        } else if(movie.condition == "watchlist") {
        
            const li = `
                <li class="movie">
                    <span>${setter.movieList.indexOf(movie) + 1} - ${movie.name}</span>

                    <div>
                        <div class="condition dropdown watchlist">Watchlist <i class="fa-solid fa-ellipsis"></i>
                            <div class="dropdown-content">
                                <div class="1" onclick="changeCondition(this)">None</div>
                                <div class="2" onclick="changeCondition(this)">Watched</div>
                                <div class="3" onclick="changeCondition(this)">Watch List</div>
                            </div>
                        </div>
                        <i class="fa-solid fa-xmark" onclick="deleteMovie(this)"></i>
                    </div>

                </li>
            `;
            movies.insertAdjacentHTML("beforeend", li);
            
        }
    }
}

const deleteMovie = (deletebutton) => {
    const index = deletebutton.parentElement.previousElementSibling.innerHTML.substring(0,1) - 1;

    setter.movieList.splice(index, 1);
    localStorage.setItem("movieList", JSON.stringify(setter.movieList));
    displayList(getFilter());
}

const changeCondition = (state) => {
    const conditions = ["none", "watched", "watchlist"];
    const newCondition = conditions[state.getAttribute("class") - 1];
    const index = (state.parentElement.parentElement.parentElement.previousElementSibling.innerHTML.substring(0,1) - 1);

    setter.movieList[index].condition = newCondition;

    localStorage.setItem("movieList", JSON.stringify(setter.movieList));
    displayList(getFilter());

}

const setFilter = (span) => {
    const activeFilter = document.querySelector(".filter.active");
    activeFilter.classList.remove("active");
    span.classList.add("active");

    displayList(getFilter());
}

const getFilter = () => {
    const activeFilter = document.querySelector(".filter.active");
    return activeFilter.getAttribute("id");
}
