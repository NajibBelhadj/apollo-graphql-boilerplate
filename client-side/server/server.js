const express = require("express");
const path = require("path");
const app = express();

app.set('public', 'public'); //Set the folder-name from where you serve the html page. ]
app.set('view engine', 'html');
app.engine('html', consolidate.handlebars);
app.use(express.static("../public"));

const publicPath = path.join(__dirname, "..");
const port = process.env.PORT || 4000;




app.get("*", function (req, res) {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log("the server is up");
});
