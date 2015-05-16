(function(){
  if (!document.addEventListener || !window.JSON) return;

  var getEmbed = function(options, cb){
    var body = "format=json&url=" + encodeURIComponent(options.url);

    if (!options.advanced.showComments)
      body += "&show_comments=false"
    if (options.advanced.color)
      body += "&color=" + options.advanced.color

    var req = new XMLHttpRequest();
    req.open('POST', "https://soundcloud.com/oembed", true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    req.onload = function(){
      if (req.status < 400){
        var data = JSON.parse(req.responseText);
        cb(data);
      }
    }

    req.send(body);
  }

  var options = INSTALL_OPTIONS;

  for (var i=0; i < options.embeds.length; i++) {
    (function(i){
      if (!options.embeds[i].url || !options.embeds[i].location || !options.embeds[i].location.selector) return;

      getEmbed(options.embeds[i], function(info){

        var add = function(){
          var el = Eager.createElement(options.embeds[i].location);
          el.innerHTML = info.html;
        }

        if (document.readyState == 'loading')
          document.addEventListener('DOMContentLoaded', add);
        else
          add();
      });
    })(i);
  }
})()
