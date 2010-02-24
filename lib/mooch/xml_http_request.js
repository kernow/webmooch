Mooch.XMLHttpRequest = function(){
  console.log("caught call to new");
  this.stub = null;
}

Mooch.XMLHttpRequest.prototype.open = function(){
  console.log("open caught with args");
  console.log(arguments);
  // match the request with a stub
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
  // this.status         = 200;
  // this.statusText     = "OK";
  // this.responseText   = "{'param_1':'another param'}";
  this.responseXML    = null;
  
  console.log("fireing jQuery callback");
  this.onreadystatechange();
};
