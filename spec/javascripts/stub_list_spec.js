describe("Mooch StubList", function() {
  
  var stub_list;
  
  beforeEach(function() {
    stub_list = new Mooch.StubList();
  }); // end before
  
  afterEach(function() {
    stub_list = undefined;
  }); // end after
  
  describe("new", function() {
    
    it("should create an empty stub_list object", function() {
      expect(stub_list.items).toEqual({});
    }); // end it
    
  }); // end describe
  
  describe("add", function() {
    
    it("should add an stub to the list with the correct key", function() {
      stub_list.add('POST', '/some/url.json');
      expect(stub_list.items['POST_/some/url.json']).toBeAnObject();
    }); // end it
    
    it("should add an stub to the list with a complex key", function() {
      stub_list.add('POST', 'http://user:pass@domain.com:80/some/url.json?foo=bar+1&bar=foo');
      expect(stub_list.items['POST_http://user:pass@domain.com:80/some/url.json?foo=bar+1&bar=foo']).toBeAnObject();
    }); // end it
    
    it("should find a stub with the same key", function() {
      stub_list.add('POST', '/some/url.json');
      expect(stub_list.items['POST_/some/url.json']).toBeAnObject();
      expect(stub_list.items).toHaveNumberOfKeys(1);
      stub_list.add('POST', '/some/url.json');
      expect(stub_list.items).toHaveNumberOfKeys(1);
    }); // end it
    
  }); // end describe
  
}); // end describe
