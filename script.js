// API key and query selectors to target later
const API_KEY = "9236658842912fdafd6330610c3dcb5c"
const formValue = document.getElementById("form");
const plot = document.getElementById("overview")


// function to empty overview and poster
function emptyPosterAndPlot() {
    $(".poster").empty();
    $("#overview").empty();
    

}


// const URL_API = "https://api.themoviedb.org/3/search/movie?api_key="+ API_KEY + "&language=en-US&page=1&include_adult=false&query=split"
let searchMovie = document.querySelector("#search-movie");
// waiting for a click on the search movie button
searchMovie.addEventListener("click", movieButton);


function movieButton(event) {
    // prevent default stops the browser from automatically resetting the value of the form every time it is interacted with
    event.preventDefault();
    emptyPosterAndPlot();
    // assign the value of the text input to variable
    let userInput = formValue.value
    
    // pass whatever value was in the search bar to API function
    movieSearch(userInput);

}


function movieSearch(movie) {
    // API query parameters, concat the value of whatever was passed into this function to the end of params
    const URL_API = "https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&language=en-US&page=1&include_adult=false&query=" + movie
    console.log(movie)
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": URL_API,
        "method": "GET",
        "headers": {


        }
    }


    $.ajax(settings).then((response) => {
        //
        // query selector for the poster class and title ID
        const poster = document.querySelector(".poster")
        const title = document.getElementById("title")
        // dynamically creating an image element evevry time API is hit
        let posterImg = document.createElement('img')
        // assigning the src of said image element to the URL where the poster images are hosted and navigating to the poster in response obj
        posterImg.src = "https://www.themoviedb.org/t/p/original" + response.results[0].backdrop_path
        // dynamically set height and width of image to 400 (CHANGE THIS LATER)
        posterImg.height = 400
        posterImg.width = 400
        // appending the img element just dynamically created and sized to poster class in html
        poster.append(posterImg)
        // dynamically create a favorite button and assign it an ID
        let favoriteButton = document.createElement("button")
        favoriteButton.id = "favorite-button"
        favoriteButton.innerText = "favorite"
        // append button to DOM below poster
        poster.append(favoriteButton)
        // append the plot synopsis overview ID
        plot.append(response.results[0].overview)
        // populate title element with name of movie
        title.innerHTML = response.results[0].title
        console.log(posterImg)
        console.log(response.results[0])
        console.log(response.results[0].adult)
        console.log(response.results[0].release_date)
        console.log(response.results[0].overview)
        console.log(favoriteButton)
        favoriteButton.addEventListener("click", storeMovie)
        
        function storeMovie(){
            console.log(favoriteButton)
            $("#favorite-button").toggleClass("toggle")
        
        }
    }).catch((error) => {
        console.log("make sure you're using live server extension if getting CORS", error)
    })

}
    
