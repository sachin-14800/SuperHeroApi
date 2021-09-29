//access token for the api
const accessToken = '1020176432135491';
//getting the data of the female heroes
async function getdata(gender) {
     //getting the results element
    let results = document.getElementById('results');
    //getting result element
    let result = document.getElementById('result');
    //creating a new div
    result = document.createElement('div');
    //assigning the newly created div id=result
    result.id = 'result';
    //now prepending the result div in results
    results.prepend(result);
    //setting the visibility of loading to true;
    document.getElementById('loading').style.visibility="visible";
    //getting and rendering the male heroes out of 731 heroes;
    for (let i = 1; i <= 731; i++) {
        let response = await fetch('https://superheroapi.com/api.php/' + accessToken + '/' + i);
        let data = await response.json();
        if (data.appearance.gender == gender) {
            let hero=Hero(data);
            //appending the hero got from the Hero function to the result
            result.appendChild(hero);
        }
    }
    //after all are found set loading to be hidden
    document.getElementById('loading').style.visibility="hidden";
}
//calling the function for fetching data
getdata("Female");

//function to render a hero
function Hero(data) {
    //creating a new div for a hero
    let hero = document.createElement('div');
    //setting class of new div to be hero-container
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
            //seeting the localstorage with favourite 
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

