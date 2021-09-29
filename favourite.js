const accessToken='1020176432135491';
const url='https://superheroapi.com/api.php/'+accessToken+'/';

helper();
function helper()
{
    let fav=JSON.parse(localStorage.getItem('favourite'));
    // console.log(fav);        
    if(fav.length==0)
    {
        document.getElementById('result').innerHTML="Add your favourite Heroes";
    }
    else{
        document.getElementById('result').innerHTML="";
        fav.forEach((id)=>{
            getInfo(id);
        });
    }
}

async function getInfo(id)
{
    let response=await fetch(url+id);
    if(response.ok)
    {
        var data=await response.json();
        renderHero(data);
    }
    else{
        alert("Error : "+response.status);
    }
}
function renderHero(data)
{
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
    console.log(hero);
    document.getElementById('result').appendChild(hero);
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
            document.getElementById(id).remove();
            if(favs.length==0)
            {
                document.getElementById('result').innerHTML="Add your favourite Heroes";
            }
            Alert('error','Removed from favourites');
        }
        else{
            favs.push(id);
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