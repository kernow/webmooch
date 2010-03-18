var Mooch = {
  'original': null,
  'stub_list': null
};

Mooch.init = function(){
  if(!Mooch.original){
    Mooch.replace_XMLHttpRequest();
  }
  if(!Mooch.stub_list){
    Mooch.stub_list = new Mooch.StubList();
  }
};

Mooch.reset = function(){
  if(Mooch.original !== null){
    Mooch.restore_XMLHttpRequest();
  }
  if(Mooch.stub_list !== null){
    Mooch.stub_list = null;
  }
};

Mooch.replace_XMLHttpRequest = function(){
  Mooch.original = window.XMLHttpRequest;
  window.XMLHttpRequest = Mooch.XMLHttpRequest;
};

Mooch.restore_XMLHttpRequest = function(){
  window.XMLHttpRequest = Mooch.original;
  Mooch.original = null;
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
Mooch.XMLHttpRequest = function(){
  console.log("caught call to new");
  this.stub = null;
}

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

  console.log("fireing jQuery callback");
  this.onreadystatechange();
};
