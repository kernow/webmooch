Mooch.console = {
  is_enabled: false,
  enable: function(){
    this.is_enabled = true;
  },
  disable: function(){
    this.is_enabled = false;
  },
  log: function(){
    if(this.is_enabled && typeof window.console != 'undefined'){
      // Make arguments play like an array
      var args = Array.prototype.slice.call(arguments,0);
      args.unshift("Mooch:");
      console.log.apply(console,args);
    }
  },
  warn: function(){
    if(this.is_enabled && typeof window.console != 'undefined'){
      // Make arguments play like an array
      var args = Array.prototype.slice.call(arguments,0);
      args.unshift("Mooch:");
      console.warn.apply(console,args);
    }
  }
};
