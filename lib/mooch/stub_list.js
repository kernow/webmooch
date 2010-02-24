Mooch.StubList = function(){
  this.stubs = {};
};

Mooch.StubList.prototype = {

	add: function(method, uri){
	  var local_stub = this.find_or_create(method, uri);
    // local_stub.expectation = new Mooch.Expectation(method, uri);
		return local_stub.expectation;
	},
	find_or_create: function(method, uri){
	  var key = this.create_key(method, uri);
	  if(!this.stubs[key]){
	    this.stubs[key] = { expectation: null, invocation_count: 0 };
	  }
	  return this.stubs[key];
	},
	create_key: function(method, uri){
	  return method + '_' + uri;
	}
};
