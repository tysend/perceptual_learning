/**************************/
/** SSQ QUESTIONS **/
/**************************/
var ssq_scale = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
var ssq_quest = [
	{code: 'ssq-01', type: 'reverb-hear', question: "<p><b>When you talk with someone at a place that strongly reverberates/echoes (e.g., in a church or train station),</br>can you understand what the person says?</b></p>"},
	{code: 'ssq-02', type: 'restaurant-hear', question: "<p><b>When you are with a group (~5 people) in a lively restaurant, can you follow the group's conversation?</b></p>"},
	{code: 'ssq-03', type: 'soundloc-hear', question: "<p><b>Based on the sound of a bus or truck, can you tell whether it is moving towards or away from you?</b></p>"},
	{code: 'ssq-04', type: 'soundorigin-hear', question: "<p><b>When you are in an unknown environment, can you tell from which direction a brief sound originates?</b></p>"},
	{code: 'ssq-05', type: 'distracting-hear', question: "<p><b>Are you able to ignore distracting sounds when you concentrate on a specific aspect of your acoustic surrounding?</b></p>"}
];

// presenation details
var ssq = {
	type: 'html-button-response',
	choices: ssq_scale,
	prompt: function() {return '<p style="top:65%">(not at all).........................................................................(perfectly)</p>';},
	stimulus: function() {return jsPsych.timelineVariable('question', true);},
	post_trial_gap: 250,
	on_finish: function(data){
		var resp  = jsPsych.data.get().last(1).values()[0].button_pressed;
		var qcode = jsPsych.timelineVariable('code', true);	
		var qtype = jsPsych.timelineVariable('type', true);
	
		jsPsych.data.addDataToLastTrial({
			designation: "ssq-survey",
			QRESP: resp,
			stimulus: qcode,
			type: qtype
		});	 
	}
};

// wrap in program
var Q_ssq = {
	timeline: [ssq],
	timeline_variables: ssq_quest,
	randomize_order:true
};