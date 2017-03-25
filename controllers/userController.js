var config = require('./../config/main.json');
var _ = require('lodash');

var crypto = require('crypto');

var Q = require('q');
var mongoose = require('mongoose');

var Users = require('./../models/userModel.js');



//var mongo = require('mongoskin');
//var db = mongo.db(config.connectionString, { native_parser: true });
//db.bind('users');

var service = {};

service.userList = userList;
service.signup_aadhar_check = signup_aadhar_check;
service.signup_mobile_check = signup_mobile_check;
service.signup_email_check = signup_email_check;
service.signup = signup;

module.exports = service;

//---------------------------------------------------------------------


function signup_aadhar_check(id) {
     console.log('in controller '+id);
    var deferred = Q.defer();
    Users.findOne({aadhar_no : id},{_id:0,aadhar_no:1}, function (err, user) {
    if (err) deferred.reject(err);
        if (user) {
            // return user (without hashed password)
            deferred.resolve({"status":202,"Message":"user exist","data":user});
        } else {
            // user not found
            deferred.resolve({"status":200,"Message":"no user found","data":null});
        }
    });
    return deferred.promise;
}

function signup_mobile_check(mobile) {
     console.log('in controller '+mobile);
    var deferred = Q.defer();
    Users.findOne({ mobile : mobile },{_id:0,mobile:1}, function (err, user) {
    if (err) deferred.reject(err);
        if (user) {
            // return user (without hashed password)
            deferred.resolve({"status":202,"Message":"mobile exist","data":user});
        } else {
            // user not found
            deferred.resolve({"status":200,"Message":"no mobile number found","data":null});
        }
    });
    return deferred.promise;
}

function signup_email_check(email) {
     console.log('in controller '+email);
    var deferred = Q.defer();
    Users.findOne({ email : email },{_id:0,email:1}, function (err, user) {
    if (err) deferred.reject(err);
        if (user) {
            // return user (without hashed password)
            deferred.resolve({"status":202,"Message":"email exist","data":user});
        } else {
            // user not found
            deferred.resolve({"status":200,"Message":"no email found","data":null});
        }
    });
    return deferred.promise;
}

function signup(data) {
     console.log('in controller '+ data.email);

JSON[data.service] = null;
console.log(JSON.stringify(data));

    data.password = crypto.createHash('md5').update(data.password).digest("hex");
    var deferred = Q.defer();
    
    var user_data = new Users(data);

    //save model to MongoDB
    user_data.save(function (err) {
    if (err) {
	     deferred.reject({"status":202,"Message":err,"data":null});	
    }
    else {
  	    console.log("Post saved");
        deferred.resolve({"status":200,"Message":"data inserted","data":null});
    }

    });

  return deferred.promise;
}

function userList() {
    console.log('in controller');
   var deferred = Q.defer();
    Users.find({}, function (err, user) {
        if (err) deferred.reject(err);
        if (user) {
            // return user (without hashed password)
            deferred.resolve(user);
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

