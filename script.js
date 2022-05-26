let userSearches = [];
// API key and query selectors to target later
const API_KEY = "9236658842912fdafd6330610c3dcb5c";
// use this key to use certain features of API
const API2 = "04c35731a5ee918f014970082a0088b1";
const formValue = document.getElementById("form");
const plot = document.getElementById("overview");
const emptyDiv = document.getElementById("empty-div");
const returnTo20 = document.getElementById("return");

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
  if (userInput === "") {
    confirm("Please enter a movie or TV show in order to search.");
  } else emptyDiv.innerHTML = "";
  // pass whatever value was in the search bar to API function
  movieSearch(userInput);
}

// function to return  popular movies to append to the dom on load of the site
$(document).ready(function () {
  let random = Math.floor(Math.random() * 999);

  const URL_FOR_POPULAR =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=" +
    API2 +
    "&page=1";
  let settings = {
    async: true,
    crossDomain: true,
    url: URL_FOR_POPULAR,
    method: "GET",
  };

  $.ajax(settings).then((response) => {
    // i < response.results.length VVVVVV
    console.log(response);
    for (let i = 0; i < 18; i++) {
      // create div element for top 20 movies and add class name
      const top20 = document.createElement("div");
      top20.className = "top20";
      // top20.style.display = "inline-block"
      // assign the innerHTML to put each film inside it's own container
      // populates with data from API

      top20.innerHTML = `
      <div class="film">
      <img src="${
        "https://www.themoviedb.org/t/p/original" +
        response.results[i].poster_path
      }" alt="poster-image">
      <div class="film-info">
      <h4 class ="movie-title">${response.results[i].title}</h4>
      <div id="heart-container">
    
      <img id = "heart" src = "https://cdn-icons.flaticon.com/png/512/2961/premium/2961957.png?token=exp=1653543116~hmac=4a05dcbd4d189aab27a845d83419cf1d">
      </div>
      <div id = "corn-container">
      <img id = "popcorn" src = "https://cdn-icons-png.flaticon.com/512/2107/2107957.png">
      <p class ="votes">${response.results[i].vote_average} </p>
      </div>
      </div>
      </div>
      </div>`;

      top20.setAttribute("data-index", i);
      emptyDiv.append(top20);
    }
    // let movieTitle = document.querySelector(".movie-title")
    // let justify = document.getElementById("justify")
    let newHeart = function (event) {
      event.preventDefault();

      let heart = event.target;
      let newOne = "https://cdn-icons-png.flaticon.com/512/535/535234.png"
      let old =
        "https://cdn-icons.flaticon.com/png/512/2961/premium/2961957.png?token=exp=1653543116~hmac=4a05dcbd4d189aab27a845d83419cf1d";
      console.log(old);
      console.log(heart.src);
      if (heart.src === old) {
        console.log("works");

        heart.src = "https://cdn-icons-png.flaticon.com/512/535/535234.png";
        console.log(heart.src)
      }else if (heart.src === newOne){
        console.log(heart.src)
        console.log("Test")
      heart.src =  "https://cdn-icons.flaticon.com/png/512/2961/premium/2961957.png?token=exp=1653543116~hmac=4a05dcbd4d189aab27a845d83419cf1d";
        
      }
      //  console.log(heart.getAttribute("src"))
      // console.log(heart.getElementByTagName[0].id)
      // console.log(heart.src)
      // console.log(heart)
      // console.log(heart)
      //  if(heart.src = "https://cdn-icons.flaticon.com/png/512/707/premium/707680.png?token=exp=1653341843~hmac=ad2dc8f7181c60a502cfb240d2212df0"){
      //    heart.innerHTML = `<img id = "heart" src = "https://cdn-icons-png.flaticon.com/512/535/535234.png">`
      //   }
      // console.log(Number(window.getComputedStyle(heart).getPropertyValue("width")))
      // heart.remove();
      // movieTitle.append
      // heart.remove()
      // console.log(heart.textContent)

      // heart.innerHTML = `<i  class="fa-solid fa-heart"></i>`
    };

    emptyDiv.addEventListener("click", newHeart);

    // console.log(justify)
  });
});
// const justify = document.getElementById("justify")

// popularMovies();

