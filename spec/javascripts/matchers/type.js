beforeEach(function() {
  this.addMatchers({
    toBeAnObject: function() {
      this.message = function() {
        return 'expected ' + $.print(this.actual) + ' to be an object';
      };
      
      return this.actual && typeof this.actual === 'object';
    }
  });
});
