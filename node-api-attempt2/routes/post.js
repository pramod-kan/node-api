const express=require('express');
const router=express.Router();
const Post =require('../models/Post');

router.get('/',async(req,res)=>{
  try{
      const posts=await Post.find();
      res.json(posts)
      console.log("this is all the content from db" + posts)
  }
  catch(err){
    res.json({message:err}); 
  } 
     
}); 
//delete

router.delete('/:postId',async(req,res)=>{
  const removePost=await Post.remove({_id: req.params.postId})
  res.json(removePost)
})

//patch a post
router.patch('/:postId',async(req,res)=>{
  const updatePost=await Post.updateOne({_id: req.params.postId},{$set: {title:req.body.title} })
  res.json(updatePost)
}) 


router.get('/:postId',async(req,res)=>{
  try{
const post= await Post.findById(req.params.postId)
res.json(post)
}
catch(err){
  res.json({message:err})
}
})

router.post('/',(req,res)=>{
   const post = new Post({
       title: req.body.title,
       description: req.body.description
   });

   post.save()
   
   .then(data => {
       res.status(200).json(data);
   })
   .catch(err =>{
    res.json({
        message:err
    })
   })
})



module.exports=router;
