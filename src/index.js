const endPoint = 'http://localhost:3000/image'
const commentForm = document.getElementsByTagName('form')[0]
// console.log(commentForm)
const ul = document.getElementsByClassName('comments')[0]
// console.log(ul)


document.addEventListener('DOMContentLoaded', ()=>{
//  console.log('Working')


renderPics()


    document.addEventListener('click', (e)=>{
        if(e.target.className === 'like-button'){
            likePic()
        }
    })

    commentForm.addEventListener('submit', (e)=>{
        // console.log('clicked')
       e.preventDefault()
        let li = document.createElement('li')
        li.textContent = e.target.comment.value
        // console.log(li.textContent)

        ul.append(li)
        
    })

    
})



function renderPics(){

    fetch(endPoint)
    .then(resp => resp.json())
    .then(image => makeImage(image))
    
}

function makeImage(image){
    let imageDiv = document.getElementsByClassName('image-card')
    // console.log(imageDiv[0])
    // let div = document.createElement('div')
    console.log(image.comments)
  //COMMENTS IS AN ARRAY(image.comments.content)
   imageDiv[0].innerHTML =
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


// function getComment(comments){
//     comments.forEach((comment)=> {
//         let li = document.createElement('li')
//         li.dataset.id = `${comment.id}`
//         li.textContent = comment.content
        
//     })
// }

function likePic(){
    // let likebtn = e.target
    let span = document.getElementsByClassName('likes')[0]
    // console.log(span)
    let likes = parseInt(span.innerText)
    span.innerText = `${++likes} Likes`

    fetch(endPoint, {
        method: 'PATCH',
        headers: 
        {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({
           'likes': likes
        })
    })


}

