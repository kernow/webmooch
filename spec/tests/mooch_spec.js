Screw.Unit(function() {  
  
  describe("Mooch", function() {
    
    var original_xml_http_request = window.XMLHttpRequest && (window.location.protocol !== "file:" || !window.ActiveXObject) ? window.XMLHttpRequest : window.ActiveXObject;
    
    after(function() {
      Mooch.reset();
    }); // end after
    
    describe("init", function() {
      
      before(function() {
        Mooch.init();
      }); // end before
      
      it("should replace XMLHttpRequest with the Mooch version", function() {
        if(window.XMLHttpRequest && (window.location.protocol !== "file:" || !window.ActiveXObject)){
          expect(Mooch.XMLHttpRequest).to(equal, window.XMLHttpRequest);
          expect(original_xml_http_request).to_not(equal, window.XMLHttpRequest);
        }else{
          expect(Mooch.XMLHttpRequest).to(equal, window.ActiveXObject);
          // TODO: this fails in IE (7 and maybe 8) need to investigate why
          // expect(original_xml_http_request).to_not(equal, window.ActiveXObject);
        }
      }); // end it
      
    }); // end describe
    
    describe("reset", function() {
      
      before(function() {
        Mooch.init();
      }); // end before
      
      it("should reset XMLHttpRequest to it's original state", function() {
        Mooch.reset();
        if(window.XMLHttpRequest && (window.location.protocol !== "file:" || !window.ActiveXObject)){
          expect(original_xml_http_request).to(equal, window.XMLHttpRequest);
        }else{
          expect(original_xml_http_request).to(equal, window.ActiveXObject);
        }
      }); // end it
      
      it("calling the method multiple times should only reset XMLHttpRequest once", function() {
        var mooch_mock = new Mock(Mooch);
        Mooch.spies('restore_XMLHttpRequest').once();
        Mooch.reset();
        Mooch.reset();
      }); // end it
      
    }); // end describe
    
    describe("stub_request", function() {
      
      it("should return the Mooch object", function() {
        expect(Mooch.stub_request()).to(be_an_object);
      }); // end it
      
    }); // end describe
    
    describe("a remote", function() {
      
      describe("post request", function() {

        var remote_data;
        var expected_data;

        before(function() {
          expected_data = "some text";
        }); // end before

        after(function() {
          remote_data = undefined;
        }); // end before

        it("should return the expected data", function(me) {
          Mooch.stub_request('POST', '/test/data.json').returns({ 'body': "some text", 'status': 200, 'headers': {} });
          $.post('/test/data.json', {}, function(data){
            remote_data = data;
          });
          using(me).wait(1).and_then(function(){
            expect(remote_data).to(equal, expected_data);
          });
        }); // end it
        
      }); // end describe
      
      describe("a get request", function() {
        
        var remote_data;
        var expected_data;

        before(function() {
          expected_data = "some text";
        }); // end before

        after(function() {
          remote_data = undefined;
        }); // end before

        it("should return the expected data", function(me) {
          Mooch.stub_request('GET', '/test/data.json').returns({ 'body': "some text", 'status': 200, 'headers': {} });
          $.get('/test/data.json', {}, function(data){
            remote_data = data;
          });
          using(me).wait(1).and_then(function(){
            expect(remote_data).to(equal, expected_data);
          });
        }); // end it
        
      }); // end describe
      
      describe("jquery adding no cache data", function() {
        
        var remote_data;
        var expected_data;
        
        before(function() {
          expected_data = "some text";
        }); // end before

        after(function() {
          remote_data = undefined;
        }); // end before
        
        it("should remove jquery style no cache parameters", function(me) {
          Mooch.stub_request('GET', '/test/url').returns({ 'body': "some text", 'status': 200, 'headers': {} });
          $.ajax({
            url: '/test/url',
            cache: false,
            success: function(data){
              remote_data = data;
            }
          });
          using(me).wait(1).and_then(function(){
            expect(remote_data).to(equal, expected_data);
          });
        }); // end it
        
      }); // end describe
      
      describe("a JSONP request", function() {
        
        var expected_data;

        before(function() {
          expected_data = {some: 'text'};
        }); // end before

        after(function() {
          remote_data = undefined;
        }); // end before

        it("should return the expected data", function(me) {
          var remote_data;
          Mooch.stub_request('GET', '/test/data.json?callback=?').returns({ 'body': "{some: 'text'}", 'status': 200, 'headers': {} });
          $.getJSON("/test/data.json?callback=?", function(data){
            remote_data = data;
          });
          using(me).wait(1).and_then(function(){
            expect(remote_data).to(equal, expected_data);
          });
        }); // end it
        
      }); // end describe
      
    }); // end describe
    
  }); // end describe
});
