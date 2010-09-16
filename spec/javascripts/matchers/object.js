beforeEach(function() {
  this.addMatchers({
    toHaveNumberOfKeys: function(expected) {
      this.message = function() {
        return 'expected ' + $.print(this.actual) +' to have ' + expected + ' key(s)';
      };
      return keys(this.actual).length == expected;
    }
  });
});

function keys(object) {
  var results = [];
  for (var property in object) {
    if (object.hasOwnProperty(property)) {
      results.push(property);
    }
  }
  return results;
}