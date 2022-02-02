// API key and query selectors to target later
const API_KEY = "9236658842912fdafd6330610c3dcb5c"
const formValue = document.getElementById("form");
const plot = document.getElementById("overview")
// function to empty overview and poster
function emptyPosterAndPlot(){
    $(".poster").empty();
    $("#overview").empty();

}

// const URL_API = "https://api.themoviedb.org/3/search/movie?api_key="+ API_KEY + "&language=en-US&page=1&include_adult=false&query=split"
let searchMovie = document.querySelector("#search-movie");
// waiting for a click on the search movie button
searchMovie.addEventListener("click", movieButton);

function movieButton(event){

    // prevent default stops the browser from automatically resetting the value of the form every time it is interacted with
    event.preventDefault();
    emptyPosterAndPlot();
    // function removeAllChildNodes(parent) {
    //     while (parent.firstChild) {
    //         parent.removeChild(parent.firstChild);
    //     }
    // }
    // removeAllChildNodes(emptyDiv)
    // assign the value of the text input to variable
    let userInput = formValue.value
    // pass whatever value was in the search bar to API function
    movieSearch(userInput);
    
}
function movieSearch(movie) {
    // API query parameters, concat the value of whatever was passed into this function to the end of params
    const URL_API = "https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&language=en-US&page=1&include_adult=false&query=" + movie
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": URL_API,
        "method": "GET",
        "headers": {


        }
    }
    $.ajax(settings).then((response) => {
        const poster = document.querySelector(".poster")
        let posterImg = document.createElement('img')
        posterImg.src = "https://www.themoviedb.org/t/p/original" + response.results[0].backdrop_path
        posterImg.height = 400
        posterImg.width = 400
        poster.append(posterImg)
        plot.append(response.results[0].overview)
        console.log(posterImg)
        console.log(response.results[0])
        console.log(response.results[0].adult)
        console.log(response.results[0].release_date)
        console.log(response.results[0].overview)
    }).catch((error) => {
        console.log(error)
    })

}