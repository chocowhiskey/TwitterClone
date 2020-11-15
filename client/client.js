console.log("hello world");

// with querySelector you can pass any valid css selector
// select the mew form
const form = document.querySelector("form");
// Hide loading gif by default
const loadingElement = document.querySelector(".loading");
const mewsElement = document.querySelector(".mews");
// Get api url for postrequest to actually send the below created object 'mew' to the server with fetch
const API_URL = "http://localhost:5000/mews";

// modify loadingElements style to display: none
loadingElement.style.display = "none";

// Get all mews if the user is on the page
listAllMews();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Submit Data
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

  // If form was submitted, hide form but show loadingElement
  form.style.display = "none";
  loadingElement.style.display = "";

  // Sending the mew to the server
  // the body is our js object (server does not understand), turned into a json object (server understands)
  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(mew),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((createdMew) => {
      console.log(createdMew);
      form.reset();
      form.style.display = "";
      listAllMews();
      loadingElement.style.display = "none";
    });
});

function listAllMews() {
  mewsElement.innerHTML = "";
  fetch(API_URL).then((response) =>
    response.json().then((mews) =>
      mews.reverse().forEach((mew) => {
        const div = document.createElement("div");
        const header = document.createElement("h3");
        header.textContent = mew.name;

        const contents = document.createElement("p");
        contents.textContent = mew.content;

        const date = document.createElement("small");
        date.textContent = new Date(mew.created);

        // After haveing created the elements you have to append them to one another
        div.appendChild(header);
        div.appendChild(contents);
        div.appendChild(date);

        // Attach it to the .mews element
        mewsElement.appendChild(div);
      })
    )
  );
}
