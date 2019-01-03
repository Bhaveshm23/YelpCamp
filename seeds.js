var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");
var data= [
        {   
        name:"Cloud's Rest",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqh_-b9CLK0JLEpu3dKpf0ZlbVZwiGw_CSZk4-cH3p0ZZ3e38j0Q",
        description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
        },
        
        {   
        name:"ysgygygg",
        image:"https://acadiamagic.com/280x187/md-campground.jpg",
        description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
        },
        {   
        name:"VSGVSst",
        image:"https://media-cdn.tripadvisor.com/media/photo-s/01/2f/7f/03/campsite-16.jpg",
        description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
        }
    ];


//Remove all campgrounds
function seedDB(){
        Campground.remove({},function(err){
       
      if(err){
          console.log(err);
      }
      console.log("removed");
       
       
        //add few campgrounds
        data.forEach(function(seed){
            Campground.create(seed,function(err,campground){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("added campground");
                    //create comment
                    
                    Comment.create(
                        {
                            text:"This is an amazing place",
                            author:"DK"
                        },function(err,comment){
                            if(err){
                                console.log(err);
                            }else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created a new comment");
                            }
                        }
                    );
                }
            });
        });

    });
}


module.exports=seedDB;