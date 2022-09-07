// @ts-check

export default class Animal {
  constructor() {
    this.animals = ['dog', 'cat'];
  }

  showAnimals() {
    this.animals.map((el) => console.log(el));
  }
}
