Mooch.StubList = function(){
  this.stubs = {};
};

Mooch.StubList.prototype = {

	add: function(method, uri){
	  var local_stub = this.find_or_create(method, uri);
    local_stub.stub = new Mooch.Stub(method, uri);
		return local_stub.stub;
	},
	find_or_create: function(method, uri){
	  var key = this.create_key(method, uri);
	  if(!this.stubs[key]){
	    this.stubs[key] = { stub: null, invocation_count: 0 };
	  }
	  return this.stubs[key];
	},
	find: function(method, uri){
	  uri = this.remove_cache_parameters(uri)
	  return this.stubs[this.create_key(method, uri)];
	},
	create_key: function(method, uri){
	  return method + '_' + uri;
	},
	remove_cache_parameters: function(uri){
	  return uri.replace(/_=\d+/, '').replace(/\?$/, '');
	}
};
