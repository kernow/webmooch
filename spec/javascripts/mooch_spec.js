describe("Mooch", function() {
  
  var original_xml_http_request = window.XMLHttpRequest && (window.location.protocol !== "file:" || !window.ActiveXObject) ? window.XMLHttpRequest : window.ActiveXObject;
  
  describe("init", function() {
    
    beforeEach(function() {
      Mooch.init();
    }); // end before
    
    afterEach(function() {
      Mooch.reset();
    }); // end after
    
    it("should replace XMLHttpRequest with the Mooch version", function() {
      if(window.XMLHttpRequest && (window.location.protocol !== "file:" || !window.ActiveXObject)){
        expect(Mooch.XMLHttpRequest).toEqual(window.XMLHttpRequest);
        expect(original_xml_http_request).toNotEqual(window.XMLHttpRequest);
      }else{
        expect(Mooch.XMLHttpRequest).toEqual(window.ActiveXObject);
        // TODO: this fails in IE (7 and maybe 8) need to investigate why
        // expect(original_xml_http_request).toNotEqual(window.ActiveXObject);
      }
    }); // end it
    
    it("should create a sub list", function() {
      expect(Mooch.stub_list).toBeAnObject();
    }); // end it
    
  }); // end describe
  
  describe("reset", function() {
    
    beforeEach(function() {
      Mooch.init();
    }); // end before
    
    it("should reset XMLHttpRequest to it's original state", function() {
      Mooch.reset();
      if(window.XMLHttpRequest && (window.location.protocol !== "file:" || !window.ActiveXObject)){
        expect(original_xml_http_request).toEqual(window.XMLHttpRequest);
      }else{
        expect(original_xml_http_request).toEqual(window.ActiveXObject);
      }
    }); // end it
    
    it("calling the method multiple times should only reset XMLHttpRequest once", function() {
      var mooch_mock = new Mock(Mooch);
      Mooch.spies('restore_XMLHttpRequest').once();
      Mooch.reset();
      Mooch.reset();
    }); // end it
    
    it("should clear the stub list", function() {
      Mooch.reset();
      expect(Mooch.stub_list).toBeNull();
    }); // end it
    
  }); // end describe
  
  describe("stub_request", function() {
    
    beforeEach(function() {
      var stub_list_mock = new Mock(Mooch.StubList.prototype);
    }); // end before
    
    afterEach(function() {
      Mooch.reset();
    }); // end after
    
    it("should add an object to the stub list", function() {
      Mooch.StubList.prototype.spies('add').passing('POST', '/hello_world');
      Mooch.stub_request('POST', '/hello_world');
    }); // end it
    
    it("should return the Mooch object", function() {
      expect(Mooch.stub_request()).toBeAnObject();
    }); // end it
    
  }); // end describe
  
  describe("a remote", function() {
    
    afterEach(function() {
      Mooch.reset();
    }); // end after
    
    describe("post request", function() {

      var remote_data;
      var expected_data;

      beforeEach(function() {
        expected_data = "some text";
      }); // end before

      afterEach(function() {
        remote_data = undefined;
      }); // end after

      it("should return the expected data", function() {
        Mooch.stub_request('POST', '/test/data.json').returns({ 'body': "some text", 'status': 200, 'headers': {} });
        $.post('/test/data.json', {}, function(data){
          remote_data = data;
        });
        
        waits(100);
        
        runs(function(){
          expect(remote_data).toEqual(expected_data);
        });
      }); // end it
      
    }); // end describe
    
    describe("a get request", function() {
      
      var remote_data;
      var expected_data;

      beforeEach(function() {
        expected_data = "some text";
      }); // end before

      afterEach(function() {
        remote_data = undefined;
      }); // end before

      it("should return the expected data", function(me) {
        Mooch.stub_request('GET', '/test/data.json').returns({ 'body': "some text", 'status': 200, 'headers': {} });
        $.get('/test/data.json', {}, function(data){
          remote_data = data;
        });
        
        waits(100);
        
        runs(function(){
          expect(remote_data).toEqual(expected_data);
        });
      }); // end it
      
    }); // end describe
    
    describe("jquery adding no cache data", function() {
      
      var remote_data;
      var expected_data;
      
      beforeEach(function() {
        expected_data = "some text";
      }); // end before

      afterEach(function() {
        remote_data = undefined;
      }); // end after
      
      it("should remove jquery style no cache parameters", function(me) {
        Mooch.stub_request('GET', '/test/url').returns({ 'body': "some text", 'status': 200, 'headers': {} });
        $.ajax({
          url: '/test/url',
          cache: false,
          success: function(data){
            remote_data = data;
          }
        });

        waits(100);
        
        runs(function(){
          expect(remote_data).toEqual(expected_data);
        });
      }); // end it
      
    }); // end describe
    
    describe("a JSONP request", function() {
      
      var expected_data;

      beforeEach(function() {
        expected_data = {some: 'text'};
      }); // end before

      afterEach(function() {
        remote_data = undefined;
      }); // end after

      it("should return the expected data", function(me) {
        var remote_data;
        Mooch.stub_request('GET', '/test/data.json?callback=?').returns({ 'body': "{some: 'text'}", 'status': 200, 'headers': {} });
        $.getJSON("/test/data.json?callback=?", function(data){
          remote_data = data;
        });

        waits(100);
        
        runs(function(){
          expect(remote_data).toEqual(expected_data);
        });
      }); // end it
      
    }); // end describe
    
  }); // end describe
  
}); // end describe
