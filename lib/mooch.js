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

// true || false
// Mooch.allow_net_connect = function(bool){
//   
// };

Mooch.stub_request = function(method, uri){
  Mooch.init();
  return Mooch.stub_list.add(method, uri);
};

// Mooch.stub_request('POST', 'something/remote.html').returns({ 'body': 'something', 'status': 200, 'headers': {} }, {another response})

// on run
// 1. set readyState to 4 (complete)
// 2. set responseText
// 3. set responseXML
// 4. set status e.g. 200, 404 etc.
// 5. set statusText e.g. "OK", "Not Found" etc.
// 1. trigger onreadystatechange event
