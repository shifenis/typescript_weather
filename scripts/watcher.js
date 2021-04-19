const watch = require('node-watch');
const httpServer = require('http-server');
const process = require('process');
const fs = require('fs');
const { exec } = require("child_process");
const path = require("path");
const copydirSync = require('copy-dir/libs/copydirSync');


const PORT = 8000;

try {
  process.chdir('../dist/');
} catch {
  fs.mkdirSync('../dist');
  process.chdir('../dist/');
}

var server = httpServer.createServer();
server.address = "localhost";
server.listen(PORT, 'localhost');

build();
console.log("Currently listening on src/");
watch('../src/', { recursive: true }, function (evt, name) {
  console.log('%s changed.', name);
  if (name.includes('.scss')) {
    buildSass(name)
  } else {
    build();
  }
});

function build() {
  exec('npx tsc')
  buildAssets()
  fs.copyFileSync("../src/index.html", "../dist/index.html");
}

function buildAssets() {
  copydirSync("../src/assets/", "../dist/assets/");
}


function buildSass(filePath) {
  const pathDist = filePath.replace("src", "dist").replace("scss", 'css');
  exec("npx sass "+ filePath, function (error, css) {
    ensureDirectoryExistence(pathDist);
    fs.writeFileSync(pathDist, css);
  });
}

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  fs.mkdirSync(dirname);
}