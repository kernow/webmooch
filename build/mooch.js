var Mooch = {
  'original_xml_http_request': null,
  'original_active_x_object': null,
  'stub_list': null
};

Mooch.init = function(){
  if(!Mooch.original_xml_http_request && !Mooch.original_active_x_object){
    Mooch.replace_XMLHttpRequest();
  }
  if(!Mooch.stub_list){
    Mooch.stub_list = new Mooch.StubList();
  }
};

Mooch.reset = function(){
  if(Mooch.original_xml_http_request !== null || Mooch.original_active_x_object !== null){
    Mooch.restore_XMLHttpRequest();
  }
  if(Mooch.stub_list !== null){
    Mooch.stub_list = null;
  }
};

Mooch.replace_XMLHttpRequest = function(){
  if(window.XMLHttpRequest){
    Mooch.original_xml_http_request = window.XMLHttpRequest;
    window.XMLHttpRequest = Mooch.XMLHttpRequest;
  }
  if(window.ActiveXObject){
    Mooch.original_active_x_object = window.ActiveXObject;
    window.ActiveXObject = Mooch.XMLHttpRequest;
  }
};

Mooch.restore_XMLHttpRequest = function(){
  if(window.XMLHttpRequest){
    window.XMLHttpRequest = Mooch.original_xml_http_request;
    Mooch.original_xml_http_request = null;
  }
  if(window.ActiveXObject){
    window.ActiveXObject = Mooch.original_active_x_object;
    Mooch.original_active_x_object = null;
  }

};


Mooch.stub_request = function(method, uri){
  Mooch.init();
  return Mooch.stub_list.add(method, uri);
};


Mooch.Stub = function(method, uri){
  this.method = method;
  this.uri = uri;
  this.status         = 200;
  this.statusText     = 'OK';
  this.responseText   = '';
  this.responseXML    = null;
};

Mooch.Stub.prototype = {
  returns: function(options){
    if(options.status){
      this.status = options.status;
    }
    if(options.body){
      this.responseText = options.body;
    }
  },
  set_jsonp_callback: function(callback){
    this.jsonp_callback = callback;
  },
  run_jsonp_callback: function(){
    if(this.jsonp_callback){
      window[ this.jsonp_callback ](window["eval"]("(" + this.responseText + ")"));
    }
  }
};
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
Mooch.XMLHttpRequest = function(){
  console.log("caught call to new");
  this.stub = null;
};

Mooch.XMLHttpRequest.prototype.open = function(){
  console.log("open caught with args");
  console.log(arguments);
  this.stub = Mooch.stub_list.find(arguments[0], arguments[1]);
};

Mooch.XMLHttpRequest.prototype.setRequestHeader = function(){
  console.log("setRequestHeader caught with arguments");
  console.log(arguments);
};

Mooch.XMLHttpRequest.prototype.abort = function(){
  console.log("abort caught");
};

Mooch.XMLHttpRequest.prototype.getAllResponseHeaders = function(){
  console.log("getAllResponseHeaders caught");
};

Mooch.XMLHttpRequest.prototype.getResponseHeader = function(){
  console.log("getResponseHeader caught with arguments");
  console.log(arguments);
};

Mooch.XMLHttpRequest.prototype.send = function(){
  console.log("send caught with arguments");
  console.log(arguments);

  this.stub.invocation_count ++;

  this.status         = this.stub.stub.status;
  this.statusText     = this.stub.stub.statusText;
  this.responseText   = this.stub.stub.responseText;

  this.readyState     = 4;
  this.responseXML    = null;

  this.stub.stub.run_jsonp_callback();

  console.log("fireing jQuery callback");
  this.onreadystatechange();
};
