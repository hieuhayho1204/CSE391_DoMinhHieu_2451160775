# Phần A: Kiểm tra đọc hiểu

## Câu A1 — var / let / const

| Đoạn | Dự đoán        | Thực tế                                   |
| ---- | -------------- | ----------------------------------------- |
| 1    | `undefined`    | `undefined`                               |
| 2    | ReferenceError | `Cannot access 'y' before initialization` |
| 3    | TypeError      | `Assignment to constant variable.`        |
| 4    | `[1, 2, 3, 4]` | `[1, 2, 3, 4]`                            |
| 5    | `2` rồi `1`    | `Trong block: 2` → `Ngoài block: 1`       |

1. Đoạn 1

- Đây là bẫy của `var`: dùng biến trước khi khai báo không báo lỗi, chỉ trả `undefined` — rất khó debug.

2. Đoạn 2

- `let` bị hoisting nhưng nằm trong vùng từ đầu block đến dòng khai báo. Truy cập trong vùng này lỗi ngay. Đây là hành vi tốt hơn `var` vì lỗi rõ ràng.

3. Đoạn 3

- `const` không cho gán lại biến → lỗi ở `z = 20`.

4. Đoạn 4

- `arr.push(4)` OK — vì `push` không gán lại biến, chỉ sửa nội dung bên trong mảng

5. Đoạn 5

- `let` có block scope nên `a = 2` bên trong `{}` là biến khác hoàn toàn, không ảnh hưởng `a = 1` bên ngoài. Nếu dùng `var` thì cả hai cùng là một biến → `Ngoài block: 2`.

## Câu A2 — Data Types & Coercion

```javascript
console.log(typeof null);      // object
console.log(typeof undefined); // undefined
console.log(typeof NaN);       // number
console.log("5" + 3);          // "53"
console.log("5" - 3);          // 2
console.log("5" * "3");       // 15
console.log(true + true);      // 2
console.log([] + []);          // ""
console.log([] + {});          // "[object Object]"
console.log({} + []);          // 0 hoặc "[object Object]" tùy môi trường/
```

### Giải thích chi tiết

- `typeof null` trả về `"object"`. Đây là một lỗi lịch sử của JavaScript, nhưng vẫn được giữ lại để tương thích ngược.
- `typeof undefined` trả về `"undefined"`.
- `NaN` là viết tắt của `Not a Number`, nhưng bản thân nó vẫn thuộc kiểu dữ liệu `number`.
- `"5" + 3` trả về `"53"` vì toán tử `+` nếu gặp chuỗi sẽ ưu tiên nối chuỗi.
- `"5" - 3` trả về `2` vì toán tử `-` không dùng để nối chuỗi, nên JavaScript ép `"5"` thành số `5` rồi tính `5 - 3`.
- `"5" * "3"` trả về `15` vì toán tử `*` ép hai chuỗi số thành số.
- `true + true` trả về `2` vì `true` được ép thành `1`.
- `[] + []` trả về chuỗi rỗng vì mảng rỗng khi chuyển thành chuỗi sẽ là `""`.
- `[] + {}` trả về `"[object Object]"` vì `[]` thành `""`, object thành `"[object Object]"`.
- `{} + []` có thể cho kết quả khác nhau tùy môi trường. Trong Node.js hiện đại, nếu viết trong biểu thức `console.log({} + [])`, object được chuyển thành chuỗi nên thường ra `"[object Object]"`. Nhưng nếu gõ trực tiếp trong console ở một số môi trường, `{}` có thể bị hiểu là block rỗng, khi đó `+[]` thành `0`.

### Tại sao `"5" + 3` và `"5" - 3` khác nhau?

Toán tử `+` trong JavaScript có hai vai trò:

1. Cộng số.
2. Nối chuỗi.

Khi một toán hạng là chuỗi, `+` thường ưu tiên nối chuỗi. Vì vậy:

```javascript
"5" + 3 // "53"
```

Trong khi đó, toán tử `-` chỉ dùng cho phép trừ số học. Vì vậy JavaScript ép chuỗi `"5"` thành số `5`:

```javascript
"5" - 3 // 2
```

---

## Câu A3 — So sánh == vs ===

| Biểu thức            | Dự đoán | Thực tế |
| -------------------- | ------- | ------- |
| `5 == "5"`           | `true`  | `true`  |
| `5 === "5"`          | `false` | `false` |
| `null == undefined`  | `true`  | `true`  |
| `null === undefined` | `false` | `false` |
| `NaN == NaN`         | `false` | `false` |
| `0 == false`         | `true`  | `true`  |
| `0 === false`        | `false` | `false` |
| `"" == false`        | `true`  | `true`  |

