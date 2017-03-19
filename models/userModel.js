var config = require('./../config/main.json');
var mongoose = require('mongoose');
var db = mongoose.connect(config['connectionString']);

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

// define a schema
var userSchema = new mongoose.Schema({
    "aadhar_no" :{
        type: String,
        trim: true,
        unique: true,
        required: 'addhar no is required'
    },
    "user_type" : String,
    "full_name" : String,
    "gender" : String,
    "address" : {
        "permanent" : {
            "landmark" : String,
            "loc" : String,
            "vtc" : String,
            "district" : String,
            "state" : String,
            "pincode" : String
        },
        "current" : {
            "landmark" : String,
            "loc" : String,
            "vtc" : String,
            "district" : String,
            "state" : String,
            "pincode" : String
        }
    },
    "profile_pic" : String,
    "email" : {
        type: String,
        trim: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please enter a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    "mobile" : {
        type: String,
        trim: true,
        unique: true,
        required: 'mobile number is required'
    },
    "password" : String,
    "prabhag" : String,
    "latitude" : String,
    "longitude" : String,
    "complaints" : Array,
    "reraise_complaint" : Array,
    "fcm_token" : String,
    "device_id" : String,
    "device_type" : String,
    "notification_count" : String,
    "created_on" : Date,
    "created_by" : String,
    "modified_on" : Date,
    "modified_by" : String,
    "modification_source_device" : String,
    "reset_password_id" : String,
    "reset_password_validity" : Date,
    "access_token" : String,
    "status" : String
});

// compile our model
module.exports = mongoose;
module.exports = mongoose.model('users', userSchema);
