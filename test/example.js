require('should')

describe('Example', function(){

    it('Sync Test', function(){


		var example = 'hello';

		example.should.be.exactly('hello');

		true.should.be.ok;
		false.should.not.be.ok;
		true.should.be.true;
		'1'.should.not.be.true;
		false.should.be.false;
		''.should.not.be.false;

		[].should.be.empty; // Array is empty
		[1,2,3].should.eql([1,2,3]); // Array contains same values as expected
		[1, 2, 3].should.have.length(3); // Array length checking
		[1,2,3].should.containEql(1); // The Array contains value as expected
		[].should.be.an.instanceOf(Array); // Instance of an array

		''.should.be.empty; // Empty String
		'foobar'.should.endWith('bar'); // String end with some expected string
		'foobar'.should.not.endWith('foo'); // String should not end with some expected string
		'test'.should.equal('test'); // String equality checking

		(4).should.equal(4);
		(10).should.be.above(5);
		(15).should.be.within(10, 15);
		(10).should.not.be.below(5);

		(undefined + 0).should.be.NaN;
		(1/0).should.be.Infinity;

		({ foo: 'bar' }).should.eql({ foo: 'bar' }); // JSON Equality checking
		({}).should.be.an.Object; // An Object
		var jsonVar = {a:1, b:2}; 
		jsonVar.should.have.property('a'); // JSON Property Checking
		var obj = { foo: 'bar', baz: 'raz' }; 
		(obj).should.containEql({ foo: 'bar', baz: 'raz' }); // JSON contains the expected value
		obj.should.have.keys('foo', 'baz'); // JSON has the keys
		obj.should.have.keys(['foo', 'baz']);

		(function(){
		  throw new Error('fail');
		}).should.throw();
		var user = {
		    name: 'tj'
		};
		user.should.have.property('name', 'tj');
	});
});
