/*********************/
/** AUDIO QUESTIONS **/
/*********************/

var questionnaire_speaker_type = {
	type: 'survey-multi-choice',
	data: {designation: 'audio-survey', stimulus: 'speaker-type'},
	post_trial_gap: 250,
	questions: [{prompt: "What kind of audio setup did you use for this study?", options: ["Loudspeakers", "Headphones", "In-ear phones"]}],
	on_finish: function(data){
		var resp = JSON.parse(jsPsych.data.get().last(1).values()[0].responses).Q0; 
		jsPsych.data.addDataToLastTrial({QRESP: resp});	 
	}
};

// TDDT
// Changed response options to 7 point, bipolar scale
var questionnaire_speaker_quality = {
	type: 'html-button-response',
	data: {designation: 'audio-survey', stimulus: 'speaker-quality'},
	choices: ["extremely high", "moderately high", "slightly high", "neither high nor low", "slightly low", "moderately low", "extremely low"],
	// choices: ["0","1","2","3","4","5","6","7","8","9","10"],
	// prompt:'<p style="top:65%">(very low).........................................................................(very high)</p>',
	stimulus: "<p>How would you describe the <strong>quality</strong> of the loudspeakers/headphones/in-ear phones you used?</p>",
	post_trial_gap: 250,
	on_finish: function(data){
		var resp = jsPsych.data.get().last(1).values()[0].button_pressed;
		jsPsych.data.addDataToLastTrial({QRESP: resp});
	}
};

var Q_audiosetup = {
	timeline: [questionnaire_speaker_type, questionnaire_speaker_quality]
};
