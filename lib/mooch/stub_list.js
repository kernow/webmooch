Mooch.StubList = function(){
  this.items = {};
};

Mooch.StubList.prototype = {
	add: function(method, uri){
	  var local_stub = this.find_or_create(method, uri);
    local_stub.stub = new Mooch.Stub(method, uri);
		return local_stub.stub;
	},
	find_or_create: function(method, uri){
	  var key = this.key_for(method, uri);
	  if(!this.items[key]){
	    this.items[key] = { stub: null, invocation_count: 0 };
	  }
	  return this.items[key];
	},
	find: function(method, uri){
	  uri = this.remove_cache_parameters(uri);
	  jsonp_obj = this.store_and_remove_jsonp_parameters(uri);
	  uri = jsonp_obj.uri;
	  var match = this.items[this.key_for(method, uri)];
	  if(match && jsonp_obj.jsonp_callback){
	    match.stub.set_jsonp_callback(jsonp_obj.jsonp_callback);
	  }
	  return match;
	},
	key_for: function(method, uri){
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
