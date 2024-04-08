let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
})
  // Fetch Andy's Toys
fetch('http://localhost:3000/toys')
.then(response => response.json())
.then(toys => {
  toys.forEach(toy => {
    const card = document.createElement('div');
    card.classList.add('card');
    
    card.innerHTML = `
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p>${toy.likes} Likes</p>
      <button class="like-btn" id="${toy.id}">Like ❤️</button>
    `;
    
    document.getElementById('toy-collection').appendChild(card);
  });
});

// Add a New Toy
const toyForm = document.getElementById('toy-form');
toyForm.addEventListener('submit', event => {
event.preventDefault();

const formData = new FormData(toyForm);
const newToy = {
  name: formData.get('name'),
  image: formData.get('image'),
  likes: 0
};

fetch('http://localhost:3000/toys', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify(newToy)
})
.then(response => response.json())
.then(data => {
  // Add the new toy to the DOM
  // You can update the DOM here to display the new toy card
});
});

// Increase a Toy's Likes
document.addEventListener('click', event => {
  if (event.target.classList.contains('like-btn')) {
    const toyId = event.target.id;
    
    fetch(`http://localhost:3000/toys/${toyId}`)
      .then(response => response.json())
      .then(toy => {
        const updatedLikes = toy.likes + 1; // Increment the likes count by 1
        
        fetch(`http://localhost:3000/toys/${toyId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ likes: updatedLikes })
        })
        .then(response => response.json())
        .then(updatedToy => {
          // Update the toy's likes count in the DOM
          const toyCard = document.getElementById(toyId);
          toyCard.querySelector('p').textContent = `${updatedLikes} Likes`;
        });
      });
  }
});

