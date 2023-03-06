/*
 * COMP229-015    Group 7
 * Group Project  Part 4 Final Release
 * Project Name:  Survey Donkey
 * 
 * Members (name/student ID):
 * Alina Fadeeva – 301249589
 * Nadia Velikaia – 301244426
 * Terence Chu – 301220117
 * Zhihao Yu – 301305633
 * Akash Arora – 300849838
 * Nithiyavany Vijai – 301212774
 * 
 * File name:     survey.js
 * Description:   Router for survey page, including create, delete, edit, take survey
*/

//express is used for all routing
let express = require('express');
const { removeData } = require('jquery');
let router = express.Router(); //A router object
let mongoose = require('mongoose'); //So that we can use mongoose commands
let jwt = require('jsonwebtoken');

let passport = require('passport');
// connect to our contacts Model

let surveyController = require('../controllers/survey');
// helper function for guard purposes

function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

//GET Route for the Surveys List page - this is the READ Operation
router.get('/', surveyController.displaySurveyList);

//GET Route for displaying the Add page - CREATE Operation
router.get('/add',requireAuth, surveyController.displayAddPage);

//POST Route for processing the Add page - CREATE Operation
router.post('/add',requireAuth, surveyController.processAddPage);

//GET Route for displaying the Add Short Answers page - CREATE Operation
router.get('/addShortAnswers', requireAuth, surveyController.displayAddShortAnswersPage);

//POST Route for processing the Add Short Answers page - CREATE Operation
router.post('/addShortAnswers', requireAuth, surveyController.processAddShortAnswersPage);

//GET Route for displaying the Edit page - UPDATE Operation
//Pass the information (specifically, id) from the surveys list to the edit page
//Search for the record with the id (from the parameters) and populate the edit page with the associated details
router.get('/edit/:id',requireAuth, surveyController.displayEditSurveyPage);

//POST Route for processing the Edit page - UPDATE Operation
router.post('/edit/:id',requireAuth, surveyController.processEditSurveyPage);

//GET Route to perform Deletion - DELETE Operation
//search for the particular id from the parameters
router.get('/delete/:id',requireAuth, surveyController.performDelete);

//GET Route for displaying the Edit page - UPDATE Operation
//Pass the information (specifically, id) from the surveys list to the edit page
//Search for the record with the id (from the parameters) and populate the edit page with the associated details
router.get('/takeSurvey/:id', surveyController.displayTakeSurveyPage);

//POST Route for processing the Edit page - UPDATE Operation
router.post('/takeSurvey/:id', surveyController.processTakeSurveyPage);

//GET Route for displaying of the results page - READ operation
router.get('/results/:title', requireAuth, surveyController.displaySurveyResultsPage);

//Build up configuration for the router above and export into one single package, so that app.js knows where to look
module.exports = router;