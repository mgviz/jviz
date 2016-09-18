//Mouse
jviz.extend('mouse', {});

//Run an event
jviz.mouse.on = function(id, event, handler)
{
  //Run the selected event
  $('#' + id).on(event, function(e)
  {
    //Prevent default
    e.preventDefault();

    //Get the event position x
    var posx = e.pageX - $(this).offset().left;

    //Get the event position y
    var posy = e.pageY - $(this).offset().top;

    //Run the handler
    handler(e, posx, posy);
  });
};

//Register a mouse down event
jviz.mouse.down = function(id, handler){ jviz.mouse.on(id, 'mousedown', handler); };

//Register a mouse up event
jviz.mouse.up = function(id, handler){ jviz.mouse.on(id, 'mouseup', handler); };

//Register a mouse move event
jviz.mouse.move = function(id, handler){ jviz.mouse.on(id, 'mousemove', handler); };

//Register a mouse enter event
jviz.mouse.enter = function(id, handler){ jviz.mouse.on(id, 'mouseenter', handler); };

//Register a mouse leave event
jviz.mouse.leave = function(id, handler){ jviz.mouse.on(id, 'mouseleave', handler); };

//Register a mouse over event
jviz.mouse.over = function(id, handler){ jviz.mouse.on(id, 'mouseover', handler); };

//Register a mouse out event
jviz.mouse.out = function(id, handler){ jviz.mouse.on(id, 'mouseout', handler); };
