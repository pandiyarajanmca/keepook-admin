import { Injectable } from '@angular/core';

declare var BigNumber: any;

import '../../assets/js/bignumber.min.js';

@Injectable()
export class MathematicsService {

  constructor() {
  }


 safeAdd = function (a, b) {
    let x = new BigNumber(a);
    let y = new BigNumber(b);
    return x.plus(y);

}

safeSubtract = function (a, b) {
    let x = new BigNumber(a);
    let y = new BigNumber(b);
    return x.minus(y);
}

safeDivide = function (a, b) {
    let x = new BigNumber(a);
    let y = new BigNumber(b);
    return x.dividedBy(y);
}

safeMultiply = function (a, b) {
    let x = new BigNumber(a);
    let y = new BigNumber(b);
    return x.multipliedBy(y);
}

valueOf = function (a) {
    return a.valueOf();

}

isGreaterThan = function (a, b) {
    let x = new BigNumber(a);
    let y = new BigNumber(b);
    return x.isGreaterThan(y);

}

isLessThan = function (a, b) {
    let x = new BigNumber(a);
    let y = new BigNumber(b);
    return x.isLessThan(y);

}

isGreaterThanOrEqualTo = function (a, b) {
    let x = new BigNumber(a);
    let y = new BigNumber(b);
    return x.isGreaterThanOrEqualTo(y);

}


isLessThanOrEqualTo = function (a, b) {
    let x = new BigNumber(a);
    let y = new BigNumber(b);
    return x.isLessThanOrEqualTo(y);

}

toFixed = function (a, b) {
    let x = new BigNumber(a);
    return x.toFixed(b);

}

toFixedNew = function (a, b) {
    let str = a.split(".");
    let str1 = str[0];
    let str2 = str[1];
    if (str2) {
        if (str2.length > b) {
            str2 = str2.slice(0, b);
        }
        else {
            let numofzero = b - str2.length;
            str2 += '0'.repeat(numofzero);
        }
    } else{
        str2 = '0000';
    }

    return str1 + '.' + str2;

}

isEqualTo = function (a, b) {
    let x = new BigNumber(a);
    let y = new BigNumber(b);
    return x.isEqualTo(y);

}



}
