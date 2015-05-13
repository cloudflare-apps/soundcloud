(function(){
  if (!document.addEventListener || !window.JSON) return;

  var getEmbed = function(url, cb){
    var body = "format=json&url=" + encodeURIComponent(url);

    var req = new XMLHttpRequest();
    req.open('POST', "http://soundcloud.com/oembed", true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    req.onload = function(){
      if (request.status < 400){
        var data = JSON.parse(request.responseText);
        cb(data);
      }
    }

    req.send(body);
  }

  var options = INSTALL_OPTIONS;

  for (var i=0; i < options.embeds.length; i++) {
    getEmbed(options.embeds[i].url, function(info){

      var add = function(){
        var el = Eager.createElement(options.embeds[i].location);
        el.innerHTML = info.html;
      }

      if (document.readyState == 'loading')
        document.addEventListener('DOMContentLoaded', add);
      else
        add();
    });
  }
})()
