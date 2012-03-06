var express  = require("express");
var mongoose = require("mongoose"),
    Schema   = mongoose.Schema;

var DesignDocSchema = new Schema({
  title: String,
  overview: String,
  background: String,
  goals: String,
  nongoals: String,
  solution: String,
  alternatives: String,
  security: String,
  disaster: String,
  cost: String,
});
var DesignDoc = mongoose.model('DesignDoc', DesignDocSchema);


mongoose.connect('mongodb://localhost/kant');

var app = express.createServer();

app.configure(function() {
  app.use(express.logger());
  app.use(express.static(__dirname + '/static'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
});

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', {
    pretty: true
});

app.get('/', function(req,res) {
  res.redirect("/designdocs");
});

// DesignDocs
app.get('/designdocs', function(req,res) {
  DesignDoc.find(function(err, designdocs) {
    res.render('designdocs/index', {locals: {
      designdocs: designdocs
    }});
  });
});
app.get('/designdocs/new', function(req,res) {
  res.render('designdocs/new', {locals: {
    designdoc: {}
  }});
});
app.post('/designdocs', function(req,res) {
  var designdoc = new DesignDoc({
    title: req.body.designdoc.title,
    overview: req.body.designdoc.overview,
    background: req.body.designdoc.background,
    goals: req.body.designdoc.goals,
    nongoals: req.body.designdoc.nongoals,
    solution: req.body.designdoc.solution,
    alternatives: req.body.designdoc.alternatives,
    security: req.body.designdoc.security,
    disaster: req.body.designdoc.disaster,
    cost: req.body.designdoc.cost,
  });
  designdoc.save(function(err) {
    if (err) {
      throw err;
    };
    res.redirect('/designdocs/' + designdoc._id);
  });
});
app.get('/designdocs/:id', function(req,res) {
  DesignDoc.findById(req.params.id, function(err, designdoc) {
    if (err) {
      throw err;
    };
    res.render('designdocs/show', {locals: {
      designdoc: designdoc
    }});
  });
});
app.get('/designdocs/:id/edit', function(req,res) {
  DesignDoc.findById(req.params.id, function(err, designdoc) {
    res.render('designdocs/edit', {locals: {
      designdoc: designdoc
    }});
  });
});
app.put('/designdocs/:id', function(req,res) {
  DesignDoc.findById(req.params.id, function(err, designdoc) {
    designdoc.title = req.body.designdoc.title;
    designdoc.overview = req.body.designdoc.overview;
    designdoc.background = req.body.designdoc.background;
    designdoc.goals = req.body.designdoc.goals;
    designdoc.nongoals = req.body.designdoc.nongoals;
    designdoc.solution = req.body.designdoc.solution;
    designdoc.alternatives = req.body.designdoc.alternatives;
    designdoc.security = req.body.designdoc.security;
    designdoc.disaster = req.body.designdoc.disaster;
    designdoc.cost = req.body.designdoc.cost;
    designdoc.save(function(err) {
      if (err) {
        throw err;
      } else {
        res.redirect('/designdocs/' + req.params.id);
      }
    });
  });
});
app.delete('/designdocs/:id', function(req,res) {
  DesignDoc.findById(req.params.id, function(err, designdoc) {
    if (err) {
      throw err;
    };
    designdoc.remove(function(err) {
      if (err) {
        throw err;
      };
      res.redirect('/designdocs');
    });
  });
});

app.listen(3000);

