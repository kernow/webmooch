Mooch.XMLHttpRequest = function(){
  Mooch.console.log("new caught", arguments);
  this.stub = null;
};

Mooch.XMLHttpRequest.prototype.open = function(){
  Mooch.console.log("open caught", arguments);
  // match the request with a stub
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
  // required for jquery is error handling
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
