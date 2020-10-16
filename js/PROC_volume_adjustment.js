/***********************/
/** VOLUME ADJUSTMENT **/
/***********************/

var audioname_volume_adjustment = [
	'audio/volume_adjustment.mp3'
];

//instructions	
var PROC_volume_adjustment = {
    timeline: [
	{
		type: 'html-button-response',
		stimulus: "<p>Before we begin the main task, you will complete a short volume calibration.</p><p>" +
		"Please make sure you are in a quiet listening environment, that you are wearing headphones, and that your computer's volume is turned on.</p>",
		choices: ['BEGIN'],
		post_trial_gap: 250
    },	
	{
		type: 'html-button-response',
		stimulus: "<p>You will hear a thirty-second noise.<br>Please adjust your computer's volume so that this noise is being presented at a comfortable level.</p>",
		choices: ['LISTEN'],
		post_trial_gap: 250
    },
	{	
		type: 'audio-button-response',
		stimulus: audioname_volume_adjustment[0],
		choices: ['I am ready to continue.'],
		prompt: "<p>Adjust your volume so that the noise is being played at a comfortable level.</p>",
		response_ends_trial: true,
		trial_duration: 30000
	}]
};	


