var outer = (function () {
  let new_fav = []
  const undo_fav = document.getElementById('undo-fav');//undo favourite icon on favourite page list
  //Handle clicks on favourite page
  function handleclick(e) {
    const target = e.target;
    if (target.id == 'undo-fav') {
      deleteFav(target.dataset.id);
    }
  }

  // Initialize favourite page/will load favourite list
  function initializeFav() {
    //getting old/already stored favourite list from local storage 
    new_fav = JSON.parse(localStorage.getItem('fav_movies'));
    document.addEventListener('click', handleclick)
    displayFav(new_fav);
  }
  //Below function will recived id and return a promise according to recived imdb id
  async function getbyId(id) {
    try {
      let response = await fetch('http://www.omdbapi.com/?i=' + id + '&apikey=31c2f8ed');
      let data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }

  }
  //Below function is called by index.js file when user clicks on add fav button it will that movie to old list
  function AddtoFav(id) {
    if (id == undefined) {
      return
    }
    //Below will make localstorage !null --mainly for first time incase there is not data in local
    if (localStorage.getItem('fav_movies') == null) {
      localStorage.setItem('fav_movies', "[]");

    } let stringt;
    //storing into local
    local_old = JSON.parse(localStorage.getItem('fav_movies'));//became array
    //Calling getbyid which will return a promise using .then so that only after recieving data then will run
    getbyId(id).then((data) => {
      local_old.push(data);
      stringt = JSON.stringify(local_old);
      localStorage.setItem('fav_movies', stringt);
      total_fav.innerHTML = `${local_old.length}`
    });
    //updating fav pill on nav bar
    total_fav.innerHTML = `${local_old.length}`
    alert("Added");
    return

  }

  //display function will display favourite list on favourite page/ This will recieve updated array of favourite movies(new_fav)

  function displayFav(new_fav) {
    const tablemain = document.getElementById('tbody')
    tablemain.innerHTML = ''
    console.log(new_fav, "Called display")
    if (new_fav == null) {
      return
    }

    for (let i = 0; i < new_fav.length; i++) {
      let tableitem = document.createElement('tr');
      tableitem.style.fontSize = '0.8rem'
      tableitem.innerHTML = `
      <th scope=${i + 1}">${i + 1}</th>
      <td>${new_fav[i].Title}</td>
      <td>${new_fav[i].Year}</td>
      <td>${new_fav[i].Released}</td>
      <td>${new_fav[i].Genre}</td>
      <td><i class="fab fa-gratipay" id='undo-fav' data-id='${i}'></i></td>
        `
      tablemain.append(tableitem);
    }


  }
  
  //deleteFav will recieve index and compare with existing list and remove that movie from fav list
  function deleteFav(i) {
    new_fav.splice(i, 1);
    const stringt = JSON.stringify(new_fav);//changing to string
    localStorage.setItem('fav_movies', stringt)
    displayFav(new_fav);
    alert("Movie removed");
  }



//It will return a object so that these object can be used by other files
  return {
    AddtoFav: AddtoFav,
    initialize: initializeFav,
    getbyId: getbyId
  };
})()

