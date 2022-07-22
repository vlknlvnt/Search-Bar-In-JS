const userTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-card-container]");
const searchInput = document.querySelector('[data-search]');

console.log(searchInput);

let users = []

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase(); // tolowercase means even its written in uppercase, take it as lower
  console.log(value);

  users.forEach(user => {
      const isVisible = user.name.toLowerCase().includes(value);
      user.element.classList.toggle('hide', !isVisible); // if doesnt match isVisible, add hide class
  })
})

fetch('https://jsonplaceholder.typicode.com/comments')
  .then(response => response.json())
  //.then(json => console.log(json))
  .then(data => {

    users = data.map(user => {

        const card = userTemplate.content.cloneNode(true).children[0];
        const name = card.querySelector("[data-name]");
        const email= card.querySelector("[data-email]");
        const comment = card.querySelector("[data-comment]");
        const userId = card.querySelector("[data-user-id]");   
        name.textContent = 'Name: ' + user.name;
        email.textContent = 'Email: ' + user.email;
        comment.textContent = 'Comment: ' + user.body;
        userId.textContent  = '#' + user.id ;
        userCardContainer.append(card);

        return { name: user.name, mail: user.email, comment: user.body, id: user.id, element: card }


    })


  })