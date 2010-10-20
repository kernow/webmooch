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
  
  describe("find_or_create", function() {
    
    beforeEach(function() {
      stub_list.add('POST', '/some/url.json');
      stub_list.add('POST', '/some/other_url.json');
    }); // end before
    
    it("should create a new stub if none existed with the same key", function() {
      expect(stub_list.items).toHaveNumberOfKeys(2);
      stub_list.find_or_create('POST', '/some/new_url.json');
      expect(stub_list.items).toHaveNumberOfKeys(3);
    }); // end it
    
    it("should find a stub if one already exists", function() {
      expect(stub_list.items).toHaveNumberOfKeys(2);
      stub_list.find_or_create('POST', '/some/url.json');
      expect(stub_list.items).toHaveNumberOfKeys(2);
    }); // end it
    
    it("should return the created object", function() {
      expect(stub_list.find_or_create('POST', '/some/new_url.json')).toEqual({ stub: null, invocation_count: 0 });
    }); // end it
    
    it("should return the existing object", function() {
      var item = stub_list.find_or_create('POST', '/some/url.json');
      expect(item.stub).toBeAnObject();
      expect(item.invocation_count).toEqual(0);
    }); // end it
    
  }); // end describe
  
}); // end describe
