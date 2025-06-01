const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({

   courseName:{
    type:String,
    trim:true,
   },

   courseDescripction:{
    type:String,
    trim:true
   },

  instructor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },

  whatYouWillLurn:{
    type:String,
  },

  courseContent:[{

    type:mongoose.Schema.Types.ObjectId,
    ref:"Section"

  }],

  ratingAndReviews:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview"
    }
  ],

  price:{
    type:String,
  },
  thumbnail:{
    type:String,
  },
  tag:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Tag",
  },

  studentsEnrolled:[
    {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }
  ]

})

module.exports = mongoose.model("Course" , courseSchema)