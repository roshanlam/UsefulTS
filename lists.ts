/**
 * @description A list utility class that provides a set of helper methods for working with lists.
 */

interface IEnumerator<T> {
    current: T;
    moveNext(): boolean;
    reset(): void;
}

interface IList<T> {
    add(item: T): void;
    addRange(items: T[]): void;
    clear(): void;
    contains(item: T): boolean;
    indexOf(item: T): number;
    insert(index: number, item: T): void;
    remove(item: T): void;
    removeAt(index: number): void;
    toArray(): T[];
    count(): number;
    getEnumerator(): IEnumerator<T>;
}


class ListEnumerator<T> implements IEnumerator<T> {
    private _list: IList<T>;
    private _index: number = -1;

    constructor(list: IList<T>) {
        this._list = list;
    }

    public get current(): T {
        return this._list.toArray()[this._index];
    }

    public moveNext(): boolean {
        this._index++;
        return this._index < this._list.count();
    }

    public reset(): void {
        this._index = -1;
    }
}

class List<T> implements IList<T> {
    private _items: T[] = [];

    public add(item: T): void {
        this._items.push(item);
    }

    public addRange(items: T[]): void {
        this._items = this._items.concat(items);
    }

    public clear(): void {
        this._items = [];
    }

    public contains(item: T): boolean {
        return this.indexOf(item) !== -1;
    }

    public indexOf(item: T): number {
        return this._items.indexOf(item);
    }

    public insert(index: number, item: T): void {
        this._items.splice(index, 0, item);
    }

    public remove(item: T): void {
        var index = this.indexOf(item);
        if (index !== -1) {
            this.removeAt(index);
        }
    }

    public removeAt(index: number): void {
        this._items.splice(index, 1);
    }

    public toArray(): T[] {
        return this._items;
    }

    public count(): number {
        return this._items.length;
    }

    public getEnumerator(): IEnumerator<T> {
        return new ListEnumerator(this);
    }

    public static fromArray<T>(items: T[]): List<T> {
        var list = new List<T>();
        list.addRange(items);
        return list;
    }

    public static fromEnumerator<T>(enumerator: IEnumerator<T>): List<T> {
        var list = new List<T>();
        while (enumerator.moveNext()) {
            list.add(enumerator.current);
        }
        return list;
    }

    public static fromObject<T>(obj: any): List<T> {
        var list = new List<T>();
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                list.add(obj[key]);
            }
        }
        return list;
    }
}