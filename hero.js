const accessToken='1020176432135491';
const url='https://superheroapi.com/api.php/'+accessToken+'/';

getapi();
async function getapi()
{
    const id=getId();
    const data=await getInfo(id);
    renderHero(data);
}
function getId()
{
    const url=location.search;
    return url.substring(url.indexOf('=')+1);
}
async function getInfo(id)
{
    let response=await fetch(url+id);
    if(response.ok)
    {
        var data=await response.json();
        console.log(data);
        return data;
    }
    else{
        alert("Error : "+response.status);
    }
}
function renderHero(data)
{
    document.getElementById('hero-detail').name=data.id;
    let btn=document.getElementById('fav_btn');
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
    btn.className=fav;
    btn.innerHTML=content;
    document.getElementById('hero-name').innerHTML=`${data.name}`;
    let image=document.getElementById('hero_img');
    image.firstElementChild.src=`${data.image.url}`;
    document.getElementById('power').innerHTML=data_fetch(data.powerstats);
    let apperance=document.getElementById('apperance');
    apperance.innerHTML=data_fetch(data.appearance);
    document.getElementById('biography').innerHTML=data_fetch(data.biography);
    document.getElementById('occupation').innerHTML=data_fetch(data.work);
    document.getElementById('connections').innerHTML=data_fetch(data.connections);
}

function data_fetch(data){
    var str='';
    for (var key in data){
        str += '<p><b>'+key.charAt(0).toUpperCase()+key.slice(1) +'</b> : '+ data[key]+ '</p>';
    }
    return str;
}
document.addEventListener('click', (event) => {
     if(event.target.id == 'fav_btn'){
        console.log(event.target.innerHTML);
        var id = event.target.parentNode.parentNode.parentNode.name;
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