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

// true || false
Mooch.allow_net_connect = function(bool){
  
};

Mooch.stub_request = function(method, uri){
  Mooch.init();
  Mooch.stub_list.add(method, uri);
  // stub open
  // stub send
  return Mooch;
};

Mooch.returns = function(){
  Mooch.init();
  return Mooch;
};

// Mooch.stub_request('POST', 'something/remote.html').returns({ 'body': 'something', 'status': 200, 'headers': {} }, {another response})

// on run
// 1. set readyState to 4 (complete)
// 2. set responseText
// 3. set responseXML
// 4. set status e.g. 200, 404 etc.
// 5. set statusText e.g. "OK", "Not Found" etc.
// 1. trigger onreadystatechange event
