//Event factory
jviz.factory.events = function(self)
{
  //Register the events
  self._events = {};

  //Function to add a new event
  self.on = function(name, listener)
  {
    //Check the name
    if(typeof name === 'undefined'){ return; }

    //Check the callback function
    if(typeof listener !== 'function'){ return; }

    //Register the new event
    self._events[name] = listener;
  };

  //Add a new event
  self.addEvent = function(name, listener){ return self.on(name, listener); };

  //Remove an event listener
  self.removeEvent = function(name)
  {
    //Check if event exists
    if(typeof self._events[name] === 'undefined'){ return; }

    //Delete the event
    delete self._events[name];
  };

  //Function to emit an event
  self.emit = function(name)
  {
    //Check the event
    if(typeof self._events[name] !== 'function'){ return true; }

    //Initialize the arguments array
    var args = [];

    //Read all the arguments
    for(var i = 1; i < arguments.length; i++){ args.push(arguments[i]); }

    //Call the event
    var out = self._events[name].apply(null, args);

    //Check for not boolean
    if(typeof out !== 'boolean'){ return true; }

    //Default, return the boolean
    return out;
  };

  //Return self
  return self;
};

