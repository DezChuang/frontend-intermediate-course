let offset = 0;
let language = 'zh-tw';
// let title = appendTitle('zh-TW');
let title = document.getElementById("title");
const zhBtn = document.getElementById("zhBtn");
const enBtn = document.getElementById("enBtn");

zhBtn.addEventListener("click", function(){
  enBtn.classList.remove("selected");
  this.classList.add("selected");
  i18nTitle('zh-tw');
  language = 'zh-tw';
});

enBtn.addEventListener("click", function(){
  zhBtn.classList.remove("selected");
  this.classList.add("selected");
  i18nTitle('en-us');
  language = 'en';
});

function loadDataFromAPI(callback){
  const clientId = '5rdlf3sosdxy8kjprfx9lebgznkncf';
  const myContentType = 'application/vnd.twitchtv.v5+json';
  const twitchApi = 'https://api.twitch.tv/kraken/streams/';
  const game = 'League of Legends';
  const limit = 20;
  $.ajax({
    type: 'GET',
    url: twitchApi,
    data: {
      contentType: myContentType,
      client_id: clientId,
      game: game,
      limit: limit,
      offset: offset,
      language: language
    },
    success: (data) => {
      console.log(data);
      callback(null, data);
    },
    error: (err) => {
      console.log(err);
      callback(err);
    }
  });
}

function i18nTitle(lang){
  jQuery.i18n.properties({
    name:'Messages',
    path:'public/bundle/',
    mode:'both',
    language:lang,
    async: true,
    callback: function() {
        jQuery.i18n.prop('msg_title');
        title.textContent = msg_title;
    }
  });
}

function templateData(data) {
  const avatarSrc = data.channel.logo;
  const previewSrc = data.preview.medium;
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

//$(document).ready
function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function infiniteScroll() {
  let timer;
  const reservedHeight = 100;
  const timeout = 100;
  //$(window).scroll(function()
  window.addEventListener('scroll', function() {
    if(timer) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(function() {
      if(document.body.scrollTop + window.innerHeight > document.body.scrollHeight - reservedHeight) {
        appendData();
      }
    }, timeout);
  });
}

// main function
ready(() => {
  // Init 20 items from twitch API
  appendData();
  // Infinite scroll
  infiniteScroll();
});
