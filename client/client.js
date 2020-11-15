console.log("hello world");

// with querySelector you can pass any valid css selector
// select the mew form
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  // Ein HTML <form>-Element — wenn angegeben, wird  das neue FormData-Objekt mit den aktuellen Schlüssel/Wert-Paaren des form's gefüllt, wobei "name" der Schlüssel und "value" der Wert. Mitgeschickte Dateien werden ebenfalls codiert.
  let formData = new FormData(form);
  // was auch immer als name='xy' deklariert wird, kann folgendermassen gecatched werden
  const name = formData.get("name");
  const content = formData.get("content");

  // Creating an object out of the inputs
  const mew = {
    name,
    content,
  };
  console.log(mew);
});
