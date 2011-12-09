Mooch.console = {
  log: function(){
    if(typeof window.console != 'undefined'){
      // Make arguments play like an array
      var args = Array.prototype.slice.call(arguments,0);
      args.unshift("Mooch:");
      console.log.apply(console,args);
    }
  },
  warn: function(){
    if(typeof window.console != 'undefined'){
      // Make arguments play like an array
      var args = Array.prototype.slice.call(arguments,0);
      args.unshift("Mooch:");
      console.warn.apply(console,args);
    }
  }
};
