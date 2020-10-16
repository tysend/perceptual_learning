/*********************/
/** HEADPHONE CHECK **/
/*********************/

audioname_headphone_check = [
	'audio/t1_1.mp3',
	'audio/t1_2.mp3',
	'audio/t2_1.mp3',
	'audio/t2_2.mp3',
	'audio/t3_1.mp3',
	'audio/t3_2.mp3'
];

// short test to check whether participants are wearing headphones headphone check 
var headphone_check_inst = {
	type: 'html-button-response',
	stimulus: "<p>You will now complete a short headphone check.</p>" +
		"<p>On each trial, you will hear three tones. One of these tones will be quieter than the others.<br>" +
		" Your task is to identify whether the quiet tone occurred first, second, or third.</p>" + 
		"<p>There are six trials in total.</p>",
	choices: [' '],
	choices: ['BEGIN'],
	post_trial_gap: 250
};

var headphone_check = {
	timeline: [
		{ // fixation cross marking the beginning of a trial
			type: 'html-keyboard-response',
			stimulus: '<div style="font-size:60px;">+</div>',
			choices: jsPsych.NO_KEYS,
			trial_duration: 500
		},

        { // playing a sound and response
			type: 'audio-button-response',
			stimulus: jsPsych.timelineVariable('headphone_stim'),
			prompt: '<div style="font-size:60px;">+</div>',
			choices: [],
			trial_ends_after_audio: true
		},

		{ // playing a sound and response
			type: 'html-button-response',
			stimulus: '<p>Which tone was the quietest?</p>',
			choices: ['FIRST', 'SECOND', 'THIRD'],
			data: { correctRESP: jsPsych.timelineVariable('correctRESP') },
			on_finish: function(data){
				if(data.button_pressed == data.correctRESP){
					data.correct = 1;
				} else {
					data.correct = 0;
				}
				jsPsych.data.addDataToLastTrial({
					designation: "headphone-test"
				});	
			}
		},

		{ // feedback
		type: 'html-keyboard-response',
		// TDDT
		// Extended duration from 500 to 1000
		trial_duration: 1000,
		stimulus: function(){
			var last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
				if(last_trial_correct){
					// TDDT
					// Changed font size and color and made bold.
					return '<p style= "font-size: 40px; color:green;"><strong>Correct</strong></p>';
				} else {
					// TDDT
					// Changed font size and color and made bold.
					return '<p style= "font-size: 40px; color:red;"><strong>Incorrect</strong></p>';
				}
			}
		}	   
    ],
    timeline_variables: [
        { headphone_stim: 'audio/t1_1.mp3', correctRESP: 0 },
		{ headphone_stim: 'audio/t1_2.mp3', correctRESP: 0 },
		{ headphone_stim: 'audio/t2_1.mp3', correctRESP: 1 },
		{ headphone_stim: 'audio/t2_2.mp3', correctRESP: 1 },
		{ headphone_stim: 'audio/t3_1.mp3', correctRESP: 2 },
		{ headphone_stim: 'audio/t3_2.mp3', correctRESP: 2 }
    ],
	randomize_order: true
};

var PROC_headphone_check = {
	timeline: [headphone_check_inst, headphone_check]
};
