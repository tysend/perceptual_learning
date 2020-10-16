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
var audio_PL_folder = "audio_pl/";
var audiotypePL     = '.wav';

// Information to create file name for stimuli
var PLversions = ["_v01", "_v02", "_v03", "_v04", "_v05", "_v06", "_v07", "_v08", "_v09", "_v10"];
var PLblocks   = ["_b01", "_b02"];
var PLlabels   = ["NoP", "P", "RP"];
var PLtrials   = [32, 16, 16];
// TDDT
// Just for testing blocks 1 & 2 scripts, this shortcut:
// var PLtrials = [1, 1, 1];


var PLblock_counter = 0;
var blNumInstruct   = PLblock_counter + 1;

var PL_instructions = {
	type: 'html-button-response',
	// TDDT
	// Edited the text. Removed the block counter. If we want it, it needs to go in function and timeline. Otherwise, returns 1 of 2 each time.
	stimulus: '<p>You will now complete the <b>pattern-detection task</b>.</p>' + 
			  '<p>You will hear noise sounds, one at the time. Half of the noises contain a faint reoccurring structure, the other half do not. ' +
			  'It may feel like something faint is repeating in the noise.<br><br>' +
			  '<strong>Your task:</strong><br>After each noise, please indicate whether the noise contained a reoccurring structure or not.<br>' + 
			  'The task will be difficulty, and you may sometimes be wrong. Please try your best. You will receive feedback after each attempt.<br><br>' +
			  'This are two sessions and each one takes about 6.5 minutes.<p>' +
			  '<p>Click <b>BEGIN</b> when you are ready to start. </p>',
	choices: ['BEGIN'],
};

var PL_finish = {
	type: 'html-button-response',
	// TDDT
	// Edited the text
	stimulus: '<p>Thank you for completing the pattern detection task. Click CONTINUE to proceed.</p>',
	choices: ['CONTINUE'],
};


// shuffle blocks and select one random version
PLblocks   = shuffle_array(PLblocks);
PLversions = shuffle_array(PLversions);
var PLvers = PLversions[0];

// function for padding
Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}

// get stimulus information
var PLinfo = [];
for (var bi = 0; bi < PLblocks.length; bi++) {
	var PLinfoTMP = [];
	headers = "condition, fname, version, block";
	for (var ii = 0; ii < PLtrials[0]; ii++) {
		var trialNum = (ii+1).pad(2);
		PLinfoTMP.push(PLlabels[0] + ", " + PLlabels[0] + trialNum + PLvers + PLblocks[bi] + ", " + PLvers.substr(2, 3) + ", " + PLblocks[bi].substr(2, 3));
	};
	for (var ii = 0; ii < PLtrials[1]; ii++) {
		var trialNum = (ii+1).pad(2);
		PLinfoTMP.push(PLlabels[1] + ", " + PLlabels[1] + trialNum + PLvers + PLblocks[bi] + ", " + PLvers.substr(2, 3) + ", " + PLblocks[bi].substr(2, 3));
	};
	for (var ii = 0; ii < PLtrials[2]; ii++) {
		var trialNum = (ii+1).pad(2);
		PLinfoTMP.push(PLlabels[2] + ", " + PLlabels[2] + trialNum + PLvers + PLblocks[bi] + ", " + PLvers.substr(2, 3) + ", " + PLblocks[bi].substr(2, 3));
	};
	PLinfo[bi] = shuffle_array(PLinfoTMP);
};


var PLinfo_array = [];
var audioname_pl = [];
for (var bi = 0; bi < PLblocks.length; bi++) {
	// convert to array of objects
	PLinfo_array[bi] = csv2json(PLinfo[bi], headers);

	// establish array for audio files
	for (var ii = 0; ii < PLinfo_array[bi].length; ii++) {
		audioname_pl.push(audio_PL_folder + PLinfo_array[bi][ii].fname + audiotypePL);
	};
};

// short empty trial before stimulation starts
var empyt_trial_PL = {
	type: 'html-keyboard-response',
	stimulus: '<div style="font-size:60px;" tabindex="0"></div>',
	trial_duration: 2000,
	choices: jsPsych.NO_KEYS
};

// short fixation trial before trial
var fixation_trial_PL = {
	type: 'html-keyboard-response',
	stimulus: '<div style="font-size:60px;" tabindex="0">+</div>',
	trial_duration: 300,
	choices: jsPsych.NO_KEYS
};


// trial to play
var PL_trial_play = {
	type: 'audio-keyboard-response',
	stimulus: function() {
		var stim = audio_PL_folder + jsPsych.timelineVariable('fname', true) + audiotypePL;
		return stim
	},
 	choices: jsPsych.NO_KEYS,
	prompt: '<div style="font-size:60px;" tabindex="0">+</div>',
	trial_ends_after_audio: true
};


// response trial
var PL_trial_response = {
	type: 'html-button-response',
	choices: ["Yes", "No"],
	stimulus: "Did the sound contain reoccurring structure?",
	margin_horizontal: '80px',
	margin_vertical: '30px',
	post_trial_gap: 400,
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
		if (con == "RP") {
			Ppresent = 2;
		}
		if (con == "P" && resp == 1) {
			hit      = 1;
			correct  = 1;
		}
		if (con == "RP" && resp == 1) {
			hit      = 1;
			correct  = 1;
		}

		// TDDT
		// Added for feedback
		PL_resp = correct;

		jsPsych.data.addDataToLastTrial({
			designation: "perclearn",
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

// TDDT
// Inserting feedback (taken from PROC_perclearn_train.js)
// feedback after each trial
var PL_trial_feedback = {
	type: 'html-button-response',
	choices: [],
	stimulus: function() {
		if (PL_resp == 1) {
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
var PL_trial = {
	timeline: [fixation_trial_PL, PL_trial_play, PL_trial_response, PL_trial_feedback],
	timeline_variables: PLinfo_array[PLblock_counter],
	randomize_order: true,
	on_finish: function(data) {
		// TDDT
		// testing
		// console.log('PLblock_counter before: ', PLblock_counter);
		PLblock_counter = PLblock_counter + 1; // increase block counter
		// TDDT
		// testing
		// console.log('PLblock_counter between: ', PLblock_counter);
		blNumInstruct   = PLblock_counter + 1; // increase block counter for instruction
		//TDDT
		// The second block did not say 2, so I'm trying to see if it changed here or not.
		// console.log('PLblock_counter after: ', PLblock_counter);
		// console.log('blNumInstruct: ', blNumInstruct);
	}
};


/******************************************************/
/** GET TIMELINE FOR FULL EXPERIMENT                 **/
/******************************************************/
var PLtimeline = [];
for (var ii = 0; ii < PLblocks.length; ii++) {
	PLtimeline.push(PL_instructions, empyt_trial_PL, PL_trial);
};
PLtimeline.push(PL_finish);
var PROC_perclearn = {
	timeline: PLtimeline
};
