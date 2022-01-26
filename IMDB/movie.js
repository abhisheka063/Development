
var movie = (function () {
    let movie_details = {};
    //Below function is called by index.js on home.html page /it will recieve id and store that in local storage so that we can use it later
    function getmovie(id) {
        var temp = outer;
        const getpromise = outer.getbyId(id);
        let data = getpromise.then((result) => {
            localStorage.setItem('movie_details', JSON.stringify(result));
            movie_details = JSON.parse(localStorage.getItem('movie_details'));


        })


    }
    //Below function will display movie details on movie.html page
    function display() {
        //update movie_details from local stored data(movie details which user wants)
        getoldLocal();

        const poster = document.getElementById('poster');
        const movie_brief = document.getElementById('movie_brief');
        const more_details = document.getElementById('more_details');
        if (poster == null) { return }


        console.log("inside display movie", movie_details);
        poster.src = movie_details.Poster;
        poster.alt = movie_details.Title;
        movie_brief.innerHTML = `
        <h2>${movie_details.Title}</h2><hr>
        <p><span><b>Star Casts:&nbsp;</b><span>${movie_details.Actors}</p>
        <p><span><b>Director:&nbsp;</b><span>${movie_details.Director}</p>
        <p><span><b>IMDB Rating:&nbsp;</b><span>${movie_details.imdbRating}</p>
        <p><span><b>Genre:&nbsp;</b><span>${movie_details.Genre}</p>
        <p><span><b>Year:&nbsp;</b><span>${movie_details.Year}</p>
        <p><span><b>Runtime:&nbsp;</b><span>${movie_details.Runtime}</p>
        <p><span><b>Language:&nbsp;</b><span>${movie_details.Language}</p>
        <p><span><b>Country:&nbsp;</b><span>${movie_details.Country}</p>
        
        `
        more_details.innerHTML = `<hr><p><span><b>Plot:&nbsp;</b><span>${movie_details.Plot}</p>`;
        movie_brief.append(more_details)

        //setting preloader to none i.e loading completed
        let loader = document.getElementById('loader');
        loader.style.display = 'none';
    }
    //Below function is to get local data to movie_details object
    function getoldLocal() {
        movie_details = JSON.parse(localStorage.getItem('movie_details'));
        console.log(movie_details)
    }

    //initialize page setting 1 sec timeout so that till that api can fetch details
    setTimeout(display, 1000);

    return {
        callMovie: getmovie
    }
})();

