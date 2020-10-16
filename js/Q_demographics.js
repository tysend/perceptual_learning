/***************************/
/** DEMOGRAPHIC QUESTIONS **/
/***************************/

var scale_gender    = ["Female", "Male", "You do not have an option that describes me."];
var scale_education = ["Elementary school", "Less than Grade 12", "High school", "Some university undergraduate schooling", "College Degree (2 years)", "Bachelor's Degree", "Postgraduate Degree", "Other"];


var questionnaire_age = {
	type: 'survey-text',
	post_trial_gap: 250,
	questions: [{prompt: "How old are you (in years)?", rows:1, columns:5, name:'Q0', placeholder:""}],
	preamble: [''],
	data: {designation: 'demo-survey', stimulus: 'age'},
	on_finish: function(data){
		var resp = JSON.parse(jsPsych.data.get().last(1).values()[0].responses).Q0; 
		jsPsych.data.addDataToLastTrial({QRESP: resp});	 
	}
};

var questionnaire_gender = {
	type: 'survey-multi-choice',
	preamble: [''],
	data: {designation: 'demo-survey', stimulus: 'gender'},
	post_trial_gap: 250,
	questions: [{prompt: "In terms of gender, I identify as...", options: scale_gender}],
	on_finish: function(data){
		var resp = JSON.parse(jsPsych.data.get().last(1).values()[0].responses).Q0; 
		if (resp == "You do not have an option that describes me.") {
			gender_clarify = 1;
		} else {
			gender_clarify = 0;
		}
		jsPsych.data.addDataToLastTrial({QRESP: resp});	
	}
};

var questionnaire_gender_followup = {
  type: 'survey-text',
  data: {designation: 'survey', surveyQuestion: 'gender-clarify'},
  post_trial_gap: 250,
  questions: [{prompt: "Please briefly describe your gender identity if you wish.", rows:5, columns:40, placeholder:"", name:'GEN2'}],
  preamble: [''],
  on_finish: function(data){
	var resp = JSON.parse(jsPsych.data.get().last(1).values()[0].responses).GEN2; 
	jsPsych.data.addDataToLastTrial({QRESP: resp});	 
  }
};

var if_gender_clarify_node = {
    timeline: [questionnaire_gender_followup],
    conditional_function: function(){
        if(gender_clarify == 1){
            return true;
        } else {
            return false;
        }
    }
};

var questionnaire_handedness = {
	type: 'survey-multi-choice',
	data: {designation: 'demo-survey', stimulus: 'handedness'},
	post_trial_gap: 250,
	questions: [{prompt: "Which hand do you write with?", options: ["Right", "Left"]}],
	on_finish: function(data){
		var resp = JSON.parse(jsPsych.data.get().last(1).values()[0].responses).Q0; 
		jsPsych.data.addDataToLastTrial({QRESP: resp});	 
	}
};

var questionnaire_education = {
	type: 'survey-multi-choice',
	preamble: [''],
	data: {designation: 'demo-survey', stimulus: 'education'},
	post_trial_gap: 250,
	questions: [{prompt: "My highest level of education is...", options: scale_education}],
	on_finish: function(data) {
		var resp = JSON.parse(jsPsych.data.get().last(1).values()[0].responses).Q0; 
		jsPsych.data.addDataToLastTrial({QRESP: resp});	 
	}
};

var questionnaire_primary_language = {
	type: 'survey-text',
	data: {designation: 'demo-survey', stimulus: 'first-language'},
	post_trial_gap: 250,
	questions: [{prompt: "What is your first language?", placeholder:""}],
	preamble: [''],
	on_finish: function(data) {
		var resp = JSON.parse(jsPsych.data.get().last(1).values()[0].responses).Q0;
		jsPsych.data.addDataToLastTrial({QRESP: resp});	 
	}
};

var questionnaire_additional_languages = {
	type: 'survey-text',
	data: {designation: 'demo-survey', stimulus: 'add-languages'},
	post_trial_gap: 250,
	questions: [{prompt: "", placeholder: "LANGUAGE (FLUENCY)", value: "LANGUAGE (FLUENCY)"}],
	// TDDT
	// Edited the text and changed the scale to 5 point unipolar responses
	preamble: ['<p>Do you know any other language?</br>If yes, please also rate your degree of fluency (extremely, very, moderately, slightly, not at all)</br>' +
	           '<b>If you do not know any additional language, continue to the next question.</b></p>'],
	on_finish: function(data) {
		var resp = JSON.parse(jsPsych.data.get().last(1).values()[0].responses).Q0;
		jsPsych.data.addDataToLastTrial({QRESP: resp});	 
	}
};

//DEFINE THE DEMOGRAPHIC TIMELINE
var Q_demographics = {
	timeline: [
		questionnaire_age,
		questionnaire_gender,
		if_gender_clarify_node,
		questionnaire_handedness,
		questionnaire_education,
		questionnaire_primary_language,
		questionnaire_additional_languages
	]
};

