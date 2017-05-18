let offset = 0;

function loadDataFromAPI(callback){
  const method = 'GET';
  const baseURL = 'https://api.twitch.tv/kraken/streams/';
  const clientId = '5rdlf3sosdxy8kjprfx9lebgznkncf';
  const game = 'League of Legends';
  const limit = 20;
  let twitchAPI = `${baseURL}?client_id=${clientId}&game=${game}&limit=${limit}&offset=${offset}`;
  let xhr = new XMLHttpRequest();
  xhr.open(method, twitchAPI, true);
  xhr.onload = (data) => {
    if (xhr.status >= 200 && xhr.status < 400) {
      data = JSON.parse(xhr.responseText);
      callback(null, data);
    } else {
      console.log(err);
    }
  };
  xhr.onerror = (err) => {
    console.log(err);
  };
  xhr.send(null);
}

function templateData(data) {
  var avatarSrc = data.channel.logo;
  var previewSrc = data.preview.medium;
  if(avatarSrc == null){
    avatarSrc = "public/img/avt-default.png";
  }
  return (
    `<div class="stream-item">
      <div class="preview">
        <img src="${previewSrc}" onload="this.style.opacity=1;">
      </div>
      <div class="content">
        <div class="avatar">
          <img src="${avatarSrc}" onload="this.style.opacity=1;">
        </div>
        <div class="stream-text">
          <p class="title">${data.channel.status}</p>
          <p class="streamer">${data.channel.display_name}</p>
        </div>
      </div>
    </div>`
  );
}

function appendData() {
  loadDataFromAPI((err, data) => {
    if (err) {
        console.log(err);
    } else {
      //ES6 syntax for `const streams = data.streams;`
      const {streams} = data;
      const container = document.querySelector('.container');
      for(const stream of streams) {
        container.insertAdjacentHTML('beforeend', templateData(stream));
      }
      offset += 20;
    }
  });
}

// main function
$(document).ready(function(){
  // Init 20 items from twitch API
  appendData();
  // Infinite scroll
  let timer;
  const reservedHeight = 100;
  const timeout = 100;
  $(window).scroll(function() {
    if(timer) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(function() {
      if($(window).scrollTop() + $(window).height() > $(document).height() - reservedHeight) {
          appendData();
        // console.log($(".stream-item").length);
      }
    }, timeout);
  });
});
