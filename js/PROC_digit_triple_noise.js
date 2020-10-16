// -----------------------------------------------------------------------------------------------
// Digit triple in noise --> loosely related to SmitsC2004
//
// Use as follows:
// - call 'PROC_digit_triple_noise' in index.html
// - in jsPsych.init use: preload_audio: audioname_dt
//
// Requires:
// - audio_DT/*.mp3 files
// - jspsych plugins
// -----------------------------------------------------------------------------------------------


// get all stimulus information
var audio_DT_folder = "audio_DT/";
var audiotypeDT     = '.wav';

// SINinfo must have the same length as SNRlevels_SIN
var DTinfo = ["283", "165", "597", "479", "154", "852", "386", "451", "395", "756", "783", "475", "438", "539", "174", "872", "859", "671", "264", "645", "743", "843", "563", "315", "146", "518", "968", "236", "326", "521", "837", "681", "423", "425", "435", "487", "812", "823", "356", "581", "167", "194", "394", "245", "345", "915", "689", "834", "267", "572", "263", "971", "726", "763", "143", "983", "198", "932", "879", "456", "526", "163", "293", "692", "564", "284", "157", "132", "856", "641", "524", "382", "947", "476", "485", "413", "276", "649", "754", "516", "374", "317", "561", "714", "934", "627", "452", "416", "162", "974", "179", "291", "189", "829", "735", "891", "718", "631", "238", "483"];

// SNRlevels_SIN must have the same length as SINinfo
var DTsnrs = [
	{extn: "_SNRp15",   snrlevel: "15",    exptpart: "exp"},
	{extn: "_SNRp13.8", snrlevel: "13.8",  exptpart: "exp"},
	{extn: "_SNRp12.6", snrlevel: "12.6",  exptpart: "exp"},
	{extn: "_SNRp11.4", snrlevel: "11.4",  exptpart: "exp"},
	{extn: "_SNRp10.2", snrlevel: "10.2",  exptpart: "exp"},
	{extn: "_SNRp9",    snrlevel: "9",     exptpart: "exp"},
	{extn: "_SNRp7.8",  snrlevel: "7.8",   exptpart: "exp"},
	{extn: "_SNRp9",    snrlevel: "6.6",   exptpart: "exp"},
	{extn: "_SNRp9",    snrlevel: "5.4",   exptpart: "exp"},
	{extn: "_SNRp9",    snrlevel: "4.2",   exptpart: "exp"},
	{extn: "_SNRp9",    snrlevel: "3",     exptpart: "exp"},
	{extn: "_SNRp9",    snrlevel: "1.8",   exptpart: "exp"},
	{extn: "_SNRp9",    snrlevel: "0.6",   exptpart: "exp"},
	{extn: "_SNRm0.6",  snrlevel: "-0.6",  exptpart: "exp"},
	{extn: "_SNRm1.8",  snrlevel: "-1.8",  exptpart: "exp"},
	{extn: "_SNRm3",    snrlevel: "-3",    exptpart: "exp"},
	{extn: "_SNRm4.2",  snrlevel: "-4.2",  exptpart: "exp"},
	{extn: "_SNRm5.4",  snrlevel: "-5.4",  exptpart: "exp"},
	{extn: "_SNRm6.6",  snrlevel: "-6.6",  exptpart: "exp"},
	{extn: "_SNRm7.8",  snrlevel: "-7.8",  exptpart: "exp"},
	{extn: "_SNRm9",    snrlevel: "-9",    exptpart: "exp"},
	{extn: "_SNRm10.2", snrlevel: "-10.2", exptpart: "exp"},
	{extn: "_SNRm11.4", snrlevel: "-11.4", exptpart: "exp"},
	{extn: "_SNRm12.6", snrlevel: "-12.6", exptpart: "exp"},
	{extn: "_SNRm13.8", snrlevel: "-13.8", exptpart: "exp"},
	{extn: "_SNRm15",   snrlevel: "-15",   exptpart: "exp"},
];
var DTsnrs_shuffled = shuffle_array(DTsnrs);

var DTsnrs_training = [
	{extn: "_SNRp15",   snrlevel: "15",   exptpart: "train"},
	{extn: "_SNRp12.6", snrlevel: "12.6", exptpart: "train"},
];

var DT_instructions = {
	type: 'html-button-response',
	// TDDT
	// Edited the text.
	stimulus: '<p>You will now complete a <b>number-perception task</b>.</p>' + 
			  '<p>You will hear a sequence of three numbers (a "number triple") with background noise. ' +
			  '<strong>Your task:</strong> After each number triple, please use your keyboard to type the numbers you heard. ' + 
			  'The task will vary in difficulty. Some numbers will be harder to hear than others, so you may miss some numbers. Just try your best. There will not be any feedback.<br>' +
			  'This part of the study takes about 4 min. <p>' +
			  '<p>Click <b>BEGIN</b> when you are ready to start. </p>',
	choices: ['BEGIN'],
};

