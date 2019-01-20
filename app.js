require('dotenv').config();
var express       =    require("express"),
    app           =    express(),
    bodyParser    =    require("body-parser"),
    mongoose      =    require("mongoose"),
    flash         =    require("connect-flash"),
    passport      =    require("passport"),
    methodOverride=    require("method-override"),
    LocalStrategy =    require("passport-local"), 
    Campground    =    require("./models/campground"),
    Comment       =    require("./models/comment"),
    Review        =    require("./models/review"),
    User          =    require("./models/user"),
    seedDB        =    require("./seeds")
   
 
//mongoose.connect("mongodb://localhost/yelp_camp"); //local db name=yelp_camp
mongoose.connect("mongodb://Bhavesh:Bm23051997@ds257640.mlab.com:57640/yelpcamp"); //mongoLab db name=yelpcamp

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(flash());
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));  //for using the stylesheet
//seedDB(); //seed the database

//requiring routes
var campgroundRoutes  = require("./routes/campgrounds"),
    commentRoutes     = require("./routes/comments"),
    reviewRoutes      = require("./routes/reviews"),
    indexRoutes       = require("./routes/index");
    
//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret:"I am the best",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//this middleware is for getting the current user for every page 
app.use(function(req,res,next){
   res.locals.currentUser = req.user;
   res.locals.error   = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

//Using the routes
app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes); //Append /campgrounds to all the campground routes at starting
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds/:id/reviews",reviewRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});