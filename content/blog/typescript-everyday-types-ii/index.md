---
title: Typescript - 常見的型別 (下)
date: "2022-06-27T21:00:00.000Z"
description: "在這篇的文章中，我們會繼續根據 Typescript Document 中的 Everyday Types，介紹剩下幾個 Typescript 中常見的型別及用法，藉由認識所有基本以及常見的型別，來幫助我們在使用 Typescript 開發時，能更加的上手。"
---
![brett-jordan-O0OCxZf0fTk-unsplash.jpg](./index.jpg)
Photo by [Brett Jordan](https://unsplash.com/@brett_jordan) on [Unsplash](https://unsplash.com/photos/O0OCxZf0fTk)

在這篇的文章中，我們會繼續根據 Typescript Document 中的 [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)，介紹剩下幾個 Typescript 中常見的型別及用法，藉由認識所有基本以及常見的型別，來幫助我們在使用 Typescript 開發時，能更加的上手。

## 聯合型別（Union Types）

聯合型別是由兩種或以上的型別所構成，我們可以透過聯合型別，將不同的型別組合起來。
例如在在下方的例子中，`printId(id)` 可以同時接受 `string` 以及 `number` 兩種型別的 `id` 。

```tsx
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
// OK
printId(101);
// OK
printId("202");
// Error
printId({ myID: 22342 });
// Argument of type '{ myID: number; }' is not assignable to parameter of type 'string | number'.
```

然而當我們宣告了一個聯合型別，Typescript 只會允許我們取得該聯合型別中，每個型別都擁有的屬性。我們可以透過限縮（narrow）的方式來讓 Typescript 判斷出對應的型別，以及該型別中可以取得的屬性。

```tsx
function printId(id: number | string) {
  console.log(id.toUpperCase());
	// Property 'toUpperCase' does not exist on type 'string | number'.
	// Property 'toUpperCase' does not exist on type 'number'.
}

function printId(id: number | string) {
  if (typeof id === "string") {
    console.log(id.toUpperCase()); // In this branch, id is of type 'string'
  } else {
    console.log(id); // Here, id is of type 'number'
  }
}
```

## 型別別名（Type Aliases）

使用一個名字來當作型別的別名。

```tsx
type Point = {
  x: number;
  y: number;
};
 
type ID = number | string;
```

## 介面（Interfaces）

介面是另一種可以用來定義物件型別的方式。

在物件導向的程式語言中 ex: `Java`，介面是指實體類別 `class` 的抽象，任何的類別 `class` 都需要經過介面（`interfaces`）來實現（`implement`）出來。而在 Typescript 中，介面的概念則更加靈活，可以用來描述物件的形狀（`shape`）。

```tsx
interface Point {
  x: number;
  y: number;
}

interface Person {
    name: string;
    age: number;
}
```

## 別名（Aliases）vs 介面（Interfaces）

雖然別名以及介面非常相似，都可以用來定義物件的型別，但是他們之間還是有許多不同的地方。

### 繼承方式

Interface 可以透過 extend 的方式來繼承 interface，Type aliases 則是需要透過 intersection 的方式來實現。

- Interface

```tsx
interface Animal {
  name: string
}

interface Cat extends Animal {
  sound: string
}
```

- Type aliases

```tsx
type Animal = {
  name: string
}

type Cat = Animal & { 
  sound: string
}
```

### 重複宣告

宣告相同名稱的 Interface 會讓後續宣告的物件屬性新增至該 Interface，宣告相同的 Type aliases 則是會造成錯誤。

- Interface

```tsx
interface Person {
	name: string
}

interface Person {
	age: number
}

function printUserInfo(user: Person) {
	console.log(user.name, user.age)
}

printUserInfo({ name: 'Kevin' })
// Property 'age' is missing in type '{ name: string; }' but required in type 'Person'.
```

- Type aliases

```tsx
type Person {
	name: string
}

type Person {
	age: number
}

// Duplicate identifier 'Person'.
```

## 型別斷言（Type Assertions）

有些時候我們會比 Typescript 更清楚對應的型別，此時我們就可以透過斷言的方式來指定更具體的型別。

```tsx
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;

const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

斷言只能讓我們指定更抽象或是更具體的型別，因此 Typescript 還是會幫我們進行基本的型別判斷，來避免錯誤的斷言。

```tsx
const greeting = "hello" as number;

// Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
```

## 字面型別（Literal Types）

一般的 `string` 以及 `number` 型別，只能讓我們判斷值是否為文字或是數字。如果我們想要指定特定的字串文字或是數值當作型別，則是可以透過字面型別來實現。

```tsx
let greeting = 'Hello' : 'Hello'
greeting = 'Hi'

// Type '"Hi"' is not assignable to type '"Hello"'.
```

常見的用法為透過結合不同字面型別來組成 union，來幫助我們限制出特定的值。

```tsx
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}

function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}
```

### 字面型別推論（Literal Inference）

當我們定義了一個物件的變數，此時 Typescript 會假設物件內部的值是被改變的，因此對應值的型別會被推論成原生型別而不是字面型別。

```tsx
declare function handleRequest(url: string, method: "GET" | "POST"): void;

const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method);
// Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
```

假如我們想要使用字面型別在物件上，可以透過以下兩種方式：

1. 型別斷言

```tsx
// 1:
const req = { url: "https://example.com", method: "GET" as "GET" };
// 2
handleRequest(req.url, req.method as "GET");
```

1. 使用 `as const` 來將整個物件型別替換為字面型別

```tsx
const req = { url: "https://example.com", method: "GET" } as const;
handleRequest(req.url, req.method);
```

## Null 及 Undefined

`null` 以及 `undefined` 是 JS 中就存在的原始型別，`null` 代表的是空值，而 `undefined` 代表的則是尚未被賦予值。在 Typescript 中也有這兩種對應的型別，可以透過調整 `strictNullChecks` 這個 TSConfig 的設置，來產生不同的型別判斷條件。

- off：當 `strictNullChecks` 為 off 時，我們可以賦予 `null` 或是 `undefined` 的值給其他型別。

```tsx
let name = 'Kevin'
name = null // OK
name = undefined // OK
```

- on：當 `strictNullChecks` 為 on 時，我們則不能賦予 `null` 或是 `undefined` 給其他型別。

```tsx
let name = 'Kevin'
name = null // Type 'null' is not assignable to type 'string'.
name = undefined // Type 'undefined' is not assignable to type 'string'.
```

- Non-null Assertion Operator：在 Typescript 中，我們可以透過使用 `!` postfix，來告訴 Typescript 對應的值不是 `null` 以及 `undefined`，並進行後續的處理。

```tsx
type Name = null | undefined | string

function printName1(name: Name) {
    console.log(name.length) // Error: Object is possibly 'null' or 'undefined'.
}

function printName2(name: Name) {
    console.log(name!.length) // OK
}
```

### 總結
在這篇文章中，我們介紹了剩下幾個在 Typescript 中，經常會使用到的型別與用法。藉由認識這些常見型別以及用法，我們對於 Typescript 已經有初步的認識，並且可以有效的透過 Typescript，幫助我們避開在 Javascript 中我們經常會踩到的型別轉換問題。

最後，如果文章中有任何問題或是錯誤的部分，可以透過 [LinkedIn](https://www.linkedin.com/in/yu-hsiang-wang/) 私訊告訴我，我會盡快回覆及修正，非常感謝！

### Refs:
- [https://www.typescriptlang.org/docs/handbook/2/everyday-types.html](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- [https://willh.gitbook.io/typescript-tutorial/](https://willh.gitbook.io/typescript-tutorial/)