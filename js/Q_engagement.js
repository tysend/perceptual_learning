/**************************/
/** ENGAGEMENT QUESTIONS **/
/**************************/
var engCounter = 1; //counter for the engagement questions
var engagement_scale = ["1", "2", "3", "4", "5", "6", "7"];
var engagement_quest = [
	{code: 'A1', type: 'attention', question: "<p><strong>When I finished listening I was surprised to see that time had gone by so fast.</strong></p>"},
	{code: 'A2', type: 'attention', question: "<p><strong>When I was listening I was focused on what happened in the story.</strong></p>"},
	{code: 'A3', type: 'attention', question: "<p><strong>I felt absorbed in the story.</strong></p>"},
	{code: 'A4', type: 'attention', question: "<p><strong>The story gripped me in such a way that I could close myself off from things that were happening around me.</strong></p>"},
	{code: 'A5', type: 'attention', question: "<p><strong>I was listening in such a concentrated way that I had forgotten the world around me.</strong></p>"},
	{code: 'EE1', type: 'emo-engage', question: "<p><strong>When I listened to the story I could imagine what it must be like to be in the shoes of the main character(s).</strong></p>"},
	{code: 'EE2', type: 'emo-engage', question: "<p><strong>I felt sympathy for the main character(s).</strong></p>"},
	{code: 'EE3', type: 'emo-engage', question: "<p><strong>I felt connected with the main character(s) of the story.</strong></p>"},
	{code: 'EE4', type: 'emo-engage', question: "<p><strong>I felt how the main character(s) was/were feeling.</strong></p>"},
	{code: 'EE5', type: 'emo-engage', question: "<p><strong>I felt for what happened in the story.</strong></p>"},
	{code: 'MS1', type: 'mental-sim', question: "<p><strong>When I was listening to the story I had an image of the main character(s) in mind.</strong></p>"},
	{code: 'MS2', type: 'mental-sim', question: "<p><strong>When I was listening to the story I could see the situations happening in the story being played out before my eyes.</strong></p>"},
	{code: 'MS3', type: 'mental-sim', question: "<p><strong>I could imagine what the world in which the story took place looked like.</strong></p>"},
	{code: 'T1', type: 'transportation', question: "<p><strong>When I was listening to the story it sometimes seemed as if I were in the story world too.</strong></p>"},
	{code: 'T2', type: 'transportation', question: "<p><strong>When listening to the story there were moments in which I felt that the story world overlapped with my own world.</strong></p>"},
	{code: 'T3', type: 'transportation', question: "<p><strong>The world of the story sometimes felt closer to me than the world around me.</strong></p>"},
	{code: 'T4', type: 'transportation', question: "<p><strong>When I was finished with listening to the story it felt like I had taken a trip to the world of the story.</strong></p>"},
	{code: 'T5', type: 'transportation', question: "<p><strong>Because all of my attention went into the story, I sometimes felt as if I could not exist separately from the story.</strong></p>"},
	{code: 'E1', type: 'enjoyment', question: "<p><strong>I thought it was an exciting story.</strong></p>"},
	{code: 'E6', type: 'enjoyment', question: "<p><strong>I thought it was an enthralling story.</strong></p>"},
	{code: 'E7', type: 'enjoyment', question: "<p><strong>I listened to the story with great interest.</strong></p>"},
	{code: 'E8', type: 'enjoyment', question: "<p><strong>I thought the story was beautiful.</strong></p>"},
	{code: 'E10', type: 'enjoyment', question: "<p><strong>I thought the story was presented well.</strong></p>"}
];

// instructions
var engagement_instruct = {
	type: 'html-button-response',
	stimulus: "<p>We would now like you to rate some statements about your impressions of the story.</p>",
	choices: ['BEGIN'],
};

// presenation details
var engagement = {
	type: 'html-button-response',
	choices: engagement_scale,
	prompt: function(){return '<p style="top:65%">(strongly disagree)................................(strongly agree)</p>' + 
	                          '<p style="font-size:0.8em">Question ' + engCounter + ' of ' + engagement_quest.length + '</p>';},
	stimulus: function(){return jsPsych.timelineVariable('question', true);},
	post_trial_gap: 250,
	on_finish: function(data){
		engCounter += 1; //increase the counter
		var resp = jsPsych.data.get().last(1).values()[0].button_pressed;
			resp = Number(resp) + 1; //make the response 1-7 scale	
		var qcode = jsPsych.timelineVariable('code', true);	
		var qtype = jsPsych.timelineVariable('type', true);
	
		jsPsych.data.addDataToLastTrial({
			designation: "engagement",
			QRESP: resp,
			stimulus: qcode,
			type: qtype
		});	 
	}
};

var questionnaire_distraction = {
	type: 'survey-multi-choice',
	data: {designation: 'dist-survey', stimulus: 'distraction'},
	post_trial_gap: 250,
	questions: [{
		prompt: "<p><b>Were you doing something else while doing this part of the study</b><br>" + 
	            "(For example, checking your phone, opening other broswer tabs on your computer, etc.)?</p>" +
	            "<p>Please answer honestly. Your answer will in no way affect your payment for the study.</p>",
		options: ["Yes", "No"]
	}],
	on_finish: function(data){
		var resp = JSON.parse(jsPsych.data.get().last(1).values()[0].responses).Q0; 
		jsPsych.data.addDataToLastTrial({QRESP: resp});	 
	}
};

// wrap in program
var engagement_run = {
	timeline: [engagement],
	timeline_variables: engagement_quest,
	randomize_order:true
};

var Q_engagement = {
	timeline: [engagement_instruct, engagement_run, questionnaire_distraction],
	on_finish: function(){
		engCounter = 1; // set counter back to 1
	}
};