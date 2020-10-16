/*********************/
/** MUSCI QUESTIONS **/
/*********************/

// TDDT
// Edited question and choices
var questionnaire_music = {
	type: 'html-button-response',
	data: {designation: 'music-survey', stimulus: 'music-skill'},
	choices: ["not at all skilled", "slightly skilled", "moderately skilled", "very skilled", "extremely skilled"],
	// prompt:'<p style="top:65%">(not skilled/experienced)................................(highly skilled/experienced)</p>',
	stimulus: "<p>How would you describe your musical skills/experience?</p>",
	post_trial_gap: 250,
	on_finish: function(data){
		var resp = jsPsych.data.get().last(1).values()[0].button_pressed;
		resp = Number(resp) + 1; //make the response 1-6 scale
		jsPsych.data.addDataToLastTrial({QRESP: resp});
	}
};

var questionnaire_instrument = {
	type: 'survey-multi-choice',
	data: {designation: 'music-survey', stimulus: 'music-instrument'},
	post_trial_gap: 250,
	questions: [{prompt: "Have you ever been trained on (or taught yourself) a musical instrument?", options: ["No", "Yes"]}],
	on_finish: function(data){
		var resp = JSON.parse(jsPsych.data.get().last(1).values()[0].responses).Q0; 
		if (resp == "Yes") {
			music_clarify = 1;
		} else {
			music_clarify = 0;
		}
		jsPsych.data.addDataToLastTrial({QRESP: resp});	
	}
};

var questionnaire_instrument_clarify = {
	type: 'survey-text',
	data: {designation: 'music-survey', stimulus: 'music-training-yrs'},
	post_trial_gap: 250,
	questions: [{prompt: "For how many years did you play a musical instrument?", placeholder:"", name:"MEXP"}],
	on_finish: function(data){
		var resp = JSON.parse(jsPsych.data.get().last(1).values()[0].responses).MEXP; 
		jsPsych.data.addDataToLastTrial({QRESP: resp});	
	}
};

var if_instrument_node = {
	timeline: [questionnaire_instrument_clarify],
	conditional_function: function(){
		if(music_clarify == 1){
			return true;
		} else {
			return false;
		}
	}
};

//DEFINE THE MUSIC TIMELINE
var Q_music = {
	timeline: [questionnaire_music, questionnaire_instrument, if_instrument_node]
};
