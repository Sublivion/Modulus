// © 2018 Sublivion / Anthony O’Brien. All rights reserved.

const fs = require('fs');
const path = require('path');

module.exports.run = async(req, res) => {
  if (req.method == 'GET') {
  	// Attempt to deliver web page
  	let url = req.url.substr(1);
  	if (url === '') {
  		url = 'index.html';
  	};
  	fs.readFile(path.join('Pages', url), function(err, content) {
  		if (!err) {
			res.writeHead(200, {'Content-Type': 'text/html'})
			res.write(content);
			res.end();
	  	} else {
	  		res.writeHead(404, {'Content-Type': 'text/plain'});
	  		res.write('i really have better things to be doing than making error 404 pages :/');
	  		res.end();
	  	};
  	})
  };
};