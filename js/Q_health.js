/***********************/
/** HEARING QUESTIONs **/
/***********************/

var hearing_scale = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
var hearing_quest = [
	{code: 'Z01', question: '<p>Sometimes I miss so much of what is being said that I feel left out.</p>'},
	{code: 'Z02', question: '<p>In loud or noisy environments, I often just nod and smile, but do not follow a conversation.</p>'},
	{code: 'Z03', question: '<p>I often miss so much of a conversation that I "switch off".</p>'},
	{code: 'A01', question: '<p>I avoid public places, such as restaurants, cafes, or bars, because I find them too loud or noisy.</p>'},
	{code: 'A02', question: '<p>I would rather not go if I expect the sound environment to be loud or noisy.</p>'},
	{code: 'A03', question: '<p>I avoid being in loud or noisy social settings.</p>'},
	{code: 'I01', question: '<p>I enjoy conversations with friends/family.</p>'},
	{code: 'I02', question: '<p>I am a social person.</p>'},
	{code: 'I03', question: '<p>Hanging out with people is important to me.</p>'},
	{code: 'B01', question: '<p>I find it hard to entertain myself.</p>'},
	{code: 'B02', question: '<p>I do not feel motivated by most things that I do.</p>'},
	{code: 'B03', question: '<p>In most situations, it is hard for me to find something that keeps me interested.</p>'}
];


// presenation details
var hearing = {
	type: 'html-button-response',
	choices: hearing_scale,
	prompt: function() {return '<p style="top:65%">(strongly disagree).........................................................................(strongly agree)</p>';},
	stimulus: function() {return jsPsych.timelineVariable('question', true);},
	post_trial_gap: 250,
	on_finish: function(data){
		var resp  = jsPsych.data.get().last(1).values()[0].button_pressed;
		var qcode = jsPsych.timelineVariable('code', true);	
	
		jsPsych.data.addDataToLastTrial({
			designation: "hear-survey",
			QRESP: resp,
			stimulus: qcode
		});	 
	}
};

// wrap in program
var hearing_proc = {
	timeline: [hearing],
	timeline_variables: hearing_quest,
	randomize_order:true
};

var questionnaire_hearing_aid = {
	type: 'survey-multi-choice',
	data: {designation: 'hear-survey', stimulus: 'hearing-aid'},
	post_trial_gap: 250,
	questions: [{prompt: "Do you wear a hearing aid?", options: ["No", "Right Ear", "Left Ear", "Both Ears"]}],
	on_finish: function(data){
		var resp = JSON.parse(jsPsych.data.get().last(1).values()[0].responses).Q0; 
		jsPsych.data.addDataToLastTrial({QRESP: resp});	 
	}
};

// TDDT
// Edited question choices
var questionnaire_hearing_clarify_01 = {
	type: 'html-button-response',
	data: {designation: 'hear-survey', stimulus: 'hearing-general'},
	choices: ["extremely bad", "moderately bad", "slightly bad", "neither bad nor good", "slightly good", "moderately good", "extremely good"],
	// prompt:'<p style="top:65%">(very poor).........................................................................(very good)</p>',
	stimulus: "<p>How would you rate your general hearing abilities?</p>",
	post_trial_gap: 250,
	on_finish: function(data){
		var resp = jsPsych.data.get().last(1).values()[0].button_pressed;
		jsPsych.data.addDataToLastTrial({QRESP: resp});
	}
};

// TDDT
// Changed question and responses
var questionnaire_hearing_clarify_02 = {
	type: 'html-button-response',
	data: {designation: 'hear-survey', stimulus: 'hearing-problem'},
	choices: ["never", "sometimes", "about half of the time", "most of the time", "always"],
	// prompt:'<p style="top:65%">(strongly disagree).........................................................................(strongly agree)</p>',
	stimulus: "<p>How often do you experience hearing problems?</p>",
	post_trial_gap: 250,
	on_finish: function(data){
		var resp = jsPsych.data.get().last(1).values()[0].button_pressed;
		jsPsych.data.addDataToLastTrial({QRESP: resp});
	}
};


var questionnaire_ringing_ears = {
	type: 'survey-multi-choice',
	data: {designation: 'hear-survey', stimulus: 'ringing-ears'},
	post_trial_gap: 250,
	questions: [{prompt: "Do you have ringing in your ears?", options: ["Never", "Sometimes", "Always"]}],
	on_finish: function(data){
		var resp = JSON.parse(jsPsych.data.get().last(1).values()[0].responses).Q0; 
		if (resp == "Never") {
			ringing_clarify = 0;
		} else {
			ringing_clarify = 1;
		}
		jsPsych.data.addDataToLastTrial({QRESP: resp});	 
	}
};

var questionnaire_ringing_clarify = {
	type: 'survey-multi-choice',
	data: {designation: 'hear-survey', stimulus: 'ringing-ear-loc'},
	post_trial_gap: 250,
	questions: [{prompt: "Which ear(s)?", options: ["Both Ears", "Right Ear", "Left Ear"]}],
	on_finish: function(data){
		var resp = JSON.parse(jsPsych.data.get().last(1).values()[0].responses).Q0; 
		jsPsych.data.addDataToLastTrial({QRESP: resp});	 
	}
};

var if_ringing_node = {
	timeline: [questionnaire_ringing_clarify],
	conditional_function: function(){
        if(ringing_clarify == 1){
            return true;
        } else {
            return false;
        }
    }
};

