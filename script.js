/*global */
$(document).ready(function() {
  var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  var baseurl = "https://wind-bow.gomix.me/twitch-api/";
  var twitch_url = "https://www.twitch.tv/";
  var userLogo, userProfile, userFollowers, userStatus, userActivity, userUrl;
  var html = " ";

  users.forEach(function(user) {
    //call the API
    var apiurl = "https://wind-bow.gomix.me/twitch-api/" + "streams/" + user + "?callback=?";
   
    //getting user info
    $.getJSON(apiurl, function(json) {
        if (json.stream != null) { 
          userLogo = json.stream.channel.logo;
          userProfile = json.stream.channel.display_name;
          userFollowers = json.stream.channel.followers;
          userStatus = 1;
          userActivity = json.stream.channel.status;
          userUrl = twitch_url + userProfile;
          html += "'<tr><th scope='row'>"
          html += "<img src='" + userLogo + "'></th>";
          html += "<td><a href='" + userUrl + "' target='_blank'>" + userProfile + "</a></td>";
          html += "<td><span class='online'>Live!</span></td>";
          html += "<td>" + userActivity + "</td>";
          html += "<td>" + userFollowers + "</td></tr>";
          $("table tbody").html(html);
        }
        else {
           //Information/Activity from the channel
          var channelurl = baseurl + "channels/" + user + "?callback=?";
          $.getJSON(channelurl, function(json) {
            userLogo = json.logo;
            userProfile = json.display_name;
            userFollowers = json.followers;
            userStatus = 0;
            userActivity = json.status;
            html += "'<tr><th scope='row'>"
            html += "<img src='" + userLogo + "'></th>";
            html += "<td><a href='" + userUrl + "' target='_blank'>" + userProfile + "</a></td>";
            html += "<td><span class='offline'>Offline</span></td>";
            html += "<td>" + userActivity + "</td>";
            html += "<td>" + userFollowers + "</td></tr>";
            $("table tbody").html(html);
          });
        }
     });
  });
});


//Status of accounts are set to live or offline 
$(document).ready(function() {
  getChannelInfo();
  $(".selector").click(function() {
    $(".selector").removeClass("active");
    $(this).addClass("active");
    var status = $(this).attr('id');
    if (status === "all") {
      $(".online, .offline").removeClass("hidden");
    } else if (status === "online") {
      $(".online").removeClass("hidden");
      $(".offline").addClass("hidden");
    } else {
      $(".offline").removeClass("hidden");
      $(".online").addClass("hidden");
    }
  })
});