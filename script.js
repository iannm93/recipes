// API key and query selectors to target later
const API_KEY = "9236658842912fdafd6330610c3dcb5c";
// use this key to use certain features of API
const API2 = "04c35731a5ee918f014970082a0088b1";
const formValue = document.getElementById("form");
const plot = document.getElementById("overview");
const emptyDiv = document.getElementById("empty-div");



// const URL_API = "https://api.themoviedb.org/3/search/movie?api_key="+ API_KEY + "&language=en-US&page=1&include_adult=false&query=split"
let searchMovie = document.querySelector("#search-movie");
// waiting for a click on the search movie button
searchMovie.addEventListener("click", movieButton);

// search function
function movieButton(event) {
  // prevent default stops the browser from automatically resetting the value of the form every time it is interacted with
  event.preventDefault();
  
  // assign the value of the text input to variable
  let userInput = formValue.value;
  if (userInput === ""){
    confirm("Please enter a movie or TV show in order to search.")
    
  } else
  emptyDiv.innerHTML = "";
  // pass whatever value was in the search bar to API function
  movieSearch(userInput);
}

// function to return  popular movies to append to the dom on load of the site
$(document).ready(function(){

  let random = Math.floor(Math.random() * 999);
  
  const URL_FOR_POPULAR =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=" +
  API2 +
  "&page=1" 
  let settings = {
    async: true,
    crossDomain: true,
    url: URL_FOR_POPULAR,
    method: "GET",
  };

  $.ajax(settings).then((response) => {
   
    // i < response.results.length VVVVVV
    for (let i = 0; i < 18; i++) {
      
      // create div element for top 20 movies and add class name
      const top20 = document.createElement("div");
      top20.className = "top20";
      // top20.style.display = "inline-block"
      // assign the innerHTML to put each film inside it's own container
      // populates with data from API
      top20.innerHTML = `
        <div class="film">
        <img src="${"https://www.themoviedb.org/t/p/original" + response.results[i].poster_path}" alt="poster-image">
        <div class="film-info">
            <h4 class ="movie-title">${response.results[i].title}</h4>
            
            <img class="like-button"src="https://cdn2.iconfinder.com/data/icons/media-player-ui/512/Media-Icon-25-512.png">
            <span class ="votes">${response.results[i].vote_average} </span>
            
            </div>
            </div>`;
            emptyDiv.append(top20);
    }

  })
    
    // for each method below
    // response.results.forEach(film=>{
    //     console.log(film)
    //     // create element for top 20 posters
    //     const postIMG = document.createElement("img")
    //     // make the SRC of the image element just created url to film's poster
    //     postIMG.src = "https://www.themoviedb.org/t/p/original" + film.poster_path
    //     // give it an ID, height, width
    //     postIMG.id = "top20"
    //     postIMG.height = 400;
    //     postIMG.width = 300;
    //     // const voteAverage = document.createElement("p")
    //     // console.log(film.vote_average)
    //     // voteAverage.innerHTML = film.vote_average

    //     emptyDiv.append(postIMG)
    //     // emptyDiv.append(voteAverage)

    //     console.log(postIMG)
    // })

    // loop through response array
  });

// function popularMoviestwo() {
//   let random = Math.floor(Math.random() * 999);

//   const URL_FOR_POPULAR =
//   "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=" +
//   API2 +
//   "&page=2" 
//   let settings = {
//     async: true,
//     crossDomain: true,
//     url: URL_FOR_POPULAR,
//     method: "GET",
//   };

//   $.ajax(settings).then((response) => {
//     console.log(response);
//     // i < response.results.length VVVVVV
//     for (let i = 0; i < 18; i++) {
//       console.log(response.results[i]);
//       // create div element for top 20 movies and add class name
//       const top40 = document.createElement("div");
//       top40.className = "top40";
//       // top40.style.display = "inline-block"
//       // assign the innerHTML to put each film inside it's own container
//       // populates with data from API
//       top40.innerHTML = `
//         <div class="film">
//         <img src="${"https://www.themoviedb.org/t/p/original" + response.results[i].poster_path}" alt="poster-image">
//         <div class="film-info">
//             <h4 class ="movie-title">${response.results[i].title}</h4>
            
//             <img class="like-button"src="https://cdn2.iconfinder.com/data/icons/media-player-ui/512/Media-Icon-25-512.png">
//             <span class ="votes">${response.results[i].vote_average} </span>
            
//             </div>
//     </div>`;
//       emptyDiv.append(top40);
//     }

    
//     // for each method below
//     // response.results.forEach(film=>{
//     //     console.log(film)
//     //     // create element for top 20 posters
//     //     const postIMG = document.createElement("img")
//     //     // make the SRC of the image element just created url to film's poster
//     //     postIMG.src = "https://www.themoviedb.org/t/p/original" + film.poster_path
//     //     // give it an ID, height, width
//     //     postIMG.id = "top20"
//     //     postIMG.height = 400;
//     //     postIMG.width = 300;
//     //     // const voteAverage = document.createElement("p")
//     //     // console.log(film.vote_average)
//     //     // voteAverage.innerHTML = film.vote_average

//     //     emptyDiv.append(postIMG)
//     //     // emptyDiv.append(voteAverage)

//     //     console.log(postIMG)
//     // })

//     // loop through response array
//   });
// }
// popularMoviestwo();


// popularMovies();

function movieSearch(movie) {
  // API query parameters, concat the value of whatever was passed into this function to the end of params
  const URL_API =
    "https://api.themoviedb.org/3/search/movie?api_key=" +
    API_KEY +
    "&language=en-US&page=1&include_adult=true&query=" +
    movie;
  
  var settings = {
    async: true,
    crossDomain: true,
    url: URL_API,
    method: "GET",
    headers: {},
  };

  $.ajax(settings)
    .then((response) => {
      // i< response.results.length VVV if needs to be changed
      // because of page layout, made sense to cut it down to 18 rather than 
      // the typical 20 of the response object as it fits evenly in more
      // displays across mobile, ipad, desktop, laptop
      for (let i = 0; i < 18; i++) {
        // create div element for top 20 movies and add class name
        const userSearch = document.createElement("div");
        userSearch.className = "userSearch";
        // userSearch.style.display = "inline-block"
        // assign the innerHTML to put each film inside it's own container
        // populates with data from API
        userSearch.innerHTML = `
            <div class="film">
            <img src="${
              "https://www.themoviedb.org/t/p/original" +
              response.results[i].poster_path}" alt="poster-image">
            <div class="film-info">
                <h4 class ="movie-title">${response.results[i].title}</h4>
                <img class="like-button"src="https://cdn2.iconfinder.com/data/icons/media-player-ui/512/Media-Icon-25-512.png">
                <span class ="votes">${response.results[i].vote_average} </span>
    
                
            </div>
        </div>`;
        emptyDiv.append(userSearch);
      }
    })
    .catch((error) => {
      console.log(
        "make sure you're using live server extension if getting CORS",
        error
      );
    });
}
array = [5, 2, 3];
function sort(array) {
  for (i = 0; i < array.length; i++) {
    let current = array[i];
    let j = i - 1;

    while (j >= 0 && current < array[j]) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = current;
  }
  console.log(array);
  return array;
}
sort(array);