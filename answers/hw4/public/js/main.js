var clientID = '5rdlf3sosdxy8kjprfx9lebgznkncf';
var myContentType = 'application/vnd.twitchtv.v5+json';
var twitchAPI = 'https://api.twitch.tv/kraken/streams/?game=League%20of%20Legends';

$(document).ready(function () {
  $.ajax({
    url: twitchAPI,
    headers: {'Client-ID': clientID},
    type: 'GET',
    contentType: myContentType,
    success: function(data) {
      for(x = 0; x < 20; x++) {
        var $content =
            "<div class='stream-item'>" +
              "<img class='thumbnail' src='" + data.streams[x].preview.medium + "'>" +
                "<div class='meta'>" +
                  "<img class='avatar' src='" + data.streams[x].channel.logo + "'>" +
                  "<div class='content'>" +
                    "<p class='title'>" + data.streams[x].channel.status + "</p>" +
                    "<p class='name'>" + data.streams[x].channel.display_name + "</p>" +
                  "</div>"
                "</div>" +
              "</div>" +
            "</div>";
        $( ".container" ).append($content);
        $content = $();
      }
    },
    error: function(data) {
      console.log('error', data);
    }
  });
});

