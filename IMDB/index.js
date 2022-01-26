// let fav_movies = [];
const inputbtn = document.getElementById('input');
const listname = document.getElementById('list-group');

//This will display searched result by taking searched result/movie data
function display(data) {

    //It will empty list after every time user ente input other wise it will append in last result
    listname.innerHTML = ''

    for (let i = 0; i < data.Search.length; i++) {
        const li = document.createElement('li');
        li.style.fontSize = '0.8rem'

        li.className = 'list-group ml-2 '
        li.display = 'inline';
        li.innerHTML = `
    <a class="list-group-item list-group-item-action" href="./movie.html" target='_blank' data-id=${data.Search[i].imdbID} id='list'>${data.Search[i].Title}&emsp;<i class="fab fa-gratipay" data-id=${data.Search[i].imdbID} id='fav' style={}></i></a>
    
    `;
        listname.append(li);
    }

}
// Below will check movie name using api dynamically
async function fetchApi(name) {
    console.log(name, "this is null")
    //If no user input return
    if (!name) {
        return
    }

    try {
        console.log(name, "name/id");
        let response = await fetch('http://www.omdbapi.com/?s=' + name + '&apikey=31c2f8ed');
        let data = await response.json();
        //Calling display function and passing search result data
        display(data);
        return data;
    }
    catch (e) {
        console.log(e);
    }
}


// Handle clicks

handleClick = (e) => {
    const target = e.target;
    console.log(target);
    // This is for search input handling
    if (target.id == 'input' && target.value !== "") {
        let data = fetchApi(inputbtn.value);

    }
    //This is for when user dont have typed any value in search button or deleted it
    else if (target.id == 'input' && target.value == "") {
        listname.innerHTML = ''
    }
    //Below will handle  when user click on favourite icon
    if (target.id == 'fav') {
        e.preventDefault();
        e.stopPropagation();
        const fav_page = outer;
        //Below will check if its already exits in favourite list
        checkDuplicate(target.dataset.id) ? alert("Already added") : fav_page.AddtoFav(target.dataset.id);

    }

    else {
        listname.innerHTML = ''
    }
    //Below will hit when user click on list to see movie details
    if (target.id == 'list') {
        //Calling callMovie which is in movie.js
        movie.callMovie(target.dataset.id);

    }


}
//checkDuplicate will if current item is already in favourite list
function checkDuplicate(id) {
    let check = JSON.parse(localStorage.getItem('fav_movies'));
    if (check == null) {
        return
    }
    let temp = check.filter((temp) => {
        return temp.imdbID == id
    })
    console.log(check, "ckeck", check.imdbID);
    console.log("Checked", temp.length, id);
    if (temp.length > 0) {
        return true
    }

}
//Initialize home page
function initializeApp() {
    document.addEventListener('click', handleClick);
    inputbtn.addEventListener('keyup', handleClick);
    let total_fav = document.getElementById('total_fav');
    if (JSON.parse(localStorage.getItem('fav_movies'))) {
        total_fav.innerHTML = `${JSON.parse(localStorage.getItem('fav_movies')).length}`
    }

}


initializeApp();


