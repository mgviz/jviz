//Manage local storage
jviz.extend('storage', function(opt)
{
  //Check the options
  if(typeof opt === 'undefined'){ var opt = {}; }

  //Set the storage type
  this.type = (typeof opt.type === 'undefined') ? 'local' : opt.type;

  //Parse the type
  if(['local', 'session'].indexOf(this.type) === -1){ this.type = 'local'; }

  //Set the storage prefix
  this.id = (typeof opt.id === 'undefined') ? '' : opt.id;

  //Return this
  return this;
});

//Get the correct key
jviz.storage.prototype.key = function(key)
{
  //Return the correct key
  return (this.id === '') ? key : this.id + '.' + key;
};

//Get the storage type
jviz.storage.prototype.storage = function()
{
  //Return the storage type
  return (this.type === 'local') ? localStorage : sessionStorage;
};

//Set a new item on the storage
jviz.storage.prototype.set = function(key, value)
{
  //Parse the value
  if(typeof value === 'object'){ value = JSON.parse(value); }

  //Set the sotrage
  this.storage().setItem(this.key(key), value);
};

//Get an item from the storage
jviz.storage.prototype.get = function(key)
{
  //Return the key
  return this.storage().getItem(this.key(key));
};

//Remove an item from the storage
jviz.storage.prototype.remove = function(key)
{
  //Remove from the storage
  this.storage().removeItem(this.key(key));
};
