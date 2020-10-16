// --------------------------------------------------------------
// var out = shuffle_array(array);
//
// array - array
// out - shuffled array
//
// Descrption: The script shuffles the entries in an array.
// --------------------------------------------------------------
// B. Herrmann, Email: herrmann.b@gmail.com, 2020-04-18

// function to shuffle an array (Fisher-Yates)
function shuffle_array(array) {
	for (let i = array.length-1; i > 0; i--) {
		const j    = Math.floor(Math.random() * (i+1));
		const temp = array[i];
		array[i]   = array[j];
		array[j]   = temp;
	};
	return array;
};
