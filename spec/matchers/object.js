Screw.Matchers["have_number_of_keys"] = {
  match: function(expected, actual) {
    return keys(actual).length == expected;
  },
  failure_message: function(expected, actual, not) {
    return 'expected ' + $.print(actual) + (not ? ' to not ' : ' to ') + 'have ' + expected + ' key(s)';
  }
};

function keys(object) {
  var results = [];
  for (var property in object) {
    if (object.hasOwnProperty(property)) {
      results.push(property);
    }
  }
  return results;
}