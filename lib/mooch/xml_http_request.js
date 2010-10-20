Mooch.XMLHttpRequest = function(){
  Mooch.console.log("caught call to new");
  this.stub = null;
};

Mooch.XMLHttpRequest.prototype.open = function(){
  Mooch.console.log("open caught with args");
  Mooch.console.log(arguments);
  // match the request with a stub
  this.stub = Mooch.stub_list.find(arguments[0], arguments[1]);
};

Mooch.XMLHttpRequest.prototype.setRequestHeader = function(){
  Mooch.console.log("setRequestHeader caught with arguments");
  Mooch.console.log(arguments);
};

Mooch.XMLHttpRequest.prototype.abort = function(){
  Mooch.console.log("abort caught");
};

Mooch.XMLHttpRequest.prototype.getAllResponseHeaders = function(){
  Mooch.console.log("getAllResponseHeaders caught");
};

Mooch.XMLHttpRequest.prototype.getResponseHeader = function(){
  Mooch.console.log("getResponseHeader caught with arguments");
  Mooch.console.log(arguments);
};

Mooch.XMLHttpRequest.prototype.onreadystatechange = function(){
  // required for jquery is error handling
};

Mooch.XMLHttpRequest.prototype.send = function(){
  Mooch.console.log("send caught with arguments");
  Mooch.console.log(arguments);

  this.stub.invocation_count ++;
  
  this.status         = this.stub.stub.status;
  this.statusText     = this.stub.stub.statusText;
  this.responseText   = this.stub.stub.responseText;
  
  this.readyState     = 4;
  this.responseXML    = null;
  
  this.stub.stub.run_jsonp_callback();
  
  Mooch.console.log("fireing jQuery callback");
  this.onreadystatechange();
};