- Từ giờ trở đi luôn dùng `===` lý do đơn giản: `==` tự chuyển type theo quy tắc phức tạp, kết quả khó đoán và dễ gây bug âm thầm. `===` so sánh đúng thứ mình thấy — khác type là false, không có bất ngờ.

## Câu A4 — Truthy & Falsy

### Tất cả giá trị Falsy phổ biến trong JavaScript

Các giá trị sau khi đặt trong điều kiện sẽ được xem là `false`:

```javascript
false
0
-0
0n
""
null
undefined
NaN
document.all // trường hợp đặc biệt trong browser
```

Ghi chú: `document.all` là trường hợp đặc biệt trong trình duyệt, ít dùng trong bài tập cơ bản. Ngoài các giá trị trên, hầu hết giá trị còn lại đều là Truthy.

### Dự đoán kết quả

```javascript
if ("0") console.log("A");
```

**Có in.** Chuỗi `"0"` không rỗng nên là truthy.

```javascript
if ("") console.log("B");
```

**Không in.** Chuỗi rỗng là falsy.

```javascript
if ([]) console.log("C");
```

**Có in.** Mảng rỗng vẫn là object, mà object là truthy.

```javascript
if ({}) console.log("D");
```

**Có in.** Object rỗng là truthy.

```javascript
if (null) console.log("E");
```

**Không in.** `null` là falsy.

```javascript
if (0) console.log("F");
```

**Không in.** `0` là falsy.

```javascript
if (-1) console.log("G");
```

**Có in.** Số khác `0` là truthy.

```javascript
if (" ") console.log("H");
```

**Có in.** Chuỗi chứa dấu cách không phải chuỗi rỗng, nên là truthy.

### Output tổng hợp

```text
A
C
D
G
H
```

---

## Câu A5 — Template Literals

1. Cách 1: Chuỗi chào

```js
const greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;
```

2. Cách 2: URL

```js
const url = `https://api.example.com/users/${userId}/orders?page=${page}`;
```

3. Cách 3 — HTML string

```js
const html = `<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>`;
```

# Phần C: Suy luận

## Câu C1 — Debug JavaScript

| #   | Vị trí                           | Lỗi                                           | Sửa                                     |
| --- | -------------------------------- | --------------------------------------------- | --------------------------------------- |
| 1   | `tinhGiaGiamGia("100000", 20)`   | truyền string thay vì number → tính ra `NaN`  | truyền `100000` hoặc validate trong hàm |
| 2   | `var giamGia`                    | dùng `var`                                    | đổi thành `const`                       |
| 3   | `let giaSauGiam`                 | không cần gán lại                             | đổi thành `const`                       |
| 4   | `if (giaSauGiam = 0)`            | `=` là gán chứ không phải so sánh, luôn falsy | đổi thành `===`                         |
| 5   | thiếu validate `giaBan`          | không kiểm tra input có phải số không         | thêm `typeof giaBan !== "number"`       |
| 6   | `for (var i ...)` + `setTimeout` | lỗi closure ẩn                                | đổi `var` thành `let`                   |

- Code sau khi sửa

```js
function tinhGiaGiamGia(giaBan, phanTramGiam) {
  if (typeof giaBan !== "number" || isNaN(giaBan)) {
    return "Giá bán không hợp lệ";
  }

  if (phanTramGiam < 0 || phanTramGiam > 100) {
    return "Phần trăm giảm không hợp lệ";
  }

  const giamGia = (giaBan * phanTramGiam) / 100;
  const giaSauGiam = giaBan - giamGia;

  if (giaSauGiam === 0) {
    console.log("Sản phẩm miễn phí!");
  }

  return giaSauGiam;
}

const gia = tinhGiaGiamGia(100000, 20);
console.log("Giá sau giảm: " + gia + "đ");

const gia2 = tinhGiaGiamGia(50000, 110);
console.log("Giá: " + gia2);

for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log("Item " + i);
  }, 1000);
}
```

`var` có function scope nên chỉ có một biến `i` duy nhất dùng chung cho cả 5 callback. Khi setTimeout chạy sau 1 giây, vòng lặp đã xong và `i = 5` rồi → cả 5 đều in `Item 5`.

Dùng `let` thì mỗi lần lặp tạo ra một `i` riêng, callback nhớ đúng giá trị của lần lặp đó.





