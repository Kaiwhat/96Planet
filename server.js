//server.js

const express = require('express');
const app = express();
const path = require('path');

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for rendering the index.ejs template
app.get('/', (req, res) => {
	res.render('index', {webname: "96planetstudio"});
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(
		`Server is running on 
			http://localhost:${PORT}`
	);
});
