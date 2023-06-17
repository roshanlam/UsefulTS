import { mkdirSync } from 'fs';

/**
 * 
 * @param obj The object to be cloned.
 * @description This function can be used to create a deep copy of an object, ensuring that all nested properties and objects are cloned as well.
 * @returns A deep copy of the object passed in.
 */
export function deepClone<T>(obj: T): T{
    return JSON.parse(JSON.stringify(obj));
}

/**
 * @param func The function to be debounced.
 * @param delay The delay in milliseconds.
 * @description This function can be used to debounce a function, ensuring that it is only called once after a certain amount of time has passed.
 * @returns A debounced version of the function passed in.
 */
export function debounce(func: Function, delay: number){
    let timer: NodeJS.Timeout;
    return function (this: any, ...args: any[]) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
      };
}

/**
 * 
 * @param func The function to be throttled.
 * @param delay The delay in milliseconds.
 * @returns  A throttled version of the function passed in.
 * @description This function can be used to throttle a function, 
 * ensuring that it is only called once every certain amount of time.
 */
export function throttle(func: Function, delay: number) {
    let lastCall = 0;
    return function (this: any, ...args: any[]) {
      const now = new Date().getTime();
      if (now - lastCall >= delay) {
        func.apply(this, args);
        lastCall = now;
      }
    };
  }

  
/**
 * @param length The length of the string to be generated.
 * @description This function can be used to generate a random string of a given length.
 * @returns A random string of the given length.
 */
export function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export function isInArray<T>(array: T[], item: T): boolean {
    return array.indexOf(item) !== -1;
}

export function formatNumberWithCommas(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function isNumber(value: any): boolean {
    return typeof value === 'number' && isFinite(value);
}

export function isString(value: any): boolean {
    return typeof value === 'string';
}

export function isBoolean(value: any): boolean {
    return typeof value === 'boolean';
}

export function isObject(value: any): boolean {
    return typeof value === 'object';
}

export function isFunction(value: any): boolean {
    return typeof value === 'function';
}

export function isUndefined(value: any): boolean {
    return typeof value === 'undefined';
}

export function isNull(value: any): boolean {
    return value === null;
}

export function isNullOrUndefined(value: any): boolean {
    return isUndefined(value) || isNull(value);
}

export function isNullOrEmpty(value: any): boolean {
    return isNullOrUndefined(value) || value === '';
}

export function findMaxValue(arr: number[]): number {
    return Math.max(...arr);
}

export function findMinValue(arr: number[]): number {
    return Math.min(...arr);
}

export function removeDuplicates<T>(arr: T[]): T[] {
    return [...new Set(arr)];
}

export function stringContainsSubstring(str: string, substring: string): boolean {
    return str.includes(substring);
}

export function trimWhitespace(str: string): string {
    return str.trim();
}

export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function getCurrentTimestamp(): number {
    return Date.now();
}

export function throwError(message: string): never {
    throw new Error(message);
}
 
export function hasProperty(obj: object, property: string): boolean {
    return Object.prototype.hasOwnProperty.call(obj, property);
}

export function serializeToJSON(obj: object): string {
    return JSON.stringify(obj, null, 2);
}

export function deserializeFromJSON(json: string): object {
    return JSON.parse(json);
}

export function getKeys(obj: object): string[] {
    return Object.keys(obj);
}

export function getValues(obj: object): any[] {
    return Object.values(obj);
}

export function createDirectory(path: string): void {
    mkdirSync(path, { recursive: true });
}

export default {
    deepClone,
    debounce,
    throttle,
    generateRandomString,
    isInArray,
    formatNumberWithCommas,
    isNumber,
    isString,
    isBoolean,
    isObject,
    isFunction,
    isUndefined,
    isNull,
    isNullOrUndefined,
    isNullOrEmpty,
    findMaxValue,
    findMinValue,
    removeDuplicates,
    stringContainsSubstring,
    trimWhitespace,
    isValidEmail,
    getCurrentTimestamp,
    throwError,
    hasProperty,
    serializeToJSON,
    deserializeFromJSON,
    getKeys,
    getValues
}