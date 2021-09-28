const accessToken='1020176432135491';
const url='https://superheroapi.com/api.php/'+accessToken+'/search/';
const search=document.getElementById('search');

search.addEventListener('keyup',(e)=>{
    const searched_hero=e.target.value;
    console.log("We serach for "+searched_hero);
    if(searched_hero.length<2)
    {
        document.getElementById('result').innerHTML="Search for more than 3 characters";
    }
    else
    {
        getapi(searched_hero);
    }
});

async function getapi(searched_hero)
{
    let response=await fetch(url+searched_hero);
    if(response.ok)
    {
        document.getElementById('results').style.display="block";
        renderHero(await response.json());
    }
    else{
        console.log("Error "+response.status);
        alert("Error "+response.status);
    }
}
function renderHero(data)
{
    if(data.response=='error' || data.length===0)
    {
        // document.getElementById('result').innerHTML="An error encountered "+data.error;
    }
    else{
        let result=document.getElementById('result');
        result.remove();

        let results=document.getElementById('results');
        result=document.createElement('div');
        result.id='result';
        results.appendChild(result);
        console.log(data);
        data.results.forEach(element => {
            result.appendChild(Hero(element));
        });
    }
}

function Hero(data){
    let hero = document.createElement('div');
    hero.className = 'hero-container';
    hero.id = data.id;
    var fav,content;
    const favourite = JSON.parse(localStorage.getItem('favourite'));
    if(favourite.indexOf(data.id) !== -1){
        fav = "error";
    }
    else{
        fav = "success";
    }
    // console.log(fav);
    if(fav=="success")
    content="Add to favourites";
    else
    content="Remove from favourites";
    hero.innerHTML = `
        <div class="hero_img">
            <img src="${data.image.url}">
        </div>
        <div id="hero_name" class="hero-name">${data.name}</div>
        <button id="fav_btn" class="${fav}">${content}</button>
    `
    
    return hero;
}
storage();
function storage()
{
    if(localStorage.getItem('favourite')==null)
    {
        localStorage.setItem('favourite',JSON.stringify(Array()));
    }
}
document.addEventListener('click', (event) => {
    if(event.target.id == 'hero_name'){
        var id = event.target.parentNode.id;
        // console.log(event.target.parentNode.id);
        window.open('./hero.html'+'?id='+id, "_self");
    }
    // Favourite button
    else if(event.target.id == 'fav_btn'){
        
        var id = event.target.parentNode.id;
        // console.log(id);
        var favs = JSON.parse(localStorage.getItem('favourite'));
        // fav button decide
        if (favs.indexOf(id) != -1){
            favs = favs.filter((item) => item!=id);
            localStorage.setItem('favourite',JSON.stringify(favs));
            event.target.className = "success";
            event.target.innerHTML="Add to favourites";
            Alert('error','Removed from favourites');
        }
        else{
            favs.push(id);
            console.log(favs);
            localStorage.setItem('favourite',JSON.stringify(favs));
            event.target.className = "error";
            event.target.innerHTML="Remove from favourites";
            Alert('success','Added to favourites');
        }
    }
});

function Alert(type, message){
    var element = document.getElementsByClassName(type);
    element[0].innerHTML = message;
    element[0].style.visibility = "visible"
    setTimeout(() => {
        element[0].style.visibility = "hidden";
    }, 1500);
}

