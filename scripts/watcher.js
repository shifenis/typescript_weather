const watch = require('node-watch');
const httpServer = require('http-server');
const process = require('process');
const fs = require('fs');
const { exec } = require("child_process");

const PORT = 8000;

try {
  process.chdir('../dist/');
} catch {
  fs.mkdirSync('../dist');
  process.chdir('../dist/');
}

var server =httpServer.createServer();
server.address = "localhost";
server.listen(PORT, 'localhost');

build();
console.log("Currently listening on src/");
watch('../src/', { recursive: true }, function(evt, name) {
  console.log('%s changed.', name);
  build();
});

function build() {
  exec('npx tsc')
  fs.copyFileSync("../src/index.html", "../dist/index.html");
}