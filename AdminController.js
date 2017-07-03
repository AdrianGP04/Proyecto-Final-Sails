/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var questionList = [];
var topicList = [];

function addpage (req, res) {
  return res.view('adminAdd', {
  topicList : topicList,
  });
}

function delpage (req, res) {
  return res.view('delet', {
  topicList : topicList,
  questionList: questionList,
  });
}

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
		return res.status(201).view('adminAdd', {
    topicList : topicList,
    });
    questionList.push(Question.text);
	});
}

function addTopics (req, res){
  Topic.create({
    id: req.body.TopicName,
  }).exec((err,user) => {
		if(err){
			return res.status(500).send('Error');
		}
    topicList.push(req.body.TopicName);
    console.log(req.body.TopicName);
		return res.status(201).view('adminAdd', {
    topicList : topicList,
    });
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
  Question.destroy({
  });
  Topic.destroy({
  }).exec((err,user) => {
		if(err){
			return res.status(500).send('Error');
		}
    topicList.splice(0,topicList.length);
		return res.status(201).view('delet', {
    topicList : topicList,
    questionList: questionList,
    });
	});
}

function rmTopic(req, res){
  Question.destroy({Thematic : req.body.name
  }).exec((err,user) => {
		if(err){
			return res.status(500).send('Error');
		}
		console.log('Questions belonging to the topic have been removed');
  });
  Topic.destroy({id: req.body.name,
  }).exec((err,user) => {
		if(err){
			return res.status(500).send('Error');
		}
    let index = 0;
    while (topicList[index] != req.body.name){
      index++;
    }
    topicList.splice(index,1);
    console.log('topic removed');
		return res.status(201).view('delet', {
    topicList : topicList,
    questionList: questionList,
    });
	});
}

function rmAllQuestions(req, res){
  Question.destroy({
  }).exec((err,user) => {
		if(err){
			return res.status(500).send('Error');
		}
		return res.status(201).view('delet', {
    topicList : topicList,
    questionList: questionList,
    });
    questionList.splice(0,questionList.length);
	});
}

function rmQuestion(req, res){
  Question.destroy({text: req.body.text,
  }).exec((err,user) => {
		if(err){
			return res.status(500).send('Error');
		}
    let index = 0;
    while (questionList[index] != req.body.text){
      index++;
    }
    questionList.splice(index,1);
		return res.status(201).view('delet', {
    topicList : topicList,
    questionList: questionList,
    });
    console.log("done");
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
  addpage,
  delpage,
};
