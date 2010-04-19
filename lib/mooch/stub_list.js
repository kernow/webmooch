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
	  uri = this.remove_cache_parameters(uri);
	  jsonp_obj = this.store_and_remove_jsonp_parameters(uri);
	  uri = jsonp_obj.uri;
	  var match = this.stubs[this.create_key(method, uri)];
	  if(match && jsonp_obj.jsonp_callback){
	    match.stub.set_jsonp_callback(jsonp_obj.jsonp_callback);
	  }
	  return match;
	},
	create_key: function(method, uri){
	  return method + '_' + uri;
	},
	remove_cache_parameters: function(uri){
	  return uri.replace(/_=\d+/, '').replace(/\?$/, '');
	},
	store_and_remove_jsonp_parameters: function(uri){
	  var jsonp_matches = uri.match(/callback=(jsonp\d+)/);
	  var obj = { uri: uri.replace(/callback=jsonp\d+/, 'callback=?').replace(/\&$/, '') };
	  if(jsonp_matches && jsonp_matches.length > 0){
	    obj.jsonp_callback = jsonp_matches[1];
    }
	  return obj;
	}
};
