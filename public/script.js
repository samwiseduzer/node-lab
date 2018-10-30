$(document).ready(function() {
  setTimeout(function() {
    $("#cityField").keyup(function() {
      var url = location.origin + "/getcity?q=" + $("#cityField").val();
      $.getJSON(url, function(data) {
        var everything;
        everything = "<ul>";
        $.each(data, function(i, item) {
          everything += "<li> " + data[i].city;
        });
        everything += "</ul>";
        $("#txtHint").html(everything);
      });
    });
    $("#weatherButton").click(function(evt) {
      $("#displayCity").html($("#cityField").val());
      evt.stopPropagation();
      evt.preventDefault();
      var myurl =
        "https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=7f055fef5aa7fae938d6d6faf0e4c972&q=";
      myurl += $("#cityField").val();
      $.ajax({
        url: myurl,
        dataType: "json",
        success: function(parsed_json) {
          var location = parsed_json["name"];
          var weather = parsed_json["weather"][0]["main"];
          var temp = parsed_json["main"]["temp"];
          var weather_icon = parsed_json["weather"][0]["icon"];
          var humidity = parsed_json["main"]["humidity"];
          var temp_min = parsed_json["main"]["temp_min"];
          var temp_max = parsed_json["main"]["temp_max"];
          var wind_speed = parsed_json["wind"]["speed"];
          everything =
            '<img src="http://openweathermap.org/img/w/' +
            weather_icon +
            '.png"/>';
          everything += "<span>Location: " + location + "</span>";
          everything +=
            " <span>Weather: " + weather + " (" + temp + "&#8457;)" + "</span>";
          everything +=
            " <span>Low: " +
            temp_min +
            "&#8457;</span> <span>High: " +
            temp_max +
            "&#8457;</span>";
          everything += " <span>Humidity: " + humidity + "%" + "</span>";
          everything += " <span>Wind: " + wind_speed + " mph" + "</span>";
          $("#weather").html(everything);
        }
      });
      $("#modal").iziModal("close");
    });
  }, 500);

  $("#stack-overflow-query").click(function() {
    var search = $("#stack-overflow-topic").val();
    var url = location.origin + "/owlbot?q=" + search.toLowerCase();
    $.getJSON(url, function(data) {
      var list = $("#stack-overflow-results");
      var results = "";
      $.each(data, function(i, item) {
        results +=
          '<div class="card">' +
          "<h4>" +
          search +
          " (" +
          data[i].type +
          ")</h4>" +
          "</p>" +
          "<p>Definition: " +
          data[i].defenition +
          "<p>" +
          'ex. <i class="example">' +
          data[i].example +
          "</i>" +
          "</div>";
      });
      list.html(results);
      $("#search-text").html(search);
    });
  });

  $("#modal").iziModal();
});
