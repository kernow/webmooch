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
  Mooch.stub_list = null;
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


Mooch.console = {
  is_enabled: false,
  enable: function(){
    this.is_enabled = true;
  },
  disable: function(){
    this.is_enabled = false;
  },
  log: function(){
    if(this.is_enabled && typeof window.console != 'undefined'){
      var args = Array.prototype.slice.call(arguments,0);
      args.unshift("Mooch:");
      console.log.apply(console,args);
    }
  },
  warn: function(){
    if(this.is_enabled && typeof window.console != 'undefined'){
      var args = Array.prototype.slice.call(arguments,0);
      args.unshift("Mooch:");
      console.warn.apply(console,args);
    }
  }
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
    var jsonp_matches = uri.match(/callback=(jsonp\d+|jQuery\w+)/);
    var obj = { uri: uri.replace(/callback=(jsonp\d+|jQuery\w+)/, 'callback=?').replace(/\&$/, '') };
    if(jsonp_matches && jsonp_matches.length > 0){
      obj.jsonp_callback = jsonp_matches[1];
    }
    return obj;
  }
};
Mooch.XMLHttpRequest = function(){
  Mooch.console.log("new caught", arguments);
  this.stub = null;
};

Mooch.XMLHttpRequest.prototype.open = function(){
  Mooch.console.log("open caught", arguments);
  this.stub = Mooch.stub_list.find(arguments[0], arguments[1]);
};

Mooch.XMLHttpRequest.prototype.setRequestHeader = function(){
  Mooch.console.log("setRequestHeader caught", arguments);
};

Mooch.XMLHttpRequest.prototype.abort = function(){
  Mooch.console.log("abort caught");
};

Mooch.XMLHttpRequest.prototype.getAllResponseHeaders = function(){
  Mooch.console.log("getAllResponseHeaders caught");
};

Mooch.XMLHttpRequest.prototype.getResponseHeader = function(){
  Mooch.console.log("getResponseHeader caught", arguments);
};

Mooch.XMLHttpRequest.prototype.onreadystatechange = function(){
};

Mooch.XMLHttpRequest.prototype.send = function(){
  Mooch.console.log("send caught", arguments);

  this.stub.invocation_count ++;

  this.status         = this.stub.stub.status;
  this.statusText     = this.stub.stub.statusText;
  this.responseText   = this.stub.stub.responseText;

  this.readyState     = 4;
  this.responseXML    = null;

  this.stub.stub.run_jsonp_callback();

  Mooch.console.log("firing jQuery callback");
  this.onreadystatechange();
};