function movieSearch(movie) {
  // API query parameters, concat the value of whatever was passed into this function to the end of params
  // movie.preventDefault
  userSearches.push(movie);
  console.log(userSearches);
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
        if (response.results.length != 0) {
          userSearch.innerHTML = `
          <div class="film">
          <img src="${
            "https://www.themoviedb.org/t/p/original" +
            response.results[i].poster_path
          }" alt="poster-image">
          <div class="film-info">
          <h4 class ="movie-title">${response.results[i].title}</h4>
          <div id="heart-container">
        
          <img id = "heart" src = "https://cdn-icons.flaticon.com/png/512/2961/premium/2961957.png?token=exp=1653543116~hmac=4a05dcbd4d189aab27a845d83419cf1d">
          </div>
          <div id = "corn-container">
          <img id = "popcorn" src = "https://cdn-icons-png.flaticon.com/512/2107/2107957.png">
          <p class ="votes">${response.results[i].vote_average} </p>
          </div>
          </div>
          </div>
          </div>`;;
          emptyDiv.append(userSearch);
        }
      }

      // prevention for if user enters a string that has no return from API, just uses their last seach
      let last = userSearches.length - 2;
      console.log(userSearches[last]);
      if (response.results.length === 0) {
        movieSearch(userSearches[last]);
        return;
      }
    })
    .catch((error) => {
      console.log(
        "make sure you're using live server extension if getting CORS",
        error
      );
    });
}
console.log(userSearches);
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

// function to return  popular movies to append to the dom on load of the site
// $(document).ready(function () {
//   let token =
//     "Bearer L5LP46_Y5o-XZR6vdKcPk0t6_gS6id7Kg8lfsBsWj1VVlhH9NeddjVJcCzfsfDm6kMJIN7K0viaoh2Nf7VcTRlmjOLmArJyHcsuJtf7bFsd2HG9gw10JcSqQKKdfYnYx";
//   let cors = 'https://cors-anywhere.herokuapp.com'

//   let yelp = "https://api.yelp.com/v3/businesses/law-office-of-scott-c-harris-rancho-santa-fe/reviews"

//   let settings = {
//     url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/law-office-of-scott-c-harris-rancho-santa-fe/reviews",
//     header:{'Authorization': token},
//     method: "GET",
//   };

//   $.ajax(settings).then((response) => {
//     console.log(response);
//   });
// });

function popularMovies() {
  const URL_FOR_POPULAR =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=" +
    API2 +
    "&page=1";
  let settings = {
    async: true,
    crossDomain: true,
    url: URL_FOR_POPULAR,
    method: "GET",
  };

  $.ajax(settings).then((response) => {
    // i < response.results.length VVVVVV
    emptyDiv.innerHTML = "";
    for (let i = 0; i < 18; i++) {
      // create div element for top 20 movies and add class name
      const top20 = document.createElement("div");
      top20.className = "top20";
      // top20.style.display = "inline-block"
      // assign the innerHTML to put each film inside it's own container
      // populates with data from API
      top20.innerHTML = `
      <div class="film">
      <img src="${
        "https://www.themoviedb.org/t/p/original" +
        response.results[i].poster_path
      }" alt="poster-image">
      <div class="film-info">
      <h4 class ="movie-title">${response.results[i].title}</h4>
      <div id="heart-container">
    
      <img id = "heart" src = "https://cdn-icons.flaticon.com/png/512/2961/premium/2961957.png?token=exp=1653543116~hmac=4a05dcbd4d189aab27a845d83419cf1d">
      </div>
      <div id = "corn-container">
      <img id = "popcorn" src = "https://cdn-icons-png.flaticon.com/512/2107/2107957.png">
      <p class ="votes">${response.results[i].vote_average} </p>
      </div>
      </div>
      </div>
      </div>`;
      emptyDiv.append(top20);
    }
  });
}
returnTo20.addEventListener("click", popularMovies)


// console.log(justify)

//  target.onload = functionRef;
// window.onload = function(){
//   test();
// }

// (async function() {
//   await newHeart();
// })()
{
  /* <script src="https://kit.fontawesome.com/dbf54a6bdf.js" crossorigin="anonymous"></script> */
}
