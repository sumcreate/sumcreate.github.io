(function() {
  var numberId = 'number'
  var server = 'http://api.sumcreate.com/sim-svr'
  var urls = {
    query: '/query?token={token}&code={code}',
    init: '/init?phone={phone}',
    img: '/static/{token}.jpg'
  }
  var currentToken = ''

  function getUrl(key, data) {
    var url = server + urls[key]

    for (var k in data) {
      url = url.replace(new RegExp('{' + k + '}', 'gi'), data[k])
    }


    return url
  }

  function showImg(token) {
    var url = getUrl('img', {
      token: token
    })

    $('#codeImg').attr('src', url)
  }

  function bindQueryEvent() {
    $('#queryBtn').on('click', function() {
      var code = $('#code').val()
      $.ajax({
        url: getUrl('query', {
          token: currentToken,
          code: code
        }),
        jsonp: 'cb',
        dataType: 'jsonp',
        success: function(data) {
          if (data.code === 1) {
            alert(data.msg)
          } else if (data.code === 0) {
            if (data.msg === 'bal') {
              console.log(data.data)
            }
          }
        }
      })
    })
  }

  function getQueryImg(number) {
    $.ajax({
      url: getUrl('init', {
        phone: number
      }),
      jsonp: 'cb',
      dataType: 'jsonp',
      success: function(data) {
        if (data.code === 1) {
          alert(data.msg)
        } else if (data.code === 0) {
          if (data.msg === 'bal') {
            console.log(data.data)
          } else if (data.msg === 'token') {
            currentToken = data.data
            showImg(currentToken)
            bindQueryEvent()
          }
        }
      }
    })
  }


  $(function() {
    getQueryImg($('#' + numberId).text())
  })

})();
