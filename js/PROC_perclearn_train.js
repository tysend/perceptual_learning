// -----------------------------------------------------------------------------------------------
// Digit triple in noise --> loosely related to SmitsC2004
//
// Use as follows:
// - call 'PROC_perclearn' in index.html
// - in jsPsych.init use: preload_audio: audioname_pl
//
// Requires:
// - audio_pl/*.mp3 files
// - jspsych plugins
// -----------------------------------------------------------------------------------------------


// get all stimulus information
var audio_PLTR_folder = "audio_pl/";
var audiotypePLTR     = '.wav';

// Information to create file name for stimuli
var PLTRversions = ["_v01", "_v02", "_v03"];
var PLTRblocks   = ["_t01"];
var PLTRlabels   = ["NoP", "P"];
var PLTRtrials   = [15, 15];


var PLTR_resp         = 0;
var PLTRblock_counter = 0;
var blNumInstructTR   = PLTRblock_counter + 1;

var PLTR_instructions = {
	type: 'html-button-response',
	// TDDT
	// Edited this text slightly.
	stimulus: '<p>You will now train for a <b>pattern-detection task</b>.</p>' + 
			  '<p>You will hear noise sounds, one at the time. Half of the noises contain a faint reoccurring structure, the other half do not. ' +
			  'It may feel like something faint is repeating in the noise.<br><br>' +
			  '<strong>Your task:</strong><br>After each noise, please indicate whether the noise contained a reoccurring structure or not.<br>' + 
			  'The task will be difficult, and you may sometimes be wrong. Please try your best. ' +
			  'You will receive feedback during the training.<br><br>' +
			  'There is only one training session and it takes approximately 3 minutes.<p>' +
			  // 'This is training block ' + blNumInstructTR.toString() + ' of ' + PLTRblocks.length.toString() + ' and takes about 3 min.<p>' +
			  '<p>Click <b>BEGIN</b> when you are ready to start. </p>',
	choices: ['BEGIN'],
};


// shuffle blocks and select one random version
PLTRblocks   = shuffle_array(PLTRblocks);
PLTRversions = shuffle_array(PLTRversions);
var PLTRvers = PLTRversions[0];

// function for padding
Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}

// get stimulus information
var PLTRinfo = [];
for (var bi = 0; bi < PLTRblocks.length; bi++) {
	var PLinfoTMP = [];
	headers = "condition, fname, version, block";
	for (var ii = 0; ii < PLTRtrials[0]; ii++) {
		var trialNum = (ii+1).pad(2);
		PLinfoTMP.push(PLTRlabels[0] + ", " + PLTRlabels[0] + trialNum + PLTRvers + PLTRblocks[bi] + ", " + PLTRvers.substr(2, 3) + ", " + PLTRblocks[bi].substr(2, 3));
	};
	for (var ii = 0; ii < PLTRtrials[1]; ii++) {
		var trialNum = (ii+1).pad(2);
		PLinfoTMP.push(PLTRlabels[1] + ", " + PLTRlabels[1] + trialNum + PLTRvers + PLTRblocks[bi] + ", " + PLTRvers.substr(2, 3) + ", " + PLTRblocks[bi].substr(2, 3));
	};
	PLTRinfo[bi] = shuffle_array(PLinfoTMP);
};


var PLTRinfo_array = [];
var audioname_pltrain = [];
for (var bi = 0; bi < PLTRblocks.length; bi++) {
	// convert to array of objects
	PLTRinfo_array[bi] = csv2json(PLTRinfo[bi], headers);

	// establish array for audio files
	for (var ii = 0; ii < PLTRinfo_array[bi].length; ii++) {
		audioname_pltrain.push(audio_PLTR_folder + PLTRinfo_array[bi][ii].fname + audiotypePLTR);
	};
};

// short empty trial before stimulation starts
var empyt_trial_PLTR = {
	type: 'html-keyboard-response',
	stimulus: '<div style="font-size:60px;" tabindex="0"></div>',
	trial_duration: 2000,
	choices: jsPsych.NO_KEYS
};

