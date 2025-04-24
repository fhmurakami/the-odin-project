function Player(name, marker) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.name = name;
  this.marker = marker;
  this.sayName = function () {
    console.log(this.name);
  };
}

let player1 = new Player("steve", "X");
let player2 = new Player("also steve", "O");
player1.sayName(); // logs 'steve'
player2.sayName(); // logs 'also steve'

Object.getPrototypeOf(player1) === Player.prototype; // returns true
Object.getPrototypeOf(player2) === Player.prototype; // returns true

Player.prototype.sayHello = function () {
  console.log("Hello, I'm a player!");
};

player1.sayHello(); // logs "Hello, I'm a player!"
player2.sayHello(); // logs "Hello, I'm a player!"

// Don't do this! __proto__ is deprecated
player1.__proto__ === Player.prototype; // returns true
player2.__proto__ === Player.prototype; // returns true

// In some places, like legacy code, you might also come across [[Prototype]],
// which is just another way of talking about the .__proto__ property of an
// object, like player1.[[Prototype]]

// What use is an object’s prototype?
// What is the purpose of defining properties and functions on the prototype?
//
// 1. We can define properties and functions common among all objects on the
//    prototype to save memory. Defining every property and function takes up
//    a lot of memory, especially if you have a lot of common properties and
//    functions, and a lot of created objects! Defining them on a centralized,
//    shared object which the objects have access to, thus saves memory.
//
// 2. The second reason is the name of this section, Prototypal Inheritance,
//    which we’ve referred to in passing earlier, in the introduction to the
//    Prototype. In recap, we can say that the player1 and player2 objects
//    inherit from the Player.prototype object, which allows them to access
//    functions like .sayHello.

// Player.prototype.__proto__
Object.getPrototypeOf(Player.prototype) === Object.prototype; // true

// Output may slightly differ based on the browser
player1.valueOf(); // Output: Object { name: "steve", marker: "X", sayName: sayName() }

// .valueOf() is inherited from Object.prototype
player1.hasOwnProperty("valueOf"); // false
Object.prototype.hasOwnProperty("valueOf"); // true

// as well as .hasOwnProperty()
Object.prototype.hasOwnProperty("hasOwnProperty"); // true
