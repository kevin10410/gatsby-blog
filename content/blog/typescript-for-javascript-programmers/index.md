---
title: Typescript - Typescript for JS programmers
date: "2022-04-13T21:00:00.000Z"
description: "Javascript 是一門動態型別語言 (Dynamically typed)，同時也是一門弱型別語言 (Weakly typed)，因此我們不僅可以在程式撰寫時不用明確的型別宣告，也可以在 runtime 的過程中任意透過顯性或隱性的方法來更換變數的型別，雖然這樣特性讓 Javascript 在開發上變得更加簡單，也更靈活多變，但也因此更加容易遇到沒有預期的錯誤。Typescript 是基於 Javascript 而開發出來的一門開源程式語言，也就是 Javascript 的超集 (Superset)，透過靜態型別檢查，來幫助我們能在開發編譯的過程中，就幫助我們找出這些可能造成錯誤的地方。"
---
![tolga-ulkan-9k36QqhA0cU-unsplash.jpg](./index.jpg)
Photo by [Tolga Ulkan](https://unsplash.com/@tolga__) on [Unsplash](https://unsplash.com/photos/9k36QqhA0cU)



Javascript 是一門動態型別語言 (Dynamically typed)，同時也是一門弱型別語言 (Weakly typed)，因此我們不僅可以在程式撰寫時不用明確的型別宣告，也可以在 runtime 的過程中任意透過顯性或隱性的方法來更換變數的型別，雖然這樣特性讓 Javascript 在開發上變得更加簡單，也更靈活多變，但也因此更加容易遇到沒有預期的錯誤。Typescript 是基於 Javascript 而開發出來的一門開源程式語言，也就是 Javascript 的超集 (Superset)，透過靜態型別檢查，來幫助我們能在開發編譯的過程中，就幫助我們找出這些可能造成錯誤的地方。

## Typescript

簡單來說 Typescript 是 Javascript 的嚴格超集，不僅包含 JavaScript 的語法，也提供了靜態型別檢查以及以類別為基礎的物件導向程式設計 (Object-oriented programming) 語法。Javascript 本身雖然有型別，像是 `string` 、`number` 等，但是因為本身的語言特性，所以在程式碼執行的過程中，可能造成型別的轉換，進而導致不可預期的行為。Typescript 能幫助我們把 ts 程式碼轉譯成 js 程式碼，並且在轉譯的過程中幫助我們檢查型別是否保持一致，也就是說我們不僅能在 Typescript 中執行與 JavaScript 相同的功能以及程式碼，更可以透過 Typescript 的型別檢查保護，提前找出可能產生錯誤的程式碼片段。


## 型別推論 Types by Inference
Typescript 能夠識別 Javascript 程式碼，並自動產生對應的型別。
以下面的例子來說，我們在一開始宣告一個變數 `greeting` 並且 assign `“Hello World”` 這個字串給該變數，此時 Typescript 使用該值幫忙產生對應的 `string` 型別。而在後面的程式碼中我們想要將新的值 `2` 數字 assign 給相同的變數，此時  Typescript 就會幫忙檢查並在編譯的過程中產生錯誤。

```tsx
let greeting = "Hello World";

helloWorld = 2 // Type 'number' is not assignable to type 'string'.
```

透過理解 Javascript 的執行方法，Typescript 可以建構出一個使用 Javascript 程式碼但擁有型別的系統。透過這個系統，我們可以在不需要增加任何額外的程式碼下，就使我們的程式碼可以擁有明確的型別。

## 定義型別 Defining Types ##
我們可以在 Javascript 的程式碼中使用豐富的設計模型，但遺憾的是，有些設計模型會讓型別很難被自動推導出來。Typescript 提供了另一個方法，讓我們可以直接告訴 typescript 這邊的型別為何。

- 我們可以直接透過 `:Typename` 指派一個型別給指定的變數
```tsx
interface User {
  name: string;
  age: number;
}

const kevin: User = {
  name: "Kevin",
  age: 30,
};
```

- Javascript 中有提供類別(classes) 介面，因此我們也可以在 Typescript 中進行對應的型別宣告

```tsx
interface User {
  name: string;
  age: number;
}

class UserAccount {
  name: string;
  id: number;
 
  constructor(name: string, age: number) {
    this.name = name;
    this.age = id;
  }
}

const otree: User = new UserAccount("OTree", 10);
```

- 也可以在函式的參數上以及回傳值定義型別

```tsx
interface User {
  name: string;
  age: number;
}

function getAdminUser(): User {
  //...
}
 
function deleteUser(user: User) {
  // ...
}
```

在 Javascript 中有提供原始的型別 `string`, `number`, `boolean`, `symbol`, `undefined` , `null` 等，我們可以直接在 Typescript 中使用這些型別，除此之外 Typescript 提供了更多種型別出來因應更多種情境，像是 [any](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any) 或是 [Enums](https://www.typescriptlang.org/docs/handbook/enums.html)。

## 構成型別 Composing Types
有些時候我們可能會需要複雜的型別，而在 Typescript 中 我們可以透過結合不同的型別，組合成我們需要的形式，常見的方法有 `聯集 (union)` 以及 `泛型 (generic)` 。

### 聯集 (union)
* 透過 union 我們可以告訴 Typescript，該型別可以為滿足多種型別中的一種即可。
    
```tsx
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}

printId(101);
printId("202");
```
    
* 在 union 中，在 Typescript 還無法確定為哪個特定型別之前，我們只能存取此 union 中所有型別的共有屬性以及方法。
    
  ```tsx
  function printId(id: number | string) {
    console.log(id.toUpperCase());
    // Property 'toUpperCase' does not exist on type 'string | number'.
    // Property 'toUpperCase' does not exist on type 'number'.
  }
  
  function printId(id: number | string) {
    if (typeof id === "string") {
      console.log(id.toUpperCase()); // OK
    } else {
      console.log(id); // OK
    }
  }
  ```
    

### 泛型 (generic)
* 透過 generic 我們可以提供變數給型別，舉例來說一組陣列內可以包涵任何型別的值，但透過提供 generic，我們可以指定陣列裡面的值為何種型別。
    
    ```tsx
    interface User {
      name: string;
      age: number;
    }
    
    type StringArray = Array<string>;
    type NumberArray = Array<number>;
    type UserArray = Array<User>;
    ```
    
* 我們也可以透過 generic 來定義一個我們需要的客製化型別。
    
    ```tsx
    interface Data<Type> {
      add: (obj: Type) => void;
      get: () => Type;
    }
    
    declare const backpack: Backpack<string>;
    backpack.add(23);
    // Argument of type 'number' is not assignable to parameter of type 'string'.
    ```
    
    ## 結構化型別系統 Structural Type System
    
    在 Typescript 中，型別的檢查主要會依據值的形狀來判別，如果兩個物件的形狀相同，Typescript 會將這兩個物件認成同一種型別，此種行為被稱為 [鴨子型別 (Duck typing)](https://en.wikipedia.org/wiki/Duck_typing) 或是 [結構化型別 (Structural type)](https://en.wikipedia.org/wiki/Structural_type_system)。
    
    ```tsx
    interface Point {
      x: number;
      y: number;
    }
    
    class VirtualPoint {
      x: number;
      y: number;
     
      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
      }
    }
    
    function logPoint(p: Point) {
      console.log(`${p.x}, ${p.y}`);
    }
     
    const point = { x: 12, y: 26 };
    logPoint(point) // OK
    
    const rect = { x: 33, y: 3, width: 30, height: 80 };
    logPoint(rect) // OK
    
    const newVPoint = new VirtualPoint(13, 56);
    logPoint(newVPoint) // OK
    
    const color = { hex: "#187ABF" };
    logPoint(color);
    // Argument of type '{ hex: string; }' is not assignable to parameter of type 'Point'.
    // Type '{ hex: string; }' is missing the following properties from type 'Point': x, y
    ```
    
    從上面的例子中可以看到，Typescript 只會專注上所需要的屬性及方法，不會去關注物件被實做出來的過程。
    
### 總結    
在這篇文章中，希望透過 **[TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html#structural-type-system)** 內容，來讓 Javascript 的開發者快速了解 Typescript 的概述以及如何使用 Typescript，文章中的範例沒有很多，但是卻是幾個剛入門 Typescript 不可不知道的功能以及知識，後續有時間會在將各種 Typescript 中的型別及常見的用法，整理及分享出來。

最後，如果文章中有任何問題或是錯誤的部分，可以透過 [LinkedIn](https://www.linkedin.com/in/yu-hsiang-wang/) 私訊告訴我，我會盡快回覆及修正，非常感謝！
    
### Refs:
- [https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html#structural-type-system](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html#structural-type-system)
- [https://willh.gitbook.io/typescript-tutorial/](https://willh.gitbook.io/typescript-tutorial/)