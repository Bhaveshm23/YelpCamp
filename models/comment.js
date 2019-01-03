var mongoose   = require("mongoose");

var commentSchema =mongoose.Schema({
   
   text:String,
   author:{
      //for printing the name of user directly in the comment form
      id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
      },
      username:String
   }
});

module.exports=mongoose.model("Comment",commentSchema);