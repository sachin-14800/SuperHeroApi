// access token
const accessToken='1020176432135491';
// url for the api data
const url='https://superheroapi.com/api.php/'+accessToken+'/';

// calling the helper function
helper();

//helper function for getting the favourite characters stored in the local storage
function helper()
{
    // fav stores the favourite from the local storage
    let fav=JSON.parse(localStorage.getItem('favourite'));      
    if(fav.length==0)
    {
        // if no favourite then display a message
        document.getElementById('result').innerHTML="Add your favourite Heroes";
    }
    else{
        // if favourite then display each character
        document.getElementById('result').innerHTML="";
        fav.forEach((id)=>{
            getInfo(id);
        });
    }
}

//function for fetching the detail of each favourite character from the url 
async function getInfo(id)
{
    let response=await fetch(url+id);
    if(response.ok)
    {
        // if response then render the renderHero function on frontend
        var data=await response.json();
        renderHero(data);
    }
    else{
        // if not a response display error in notification
        alert("Error : "+response.status);
    }
}

// function to render the detail of the favourite character
function renderHero(data)
{
    // create a new div
    let hero = document.createElement('div');
    // assign new div the hero container class
    hero.className = 'hero-container';
    //id is set as the id of the hero present in data
    hero.id = data.id;
    //determining whether the hero is favourite or and based on that add or remove button will display
    var fav,content;
    const favourite = JSON.parse(localStorage.getItem('favourite'));
    if(favourite.indexOf(data.id) !== -1){
        //if found in favourites then change button to red and remove from favourite as its content
        fav = "error";
        content="Remove from favourites";
    }
    else{
        //if not found in favourites then change button to green and add to favourite as its content
        fav = "success";
        content="Add to favourites";
    }
    
   //setting the content of hero with its image name and favourite button 
    hero.innerHTML = `
        <div class="hero_img">
            <img src="${data.image.url}">
        </div>
        <div id="hero_name" class="hero-name">${data.name}</div>
        <button id="fav_btn" class="${fav}">${content}</button>
    `
    document.getElementById('result').appendChild(hero);
}

//event listener for handling all click events
document.addEventListener('click', (event) => {
    // if hero name is clicked then his information page will get open up
    if(event.target.id == 'hero_name'){
        var id = event.target.parentNode.id;
        window.open('./hero.html'+'?id='+id, "_self");
    }
    //if favourite button is clicked
    else if(event.target.id == 'fav_btn'){
        
        var id = event.target.parentNode.id;
         //getting favourite heroes  from the local storage
        var favs = JSON.parse(localStorage.getItem('favourite'));
         //if hero is present
        if (favs.indexOf(id) != -1){
            //removing hero from favourites
            favs = favs.filter((item) => item!=id);
            //reset the favourite heroes in local storage
            localStorage.setItem('favourite',JSON.stringify(favs));
            //since the hero is removed from favourites so change other credentials
            event.target.className = "success";
            event.target.innerHTML="Add to favourites";
            //remove that character from the frontend
            document.getElementById(id).remove();
            // if not favourite is present then display the message
            if(favs.length==0)
            {
                document.getElementById('result').innerHTML="Add your favourite Heroes";
            }
            //alert a message
            Alert('error','Removed from favourites');
        }
        else{
            //adding id of hero that is to make favourite
            favs.push(id);
            //setting the localstorage with favourite 
            localStorage.setItem('favourite',JSON.stringify(favs));
            //since the hero is added to favourites so change other credentials
            event.target.className = "error";
            event.target.innerHTML="Remove from favourites";
            //alert a message
            Alert('success','Added to favourites');
        }
    }
});

//function for alerting the information on the top of the page
function Alert(type, message){
    var element = document.getElementsByClassName(type);
    element[0].innerHTML = message;
    element[0].style.visibility = "visible"
    setTimeout(() => {
        element[0].style.visibility = "hidden";
    }, 1500);
}