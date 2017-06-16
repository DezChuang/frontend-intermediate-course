import '../sass/index.sass';

const $ = require("jquery");
const I18N = require("./i18n");

let offset = 0;
let language = 'zh-tw';
let title = document.getElementById("title");
const langBtn = {
  'zh-tw': 'zhBtn',
  'en': 'enBtn'
};

// main function init
$(document).ready(() => {
  appendData();
  infiniteScroll();
  $('#zhBtn').on('click', function(){
    changeLang('zh-tw');
  });

  $('#enBtn').on('click', function(){
    changeLang('en');
  });
});

function loadDataFromAPI(callback){
  const method = 'GET';
  const baseURL = 'https://api.twitch.tv/kraken/streams/';
  const clientId = '5rdlf3sosdxy8kjprfx9lebgznkncf';
  const game = 'League of Legends';
  const limit = 20;
  let twitchAPI = `${baseURL}?client_id=${clientId}&game=${game}&limit=${limit}&offset=${offset}&language=${language}`;
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
  let avatarSrc = data.channel.logo;
  let previewSrc = data.preview.medium;
  if(avatarSrc == null){
    avatarSrc = "assets/img/avt-default.png";
  }
  return (
    `<a href="${data.channel.url}" target="_blank" class="stream-item">
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
    </a>`
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

function infiniteScroll() {
  const reservedHeight = 100;
  const timeout = 100;
  let timer;
  $(window).scroll(function() {
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

function removeBtnSelected(lang){
  document.getElementById(langBtn['zh-tw']).classList.remove("selected");
  document.getElementById(langBtn['en']).classList.remove("selected");
  document.getElementById(langBtn[lang]).classList.add("selected");
}

function refreshTable() {
  $( ".container" ).empty();
  appendData();
}

function changeLang(lang){
  // title reload
  title.textContent = I18N[lang].TITLE;
  // button reload
  removeBtnSelected(lang);
  // stream reload
  language = lang;
  offset = 0;
  refreshTable()
}
