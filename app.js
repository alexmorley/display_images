const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const port = 4003;

function list_files_html(req,res) {
  let files = fs.readdirSync('./images/'+req.query.folder);
  files.reverse();
  let images = files.filter(file => {
    return (path.extname(file) == '.png') | (path.extname(file) == '.svg')
  });
  let images_html = images.map(image => {
    return `
      <div style="display: inline-block"> 
      <p><em>${image}</em></p>
      <img src=/${req.query.folder}/${image}></img>
      </div>`
  });
  res.send(`
      <head>
      <link rel="stylesheet" type="text/css" href="main.css">
      </head>
      ${images_html.join('\n')}
      `);
}

app.use(express.static('images'));
app.use(express.static('public'));
app.get('/', list_files_html);
app.listen(port, () => console.log(`Fired up on port ${port}!`));
