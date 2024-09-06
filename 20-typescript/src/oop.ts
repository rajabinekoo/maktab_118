// OOP System

// Class
// Encapsulation
// Inheritance
// Composition -> not important for front-end developers
// Abstraction -> not important for front-end developers
// Interface
// Polymorphism
// Generics

// ================== contructor review ==================

// function User(username: string, email: string) {
//   this.username = username;
//   this.email = email;
// }

// ================== class ==================
// blueprint
// implementation (default value, functionality, dynamic value)
// constructor

class Vehicle {
  // properties
  public isVehicle: boolean = true;
  private doorsCount: number;
  protected wheelsCount: number;

  // constructor, when we wanna get instance from this class
  // return -> object instance
  // default: constructor() {}
  constructor(wheelsCount: number, doorsCount: number) {
    if (doorsCount < 0) throw new Error("Invalid doors count");
    if (wheelsCount < 0) throw new Error("Invalid wheels count");
    // operation ...
    // property initialization
    this.init().catch(console.error);
    this.doorsCount = doorsCount;
    this.wheelsCount = wheelsCount;
  }

  private async init() {
    console.log("ok");
  }

  // methods
  openDoor(index?: number): void {
    if (!index) return;
    if (index > this.doorsCount) {
      throw new Error(`Must be lower then ${this.doorsCount}`);
    }
    console.log(index);
    this.doorsBeep();
  }
  closeDoor(index?: number) {}
  private doorsBeep() {
    console.log("Beep beep beep");
  }
}

// const a = new Vehicle(4, 4);
// console.log(a instanceof Vehicle);
// console.log(a.isVehicle);

// ================== inheritance ==================

class Automobile extends Vehicle {
  public name: string = "";
  constructor(name: string, wheelsCount: number, doorsCount: number) {
    super(wheelsCount, doorsCount);
    this.name = name;
  }
  public startEngine() {
    console.log("Starting engine");
    this.accelerate(this.wheelsCount);
  }
  private accelerate(wheels: number) {
    console.log(wheels);
  }
}
class Car extends Automobile {}
class Truck extends Automobile {}

const b = new Car("BMW", 4, 4);
console.log(b);
b.startEngine();

// * Classes can only extend a single class
// class A {}
// class Automobile2 extends Vehicle, A {}

// ================== interface ==================
// Shows us how to access an object

interface IPerson {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  sayHello(_: string): void;
}

interface IUser extends IPerson {
  email?: email;
  username: string;
}

class B implements IUser, IPerson {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  email?: `${string}@gmail.com` | undefined;
  username: string;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    avatar: string,
    username: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.avatar = avatar;
    this.username = username;
  }

  sayHello(name: string): void {
    console.log(`Hello ${name}`);
  }
}
