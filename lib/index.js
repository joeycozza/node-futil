var _ = require('lodash'),
moment = require('moment')
;

module.exports = {

	/**
	 * Method that will turn a path into a workable array of JSON Objects
	 * @param  {[type]} dir [description]
	 * @return {[type]}     [description]
	 */
	pathToArray : function(path, nameOfRoot) {

		if (_.isUndefined(nameOfRoot)) {
			nameOfRoot = 'Root';
		}

	    var pathArr = [];

	    //If there is no path to start from or if its "/"
	    if (_.isUndefined(path) || path == '' || path == '/') {
	        
	    	pathArr.push({
	    		name : nameOfRoot,
	    		path : '/',
	    		isCurrent : true
	    	});

	    } else {

	    	var tmpPath = '';
	        var arr = _.compact(path.split('/'));

	        //Add the first root path
	        pathArr.push({
	    		name : nameOfRoot,
	    		path : '/',
	    		isCurrent : false
	    	});

	        //GO through each section of the path
	        for (var i = 0; i < arr.length; i++) {

	        	//Keep appending the pathing
	        	tmpPath += '/' + arr[i];

	            pathArr.push({
		    		name : arr[i],
		    		path : tmpPath,
		    		isCurrent : false
		    	});
   
	        }

	    }

	    //Set the last one as the current directory path
	    pathArr[pathArr.length-1].isCurrent = true;

	    return pathArr;
	},

	/**
	 * Method to generate a tmp file name
	 * @param  {[type]} extension [description]
	 * @param  {[type]} path [description]
	 * @return {[type]}      [description]
	 */
	getTmpFileName : function(extension, path) {

		if (_.isUndefined(extension)) {
			extension = '';
		}

		if (_.isUndefined(path)) {
			path = './tmp';
		}

		return path + '/file-' + moment().unix() + '.' + extension;
	},

	/**
	 * Gets the extension from the end of a string
	 * @param  {[type]} file [description]
	 * @return {[type]}      [description]
	 */
	getExtension : function(file) {
 		var a = file.split(".");
		if( a.length === 1 || ( a[0] === "" && a.length === 2 ) ) {
		    return "";
		}
		return a.pop();
	},

	/**
	 * Method to extract the filename from a path
	 * @param  {[type]} fileName [description]
	 * @return {[type]}          [description]
	 */
	getFileNameFromPath : function(fileName) {
		return fileName.split("/").pop();
	}

};