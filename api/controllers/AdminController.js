/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

function addQuestions (req, res){
  Question.create({
    text: req.body.Question,
    correctAnswer: req.body.CorrectAnswer,
    incorrectAnswers:[ req.body.incorrectAnswer1,
    req.body.incorrectAnswer2,
    req.body.incorrectAnswer3,],
    thematic: req.body.Thematic,
  }).exec((err,user) => {
		if(err){
			return res.status(500).send('Error');
		}
		return res.status(201).view('adminAdd');
	});
}

function addTopics (req, res){
  Topic.create({
    name: req.body.TopicName,
  }).exec((err,user) => {
		if(err){
			return res.status(500).send('Error');
		}
		return res.status(201).view('adminAdd');
	});
}

function seeQuestions(req, res){
 return Question.find()
   .then((foundQuestions) => {
     res.ok(foundQuestions)
   })
   .catch((err) =>{
     res.status(500).send("Something went wrong");
   });
}

function seeTopics(req, res){
 return Topic.find()
   .then((foundTopics) => {
     res.ok(foundTopics)
   })
   .catch((err) =>{
     res.status(500).send("Something went wrong");
   });
}

function rmAllTopics(req, res){
  Topic.destroy({
  }).exec((err,user) => {
		if(err){
			return res.status(500).send('Error');
		}
		return res.status(201).send("done");
	});
}

function rmTopic(req, res){
  Topic.destroy({id: req.body.Topicid,
  }).exec((err,user) => {
		if(err){
			return res.status(500).send('Error');
		}
		return res.status(201).send("done");
	});
}

function rmAllQuestions(req, res){
  Question.destroy({
  }).exec((err,user) => {
		if(err){
			return res.status(500).send('Error');
		}
		return res.status(201).send("done");
	});
}

function rmQuestion(req, res){
  Question.destroy({id: req.body.id,
  }).exec((err,user) => {
		if(err){
			return res.status(500).send('Error');
		}
		return res.status(201).send("done");
	});
}

module.exports = {
  addQuestions,
  addTopics,
  seeQuestions,
  seeTopics,
  rmAllQuestions,
  rmAllTopics,
  rmQuestion,
  rmTopic,
};