var questionnaire_earinfection = {
	type: 'survey-multi-choice',
	data: {designation: 'hear-survey', stimulus: 'ear-infection'},
	post_trial_gap: 250,
	questions: [{prompt: "Do you often get ear infections?", options: ["No", "Yes"]}],
	on_finish: function(data){
		var resp = JSON.parse(jsPsych.data.get().last(1).values()[0].responses).Q0; 
		jsPsych.data.addDataToLastTrial({QRESP: resp});	
	}
};

var questionnaire_neuro = {
	type: 'survey-multi-choice',
	data: {designation: 'neuro-survey', stimulus: 'neuro-disease'},
	post_trial_gap: 250,
	questions: [{prompt: "Have you ever had any neurological diseases?", options: ["No", "Yes"]}],
	on_finish: function(data){
		var resp = JSON.parse(jsPsych.data.get().last(1).values()[0].responses).Q0; 
		if (resp == "Yes") {
			neuro_clarify = 1;
		} else {
			neuro_clarify = 0;
		}
		jsPsych.data.addDataToLastTrial({QRESP: resp});	
	}
};

var questionnaire_neuro_clarify = {
	type: 'survey-text',
	data: {designation: 'neuro-survey', stimulus: 'neuro-disease-clarify'},
	post_trial_gap: 250,
	questions: [{prompt: "Please specify what kind(s) of neurological disease:", placeholder:"", name:'ND2'}],
	on_finish: function(data){
		var resp = JSON.parse(jsPsych.data.get().last(1).values()[0].responses).ND2; 
		jsPsych.data.addDataToLastTrial({QRESP: resp});	
	}

};

var if_neuro_node = {
	timeline: [questionnaire_neuro_clarify],
	conditional_function: function(){
        if(neuro_clarify == 1){
            return true;
        } else {
            return false;
        }
    }
};

var questionnaire_meds = {
	type: 'survey-multi-choice',
	data: {designation: 'health-survey', stimulus: 'take-meds'},
	post_trial_gap: 250,
	questions: [{prompt: "Do you presently take any medication on a regular basis?</br>(e.g., prescriptions for hypertension, anxiety, depression, diabetes, etc.)", options: ["No", "Yes"]}],
	on_finish: function(data){
		var resp = JSON.parse(jsPsych.data.get().last(1).values()[0].responses).Q0; 
		if (resp == "Yes") {
			meds_clarify = 1;
		} else {
			meds_clarify = 0;
		}
		jsPsych.data.addDataToLastTrial({QRESP: resp});		
	}
};

var questionnaire_meds_clarify = {
	type: 'survey-text',
	data: {designation: 'health-survey', stimulus: 'take-meds-clarify'},
	post_trial_gap: 250,
	questions: [{prompt: "Please describe the medication(s) you are currently taking:", placeholder:"", name:"MED"}],
	on_finish: function(data){
		var resp = JSON.parse(jsPsych.data.get().last(1).values()[0].responses).MED; 
		jsPsych.data.addDataToLastTrial({QRESP: resp});	
	}

};

var if_meds_node = {
	timeline: [questionnaire_meds_clarify],
	conditional_function: function(){
        if(meds_clarify == 1){
            return true;
        } else {
            return false;
        }
    }
};

var questionnaire_depression = { // Dawes et al. 2015 PLoS ONE, Whooley et al. 1997 Journal of General Internal Medicine
	type: 'survey-multi-choice',
	data: {designation: 'depress-survey', stimulus: 'depression01'},
	questions: [{prompt: "Over the past month, how often have you felt down, depressed or hopeless?",
				 options: ["Not at all", "Several days", "More than half the days", "Nearly every day", "Prefer not to answer"]}],
	post_trial_gap: 250,
	on_finish: function(data){
		var resp = JSON.parse(jsPsych.data.get().last(1).values()[0].responses).Q0; 
		jsPsych.data.addDataToLastTrial({QRESP: resp});	
	}
};

var questionnaire_loneliness = { // Dawes et al. 2015 PLoS ONE
	type: 'survey-multi-choice',
	data: {designation: 'loneliness-survey', stimulus: 'loneliness01'},
	questions: [{prompt: "Do you often feel lonely?",
				 options: ["Yes", "No", "Prefer not to answer"]}],
	post_trial_gap: 250,
	on_finish: function(data){
		var resp = JSON.parse(jsPsych.data.get().last(1).values()[0].responses).Q0; 
		jsPsych.data.addDataToLastTrial({QRESP: resp});	
	}
};

var health_concerns = {
	type: 'survey-text',
	data: {designation: 'health-survey', stimulus: 'health-concerns'},
	post_trial_gap: 250,
	questions: [{prompt: "If you think that we should know of any other health problem that may affect your participation in the study,</br>please use the space provided below to clarify.", rows:5, columns:40, placeholder:"", name:"HC"}],
	on_finish: function(data){
		var resp = JSON.parse(jsPsych.data.get().last(1).values()[0].responses).HC; 
		jsPsych.data.addDataToLastTrial({QRESP: resp});	
	}
};

//DEFINE THE LANGUAGE,EAR,HEALTH TIMELINE
var Q_health = {
	timeline: [
		questionnaire_hearing_aid,
		questionnaire_hearing_clarify_01,
		questionnaire_hearing_clarify_02,
		hearing_proc,
		questionnaire_ringing_ears,
		if_ringing_node,
		questionnaire_neuro,
		if_neuro_node,
		questionnaire_meds,
		if_meds_node,
		questionnaire_depression,
		questionnaire_loneliness,
		health_concerns
	]
};