// short fixation trial before trial
var fixation_trial_PLTR = {
	type: 'html-keyboard-response',
	stimulus: '<div style="font-size:60px;" tabindex="0">+</div>',
	trial_duration: 300,
	choices: jsPsych.NO_KEYS
};


// trial to play
var PLTR_trial_play = {
	type: 'audio-keyboard-response',
	stimulus: function() {
		var stim = audio_PLTR_folder + jsPsych.timelineVariable('fname', true) + audiotypePLTR;
		return stim
	},
 	choices: jsPsych.NO_KEYS,
	prompt: '<div style="font-size:60px;" tabindex="0">+</div>',
	trial_ends_after_audio: true
};


// response trial
var PLTR_trial_response = {
	type: 'html-button-response',
	choices: ["Yes", "No"],
	stimulus: "Did the sound contain reoccurring structure?",
	margin_horizontal: '80px',
	margin_vertical: '30px',
	on_finish: function(data){
		var resp = jsPsych.data.get().last(1).values()[0].button_pressed;
		var con  = jsPsych.timelineVariable('condition', true);
		resp     = Math.round((Number(resp) - 1)*(-1));  // 1 - yes, 0 - no
		
		// get response coding
		var hit      = 0;
		var falarm   = 0;
		var correct  = 0;
		var Ppresent = 0;
		if (con == "NoP" && resp == 1) {
			falarm = 1;
		}
		if (con == "NoP" && resp == 0) {
			correct = 1;
		}
		if (con == "P") {
			Ppresent = 1;
		}
		if (con == "P" && resp == 1) {
			hit      = 1;
			correct  = 1;
		}

		// store correct/incorrect response for feedback
		PLTR_resp = correct;
		
		// store some information about the trial
		jsPsych.data.addDataToLastTrial({
			designation: "perclearn_training",
			QRESP: resp,
			condition: con,
			version: parseInt(jsPsych.timelineVariable('version', true)),
			block: parseInt(jsPsych.timelineVariable('block', true)),
			hit: hit,
			fa: falarm,
			correct: correct,
			Ppresent: Ppresent,
			fname: jsPsych.timelineVariable('fname', true)
		});	
	},
};


// feedback after each trial
var PLTR_trial_feedback = {
	type: 'html-button-response',
	choices: [],
	stimulus: function() {
		if (PLTR_resp == 1) {
			// TDDT
			// Changed font size.
			return '<p style="font-size: 40px; color:green"><strong>Correct</strong></p>';
		} else {
			return '<p style="font-size: 40px; color:red"><strong>Incorrect</strong></p>';
		}
	},
	// TDDT
	// I think the duration of the feedback word should be a bit longer. I tried changing each of these and it didn't affect the duration. What should be changed? In the headphone check script, it was trial_duration...
	stimulus_duration: 250,
	trial_duration: 250,
	post_trial_gap: 400,
};


// trial for presenting all stimuli of a block
var PLTR_trial = {
	timeline: [fixation_trial_PLTR, PLTR_trial_play, PLTR_trial_response, PLTR_trial_feedback],
	timeline_variables: PLTRinfo_array[PLTRblock_counter],
	randomize_order: true,
	on_finish: function(data) {
		PLTRblock_counter = PLTRblock_counter + 1; // increase block counter
		blNumInstructTR   = PLTRblock_counter + 1; // increase block counter for instruction
	}
};


/******************************************************/
/** GET TIMELINE FOR FULL EXPERIMENT                 **/
/******************************************************/
var PLTRtimeline = [];
for (var ii = 0; ii < PLTRblocks.length; ii++) {
	PLTRtimeline.push(PLTR_instructions, empyt_trial_PLTR, PLTR_trial);
};
var PROC_perclearn_train = {
	timeline: PLTRtimeline
};
