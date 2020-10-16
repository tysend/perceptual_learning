// --------------------------------------------------------------
// var out = linNumJitter(from,step,to,jitter);
//
// from   - number
// step   - number
// to     - number
// jitter - number // reflecting the maximal random variation
//
// out - number array, (FROM --> STEP --> TO) --> jittered
//
// Descrption: The script provides and number array FROM .. STEP .. TO.
// Values will be jittered randomly.
// ---------------------------------------------------------------------
// B. Herrmann, Email: herrmann.b@gmail.com, 2020-06-13

function linNumJitter(from,step,to,jitter) {
	var foo    = [];
	var rannum = 0;

	// increase
	if (step>0) {
		for (var ii = from; ii<=to; ii=ii+step) {
			rannum = Math.round(Math.random() * jitter - jitter/2);
			foo.push(ii+rannum);
		};
	}

	// decrease
	if (step<0) {
		for (var ii = from; ii>=to; ii=ii+step) {
			rannum = Math.round(Math.random() * jitter - jitter/2);
			foo.push(ii+rannum);
		};
	}

	// return array
	return foo;
};
