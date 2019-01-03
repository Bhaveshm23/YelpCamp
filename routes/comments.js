var express = require("express");
var router =  express.Router({mergeParams:true}); //mergeParams for accessing the id which is adding a new comment to campground
var Campground = require("../models/campground");
var Comment    = require("../models/comment");
var middleware = require("../middleware");

//Comment New
router.get("/new",middleware.isLoggedIn,function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
    })
});
//Comments Create
router.post("/",middleware.isLoggedIn,function(req,res){
   
   //find campground by id
   Campground.findById(req.params.id,function(err,campground){ //campground --1
      if(err){
          console.log(err);
          res.redirect("/campgrounds");
      }else{
          Comment.create(req.body.comment,function(err,comment){  //req.body.comment gives us both text and author name as object. We have defined comment[text] and comment[author] in the comment form.
              if(err){
                  req.flash("error","Something went wrong!");
                  console.log(err);
              }else{
                    //add user and id to comment directly
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    //save comment
                    comment.save();
                    req.flash("success","Successfully Added Comment");
                    campground.comments.push(comment); // campground referes to above defined as --1
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
              }
          });
      }
   });
   //create a comment
   // connect new comment to campground
   //redirect to the campground show page
});

//EDIT COMMENT ROUTE
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req, res){
    Campground.findById(req.params.id,function(err,foundCampground){
       if(err || !foundCampground){
           req.flash("error","No campground found!");
           res.redirect("back");
       } 
       
      Comment.findById(req.params.comment_id, function(err, foundComment){
              if(err || !foundComment){
                  req.flash("error","Comment not found!"); // handles when we try to change the id of comment in url
                  res.redirect("back");
              } else {
                res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
              }
       });
    });
   
});

//COMMENT UPDATE
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
      if(err){
          res.redirect("back");
      }  else{
          res.redirect("/campgrounds/"+req.params.id);
      }
    });  
});

//COMMENT DELETE ROUTE
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
       if(err){
           res.redirect("back");
       } else{
           req.flash("success","Comment Deleted!"); 
           res.redirect("/campgrounds/"+req.params.id);
       }
    });
});

module.exports =router;