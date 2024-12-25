import * as bcrypt from 'bcrypt';
import { ORDER_TYPE } from './constant';
import * as _ from 'lodash';

export const generatePassword = async (password: string) => {
  const saltOrRounds = 10;
  return await bcrypt.hash(password, saltOrRounds);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

/**
 * This function takes in an array and a key (string) as parameters and returns an object with the array items grouped by the key specified.
 * It uses the reduce method to build an object with the array items grouped by the key.
 * The object keys are the values of the key parameter, and the object values are arrays of the items grouped by the value of the key parameter.
 * @param array
 * @param key
 * @returns object
 */
export const groupBy = (array, key) => {
  // Return the end result
  return array.reduce((result, currentValue) => {
    // If an array already present for key, push it to the array. Else create an array and push the object
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue,
    );
    // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
    return result;
  }, {}); // empty object is the initial value for result object
};

//get data sorted order
export function GetSortedOrder(props: any, order?: string) {
  if (order === ORDER_TYPE.DESC) {
    return function (a: any, b: any) {
      if (a[props] > b[props]) {
        return -1;
      } else if (a[props] < b[props]) {
        return 1;
      }
      return 0;
    };
  } else {
    return function (a: any, b: any) {
      if (a[props] > b[props]) {
        return 1;
      } else if (a[props] < b[props]) {
        return -1;
      }
      return 0;
    };
  }
}

export function cloneDeep(data: any) {
  return _.cloneDeep(data);
}

export function generateSku() {
  return Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')
    .toUpperCase();
}
