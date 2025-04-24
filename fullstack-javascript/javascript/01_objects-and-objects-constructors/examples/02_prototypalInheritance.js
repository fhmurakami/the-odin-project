// Using prototypal inheritance
// - Adding a Person object constructor to the Player object
function Person(name) {
  this.name = name;
}

Person.prototype.sayName = function () {
  console.log(`Hello, I'm ${this.name}!`);
};

function Player(name, marker) {
  this.name = name;
  this.marker = marker;
}

Player.prototype.getMarker = function () {
  console.log(`My marker is '${this.marker}'`);
};

Object.getPrototypeOf(Player.prototype); // returns Object.prototype

// Now make `Player` objects inherit from `Person`
Object.setPrototypeOf(Player.prototype, Person.prototype);
Object.getPrototypeOf(Player.prototype); // returns Person.prototype

player1 = new Player("steve", "X");
player2 = new Player("also steve", "O");

player1.sayName(); // logs "Hello, I'm steve!"
player2.sayName(); // logs "Hello, I'm also steve!"

player1.getMarker(); // logs "My marker is 'X'"
player2.getMarker(); // logs "My marker is 'O'"

// Though it seems to be an easy way to set up Prototypal Inheritance using
// Object.setPrototypeOf(), the prototype chain has to be set up using this
// function before creating any objects. Using setPrototypeOf() after objects
// have already been created can result in performance issues.

// A warning… this doesn’t work:

// Player.prototype = Person.prototype;

// because it will set Player.prototype to directly refer to Person.prototype
// (i.e. not a copy), which could cause problems if you want to edit something
// in the future.
