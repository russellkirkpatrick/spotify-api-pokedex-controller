const client_id = '10ea434e8fd949919d2ed16ea26b7f9f';
const client_secret = 'e374757104fc4d64b4fd71ea49a846dc';
let access_token = '';
localStorage.setItem('client_id', client_id);
localStorage.setItem('client_secret', client_secret);

let arr  = [];

let count = 0;

const redirect_uri = 'http://127.0.0.1:5501/index.html';
const authorize = 'https://accounts.spotify.com/authorize';
const toplong = 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50&offset=0';
const scope = 'user-modify-playback-state user-read-playback-state user-read-currently-playing user-follow-modify user-follow-read user-read-recently-played user-read-playback-position user-top-read playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private user-read-email user-read-private user-library-modify user-library-read';

function checkLength(){
  let queryStringLength = window.location.hash.length;
  if(queryStringLength > 0){
    getAccessToken();
  }
}

function giveAccess(){
  let url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += '&client_id=' + encodeURIComponent(client_id);
  url += '&scope=' + encodeURIComponent(scope);
  url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
  window.location.replace(url);
}

function getAccessToken(){
  if(window.location.hash.length > 0){
    let hash = window.location.hash.substr(14);
    let token = hash.substr(0, hash.length - 34);
    localStorage.setItem('access_token', token);
    // console.log(token);
    access_token = localStorage.getItem('access_token');
    // console.log(access_token);
  }
}
 
  


function getApiReq(){
  fetch('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50&offset=0', {
    method: 'GET', headers: {
        'Authorization': 'Bearer '  + access_token 
    }
})
   

    .then((response) => response.json())
    .then((data) => {
       console.log(data)
      for(let i = 0; i <= 49; i++){
        let images = data.items[i].album.images[1].url;
        let song_name = data.items[i].name;
        let artist = data.items[i].artists[0].name;
        // console.log(images);
        arr[i] = {
          'song': song_name,
          'artist': artist,
          'image': images
        }
        document.getElementById('album').src = arr[0].image;
        document.getElementById('span-song').innerText = arr[0].song;
        document.getElementById('span-artist').innerText = arr[0].artist;

        // console.log(`song: ${song_name} artist: ${artist}`);
        // console.log(song_name);
        // console.log(artist);
    }
    // document.getElementById('js-container').style.display = 'none';
    console.log(arr);
    count = 0;
    console.log(count)
    console.log(arr.length);
    }); 
}


function left(){
  console.log(`count = ${count} LEFT`)
  if(count == 0){
    document.getElementById('album').src = arr[0].image;
    document.getElementById('span-song').innerText = arr[0].song;
    document.getElementById('span-artist').innerText = arr[0].artist;
  }
  else{
    count--;

    document.getElementById('album').src = arr[count].image;
    document.getElementById('span-song').innerText = arr[count].song;
    document.getElementById('span-artist').innerText = arr[count].artist;
  }
  
}

function right(){
  console.log(`count = ${count} right`)

  if(count == arr.length-1){
    document.getElementById('album').src = arr[arr.length-1].image;
    document.getElementById('span-song').innerText = arr[arr.length-1].song;
    document.getElementById('span-artist').innerText = arr[arr.length-1].artist;
  }
  else{
    count++;

    document.getElementById('album').src = arr[count].image;
    document.getElementById('span-song').innerText = arr[count].song;
    document.getElementById('span-artist').innerText = arr[count].artist;
  }
}




