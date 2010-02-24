// var original = window.XMLHttpRequest;
// 
// window.XMLHttpRequest = function(){
//   console.log("caught call to new");
// }
// 
// window.XMLHttpRequest.prototype.open = function(){
//   console.log("open caught with args");
//   console.log(arguments);
// };
// 
// window.XMLHttpRequest.prototype.setRequestHeader = function(){
//   console.log("setRequestHeader caught with arguments");
//   console.log(arguments);
// };
// 
// window.XMLHttpRequest.prototype.abort = function(){
//   console.log("abort caught");
// };
// 
// window.XMLHttpRequest.prototype.getAllResponseHeaders = function(){
//   console.log("getAllResponseHeaders caught");
// };
// 
// window.XMLHttpRequest.prototype.getResponseHeader = function(){
//   console.log("getResponseHeader caught with arguments");
//   console.log(arguments);
// };
// 
// window.XMLHttpRequest.prototype.send = function(){
//   console.log("send caught with arguments");
//   console.log(arguments);
//   
//   this.readyState = 4;
//   this.status = 200;
//   this.statusText = "OK";
//   this.responseText = "{'param_1':'another param'}";
//   this.responseXML = null;
//   
//   console.log("fireing jQuery callback");
//   this.onreadystatechange();
// };

// Mooch.stub_request('POST', 'something/remote.html').returns({ 'body': 'something', 'status': 200, 'headers': {} }, {another response})

Mooch.stub_request();

$.post('something/remote.html', {"param_1": "a param"}, function(data){
  console.log("post callback run with arguments");
  console.log(data);
}, "json");

// window.XMLHttpRequest = original;
