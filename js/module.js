// @ts-check

// const { animals, showAnimals } = require('./animals');

// console.log(animals);
// showAnimals();

import Animal from './animals.js';

const ani = new Animal();
console.log(ani.animals);
ani.showAnimals();

const { cars, showCars } = require('./cars');

console.log(cars);
showCars();
