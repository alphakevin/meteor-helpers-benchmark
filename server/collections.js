import { Mongo } from 'meteor/mongo';

export const Activities = new Mongo.Collection('col1');

export const ActivitiesWithHelper = new Mongo.Collection('col2');

export function fn0(doc) {
  return 'Hello World! 1' + doc._id;
}
export function fn1(doc) {
  return 'Hello World! 2' + doc._id;
}
export function fn2(doc) {
  return 'Hello World! 3' + doc._id;
}
export function fn3(doc) {
  return 'Hello World! 4' + doc._id;
}
export function fn4(doc) {
  return 'Hello World! 5' + doc._id;
}
export function fn5(doc) {
  return 'Hello World! 6' + doc._id;
}
export function fn6(doc) {
  return 'Hello World! 7' + doc._id;
}
export function fn7(doc) {
  return 'Hello World! 8' + doc._id;
}
export function fn8(doc) {
  return 'Hello World! 9' + doc._id;
}
export function fn9(doc) {
  return 'Hello World! 10' + doc._id;
}

ActivitiesWithHelper.helpers({
  method0() {
    return 'Hello World! 1' + this._id;
  },
  method1() {
    return 'Hello World! 2' + this._id;
  },
  method2() {
    return 'Hello World! 3' + this._id;
  },
  method3() {
    return 'Hello World! 4' + this._id;
  },
  method4() {
    return 'Hello World! 5' + this._id;
  },
  method5() {
    return 'Hello World! 6' + this._id;
  },
  method6() {
    return 'Hello World! 7' + this._id;
  },
  method7() {
    return 'Hello World! 8' + this._id;
  },
  method8() {
    return 'Hello World! 9' + this._id;
  },
  method9() {
    return 'Hello World! 10' + this._id;
  },
});
