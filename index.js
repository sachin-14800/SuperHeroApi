// access token
const accessToken = '1020176432135491';
// url for the api data
const url = 'https://superheroapi.com/api.php/' + accessToken + '/search/';
//getting the search element
const search = document.getElementById('search');

//if a key is pressed in the input tag of search then this event handler will execute
search.addEventListener('keyup', (e) => {
    // getting the value from the input tag
    const searched_hero = e.target.value;
    // if length is less than  2 then display a message
    if (searched_hero.length < 2) {
        document.getElementById('result').innerHTML = "Search for more than 2 characters";
    }
    else {
        //if length is greater then get the data for the searched hero
        getapi(searched_hero);
    }
});

// async function to get the data of the characters
async function getapi(searched_hero) {
    // getting the response from the url
    let response = await fetch(url + searched_hero);
    if (response.ok) {
        // if response then render the renderHero function on frontend
        document.getElementById('results').style.display = "block";
        renderHero(await response.json());
    }
    else {
        // display error 
        console.log("Error " + response.status);
        alert("Error " + response.status);
    }
}
function renderHero(data) {
    if (data.response == 'error' || data.length === 0) {
        // error in rendering
    }
    else {
        let result = document.getElementById('result');
        //remove previous search result
        result.remove();

        let results = document.getElementById('results');
        // create a new div
        result = document.createElement('div');
        // assign result div the result id
        result.id = 'result';
        results.prepend(result);
        //append character for each of the searched hero
        data.results.forEach(element => {
            result.appendChild(Hero(element));
        });
    }
}

// function for the details of a hero
function Hero(data) {
    // create a new div
    let hero = document.createElement('div');
    // assign new div the hero container class
    hero.className = 'hero-container';
    //id is set as the id of the hero present in data
    hero.id = data.id;
    //determining whether the hero is favourite or and based on that add or remove button will display
    var fav, content;
    const favourite = JSON.parse(localStorage.getItem('favourite'));
    if (favourite.indexOf(data.id) !== -1) {
        //if found in favourites then change button to red and remove from favourite as its content
        fav = "error";
        content = "Remove from favourites";
    }
    else {
        //if not found in favourites then change button to green and add to favourite as its content
        fav = "success";
        content = "Add to favourites";
    }
       //setting the content of hero with its image name and favourite button 
    hero.innerHTML = `
        <div class="hero_img">
            <img src="${data.image.url}">
        </div>
        <div id="hero_name" class="hero-name">${data.name}</div>
        <button id="fav_btn" class="${fav}">${content}</button>
    `

    return hero;
}
//creating a localstorage
storage();
function storage() {
    if (localStorage.getItem('favourite') == null) {
        localStorage.setItem('favourite', JSON.stringify(Array()));
    }
}

//event listener for handling all click events
document.addEventListener('click', (event) => {
    // if hero name is clicked then his information page will get open up
    if (event.target.id == 'hero_name') {
        var id = event.target.parentNode.id;
        window.open('./hero.html' + '?id=' + id, "_self");
    }
    //if favourite button is clicked
    else if (event.target.id == 'fav_btn') {

        var id = event.target.parentNode.id;
        //getting favourite heroes  from the local storage
        var favs = JSON.parse(localStorage.getItem('favourite'));
        //if hero is present
        if (favs.indexOf(id) != -1) {
            //removing hero from favourites
            favs = favs.filter((item) => item != id);
            //reset the favourite heroes in local storage
            localStorage.setItem('favourite', JSON.stringify(favs));
            //since the hero is removed from favourites so change other credentials
            event.target.className = "success";
            event.target.innerHTML = "Add to favourites";
            //alert a message
            Alert('error', 'Removed from favourites');
        }
        else {
            //adding id of hero that is to make favourite
            favs.push(id);
            //setting the localstorage with favourite 
            localStorage.setItem('favourite', JSON.stringify(favs));
            //since the hero is added to favourites so change other credentials
            event.target.className = "error";
            event.target.innerHTML = "Remove from favourites";
            //alert a message
            Alert('success', 'Added to favourites');
        }
    }
});

//function for alerting the information on the top of the page
function Alert(type, message) {
    var element = document.getElementsByClassName(type);
    element[0].innerHTML = message;
    element[0].style.visibility = "visible"
    setTimeout(() => {
        element[0].style.visibility = "hidden";
    }, 1500);
}

