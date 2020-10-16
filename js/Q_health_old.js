/***********************/
/** HEARING QUESTIONs **/
/***********************/
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

var questionnaire_hearing_clarify_01 = {
	type: 'html-button-response',
	data: {designation: 'hear-survey', stimulus: 'hearing-problem-01'},
	choices: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
	prompt:'<p style="top:65%">(strongly disagree).........................................................................(strongly agree)</p>',
	stimulus: "<p>Because of hearing problems,<br>I tend to zone out of conversations.</p>",
	post_trial_gap: 250,
	on_finish: function(data){
		var resp = jsPsych.data.get().last(1).values()[0].button_pressed;
		jsPsych.data.addDataToLastTrial({QRESP: resp});
	}
};

var questionnaire_hearing_clarify_02 = {
	type: 'html-button-response',
	data: {designation: 'hear-survey', stimulus: 'hearing-problem-02'},
	choices: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
	prompt:'<p style="top:65%">(strongly disagree).........................................................................(strongly agree)</p>',
	stimulus: "<p>Because of hearing problems,<br>I tend to just nod and smile, but do not follow a conversation.</p>",
	post_trial_gap: 250,
	on_finish: function(data){
		var resp = jsPsych.data.get().last(1).values()[0].button_pressed;
		jsPsych.data.addDataToLastTrial({QRESP: resp});
	}
};

var questionnaire_hearing_clarify_03 = {
	type: 'html-button-response',
	data: {designation: 'hear-survey', stimulus: 'hearing-problem-03'},
	choices: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
	prompt:'<p style="top:65%">(strongly disagree).........................................................................(strongly agree)</p>',
	stimulus: "<p>Because of hearing problems,<br>I struggle staying engaged in a conversation.</p>",
	post_trial_gap: 250,
	on_finish: function(data){
		var resp = jsPsych.data.get().last(1).values()[0].button_pressed;
		jsPsych.data.addDataToLastTrial({QRESP: resp});
	}
};

var questionnaire_hearing_clarify_04 = {
	type: 'html-button-response',
	data: {designation: 'hear-survey', stimulus: 'hearing-problem-04'},
	choices: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
	prompt:'<p style="top:65%">(strongly disagree).........................................................................(strongly agree)</p>',
	stimulus: "<p>Because of hearing problems,<br>I sometimes miss so much of what is being said that I feel left out.</p>",
	post_trial_gap: 250,
	on_finish: function(data){
		var resp = jsPsych.data.get().last(1).values()[0].button_pressed;
		jsPsych.data.addDataToLastTrial({QRESP: resp});
	}
};

var questionnaire_hearing_clarify_05 = {
	type: 'html-button-response',
	data: {designation: 'hear-survey', stimulus: 'hearing-problem-05'},
	choices: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
	prompt:'<p style="top:65%">(strongly disagree).........................................................................(strongly agree)</p>',
	stimulus: "<p>Because of hearing problems,<br>I avoid going out if I expect the sound environment to be loud or noisy.</p>",
	post_trial_gap: 250,
	on_finish: function(data){
		var resp = jsPsych.data.get().last(1).values()[0].button_pressed;
		jsPsych.data.addDataToLastTrial({QRESP: resp});
	}
};

var questionnaire_hearing_clarify_06 = {
	type: 'html-button-response',
	data: {designation: 'hear-survey', stimulus: 'hearing-problem-06'},
	choices: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
	prompt:'<p style="top:65%">(strongly disagree).........................................................................(strongly agree)</p>',
	stimulus: "<p>Because of hearing problems,<br>I socialize less with other people.</p>",
	post_trial_gap: 250,
	on_finish: function(data){
		var resp = jsPsych.data.get().last(1).values()[0].button_pressed;
		jsPsych.data.addDataToLastTrial({QRESP: resp});
	}
};

var questionnaire_hearing_clarify_07 = {
	type: 'html-button-response',
	data: {designation: 'hear-survey', stimulus: 'hearing-problem-07'},
	choices: ["0%", "10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"],
	prompt:'',
	stimulus: "<p>How often do you zone out of conversations because of hearing problems?</p>",
	post_trial_gap: 250,
	on_finish: function(data){
		var resp = jsPsych.data.get().last(1).values()[0].button_pressed;
		jsPsych.data.addDataToLastTrial({QRESP: resp});
	}
};

var questionnaire_hearing_clarify_08 = {
	type: 'html-button-response',
	data: {designation: 'hear-survey', stimulus: 'hearing-problem-08'},
	choices: ["0%", "10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"],
	prompt:'',
	stimulus: "<p>How often do you avoid going out in public places because of hearing problems?</p>",
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
		questionnaire_hearing_clarify_03,
		questionnaire_hearing_clarify_04,
		questionnaire_hearing_clarify_05,
		questionnaire_hearing_clarify_06,
		questionnaire_hearing_clarify_07,
		questionnaire_hearing_clarify_08,
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