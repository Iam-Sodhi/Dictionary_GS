const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
var axios = require("axios");

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
})
// app.get('/searchword', function(req, res)
// {	
// res.send(req.params);

// var options = {
//   method: 'GET',
//   url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/association/',
//   params: {entry: 'req.params.entry'},
//   headers: {
//     'X-RapidAPI-Key': 'ecbee4be22msh3c160d27b0a6e53p160ad7jsn19c3e2fbbbef',
//     'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com'
//   }
// };

// axios.request(options).then(function (response) {
//   console.log(response.data);
// }).catch(function (error) {
//   console.error(error);
// });
// })


app.post('/', function (req, res) {
  const wordName = req.body.word;
  var options = {
    method: 'GET',
    url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/association/',
    params: { entry: wordName },
    headers: {
      'X-RapidAPI-Key': 'ecbee4be22msh3c160d27b0a6e53p160ad7jsn19c3e2fbbbef',
      'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com'
    }
  };

  axios.request(options).then(function (response) {
    //const data = JSON.parse(response.data);
    console.log(response.data);
    var arr1 = [];
    var arr2 = [];
     response.data.assoc_word.forEach(function(as){
      arr1.push(as);
     });
     response.data.assoc_word_ex.forEach(function(asE){
      arr2.push(asE);
     });
   
    // console.log(response.data.assoc_word);
    // console.log(response.data.assoc_word_ex);

    res.render("after", { searchWord: wordName, Words: arr1, WordsE: arr2 });
  }).catch(function (error) {
    console.error(error);
  });

});

app.listen('3000', function () {
  console.log('listening on port ${port}- http://localhost:3000');
})