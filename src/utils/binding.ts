
let value;

export function oneWayBinding(inputElement: HTMLInputElement): Promise<string> {
  return new Promise((resolve) => {
    ['keyup', 'paste'].forEach(
      (e) => inputElement.addEventListener(e, (event) => {
        value = (event.target as HTMLInputElement).value;
        resolve(value);
      })
    )
  })
}

