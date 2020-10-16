// -----------------------------------------------------------------------------------------------
// Auditory Backward Digit Span Task
//
// Use as follows:
// - call 'PROC_auditory_digit_span' in index.html
// - in jsPsych.init use: preload_audio: audioname_ds
//
// Requires:
// - audio_DS/*.wav files
// - jspsych plugins
// -----------------------------------------------------------------------------------------------


/**********************************/
/** User Settings                **/
/**********************************/
var dsType       = 'forward';              // 'backward' or 'forward'
var dsFolder     = "audio_DS/";            // folder name for storing the audio files
var startingSpan = 4;                      // where we begin in terms of span
var dsMaxRev     = 8;                      // total number of desired trials
var dsDigitList  = [1,2,3,4,5,6,7,8,9];    // digits to be used (unlikely you will want to change this)
var dsFileMap = {                          // maps digits to files in dsFolder
	1: dsFolder + "1.wav",
	2: dsFolder + "2.wav",
	3: dsFolder + "3.wav",
	4: dsFolder + "4.wav",
	5: dsFolder + "5.wav",
	6: dsFolder + "6.wav",
	7: dsFolder + "7.wav",
	8: dsFolder + "8.wav",
	9: dsFolder + "9.wav"
};


/**********************************/
/** Main Variables and Functions **/
/**********************************/
var curSpan         = startingSpan;
var dsPreAns        = 2; // previous answer incorrect (0) vs correct (1); 2 - does not assume anything
var dsNrev          = 0; // number of reversals
var AllDigitsPlayed = 0;
var dsDigitIdx      = 0;  // for indexing the current letter to be presented
var dsCurList       = [];
var dsCorrectAns;
getStimuli(curSpan);


// auditory stimuli for preloading
var audioname_ds = [];
for (var ii = 0; ii < dsDigitList.length; ii++) {
	audioname_ds[ii] = dsFileMap[dsDigitList[ii]];
}

// function to shuffle an array (Fisher-Yates)
function shuffle(a) {
	var j, x, i;
	for (i = a.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
	return a;
}

// function to get digit list for a trial
function getDigitList(len) {
	var shuff_final = [];
	for (var ii=0; ii<len; ii++) { // overkill, but works
		shuff_final = [...shuff_final, ...shuffle(dsDigitList)];
	}
	return shuff_final.slice(0,len); //array to hold the final digits
}

// function to push the stimuli to an array
function getStimuli(numDigits) {
	dsCurList = [];	
	var digits = getDigitList(numDigits);
	for (var ii = 0; ii < digits.length; ii += 1) {
		dsCurList.push(dsFileMap[digits[ii]]);
	}
	var revDigits = digits.slice().reverse(); // this is the reversed array for assessing performance
	dsCorrectAns  = digits.toString();
	if (dsType == 'backward') {
		dsCorrectAns = revDigits.toString();
	}
	dsCorrectAns = dsCorrectAns.replace(/,/g, '');
}

// trial to play
var ds_play = {
	type: 'audio-keyboard-response',
	stimulus: function() {
		return dsCurList[dsDigitIdx];
	},
 	choices: jsPsych.NO_KEYS,
	post_trial_gap: 250,
	trial_ends_after_audio: true,
	on_finish: function() {
		dsDigitIdx++;
		AllDigitsPlayed = 0;
		if (dsDigitIdx == dsCurList.length) { // end of list reached
			AllDigitsPlayed = 1;
			dsDigitIdx     = 0;
		}
	}
};

// loop trial to play all digits
var ds_play_screen = {
	timeline: [ds_play],
	loop_function: function() {
		if (AllDigitsPlayed == 0) {
			return true;
		} else {
			AllDigitsPlayed = 0;
			return false;
		}
	}
}

// instructions for response on each trial
// TDDT
// Edited the text slightly.
var ds_trial_instructions = "<p>What were the numbers <b>in the correct order</b>?</p>";
if (dsType == 'backward') {
	ds_trial_instructions = "<p>What were the numbers <b>in the reverse order</b>?</p>";
}


//response screen
var ds_response_screen = {
	type: 'survey-text',
	post_trial_gap: 250,
	questions: [{prompt: "", rows: 1, columns: 15, value: "", placeholder: "", name: "DIGITS"}],
	preamble: ds_trial_instructions,
	on_finish: function(data) {
		var answer = JSON.parse(data.responses).DIGITS;
		
		// get rid of spaces
		answer = answer.replace(/\s+/g, '');
		
		// store data
		jsPsych.data.addDataToLastTrial({
			designation: "ds-response",
			span: curSpan
		});

		// check whether correct, whether reversal, and adjust current span
		if (dsCorrectAns==answer) {
			var gotitright = 1;

			if (dsPreAns == 0) {
				dsNrev++;
			}

			dsPreAns = 1;
			curSpan++;
		} else {
			var gotitright = 0;

			if (dsPreAns == 1) {
				dsNrev++;
			}

			dsPreAns = 0;
			curSpan--;
			if (curSpan < 1) {
				curSpan = 1;
			}
		}

		// store some more data
		jsPsych.data.addDataToLastTrial({
			answer:      answer,
			corr_answer: dsCorrectAns,
			correct:     gotitright,
			reversals:   dsNrev
		});

		// get new current list and correct answer
		getStimuli(curSpan);
	}
};


// short empty trial before stimulation starts
var ds_empty_trial = {
	type: 'html-keyboard-response',
	stimulus: '<div style="font-size:60px;" tabindex="0"></div>',
	trial_duration: 700,
	choices: jsPsych.NO_KEYS
};

//the core procedure
var dsAdaptiveTracking = {
	timeline: [ds_empty_trial, ds_play_screen, ds_response_screen]
}

//main procedure
var ds_mainproc = {
	timeline: [dsAdaptiveTracking],
	loop_function: function() {
		if (dsNrev >= dsMaxRev) {
			return false;
		} else {
			return true;
		}
	}	
};

var ds_instructions = '<p>On each trial, you will hear a sequence of digits and be asked to type them back in the order they were presented.</p>'+
					  '<p>For example, if you heard the digits <b style="color:blue;">one</b>, <b style="color:blue;">two</b>, '+
					  '<b style="color:blue;">three</b>, you would respond with <b style="color:blue;">1</b>, <b style="color:blue;">2</b>, <b style="color:blue;">3</b></p>';
if (dsType == 'backward') {
	var ds_instructions = '<p>On each trial, you will hear a sequence of digits and be asked to type them back in reverse order.</p>'+
						  '<p>For example, if you heard the digits <b style="color:blue;">one</b>, <b style="color:blue;">two</b>, '+
						  '<b style="color:blue;">three</b>, you would respond with <b style="color:blue;">3</b>, <b style="color:blue;">2</b>, <b style="color:blue;">1</b></p>';
}

var ds_welcome = {
	type: "html-button-response",
	// TDDT
	// Edited the text.
	stimulus: '<p>Welcome to the <b>digit-memory task.</b></p>' + ds_instructions +
			  '<p>To ensure high quality data, it is very important that you do not use any memory aids (e.g., pen and paper).<br>Please do the task solely in your head.</p>' +
			  '<p>This part takes around 6 minutes.</p>',
	choices: ['Continue']
};

var ds_wrapup = {
	type: 'html-button-response',
	stimulus: '<p>Thank you. This concludes the digit-memory task.</p>',
	choices: ['Continue']
};

//final procedure
var PROC_auditory_digit_span = {
	timeline: [ds_welcome, ds_mainproc, ds_empty_trial, ds_wrapup]
};