//Install express server
const express = require('express');
const path = require('path');
 
const app = express();
 
// Serve only the static files form the dist directory
// Replace the '/dist/<to_your_project_name>'
app.use(express.static(__dirname + '/dist/assets/plume-d-or/'));
app.use(express.static(__dirname + '/dist/'));

app.get(['/', '/index', '/home', '/accueil'], function(req,res) {
  res.sendFile(path.join(__dirname + '/dist/assets/plume-d-or/index.html'));
})
.get(['/notre-ecole', 'a-propos'], function(req,res) {
  res.sendFile(path.join(__dirname + '/dist/assets/plume-d-or/notre-ecole/index.html'));
})
.get('/actualites', function(req,res) {
  res.sendFile(path.join(__dirname + '/dist/assets/plume-d-or/actualites/index.html'));
})
.get('/clubs', function(req,res) {
  res.sendFile(path.join(__dirname + '/dist/assets/plume-d-or/clubs/index.html'));
})
.get('/contact', function(req,res) {
  res.sendFile(path.join(__dirname + '/dist/assets/plume-d-or/contact/index.html'));
})
.get('/app/*', function(req,res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
})
.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);


