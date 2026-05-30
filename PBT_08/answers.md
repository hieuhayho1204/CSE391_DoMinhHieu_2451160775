# Phần A: Kiểm tra đọc hiểu

## Câu A1 — Function Declaration vs Expression vs Arrow

1. Function Declaration

```javascript
function tinhThueBaoHiem(luong) {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return {
    thue,
    thuc_nhan: luong - thue,
  };
}
```

2. Function Expression

```javascript
const tinhThueBaoHiem = function (luong) {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return {
    thue,
    thuc_nhan: luong - thue,
  };
};
```

3. Arrow Function

```javascript
const tinhThueBaoHiem = (luong) => {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return {
    thue,
    thuc_nhan: luong - thue,
  };
};
```

4. Hoisting — Khác nhau như thế nào?

- Function Declaration → Hoisted hoàn toàn

```javascript
// Gọi TRƯỚC khi khai báo → vẫn chạy được!
const ketQua = tinhThueBaoHiem(15000000);
console.log(ketQua); // { thue: 1500000, thuc_nhan: 13500000 } ✅

function tinhThueBaoHiem(luong) {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return { thue, thuc_nhan: luong - thue };
}
```

- Function Expression & Arrow Function → không hoisted

```javascript
// Gọi TRƯỚC khi khai báo → LỖI!
const ketQua = tinhThueBaoHiem(15000000);
// ReferenceError: Cannot access 'tinhThueBaoHiem' before initialization

const tinhThueBaoHiem = function(luong) { ... };
```

```javascript
const ketQua = tinhThueBaoHiem(15000000);
// ReferenceError: Cannot access 'tinhThueBaoHiem' before initialization

const tinhThueBaoHiem = (luong) => { ... };
```

## Câu A2 — Scope & Closure

## Đoạn 1

### Code

```js
function counter() {
  let count = 0;

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}

const c = counter();

console.log(c.increment());
console.log(c.increment());
console.log(c.increment());
console.log(c.decrement());
console.log(c.getCount());
```

## Dự đoán output

```txt
1
2
3
2
2
```

## Giải thích

Biến:

```js
count;
```

được tạo bên trong:

```js
counter();
```

Ban đầu:

```txt
count = 0
```

Khi gọi:

```js
c.increment();
```

thì:

```js
++count;
```

tăng trước rồi trả về.

Diễn ra như sau:

```txt
count = 0
increment() → 1
increment() → 2
increment() → 3
decrement() → 2
getCount() → 2
```

Đây gọi là **closure**.

Closure nghĩa là: hàm bên trong vẫn nhớ và truy cập được biến ở bên ngoài dù hàm ngoài đã chạy xong.

---

# Đoạn 2

### Code

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var:", i), 100);
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let:", j), 200);
}
```

## Dự đoán output

Sau khoảng 200ms:

```txt
var: 3
var: 3
var: 3
let: 0
let: 1
let: 2
```

---

# Tại sao `var` và `let` khác nhau?

## Với `var`

`var` có **function scope**.

Trong vòng lặp chỉ có **1 biến i duy nhất**.

Khi `setTimeout()` chạy thì vòng lặp đã xong:

```txt
i = 3
```

nên tất cả đều in:

```txt
3
```

Ví dụ hiểu đơn giản:

```txt
var i dùng chung 1 ô nhớ
```

---

## Với `let`

`let` có **block scope**.

Mỗi lần lặp JavaScript tạo một biến mới.

Nên:

```txt
Lần 1 → j = 0
Lần 2 → j = 1
Lần 3 → j = 2
```

Khi `setTimeout()` chạy, mỗi callback nhớ đúng giá trị của nó.

Kết quả:

```txt
0
1
2
```

---

# Kết luận

- `var` dùng chung một biến trong vòng lặp → thường gây lỗi với `setTimeout()`
- `let` tạo biến riêng cho mỗi lần lặp → kết quả đúng hơn
- Closure giúp hàm nhớ biến ở scope bên ngoài

## Câu A3 — Array Methods

```javascript
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Lấy các số chẵn
nums.filter((n) => n % 2 === 0);

// 2. Nhân mỗi số với 3
nums.map((n) => n * 3);

// 3. Tính tổng tất cả
nums.reduce((sum, n) => sum + n, 0);

// 4. Tìm số đầu tiên > 7
nums.find((n) => n > 7);

// 5. Kiểm tra CÓ số > 10 không
nums.some((n) => n > 10);

// 6. Kiểm tra TẤT CẢ đều > 0
nums.every((n) => n > 0);

// 7. Tạo mảng "Số X là [chẵn/lẻ]"
nums.map((n) => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);

// 8. Đảo ngược mảng (không mutate gốc)
[...nums].reverse();
```

## Câu A4 — Object Destructuring & Spread
## Code đề bài

```js
const product = {
    name: "iPhone 16",
    price: 25990000,
    specs: {
        ram: 8,
        storage: 256,
        color: "Titan"
    }
};

