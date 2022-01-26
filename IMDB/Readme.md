Functional Component

#index.js

->initializeApp()--initialize page

->handleClick()--handle clicks and call functions accordinly

->fetchApi()--recieve argument as name and pass searched results to display()

->display()--recevie data and render list on home page

#favourite.js

->initializeFav()--initialize page and some vars

->handleclick()--handle click like delete favourite movie from list

->getbyId()--recieve id and return promises according to id results

->AddtoFav()--called by index.js handleClick this will recieve movie id and add to local storage data

->displayFav()--render list on favourite.html page/recieve array of favourite movies

->deleteFav()--called when user want to delete favorite movie from list

#movie.js

->getmovie()--called by index.js handleClick when user clicks on list/movie to see details/recieve movie id and call 
getbyid() to get promises later store that movie details in local storage.

->display()--recieves a array and render the movie details on page

->getoldLocal--it will get already stored local data and update a array 

-> setTimeout(display,1000)--so that till then we can get data from api 

-> Have also used a preloader in movie.html page so that api can return data and it can be rendered--disabled it on display function(after getting data from api).

Screenshots:

1.Home

![image](https://user-images.githubusercontent.com/40734291/151236377-415b0b89-c8e4-426d-95d6-1ecf77bb1a9a.png)

2.Movies page(when user clicks on search result)

![image](https://user-images.githubusercontent.com/40734291/151236566-aa99468d-fad2-4e6d-ba7e-a0ab9ece8ee8.png)

3.Favourite movies

![image](https://user-images.githubusercontent.com/40734291/151236764-33f78249-b3b4-4328-a105-c630beafffbc.png)




