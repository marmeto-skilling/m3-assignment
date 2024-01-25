
document.addEventListener('DOMContentLoaded', function () {
    // Recommended Splide
    var recommendedSlide = new Splide('#recommended-splide', {
        perPage: 4,
        perMove: 1,
        pagination: false,
        fixedWidth: "25%",
        width: "95%",
        mediaQuery: 'max',
        breakpoints: {
            768: {
                perPage: 2,
            },
        }
    });
    recommendedSlide.mount();

    // Favorite Splide
    var favoriteSplide = new Splide('#favorite-splide', {
        perPage: 4,
        perMove: 1,
        pagination: false,
        fixedWidth: "25%",
        width: "95%",
        breakpoints: {
            768: {
                perPage: 2,
            },
        }
    });
    favoriteSplide.mount();
});


// const favoriteMoviesList=[]

let recommendedMoviesList=null
const recommendedMoviesSplider=document.querySelector(".recommended_movies")
const favoriteMovieSplide=document.querySelector(".favorite-movies")
const movieInput=document.querySelector(".search-movie")
const searchButton=document.querySelector(".search")
const searchMovieImage=document.querySelector(".seacrh-result__image")
const searchMovieName=document.querySelector(".search-result-name")
const searchMovieDescription=document.querySelector(".search-rsult-description")
const searchResultContainer=document.querySelector(".search-result-container")


async function getMoviesData(){

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YWQ5ZjJhMTdhMmI3M2VhNTQxOWI2NjEwN2I0OWZiNiIsInN1YiI6IjY1YjIxZjY2YTgwMjM2MDE4NmFlY2I3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pj7UWAlNN-id5avb8IMZbCajKrXSSD4wXLL-s_bUKaA'
        }
      };
      
    const response= await  fetch('https://api.themoviedb.org/4/account/65b21f66a802360186aecb7b/movie/recommendations?page=1&language=en-US', options)
    const moviesData=await response.json()
    recommendedMoviesList=moviesData.results
    localStorage.setItem("moviesData",JSON.stringify(recommendedMoviesList))

}

getMoviesData()

const moviesListString=localStorage.getItem("moviesData")
const moviesList=JSON.parse(moviesListString)

    moviesList.forEach((each) => {
        const slide = document.createElement("li");
        slide.classList.add("splide__slide");
        
        slide.innerHTML = `
        <div class="movie-card">
    <img class="movie-card__image" src="https://image.tmdb.org/t/p/w500/${each.poster_path}" alt="${each.original_title}" />
    <button class="favorite-icon-container" onclick="addToFavorite(${each.id})">
    <svg class="favorite-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.17157 5.48284C4.73367 3.96185 7.26633 3.96185 8.82842 5.48284L9.99999 6.62359L11.1716 5.48284C12.7337 3.96185 15.2663 3.96185 16.8284 5.48284C18.3905 7.00383 18.3905 9.46984 16.8284 10.9908L9.99999 17.6396L3.17157 10.9908C1.60948 9.46984 1.60948 7.00383 3.17157 5.48284Z" fill="#D1D5DB"/>
</svg>
</button>
    <div class="movie-card__info">
        <p class="movie-card__title">${each.original_title}</p>
    </div>
</div>`;

        recommendedMoviesSplider.appendChild(slide);
    });


    
    
    const favoriteMoviesList = JSON.parse(localStorage.getItem("favorite-movies")) || [];

    function renderFavoriteMovies() {
        // Clear the content
        const favoriteMovieSplide = document.querySelector(".favorite-movies");
        favoriteMovieSplide.innerHTML = "";
    
        // Render favorite movies
        favoriteMoviesList.forEach((each) => {
            const slide = document.createElement("li");
            slide.classList.add("splide__slide");

            slide.innerHTML = `
                <div class="movie-card">
                    <img class="movie-card__image" src="https://image.tmdb.org/t/p/w500/${each.poster_path}" alt="${each.original_title}" />
                    <button class="favorite-icon-container">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.17157 5.48284C4.73367 3.96185 7.26633 3.96185 8.82842 5.48284L9.99999 6.62359L11.1716 5.48284C12.7337 3.96185 15.2663 3.96185 16.8284 5.48284C18.3905 7.00383 18.3905 9.46984 16.8284 10.9908L9.99999 17.6396L3.17157 10.9908C1.60948 9.46984 1.60948 7.00383 3.17157 5.48284Z" fill="#FF0000"/>
                        </svg>
                    </button>
                    <div class="movie-card__info">
                        <p class="movie-card__title">${each.original_title}</p>
                    </div>
                </div>`;

            favoriteMovieSplide.appendChild(slide);
        });

        var favoriteSplide = new Splide('#favorite-splide', {
                   perPage: 4,
                   perMove: 1,
                    pagination: false,
                    fixedWidth: "25%",
                    width: "95%"
                });
                favoriteSplide.mount();
    }

    function addToFavorite(id) {
        const favoriteMovie = moviesList.find((each) => each.id === id);
        favoriteMoviesList.push(favoriteMovie);
        localStorage.setItem("favorite-movies", JSON.stringify(favoriteMoviesList));
        renderFavoriteMovies();
    }

    renderFavoriteMovies();

searchButton.addEventListener("click",async(e)=>{
    e.preventDefault()
    const url=`https://api.themoviedb.org/3/search/movie?query=${movieInput.value}`
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YWQ5ZjJhMTdhMmI3M2VhNTQxOWI2NjEwN2I0OWZiNiIsInN1YiI6IjY1YjIxZjY2YTgwMjM2MDE4NmFlY2I3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pj7UWAlNN-id5avb8IMZbCajKrXSSD4wXLL-s_bUKaA'
        }
      };
      console.log("clicked")
      
      const response=await fetch(url,options)
      const jsonObject=await response.json()
      console.log(jsonObject)
      if(jsonObject.results.length===0){
        searchResultContainer.innerHTML=""
        searchResultContainer.innerHTML=`
        <h1 class="search-result-name">
        Movie your looking for is not precent in our database. Sorry!
        <h1/>
        `
      }else{
        searchResultContainer.innerHTML=`
        <div class="seacrh-result__image-container">
                    <img class="seacrh-result__image" src="https://image.tmdb.org/t/p/w500/${jsonObject.results[0].poster_path}" alt="search-result">
                </div>
                <div class="seacrh-result__content-container">
                    <h3 class="search-result-name">${jsonObject.results[0].original_title}</h3>
                    <p class="search-rsult-description">Release Date: ${jsonObject.results[0].release_date}
                    ${jsonObject.results[0].overview}
                    </p>
                </div>`
      }
})

