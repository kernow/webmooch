Screw.Unit(function() {
  
  describe("Mooch.StubList", function() {
    
    var stub_list;
    
    before(function() {
      stub_list = new Mooch.StubList();
    }); // end before
    
    after(function() {
      stub_list = undefined;
    }); // end after
    
    describe("new", function() {
      
      it("should create an empty stub_list object", function() {
        expect(stub_list.stubs).to(equal, {});
      }); // end it
      
    }); // end describe
    
    
    describe("add", function() {
      
      it("should add a object to the stubs object with the correct key", function() {
        stub_list.add('POST', '/some/url.json');
        expect(stub_list.stubs['POST_/some/url.json']).to(be_an_object);
      }); // end it
      
      it("should add a object to the stubs object with a complex key", function() {
        stub_list.add('POST', 'http://user:pass@domain.com:80/some/url.json?foo=bar+1&bar=foo');
        expect(stub_list.stubs['POST_http://user:pass@domain.com:80/some/url.json?foo=bar+1&bar=foo']).to(be_an_object);
      }); // end it
      
      it("should find a stub with the same key", function() {
        stub_list.add('POST', '/some/url.json');
        expect(stub_list.stubs['POST_/some/url.json']).to(be_an_object);
        stub_list.add('POST', '/some/url.json');
        expect(stub_list.stubs).to(have_number_of_keys, 1);
      }); // end it
      
    }); // end describe
    
  }); // end describe
  
});