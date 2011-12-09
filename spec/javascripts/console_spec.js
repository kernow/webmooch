describe("Mooch.Console", function(){
  
  describe("is_enabled", function(){
    it("should be false by default", function(){
      expect( Mooch.console.is_enabled ).toBeFalsy();
    });
  });
  
  describe("enable()", function(){
    it("should set is_enabled to true", function(){
      Mooch.console.enable();
      expect( Mooch.console.is_enabled ).toBeTruthy();
    });
  });
  
  describe("disable()", function(){
    it("should set is_enabled to false", function(){
      Mooch.console.disable();
      expect( Mooch.console.is_enabled ).toBeFalsy();
    });
  });
  
});