Screw.Unit(function() {  
  
  describe("Mooch", function() {
    
    var original_xml_http_request = window.XMLHttpRequest;
    
    after(function() {
      Mooch.reset();
    }); // end after
    
    describe("init", function() {
      
      before(function() {
        Mooch.init();
      }); // end before
      
      it("should replace XMLHttpRequest with the Mooch version", function() {
        expect(Mooch.XMLHttpRequest).to(equal, window.XMLHttpRequest);
        expect(original_xml_http_request).to_not(equal, window.XMLHttpRequest);
      }); // end it
      
    }); // end describe
    
    
    describe("reset", function() {
      
      before(function() {
        Mooch.init();
      }); // end before
      
      it("should replace XMLHttpRequest with the Mooch version", function() {
        Mooch.reset();
        expect(Mooch.XMLHttpRequest).to_not(equal, window.XMLHttpRequest);
        expect(original_xml_http_request).to(equal, window.XMLHttpRequest);
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
          delete remote_data;
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
          delete remote_data;
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
      
    }); // end describe
    
  }); // end describe
});
