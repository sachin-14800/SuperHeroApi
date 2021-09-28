const accessToken='1020176432135491';
const url='https://superheroapi.com/api.php/'+accessToken+'/search/';
document.getElementById('results').style.display="none";
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
    var srcFav;
    // var favs = JSON.parse(localStorage.getItem('superheroFavs'));
    // // Checking if the hero is fav or not
    // if(favs.indexOf(data.id) !== -1){
    //     srcFav = favTrue;
    // }
    // else{
    //     srcFav = favFalse;
    // }
    hero.innerHTML = `
        <div class="hero_img">
            <img src="${data.image.url}">
        </div>
        <div id="details_btn" class="hero-name">${data.name}</div>
        
    `
    // <div class="card-btns">
    //         <img id="add_fav_btn" src="${srcFav}" width="25">
    //     </div>
    return hero;
}



