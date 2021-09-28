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