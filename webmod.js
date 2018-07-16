// © 2018 Sublivion / Anthony O’Brien. All rights reserved.

const fs = require('fs');
const path = require('path');

 // Cache page
var Pages = fs.readdirSync('Pages');
CachedPages = [];

Pages.forEach(function(v) {
	fs.readFile(path.join('Pages', v), function(err, content) {
		if (!err) {
			CachedPages[v] = content;
		};
	});
});


module.exports.run = async(req, res) => {
  if (req.method == 'GET') {
  	// Attempt to deliver web page
  	let url = req.url.substr(1);
  	if (url === '') {
  		url = 'index.html';
  	};

  	if (CachedPages[url]) {
  		res.writeHead(200, {'Content-Type': 'text/html'});
  		res.write(CachedPages[url]);
  		res.end();
  	} else {
  		// Return 404 or request that is not a html
	  	fs.readFile(path.join('Pages', url), function(err, content) {
	  		if (!err) {
				res.writeHead(200, {})
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
			  		};
		  		});
		  	};
	  	});
	};
  };
};