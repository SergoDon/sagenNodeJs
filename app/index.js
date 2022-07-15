require('dotenv').config();
const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')
let path = require("path");
const overwriting = require("./modyles/overwriting");

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(fileUpload());

app.get("/", (req, res) => {
    res.render(path.join(__dirname+'/index.html'))
})

app.post("/app/load_files", (req) => {
    overwriting(req.files);
});

app.listen(process.env.PORT, () => {
    console.log(`Server are working good at ${process.env.PORT} port`);
})


