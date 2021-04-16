import * as binding from "./utils/binding.js"

class Main {

  constructor() {
    console.log('entro');
    binding.oneWayBinding(document.getElementById("testo") as HTMLInputElement).then((value) => console.log(value));
  }
}

const main = new Main();