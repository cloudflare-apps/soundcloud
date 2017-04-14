(function () {
  if (!document.addEventListener || !window.JSON) return

  var getEmbed = function (options, cb) {
    var body = 'format=json&url=' + encodeURIComponent(options.url)

    if (!options.showComments) {
      body += '&show_comments=false'
    }

    var req = new window.XMLHttpRequest()
    req.open('POST', 'https://soundcloud.com/oembed', true)
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')

    req.onload = function () {
      if (req.status < 400) {
        var data = JSON.parse(req.responseText)
        cb(data)
      }
    }

    req.send(body)
  }

  var options = INSTALL_OPTIONS

  function updateElements () {
    options.embeds
      .filter(function (embed) {
        return embed.url && embed.location && embed.location.selector
      })
      .forEach(function (embed) {
        getEmbed(embed, function (info) {
          var el = INSTALL.createElement(embed.location)

          el.innerHTML = info.html
        })
      })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateElements)
  } else {
    updateElements()
  }
}())
