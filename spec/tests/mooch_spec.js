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
        Mooch.spies('restore_XMLHttpRequest').once();
        Mooch.reset();
        Mooch.reset();
      }); // end it
      
    }); // end describe
    
    
    describe("stub_request", function() {
      
      it("should return the Mooch object", function() {
        expect(Mooch.stub_request()).to(equal, Mooch);
      }); // end it
      
    }); // end describe
    
    
    describe("returns", function() {
      
      it("should return the Mooch object", function() {
        expect(Mooch.returns()).to(equal, Mooch);
      }); // end it
      
    }); // end describe
    
  }); // end describe
});
