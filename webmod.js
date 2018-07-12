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
	  		fs.readFile(path.join('Pages', '404.html'), function(err, content) {
	  			if (!err) {
					res.writeHead(404, {'Content-Type': 'text/html'})
					res.write(content);
					res.end();
	  			} else {
		  			res.writeHead(404, {'Content-Type': 'text/plain'});
		  			res.write('so basically we tried to send you an error page but that errord so um this is awkward');
		  			res.end();
		  		}
	  		})
	  	};
  	})
  };
};