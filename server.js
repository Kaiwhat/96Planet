//server.js

const express = require('express');
const app = express();
const path = require('path');
const mariadb = require('mariadb');
const bodyParser = require('body-parser');

var multer  = require('multer');
var upload = multer();

// 建立資料庫連線
const pool = mariadb.createPool({
	host: 'localhost',  // 根據你的資料庫設定，可能需要更改主機名稱
	user: 'lucas', // 根據你的資料庫設定，更改用戶名
	password: '20040526', // 根據你的資料庫設定，更改密碼
	database: '96PLANET', // 根據你的資料庫設定，更改資料庫名稱
	connectionLimit: 5 // 連線池大小
});

// 連接資料庫
pool.getConnection()
  .then(conn => {
    console.log('MariaDB Database Connected');
    conn.release(); // 釋放連線
  })
  .catch(err => {
    console.error(err);
  });

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for rendering the index.ejs template
app.get('/', (req, res) => {
	res.render('index', {webname: "96planetstudio"});
});

// 使用body-parser中間件來解析表單數據
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// POST請求，處理表單提交
app.post('/submit-form', (req, res) => {
  //let formData = req.body;
  console.log(req.body);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(
		`Server is running on http://localhost:${PORT}`
	);
});