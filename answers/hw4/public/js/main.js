var clientID = '5rdlf3sosdxy8kjprfx9lebgznkncf';
var myContentType = 'application/vnd.twitchtv.v5+json';
var twitchAPI = 'https://api.twitch.tv/kraken/streams/?game=League%20of%20Legends';

$(document).ready(function () {
  // $('#get-data').click(function () {

    $.getJSON(twitchAPI, {client_id: clientID}, function (data) {

      var items = $();
      for(x = 0; x < 20; x++) {

          //thumbnail
          items = $();
          items = items.add($( "<img>" ).attr( "src", data.streams[x].preview.medium).addClass('thumbnail') );
          $('#stream-item-' + x).append( items );

          //avatar
          items = $();
          items = items.add($( "<img>" ).attr( "src", data.streams[x].channel.logo).addClass('avatar') );
          $('#stream-item-' + x).append( items );

          //content
          $('#stream-item-' + x).append( "<div class=\"content\">" +
                                            "<p class=\"title\">" + data.streams[x].channel.status + "</p>" +
                                            "<p class=\"name\">" + data.streams[x].channel.display_name + "</p>" +
                                          "</div>" );
      }
    })
    .done(function() {
      console.log( "second success" );
    })
    .fail(function() {
      console.log( "error" );
    })
    .always(function() {
      console.log( "complete" );
    });
  // });
});

// $("#leader-btn").click(function() {
//   $.ajax({
//     url: twitchAPI,
//     headers: {'Client-ID': clientID},
//     type: 'GET',
//     contentType: myContentType,
//     success: function(data) {
//       console.log(data);
//     },
//     error: function(data) {
//       console.log('error', data);
//     }
//   });
// });

