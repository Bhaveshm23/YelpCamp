var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj ={};

middlewareObj.checkCampgroundOwnership=function(req,res,next){
      //is the user loggedin?
    if(req.isAuthenticated()){
            //is the user the owner of campground, then user is allowed to edit else not.
            //for checking the owner --> match the id of the author of campground with the current-user
            //if match then user is the owner of the campground,else not.
            
               Campground.findById(req.params.id,function(err,foundCampground){
                   if(err || !foundCampground){  //!foundCampground handles when we try to change the id of campground in url
                      req.flash("error", "Campground not found");
                      res.redirect("back");
                   } else{
                       //foundCampground.author.id -->mongoose Object
                       // user._id --> String 
                       // So we can use === to compare them
                       if(foundCampground.author.id.equals(req.user._id)){
                             next(); //will go to delete or edit or update   
                       }else{
                             req.flash("error", "You don't have permission to do that");
                           res.redirect("back");
                       }
                   }
              });   
        }else{
            req.flash("error","You need to be logged in to do that!");
            res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership=function(req,res,next){
      //is the user loggedin?
    if(req.isAuthenticated()){
            //is the user the owner of comment, then user is allowed to edit else not.
            //for checking the owner --> match the id of the author of comment with the current-user
            //if match then user is the owner of the comment,else not.
            
               Comment.findById(req.params.comment_id,function(err,foundComment){
                   if(err){
                      res.redirect("back");
                   } else{
                       //foundComment.author.id -->mongoose Object
                       // user._id --> String 
                       // So we can use === to compare them
                       if(foundComment.author.id.equals(req.user._id)){
                             next(); //will go to delete or edit or update   
                       }else{
                           req.flash("error", "You don't have permission to do that");
                           res.redirect("back");
                       }
                   }
              });   
    }else{
         req.flash("error","You need to be logged in to do that!");
        res.redirect("back");
    }
}

//Middleware
middlewareObj.isLoggedIn=function(req,res,next){
 if(req.isAuthenticated()){
     return next();
 }   
 req.flash("error","You need to be logged in to do that!");
 res.redirect("/login");
}




module.exports=middlewareObj;