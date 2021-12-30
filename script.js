// dark mode//


// url for the api library we are going to be using for this
const url = 'https://api.wheretheiss.at/v1/satellites/25544';
// this api token only works for this url address so do not try to use it
const accessToken =
    `pk.eyJ1IjoiYWN0dWFsbHljaHJpc21lbmRleiIsImEiOiJja3hzNzU2NWMwdDUyMnVueW1kZ2xoam54In0.jmBejEEAeJkkXGkU-7DDeA`

// create the map inside the html
const map = L.map('issMap').setView([51.505, -0.09], 4);

const issIcon = L.icon({
    iconUrl: 'RocketEmoji.png',
    iconSize: [30, 30],
    iconAnchor: [25,16]
})

const marker = L.marker([0,0], {icon: issIcon}).addTo(map)
    .bindPopup('this is where the ISS space station is at right now!');
//marker.setLatLong([latitude, longitude])
L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYWN0dWFsbHljaHJpc21lbmRleiIsImEiOiJja3hzNzU2NWMwdDUyMnVueW1kZ2xoam54In0.jmBejEEAeJkkXGkU-7DDeA'
}).addTo(map);

//lat and long marker
async function getISS(){
    const response = await fetch(url)
    const data = await response.json();
    const {latitude, longitude} = data;
    marker.setLatLng([latitude,longitude]);
    map.setView([latitude,longitude])
    document.getElementById('lat').textContent = (Math.round(latitude* 100) / 100).toFixed(3);
    document.getElementById('long').textContent = (Math.round(longitude* 100) / 100).toFixed(3);
}

getISS();
setInterval(getISS, 5000);