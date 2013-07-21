var express = require('express');
var fs = require('fs');

var app = express();

app.use(express.bodyParser());

var staticMiddleware = express.static(__dirname + '/../client/build');
app.use(staticMiddleware);

app.use(function(err, req, res, next) {
	res.send(500, 'Opps, something broke!');
});

app.get('/', function(req, res) {
    fs.readFile(__dirname + '/../client/build/index.html', 'utf8', function(err, text) {
    	if (err) {
			console.log('poo');
			res.send(500, 'Could not find index.html!');
		}
		else {
			res.send(text);
		}
    });
})

// handle file upload
app.post('/upload', function(req, res) {
	res.setHeader('Content-Type', 'text/html');
	if (req.files.length == 0 || req.files.file.size == 0)
		res.send(JSON.stringify({ success: false, msg: 'No file uploaded.' }));
	else {
		var file = req.files.file;

		var obj = {
			success: true, 
			msg: 'Upload successful',
			habits: []
		};

		var habits = {};

		// read data into json
		fs.readFile(file.path, 'utf8', function(err, data) {
			if (err) throw err;

			var lines = data.split(/\n/);

			// skip the headers
			for (var i = 1; i < lines.length; i++) {
				if (lines[i].trim() !== '') {
					var fields = lines[i].split(/,(?=([^\"]*\"[^\"]*\")*[^\"]*$)/);
					var name = fields[2];
					if (habits[name] === undefined) {
						habits[name] = [];
					}

					habits[name].push({ date: fields[4], count: fields[8] });
				}
			}

			for (h in habits) {
				obj.habits.push({ name: h, checkIns: habits[h] });
			}

			res.send(JSON.stringify(obj));
		});
	}
});

app.use(function(req, res, next) {
    res.send(404, 'Sorry cant find that!');
});

var port = process.env.PORT || 3000;
app.listen(port);

console.log('Listening on port ' + port);