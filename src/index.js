const endPoint = 'http://localhost:3000/image'


document.addEventListener('DOMContentLoaded', ()=>{
 console.log('Working')


renderPics()

    
})

function renderPics(){

    fetch(endPoint)
    .then(resp => resp.json())
    .then(image => makeImage(image))
    
}

function makeImage(image){
    let imageDiv = document.getElementsByClassName('image-card')
    // let div = document.createElement('div')
   imageDiv.innerHTML =
    `
      <div class="image-card">
        <h2 class="title">${image.title}</h2>
        <img src=${image.image} class="image" />
        <div class="likes-section">
          <span class="likes">${image.likes} likes</span>
          <button class="like-button">♥</button>
        </div>
        <ul class="comments">
            ${image.comments}
        </ul>
        <form class="comment-form">
          <input
            class="comment-input"
            type="text"
            name="comment"
            placeholder="Add a comment..."
          />
          <button class="comment-button" type="submit">Post</button>
        `
    
}