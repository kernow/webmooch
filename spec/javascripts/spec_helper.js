afterEach(function(){
  $(Mock.mocked_objects).each(function(i, obj){
    expect(obj).verify_expectations();
  });
});