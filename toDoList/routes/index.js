var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  let parseObj = JSON.parse(fs.readFileSync('toDoList/data.json'));
  if (parseObj.todolist.length == 0) {
    parseObj.todolist.push("Pour l'instant... Pas grand chose !");
  }
  res.render('index', { title: 'TO-DO', todolist: parseObj.todolist});
})
.post('/', function (req, res) {
  let parseObj = JSON.parse(fs.readFileSync('toDoList/data.json'));
  if (req.body.action == undefined) {
    parseObj.todolist.splice(req.body.id, 1);
  }
  else if (req.body.action.length > 0) {
    parseObj.todolist.push(req.body.action);
  }
  fs.writeFileSync('toDoList/data.json', JSON.stringify(parseObj));
  
  res.redirect('/');
});

module.exports = router;
