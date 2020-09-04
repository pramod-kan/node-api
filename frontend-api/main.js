const postsList=document.querySelector('.posts-list');
const url = 'http://localhost:3000/posts';
const addPostForm = document.querySelector('.add-post-form');
const titleValue=document.getElementById('title-value')
const bodyValue=document.getElementById('body-value')
let output='';


const renderPosts=(posts)=>{
    posts.forEach(post=>{
        output +=` <div class="card mt-4 col-md-6 bg-ligt " >
        <div class="card-body" data-id=${post._id} >
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${post.description}</p>
          <p class="card-">${post.date}</p>

          <a href="#" class="card-link" id="delete-post">Delete</a>
        </div>
      </div>
      `;
    });
    postsList.innerHTML=output;
}


//Get -Read posts
//Method :get

fetch(url)
.then(res => res.json())
.then(data =>renderPosts(data))


//Method delete post
postsList.addEventListener('click',(e)=>{
e.preventDefault();
let delButtonIsPressed=e.target.id =='delete-post'
let id = e.target.parentElement.dataset.id
//delete
if(delButtonIsPressed){
fetch(`${url}/${id}`,{
  method:'DELETE',
})
  .then(res=>res.json())
  .then(()=>location.reload())
}

});



//creat insert new post
addPostForm.addEventListener('submit',(e) => {
  e.preventDefault();

  fetch(url,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      title:titleValue.value,
      description:bodyValue.value
    })

  })
  .then(res => res.json())
  .then(data =>{
    const dataArray=[];
    dataArray.push(data);
    renderPosts(dataArray);
  })
})
addPostForm.reset(); 

