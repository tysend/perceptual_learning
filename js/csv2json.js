// --------------------------------------------------------------
// var out = csv2json(csv, headers);
//
// csv - array of strings in csv format (comma separation)
// headers - strings in csv format (comma separation)
//
// out - array of objects; object names are based on header
//
// Descrption: The script converts data in csv format to json.
// --------------------------------------------------------------
// B. Herrmann, Email: herrmann.b@gmail.com, 2020-04-18

function csv2json(csv, headers) {
	var result  = [];
	var varname = headers.split(",");
	
	for(var ii = 0; ii < csv.length; ii++) {
		var obj  = {};
    	var line = csv[ii].split(",");
    	
    	for(var jj = 0; jj < varname.length; jj++){
			obj[varname[jj].trim()] = line[jj].trim();
		}
		result[ii] = obj;
	};

	// return result
	return result; // json
};

