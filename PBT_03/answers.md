PHẦN A - KIỂM TRA ĐỌC HIỂU

## Câu A1:

- Có 3 cách thêm CSS vào HTML:

## 1. Inline CSS (trong thẻ) —  Tránh dùng

 Ví dụ code:

```html
<h1 style="color: red; font-size: 24px;">Tiêu đề</h1>
```

  Ưu điểm:
   - Viết nhanh
   - Dễ test hoặc debug nhanh

  Nhược điểm:
   - Khó quản lý khi code nhiều
   - Không tái sử dụng được
   - Làm HTML bị rối

  Khi nào nên dùng:
   - Debug nhanh
   - Chỉnh tạm thời một element nhỏ

## 2. Internal CSS `(trong <style>)` — Chấp nhận được cho prototype

  Ví dụ code:
   ```html
<head>
    <style>
        h1 {
            color: red;
            font-size: 24px;
        }
    </style>
</head>
```

  Ưu điểm:
   - Gọn hơn inline CSS
   - Không cần tạo file CSS riêng

  Nhược điểm
   - Chỉ dùng được cho 1 trang HTML
   - Khó bảo trì với website lớn

  Khi nào nên dùng:
   - Prototype
   - Bài tập nhỏ
   - Website đơn giản

## 3. External CSS (file riêng) — Chuẩn production

  Ví dụ code:

File HTML:
```html
<head>
    <link rel="stylesheet" href="styles.css">
</head>
```

File styles.css:
```css
h1 {
    color: #2563eb;
    font-size: 32px;
}
```
  Ưu điểm:
   - Quản lý chuyên nghiệp
   - Tái sử dụng cho nhiều trang
   - Dễ bảo trì và mở rộng

  Nhược điểm:
   - Phải tạo thêm file CSS
   - Nếu link sai thì CSS không hoạt động

  Khi nào nên dùng:
   - Dự án thực tế
   - Website nhiều trang
   - Production

Câu hỏi thêm: 
  Thứ tự ưu tiên: Inline CSS > Internal CSS > External CSS
  Giải thích: 
  - CSS hoạt động theo cơ chế Cascade (thác nước).
  - Style có độ ưu tiên cao hơn sẽ ghi đè style thấp hơn.
      External CSS có ưu tiên thấp nhất
      Internal CSS ưu tiên cao hơn External CSS
      Inline CSS có ưu tiên cao nhất
  Vì vậy Inline CSS sẽ ghi đè các cách còn lại.

## Câu A2:

  1. h1 - Chọn: “ShopTLU”
  2. .price - Chọn: “25.990.000đ”, “45.990.000đ”
  3. #app header - Chọn: toàn bộ thẻ `<header>` bên trong #app, chứa text: “ShopTLU”, “Home”, “Products”, “About” 
  4. nav a:first-child - Chọn: “Home”
  5. .product.featured h2 - Chọn: “MacBook Pro”
  6. article > p - Chọn: tất cả thẻ `<p>` là con trực tiếp của `<article>`: 25.990.000đ
                                                                         Mô tả sản phẩm... 
                                                                            45.990.000đ 
                                                                          Mô tả sản phẩm...
  7. a[href="/"] - Chọn: "Home"
  8. .top-bar.dark h1 - Chọn: "ShopTLU"

## Câu A3:

## 1. Trường hợp 1: content-box (mặc định)
.box-1 {
  width: 400px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
}
- Chiều rộng hiển thị = width + padding×2 + border×2 = 400 + (20×2) + (5×2) = 450px
- Không gian chiếm trên trang = chiều rộng hiển thị + margin×2 = 450 + (10×2) = 470px

## 2. Trường hợp 2: border-box
.box-2 {
  box-sizing: border-box;
  width: 400px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
}
- Chiều rộng hiển thị = 400px
- Kích thước content thực tế = width - padding×2 - border×2 = 400 - (20x2) - (5x2) = 350px
- Không gian chiếm trên trang = 400 + (10x2) = 420px

## 3. Trường hợp 3: Margin collapse
.box-a {
  margin-bottom: 25px;
}
.box-b {
  margin-top: 40px;
}
- Khoảng cách giữa box-a và box-b = 40px
- Không phải 65px vì đây là hiện tượng margin collapse: khi hai block element nằm chồng dọc, margin của chúng không - Cộng dồn mà gộp làm một, lấy giá trị lớn hơn. CSS lấy max(25, 40) = 40px.

## 4. Nâng cao: Negative margin
.box-a {
  margin-bottom: -10px;
}
.box-b {
  margin-top: 40px;
}
- Khoảng cách = 30px
- Khi có negative margin, quy tắc collapse vẫn áp dụng nhưng theo cách: lấy giá trị dương lớn nhất (40px) rồi cộng với giá trị âm lớn nhất (-10px) = 40 + (-10) = 30px

## Câu A4

### 1. Tính specificity score (a, b, c) cho mỗi rule

- `p` → tag = 1 → `(0, 0, 1)`
- `.price` → class = 1 → `(0, 1, 0)`
- `#main-price` → ID = 1 → `(1, 0, 0)`
- `p.price` → tag(1) + class(1) → `(0, 1, 1)`

---

### 2. Element sẽ có màu gì? Giải thích

- Element sẽ có màu đỏ.
- Vì rule `#main-price` có specificity cao nhất nên sẽ được ưu tiên áp dụng.

---

### 3. Nếu thêm:

```html
<p class="price" id="main-price" style="color: orange;">
```

- Element sẽ có màu cam.
- Vì inline CSS (`style=""`) có độ ưu tiên cao hơn ID, class và tag selector.

---

### 4. Nếu Rule A thêm `!important`, element có màu gì? Tại sao?

Ví dụ:

```css
p {
    color: black !important;
}
```

- Element sẽ có màu đen.
- Vì `!important` có độ ưu tiên cao hơn các rule CSS thông thường nên sẽ ghi đè các rule khác.