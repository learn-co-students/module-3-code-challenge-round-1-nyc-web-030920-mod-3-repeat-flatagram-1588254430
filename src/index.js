document.addEventListener("DOMContentLoaded", () => { 
    const imageUrl = "http://localhost:3000/image"
    headers = { 
        "Content-Type" : "application/json", 
        "Accept" : "application/json"
    }
    const commentButton = document.querySelector(".comment-button")
    const commentForm = document.querySelector(".comment-form")

    fetchImages()
    buttonSetup()

    function fetchImages() { 
        fetch(imageUrl)
            .then(resp => resp.json())
            .then(imageObj => renderImage(imageObj))
    }

    function renderImage(imageObj) { 
        const title = document.querySelector("h2") // .textcontent
        const imageUrl = document.querySelectorAll("img")[1] // .src
        const likes = document.querySelector("span") // .textcontent
        const commentUl = document.querySelector("ul")

        title.textContent = `${imageObj.title}`
        imageUrl.src = `${imageObj.image}`
        likes.textContent = `${imageObj.likes} likes`
  
        commentUl.innerHTML = ""

        imageObj.comments.forEach(comment => {
            const commentLi = document.createElement("li")
            
            commentLi.innerHTML += `stevenDoranDoran: ${comment.content}`

            commentUl.append(commentLi)
        })        
    }  
    
    function buttonSetup() { 
        const heartButton = document.querySelector(".like-button")                
        const commentForm = document.querySelector(".comment-form")

        heartButton.addEventListener("click", (e) => {
            if (e.target.className === "like-button") {
                let currentLikeCount = document.querySelector("span").textContent.split("")[0]
                let newLikeCount = parseInt(currentLikeCount) + 1
                currentLikeCount = newLikeCount

                console.log(e.target.parentNode.innerText)
                
                fetch(imageUrl, {
                    method: "PATCH",
                    headers, 
                    body: JSON.stringify({likes: currentLikeCount})
                })
                .then(e.target.parentNode.innerText = `${currentLikeCount} likes`)                
            
        }

        
    })
    }

    commentForm.addEventListener("submit", (e) => {
        event.preventDefault();
        const commentUl = document.querySelector("ul")
        const commentLi = document.createElement("li")
        
        commentLi.innerHTML += `stevenDoranDoran: ${e.target.comment.value}`

        commentUl.append(commentLi) 
    })

})