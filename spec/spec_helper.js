Screw.Unit(function() {
  after(function(){
    $(Mock.mocked_objects).each(function(i, obj){
      expect(obj).to(verify_to, true);
    });
  });
});
