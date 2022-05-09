---
title: Typescript - 常見的型別 (上)
date: "2022-05-09T21:00:00.000Z"
description: "在上一篇文章中，我們簡單介紹了一下 Typescript 與 Javascript 的關聯，以及對 Javascript 開發者來說，剛使用 Typescript 需要知道的概念。而在接下來的文章中，我們會根據 Typescript Document 中的 Everyday Types ，先來介紹 Typescript 常見的型別，藉由認識基本以及常見的型別，來幫助我們能在面對複雜的情境時，使用合適的型別。"
---
![dose-juice-2QA1vKJbbG0-unsplash.jpg](./index.jpg)
Photo by [Dose Juice
](https://unsplash.com/@dosejuice) on [Unsplash](https://unsplash.com/photos/2QA1vKJbbG0)

在上一篇文章中，我們簡單介紹了一下 Typescript 與 Javascript 的關聯，以及對 Javascript 開發者來說，剛使用 Typescript 需要知道的概念。而在接下來的文章中，我們會根據 Typescript Document 中的 [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)，先來介紹 Typescript 常見的型別，藉由認識基本以及常見的型別，來幫助我們能在面對複雜的情境時，使用合適的型別。

## 原生型別（Primitives）

在 Javascript 的原生語法中，`string`、`number`、`boolean` 是三個很常見的型別，而在 Typescript 中，他們也都有各自對應的型別，且型別的名稱也一樣。

- `string`：代表字串，例如 `“Hello World”`。
- `number`：代表數字，例如 `42`。而在 Javascript 中，並沒有特別去區分整數（integer）或是浮點數（float），所有的數字的型別都是 `number`。
- `boolean`：只有兩個值的型別為布林，`true` 或是 `false`。

## 陣列（Arrays）

在 Typescript 中，我們可以透過定義陣列的型別，來得知陣列中項目的長相。而我們可以透過兩種方式來定義陣列的型別，分別是 `Type[]` 或是 `Array<Type>`。

在下方的例子中，我們使用了兩種方式來定義一組為數字型別的陣列：

```tsx
const numbers:number[] = [1, 2, 3]
const numbers:Array<number> = [4, 5, 6]
```

## any

`any` 是一個特別的型別，可以把它想成是一個包含任何型別的集合。當我們建立一個變數，但沒有指定型別或是值，此時 Typescript 會自動將該變數的型別預設為 `any`。而當型別被設置成 `any` 時，Typescript 無法有效地判斷出原始型別。

```tsx
let value;
value = true;
value = 42;
value = 'Hello World';
```

為了避免 `any` 被濫用，我們可以透過在 `tsconfig` 檔案中加入 `noImplicitAny`，來避免非預期的行為發生。

```tsx
function fn(s) {
// Parameter 's' implicitly has an 'any' type.
  console.log(s.subtr(3));
}
```

## 型別註釋（Type Annotations）

除了讓 Typescript 自動來幫我們推論出型別，我們也可以透過型別註釋的方法來指定一個明確的型別給該變數。

```tsx
let score = 100; // 推論 inference
let luckyNumber: number = 7; // 註釋 annotation
```

## 函式（Functions）

在 JavaScript 中，函式是用於執行某一個任務或計算的一段程式法語法。在 Typescript 中，我們可以同時幫函式的參數以及回傳值定義型別，來避免我們的函示發生沒有預期的行為。

### 參數型別

當我們在 Typescript 中定義函式之後，如果沒有透過型別註釋把參數加上型別，此時 Typescript 會幫我自動推論該參數的型別為 `any`。

```tsx
function greet(name) {
	// Parameter 'name' implicitly has an 'any' type.
  console.log("Hello, " + name.toUpperCase() + "!!");
}
```

透過型別註釋，我們就可以幫每個參數加上指定的型別。

```tsx
function sum(num1: number, num2: number) {
	return num1 + num2
}

sum('1', 2)
// Argument of type 'string' is not assignable to parameter of type 'number'
```

### 回傳值型別

在 Typescript 中，函數回傳值與一般變數相同，Typescript 都能透過推導的方式，自動幫我們判斷出該值的型別。此外，我們一樣可以透過型別註釋的方法，指定一個函式回傳值的型別。

```tsx
function sum(num1: number, num2: number):number {
	return num1 + num2
}
```

### 匿名函式

與函式宣告不同的是，當一個匿名函式出現在 Typescript 知道他會如何執行的地方，那們 Typescript 就會自動推導出對應的型別，這種行為也叫做 *contextual typing*。

```tsx
const names = ["Alice", "Bob", "Eve"];

names.forEach(function (s) {
  console.log(s.toUppercase());
	// Property 'toUppercase' does not exist on type 'string'.
	// Did you mean 'toUpperCase'?
});
```

## 物件型別（Object Types）

除了原生型別，我們在 Typescript 內最常定義的的型別就是物件型別。除了透過 TypeScript 自動推論物件型別外，我們也可以透過型別註釋來定義物件內每個屬性的型別，快速的建立一個物件的型別。

```tsx
const circle: {x: number, y: number, radius: number} = {
	x: 0,
	y: 5,
	radius: 10,
}
```

```tsx
function printCoord(shape: { x: number; y: number }) {
  console.log("The coordinate's x value is " + shape.x);
  console.log("The coordinate's y value is " + shape.y);
}
printCoord({ x: 3, y: 7 });
```

### 選擇性屬性（Optional Properties）

如果物件內有選擇性屬性，我們可以透過加上 `?` 給對應的屬性 。

```tsx
const kevin: {name: string, age: number, country?: string} = {
	name: 'Kevin',
	age: 30,
}
```

```tsx
function printUser(user: { name: string; age: number, country?: string }) {
  // ...
}
printName({ name: "Alice", age: 20 }); // OK
printName({ name: "Bob", age: 21, country: 'Taiwan'  }); // OK
```

在 Javascript 中，假如我們嘗試去取得一個不存在的屬性，我們會拿到 `undefined` 的值，因此在 Typescript 中，如果我們要對一個選擇性屬性進行操作，我們需要先加上值是否為 `undefined` 的判斷或是 `typeof` type guards，才能進行後續的操作。

```tsx
function printUser(user: { name: string; age: number, country?: string }) {
  // Error - might crash if 'user.country' wasn't provided!
	// 	Object is possibly 'undefined'.
  console.log(user.country.toUpperCase());

  if (typeof(obj.last) !== 'undefined') { // type guard
    // OK
    console.log(obj.last.toUpperCase());
  }
 
  // A safe alternative using modern JavaScript syntax:
  console.log(obj.last?.toUpperCase());
}
```

### 總結

在這篇文章中，我們介紹了幾個在 Typescript 中，我們會經常碰到的型別與用法。透過認識這些型別以及用法，可以逐步的了解 Typescript 可以如何幫助我們，避開在 Javascript 中我們經常會碰到的型別轉換所造成的問題。

### Refs:
- [https://www.typescriptlang.org/docs/handbook/2/everyday-types.html](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- [https://willh.gitbook.io/typescript-tutorial/](https://willh.gitbook.io/typescript-tutorial/)