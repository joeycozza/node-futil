var expect = require('chai').expect;
var futil = require('../lib/index.js');

describe('Futil', function(){

	describe('#pathToArray()', function(){

		it('should come back with an array of the default root path', function() {

			var pathArr = futil.pathToArray('/');

			expect(pathArr).to.be.an('array');
			expect(pathArr).to.have.length.of.at.least(1);

			var rootPath = pathArr[0];

			expect(rootPath).to.be.an('object');
			expect(rootPath).to.have.a.property('name', 'Root');
			expect(rootPath).to.have.a.property('path', '/');
			expect(rootPath).to.have.a.property('isCurrent', true);

		});

		it('should come back with an array of the root path', function() {

			var pathArr = futil.pathToArray('/', 'All Files');

			expect(pathArr).to.be.an('array');
			expect(pathArr).to.have.length.of.at.least(1);

			var rootPath = pathArr[0];

			expect(rootPath).to.be.an('object');
			expect(rootPath).to.have.a.property('name', 'All Files');
			expect(rootPath).to.have.a.property('path', '/');
			expect(rootPath).to.have.a.property('isCurrent', true);

		});

		it('should come back with an array with two object', function() {

			var pathArr = futil.pathToArray('/test/', 'All Files');

			expect(pathArr).to.be.an('array');
			expect(pathArr).to.have.length.of.at.least(2);

			var rootPath = pathArr[0];

			expect(rootPath).to.be.an('object');
			expect(rootPath).to.have.a.property('name', 'All Files');
			expect(rootPath).to.have.a.property('path', '/');
			expect(rootPath).to.have.a.property('isCurrent', false);

			var testPath = pathArr[1];

			expect(testPath).to.be.an('object');
			expect(testPath).to.have.a.property('name', 'test');
			expect(testPath).to.have.a.property('path', '/test');
			expect(testPath).to.have.a.property('isCurrent', true);

		});

		it('should come back with an array with three object', function() {

			var pathArr = futil.pathToArray('/test/testing', 'Test');

			expect(pathArr).to.be.an('array');
			expect(pathArr).to.have.length.of.at.least(3);

			var rootPath = pathArr[0];

			expect(rootPath).to.be.an('object');
			expect(rootPath).to.have.a.property('name', 'Test');
			expect(rootPath).to.have.a.property('path', '/');
			expect(rootPath).to.have.a.property('isCurrent', false);

			var testPath = pathArr[1];

			expect(testPath).to.be.an('object');
			expect(testPath).to.have.a.property('name', 'test');
			expect(testPath).to.have.a.property('path', '/test');
			expect(testPath).to.have.a.property('isCurrent', false);

			var testPath2 = pathArr[2];

			expect(testPath2).to.be.an('object');
			expect(testPath2).to.have.a.property('name', 'testing');
			expect(testPath2).to.have.a.property('path', '/test/testing');
			expect(testPath2).to.have.a.property('isCurrent', true);

		});

	});

	describe('#getTmpFileName()', function(){

		it('should come back with a string for a tmp file name', function(){

			var fileName = futil.getTmpFileName();
			expect(fileName).to.be.a('string');

		});

		it('should come back with a string for a tmp file name with a extension on the end', function(){

			var fileName = futil.getTmpFileName('tmp');
			expect(fileName).to.be.a('string');
			expect(fileName).to.match(/tmp$/);

		});

		it('should come back with a string for a tmp file name with a ./fileTmp in front', function(){

			var fileName = futil.getTmpFileName(null, './fileTmp');
			expect(fileName).to.be.a('string');
			expect(fileName).to.match(/^.\/fileTmp/);

		});

	});

	describe('#getExtension()', function(){

		it('should come back tmp as the extension for a full path file name', function(){

			var ext = futil.getExtension('/path/to/fi.le/test.testing.tmp');
			expect(ext).to.equal('tmp');

		});

		it('should come back tmp as the extension for a file name', function(){

			var ext = futil.getExtension('test.testing.tmp');
			expect(ext).to.equal('tmp');

		});

		it('should come back nothing as the extension for one name file', function(){

			var ext = futil.getExtension('tmp');
			expect(ext).to.equal('');

		});

		it('should come back nothing as the extension for hidden file', function(){

			var ext = futil.getExtension('.tmp');
			expect(ext).to.equal('');

		});

	});

	describe('#getFileNameFromPath()', function(){

		it('should come back test.tmp as the filename from the full path', function(){

			var ext = futil.getFileNameFromPath('/path/to/fi.le/test.tmp');
			expect(ext).to.equal('test.tmp');

		});

		it('should come back test.tmp for just a file name', function(){

			var ext = futil.getFileNameFromPath('test.tmp');
			expect(ext).to.equal('test.tmp');

		});

	});

});