var DT_finish = {
	type: 'html-button-response',
	stimulus: '<p>Thank you. This completes the <b>number-perception task</b>.</p>',
	choices: ['CONTINUE'],
};

// select random subset of stimuli
var indexDT = linNum(0,1,DTinfo.length-1);
indexDT = shuffle_array(indexDT);


// add condition info
var DTinfo_selected = [];
var DTinfo_training = [];
headers = "triple, extn, snrlevel, exptpart";
for (var ii = 0; ii < DTsnrs_shuffled.length; ii++) {
	DTinfo_selected[ii]  = DTinfo[indexDT[ii]] + ", " + DTsnrs_shuffled[ii].extn + ", " + DTsnrs_shuffled[ii].snrlevel + ", " + DTsnrs_shuffled[ii].exptpart;
};
for (var ii = 0; ii < DTsnrs_training.length; ii++) {
	DTinfo_training[ii]  = DTinfo[indexDT[ii+DTsnrs_shuffled.length]] + ", " + DTsnrs_training[ii].extn + ", " + DTsnrs_training[ii].snrlevel + ", " + DTsnrs_training[ii].exptpart;
};

// convert to array of objects
var DT_stim_array = csv2json(DTinfo_selected, headers);
var DT_stim_array_training = csv2json(DTinfo_training, headers);

// establish array for audio files
var audioname_dt = [];
for (var ii = 0; ii < DT_stim_array.length; ii++) {
	audioname_dt.push(audio_DT_folder + DT_stim_array[ii].triple + DT_stim_array[ii].extn + audiotypeDT);
};
for (var ii = 0; ii < DT_stim_array_training.length; ii++) {
	audioname_dt.push(audio_DT_folder + DT_stim_array_training[ii].triple + DT_stim_array_training[ii].extn + audiotypeDT);
};

// short empty trial before stimulation starts
var empyt_trial_DT = {
	type: 'html-keyboard-response',
	stimulus: '<div style="font-size:60px;" tabindex="0"></div>',
	trial_duration: 2000,
	choices: jsPsych.NO_KEYS
};

// short fixation trial before sentence starts
var fixation_trial_DT = {
	type: 'html-keyboard-response',
	stimulus: '<div style="font-size:60px;" tabindex="0">+</div>',
	trial_duration: 400,
	choices: jsPsych.NO_KEYS
};


// trial to play
var DT_trial_play = {
	type: 'audio-keyboard-response',
	stimulus: function() {
		var stim = audio_DT_folder + jsPsych.timelineVariable('triple', true) + jsPsych.timelineVariable('extn', true) + audiotypeDT;
		return stim
	},
 	choices: jsPsych.NO_KEYS,
	prompt: '<div style="font-size:60px;" tabindex="0">+</div>',
	trial_ends_after_audio: true
};


// response trial
var DT_trial_response = {
	type: 'survey-text',
	questions: [{prompt: "", rows: 1, columns: 15, value: "", placeholder: "", name: "DIGIT"}],
	data: {
		triple: jsPsych.timelineVariable('triple'),
		extn: jsPsych.timelineVariable('extn'),
		snrlevel: jsPsych.timelineVariable('snrlevel'),
		exptpart: jsPsych.timelineVariable('exptpart'),
	},
	// TDDT
	// Edited the text.
	preamble: "<p><b>Please type the numbers you heard.</b></p>",
		
	on_finish: function(data) {
		var corr_answer = jsPsych.timelineVariable('triple', true);
		var answer = JSON.parse(data.responses).DIGIT;
		
		// get rid of spaces
		answer = answer.replace(/\s+/g, '');

		// check whether correct
		var gotitright = 0;
		if (corr_answer==answer) {
			gotitright = 1;
		}

		// store data
		jsPsych.data.addDataToLastTrial({
			designation: "DT-response",
			answer: answer,
			correct: gotitright,
		});
	},

	post_trial_gap: 250
};


// trial for presenting digits in noise
var DT_trial = {
	timeline: [fixation_trial_DT, DT_trial_play, DT_trial_response],
	timeline_variables: DT_stim_array,
	randomize_order: true
};


// training trial for presenting digits in noise
var DT_trial_training = {
	timeline: [fixation_trial_DT, DT_trial_play, DT_trial_response],
	timeline_variables: DT_stim_array_training,
	randomize_order: false
};

/******************************************************/
/** GET TIMELINE FOR FULL SPEECH IN NOISE EXPERIMENT **/
/******************************************************/
var PROC_digit_triple_noise = {
	timeline: [DT_instructions, empyt_trial_DT, DT_trial_training, DT_trial, DT_finish]
};
