const path = require('path');
const express = require('express');
var app = express();

const publicPath = path.join(__dirname, '../public');

// Defined port for app to run on
app.set('port', 3000);

app.use(express.static(publicPath));

// Listen the requests
app.listen(app.get('port'), () => {
   console.log('Server is up on', app.get('port'));
});