// access token
const accessToken='1020176432135491';
// url for the api data
const url='https://superheroapi.com/api.php/'+accessToken+'/';

//getting the details of a particular character
getapi();
async function getapi()
{
    //first get the id of the character to be looked for
    const id=getId();
    //fetch the data of that character after getting the id
    const data=await getInfo(id);
    //render the information of that character
    renderHero(data);
}

//function to get the id of a character
function getId()
{
    //id can be searched from the url of the page
    const url=location.search;
    return url.substring(url.indexOf('=')+1);
}
//function to get the data from the id of a character
async function getInfo(id)
{
    let response=await fetch(url+id);
    if(response.ok)
    {
        // if response then render then return data to render it on the frontend
        var data=await response.json();
        return data;
    }
    else{
        // if not a response display error in notification
        alert("Error : "+response.status);
    }
}

// function to render the detail of a character
function renderHero(data)
{
    // add property name of the hero container as the id of the hero
    document.getElementById('hero-detail').name=data.id;

    // whether it is favourite or not need to be checked
    let btn=document.getElementById('fav_btn');
    //determining whether the hero is favourite or and based on that add or remove button will display
    var fav,content;
    const favourite = JSON.parse(localStorage.getItem('favourite'));
    if(favourite.indexOf(data.id) !== -1){
        fav = "error";
        content="Remove from favourites";
    }
    else{
        fav = "success";
        content="Add to favourites";
    }
    //adding a class to the favourite button
    btn.className=fav;
    //add content to the button
    btn.innerHTML=content;

    //add hero name
    document.getElementById('hero-name').innerHTML=`${data.name}`;
    //add hero image
    let image=document.getElementById('hero_img');
    image.firstElementChild.src=`${data.image.url}`;

    //add the other details of the hero
    document.getElementById('power').innerHTML=data_fetch(data.powerstats);
    let apperance=document.getElementById('apperance');
    apperance.innerHTML=data_fetch(data.appearance);
    document.getElementById('biography').innerHTML=data_fetch(data.biography);
    document.getElementById('occupation').innerHTML=data_fetch(data.work);
    document.getElementById('connections').innerHTML=data_fetch(data.connections);
}

//fetch the data and show it as it is
function data_fetch(data){
    var str='';
    for (var key in data){
        str += '<p><b>'+key.charAt(0).toUpperCase()+key.slice(1) +'</b> : '+ data[key]+ '</p>';
    }
    return str;
}

//event listener for handling all click events
document.addEventListener('click', (event) => {
    //if favourite button is clicked
     if(event.target.id == 'fav_btn'){
        var id = event.target.parentNode.parentNode.parentNode.name;
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