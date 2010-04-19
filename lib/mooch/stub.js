Mooch.Stub = function(method, uri){
  this.method = method;
  this.uri = uri;
  // setup some defaults
  this.status         = 200;
  this.statusText     = 'OK';
  this.responseText   = '';
  this.responseXML    = null;
};

Mooch.Stub.prototype = {
  returns: function(options){
    // { 'body': "{ 'param1': 'value1', 'param2': 'value2'}", 'status': 200, 'headers': {} }
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
