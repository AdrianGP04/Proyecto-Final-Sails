/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var questionList = [];
var topicList = [];
var this_was_done_before = false;
var this_was_done_before_too = false;

function addpage (req, res) {
  console.log('we there brah');
  if (this_was_done_before === false ){
    Topic.find().exec((err,foundtops) => {
      if (err){
        console.log('Something went really wrong and the neither me or the developers know how 2 fix it, srry');
      }
      for (var ids of foundtops)
      {
        console.log('doin da pushes');
        topicList.push(ids.id);
      }
      console.log('am boutta make this never happen again frend, if i don com back something went wrong');
      this_was_done_before= true;
      console.log('now it wont happen again frend it worked!!!!!!!');
      return res.view('adminAdd', {
      topicList : topicList,
      });
      console.log('just loaded the view 4 da admin, i guess im bye');
    });
  }else {
    return res.view('adminAdd', {
    topicList : topicList,
    });
  }
}

function delpage (req, res) {
  if (this_was_done_before_too == false){
    Question.find().exec((err,foundquests) => {
      if (err){
        console.log('Something went really wrong and the neither me or the developers know how 2 fix it, srry (clear copy-paste evidence -just sayin-)');
      }
      for (var ids of foundquests)
      {
        questionList.push(ids.text);
      }
       this_was_done_before_too= true;
      if (this_was_done_before == true ){
        return res.view('delet', {
        topicList : topicList,
        questionList: questionList,
        });
      }else {
        Topic.find().exec((err,foundtops) => {
          if (err){
            console.log('Something went really wrong and the neither me or the developers know how 2 fix it, srry');
          }
          for (var ids of foundtops)
          {
            topicList.push(ids.id);
          }
          this_was_done_before= true;
          return res.view('delet', {
          topicList : topicList,
          questionList: questionList,
          });
        });
      }
    });
  }else {
    return res.view('delet', {
    topicList : topicList,
    questionList: questionList,
    });
  }
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
    questionList.push(req.body.Question);
    console.log(req.body.Question);
		return res.status(201).view('adminAdd', {
    topicList : topicList,
    });
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
  }).exec((err,user) => {
		if(err){
			return res.status(500).send('Error');
		}
    console.log('the questions are bye');
	});
  Topic.destroy({
  }).exec((err,user) => {
		if(err){
			return res.status(500).send('Error');
		}
    topicList.splice(0,topicList.length);
    questionList.splice(0,questionList.length);
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
    let name = Question.id;
    let index = 0;
    while (questionList[index] != name){
      index++;
    }
    questionList.splice(0,questionList.length);
    this_was_done_before_too= false;
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
		return res.status(201).redirect('/rm');
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
  Question.destroy({text: req.body.question,
  }).exec((err,user) => {
		if(err){
			return res.status(500).send('Error');
		}
    let index = 0;
    while (questionList[index] != req.body.question){
      index++;
    }
    questionList.splice(index,1);
    console.log("done");
		return res.status(201).view('delet', {
    topicList : topicList,
    questionList: questionList,
    });
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
