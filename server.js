var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

app.use(express.static('./'));

app.get('*', function(request, response){
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.'});
});

app.listen(port, function(){
  console.log('Server started on port ' + port);
});
