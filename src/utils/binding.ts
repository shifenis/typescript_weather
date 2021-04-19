export class Binding {


  constructor(
    private inputElement: HTMLInputElement,
    private callback: (param: string) => void = () => { }
  ) {
    ['keyup', 'paste', "change"].forEach(
      (e) => this.inputElement.addEventListener(e, (event) => {
        callback((event.target as HTMLInputElement).value);
      })
    );
  }

  public setValue(param: string): void {
    this.callback(param);
    this.inputElement.value = param;
  }

}



