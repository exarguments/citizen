var config = require('./../config/main.json');
var express = require('express');
var router = express.Router();
var request = require('request');

var bodyParser = require('body-parser')

     
var userService = require('./../controllers/userController');

router.use( bodyParser.json() );

router.post('/',function(req,res){

        console.log(req.body.service);
        
        switch(req.body.service){
            case "signup uid check" : signup_aadhar_check(req,res);
                                    break;
            case "signup mobile check" : signup_mobile_check(req,res);
                                    break;
            case "signup" : signup(req,res); 
                                    break;
            case "login" : login(req,res);
            				break;
            default : res.send({"status":203,"message":"service name invalid","data":null});                        
        }
});

router.get('/', function(req,res){
    
});

module.exports = router;


function signup_aadhar_check(req,res){
    console.log("in routes");

    if(!req.body.aadhar_no || req.body.aadhar_no == null || req.body.aadhar_no == "" )
        res.send({"status":203,"message":"uid missing","data":null});

    userService.signup_aadhar_check(req.body.aadhar_no)
        .then(function (user) {
            res.send(user);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}


function signup_mobile_check(req,res){
    if(!req.body.uid || req.body.uid == null || req.body.uid == "" )
        res.send({"status":203,"message":"mobile number missing","data":null});

    console.log("in routes");
    userService.signup_mobile_check(req.body.mobile)
        .then(function (user) {
            res.send(user);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function signup_email_check(req,res){
    console.log("email " +req.body.email);
    if(!req.body.email || req.body.email == null || req.body.email == "" )
        res.send({"status":203,"message":"email id missing","data":null});

    console.log("in routes");
    userService.signup_email_check(req.body.email)
        .then(function (user) {
            res.send(user);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function signup(req,res){
    console.log("email " +req.body);

    if(!req.body || req.body == null || req.body == "" )
        res.send({"status":203,"message":"data invalid","data":null});

    console.log("in routes");
    userService.signup(req.body)
        .then(function (user) {
            res.send(user);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}


function login(req, res) {
	console.log("login");
	if(!req.body.username || req.body.username == null || req.body.username == "" )
        res.send({"status":203,"message":"data invalid","data":null});
}


function updateUser(req, res) {

}

function userList(req, res) {
    console.log('in route');
    userService.userList()
        .then(function (user) {
            res.send(user);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deleteUser(req, res) {

}

function getUserById(req, res) {

}