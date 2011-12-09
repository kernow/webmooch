Web Mooch
=========

Web Mooch is a library for stubbing HTTP requests in JavaScript. Web Mooch stubs requests at the lowest layer so it will work with any JavaScript library including custom code. This allows you to test the full AJAX request stack including callback code.

Features
--------

Web Mooch is still in the early development stages, if you have any feedback or would like to get involved with development please feel free to contact me.

Installation
------------

Simply download the JavaScript file and include it in your test suite http://github.com/kernow/webmooch/raw/master/build/mooch.js

Usage
-----

### A simple stub with a default response

    Mooch.stub_request('GET', 'example.com/load_something.json');

    $.ajax({ url: 'example.com/load_something.json' });

### Returning a custom body

    Mooch.stub_request('GET', 'www.example.com/load_something.json').
      returns({ body: '{ important_data: "this is important" }' });

    $.ajax({
      url: 'example.com/load_something.json',
      success: function(data) {
        alert('the important data is: ' + data.important_data);
      }
    });

### Enable or disable logging (disabled by default)

    Mooch.console.enable();
    Mooch.console.disable();