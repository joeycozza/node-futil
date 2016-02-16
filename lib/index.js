var uuid = require('node-uuid');

module.exports = {

  /**
   * Method that will turn a path into a workable array of JSON Objects
   * @param  {string} path [the path to be converted]
   * @param  {string} nameOfRoot
   * @return {Array}     [each directory is its own string in the array]
   */
  pathToArray: function (path, nameOfRoot) {

    if (nameOfRoot === undefined) {
      nameOfRoot = 'Root';
    }

    var pathArr = [];

    //If there is no path to start from or if its "/"
    if (path === undefined || path == '' || path == '/') {

      pathArr.push({
        name: nameOfRoot,
        path: '/',
        isCurrent: true
      });

    } else {

      var tmpPath = '';
      var arr     = _compact(path.split('/'));

      //Add the first root path
      pathArr.push({
        name: nameOfRoot,
        path: '/',
        isCurrent: false
      });

      //GO through each section of the path
      for (var i = 0; i < arr.length; i++) {

        //Keep appending the pathing
        tmpPath += '/' + arr[i];

        pathArr.push({
          name: arr[i],
          path: tmpPath,
          isCurrent: false
        });

      }

    }

    //Set the last one as the current directory path
    pathArr[pathArr.length - 1].isCurrent = true;

    return pathArr;
  },

  /**
   * Method to generate a tmp file name
   * @param  {string} extension
   * @param  {string} path
   * @return {string}
   */
  getTmpFileName: function (extension, path) {

    if (extension === undefined) {
      extension = '';
    }

    if (path === undefined) {
      path = './tmp';
    }

    var guid = uuid.v4();

    return path + '/file-' + guid + '-' + parseInt(Date.now() / 1000) + '.' + extension;
  },

  /**
   * Gets the extension from the end of a string
   * @param  {string} file
   * @return {string}
   */
  getExtension: function (file) {
    var a = file.split(".");
    if (a.length === 1 || (a[0] === "" && a.length === 2)) {
      return "";
    }
    return a.pop();
  },

  /**
   * Method to extract the filename from a path
   * @param  {string} fileName
   * @return {string}          returns the substring after the last "/"
   */
  getFileNameFromPath: function (fileName) {
    return fileName.split("/").pop();
  }

};


/**
 * Taken from lodash source code
 *
 *
 * Creates an array with all falsey values removed. The values `false`, `null`,
 * `0`, `""`, `undefined`, and `NaN` are falsey.
 *
 * @category Array
 * @param {Array} array The array to compact.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * _compact([0, 1, false, 2, '', 3]);
 * // => [1, 2, 3]
 */
function _compact(array) {
  var index    = -1;
  var length   = array ? array.length : 0;
  var resIndex = -1;
  var result   = [];

  while (++index < length) {
    var value = array[index];
    if (value) {
      result[++resIndex] = value;
    }
  }
  return result;
}
