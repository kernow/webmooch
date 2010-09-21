beforeEach(function() {
  this.addMatchers({
    toHaveNumberOfKeys: function(expected) {
      this.message = function() {
        return 'expected object to have ' + expected + ' key(s), but it has ' + keys(this.actual).length + ' key(s)';
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