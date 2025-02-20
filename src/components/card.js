import axios from 'axios';

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  const card = document.createElement('div');
  const headDiv = document.createElement('div');
  const authorDiv = document.createElement('div');
  const imgContainer = document.createElement('div');
  const image = document.createElement('img');
  const nameSpan = document.createElement('span');

  card.classList.add('card');
  headDiv.classList.add('headline');
  authorDiv.classList.add('author');
  imgContainer.classList.add('img-container');

  image.src = article.authorPhoto;
  headDiv.textContent = article.headline;
  nameSpan.textContent =`By ` + article.authorName;

  card.appendChild(headDiv);
  card.appendChild(authorDiv);
  authorDiv.appendChild(imgContainer);
  imgContainer.appendChild(image);
  authorDiv.appendChild(nameSpan);

  function logHead (){
    console.log('hello');
  }

  card.addEventListener('click', logHead);

  return card;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5000/api/articles` (test it in Postman/HTTPie!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  axios.get('http://localhost:5000/api/articles')
  .then(resp => {
    console.log(resp.data.articles);
    for(let i = 0; i < Object.keys(resp.data.articles).length; i++){
      resp.data.articles[Object.keys(resp.data.articles)[i]].forEach(item => {
        document.querySelector(selector).append(Card(item))
      });

    }
  })
  .catch(err => {
    console.error(err);
  })
}
export { Card, cardAppender }