// Destructuring
const {
    name,
    price,
    specs: { ram, color }
} = product;

console.log(name, price, ram, color);
console.log(specs);

// Spread
const updated = {
    ...product,
    price: 23990000,
    sale: true
};

console.log(updated.price);
console.log(updated.sale);
console.log(product.price);

// Spread gotcha
const copy = { ...product };

copy.specs.ram = 16;

console.log(product.specs.ram);
```

---

# 1. Destructuring

## Output

```txt
iPhone 16 25990000 8 Titan
```

## Giải thích

Đoạn này:

```js
const {
    name,
    price,
    specs: { ram, color }
} = product;
```

lấy dữ liệu từ object:

```js
product
```

Tương đương:

```js
const name = product.name
const price = product.price
const ram = product.specs.ram
const color = product.specs.color
```

Nên:

```txt
name = "iPhone 16"
price = 25990000
ram = 8
color = "Titan"
```

---

## Output

```txt
ReferenceError
```

### Giải thích

Dòng này:

```js
console.log(specs)
```

sẽ lỗi.

Vì:

```js
specs: { ram, color }
```

không tạo biến:

```js
specs
```

Nó chỉ destructuring bên trong object.

Tức là chỉ có:

```js
ram
color
```

không có:

```js
specs
```

---

# 2. Spread Operator

## Output

```txt
23990000
true
25990000
```

## Giải thích

### Dòng 1

```js
console.log(updated.price)
```

Kết quả:

```txt
23990000
```

Vì:

```js
price: 23990000
```

ghi đè giá cũ.

---

### Dòng 2

```js
console.log(updated.sale)
```

Kết quả:

```txt
true
```

Do thêm:

```js
sale: true
```

---

### Dòng 3

```js
console.log(product.price)
```

Kết quả:

```txt
25990000
```

Object gốc **không bị đổi**.

Spread:

```js
{ ...product }
```

tạo object mới.

---

# 3. Spread Gotcha (bẫy thường gặp)

## Output

```txt
16
```

## Giải thích

Code:

```js
const copy = { ...product };

copy.specs.ram = 16;
```

Nhiều người nghĩ:

```txt
product.specs.ram = 8
```

nhưng thực tế là:

```txt
16
```

### Tại sao?

Spread chỉ copy **1 cấp (shallow copy)**.

Nghĩa là:

```js
specs
```

vẫn trỏ tới cùng object trong bộ nhớ.

Hiểu đơn giản:

```txt
product.specs ─┐
               ├── cùng object
copy.specs ────┘
```

Nên sửa:

```js
copy.specs.ram = 16
```

thì:

```js
product.specs.ram
```

cũng đổi theo.

---

# Muốn copy hoàn toàn (deep copy)

Có thể dùng:

```js
const copy = structuredClone(product)
```

hoặc:

```js
const copy = JSON.parse(JSON.stringify(product))
```

Khi đó:

```js
copy.specs.ram = 16
```

sẽ **không ảnh hưởng** object gốc.

---

# Tổng kết output

```txt
iPhone 16 25990000 8 Titan
ReferenceError
23990000
true
25990000
16
```

---

# Kết luận

- Destructuring giúp lấy dữ liệu từ object nhanh hơn
- `specs: { ram, color }` không tạo biến `specs`
- Spread (`...`) tạo object mới nhưng chỉ shallow copy
- Nested object vẫn dùng chung reference nên có thể ảnh hưởng object gốc

# Phần C: Suy luận

## Câu C1 — Refactor Code

```javascript
const processOrders = (orders) =>
  orders
    .filter(({ status, total }) => status === "completed" && total > 100000)
    .map(({ id, customer, total }) => ({
      id,
      customer,
      total,
      discount: total * 0.1,
      finalTotal: total * 0.9,
    }))
    .sort((a, b) => b.finalTotal - a.finalTotal);
```

## Câu C2 — Thiết kế API

```javascript
const miniArray = {
  map(arr, fn) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      result.push(fn(arr[i], i, arr));
    }
    return result;
  },

  filter(arr, fn) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      if (fn(arr[i], i, arr)) result.push(arr[i]);
    }
    return result;
  },

  reduce(arr, fn, initialValue) {
    let acc = initialValue;
    let startIndex = 0;

    if (acc === undefined) {
      acc = arr[0];
      startIndex = 1;
    }

    for (let i = startIndex; i < arr.length; i++) {
      acc = fn(acc, arr[i], i, arr);
    }
    return acc;
  },
};

// Test
console.log(miniArray.map([1, 2, 3], (x) => x * 2)); // → [2,4,6]
console.log(miniArray.filter([1, 2, 3, 4], (x) => x > 2)); // → [3,4]
console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0)); // → 10
```
