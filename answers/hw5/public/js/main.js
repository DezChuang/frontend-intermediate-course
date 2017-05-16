$(document).ready(function(){
  loadDataFromAPI((err, data) => {
    if (err) {
        console.log(err);
    } else {
      //ES6 syntax for `const streams = data.streams;`
      const {streams} = data;
      const $container = $('.container');
      for(const stream of streams) {
        $container.append(appendDataToDOM(stream));
      }
    }
  });
});

function loadDataFromAPI(callback){
  const clientId = '5rdlf3sosdxy8kjprfx9lebgznkncf';
  const myContentType = 'application/vnd.twitchtv.v5+json';
  const twitchApi = 'https://api.twitch.tv/kraken/streams/?game=League%20of%20Legends';
  const game = 'League of Legends';
  $.ajax({
    type: 'GET',
    url: twitchApi,
    data: {
      contentType: myContentType,
      client_id: clientId,
      game: game,
      limit: 20
    },
    success: (data) => {
      callback(null, data);
    },
    error: (err) => {
      console.log(err);
      callback(err);
    }
  });
}

function appendDataToDOM(data) {
  var avatarSrc = data.channel.logo;
  var previewSrc = data.preview.medium;
  if(avatarSrc == null){
    avatarSrc = "public/img/avt-default.png";
  }
  return (
    `<div class='stream-item'>
      <img class='preview' src="${previewSrc}">
      <div class='content'>
        <img class='avatar' src="${avatarSrc}">
        <div class='stream-text'>
          <p class='title'>${data.channel.status}</p>
          <p class='streamer'>${data.channel.display_name}</p>
        </div>
      </div>
    </div>`
  );
}
