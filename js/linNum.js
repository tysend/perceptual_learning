// --------------------------------------------------------------
// var out = linNum(from,step,to);
//
// from - number
// step - number
// to   - number
//
// out - number array, FROM --> STEP --> TO 
//
// Descrption: The script provides and number array FROM .. STEP .. TO.
// ---------------------------------------------------------------------
// B. Herrmann, Email: herrmann.b@gmail.com, 2020-04-22

function linNum(from,step,to) {
	var foo = [];

	// increase
	if (step>0) {
		for (var ii = from; ii<=to; ii=ii+step) {
			foo.push(ii);
		};
	}

	// decrease
	if (step<0) {
		for (var ii = from; ii>=to; ii=ii+step) {
			foo.push(ii);
		};
	}

	// return array
	return foo;
};
