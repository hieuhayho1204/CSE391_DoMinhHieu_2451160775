## PHẦN A - KIỂM TRA ĐỌC HIỂU

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

## PHẦN B: THỰC HÀNH CODE

## Bài B1:

5 loại selector có trong file style.css

- Loại element: `body`, `header`, `table`, `footer`
- Loại class: `.active`
- Loại id: `#about`, `#contact`
- Loại descendant: `nav a`, `thead th`, `tbody td`, `#contact p`
- Loại pseudo-class: `nav a:hover`, `tbody tr:nth-child(even)`, `tbody tr:hover`

## Bài B2:

1. Phần 1 — content-box vs border-box
  - Hộp 1 (content-box): chiều rộng thực tế = 350px (đo từ DevTools)
  - Hộp 2 (border-box): chiều rộng thực tế = 300px (đo từ DevTools)
Giải thích sự khác biệt:

  - Hộp 1 dùng content-box (mặc định): width: 300px chỉ tính phần content. Padding và border được cộng thêm ra ngoài → chiều rộng thực tế = 300 + 20×2 + 5×2 = 350px.
  - Hộp 2 dùng border-box: width: 300px là tổng kích thước bao gồm cả padding và border. Chúng co vào trong → chiều rộng thực tế luôn đúng 300px.

2.Phần 2 — Layout 3 cột

Trường hợp KHÔNG dùng border-box (content-box):

  - Cột trái: 250 + 15×2 = 280px
  -Cột giữa: 500 + 20×2 = 540px
  - Cột phải: 250 + 15×2 = 280px
  - Tổng = 280 + 540 + 280 = 1100px → vượt quá container 1000px → layout vỡ
Trường hợp CÓ dùng border-box:

  - Cột trái: đúng 250px
  - Cột giữa: đúng 500px
  - Cột phải: đúng 250px
  - Tổng = 250 + 500 + 250 = 1000px → vừa khít container → layout đúng

## Bài B3:

1. Liệt kê 10 rules + specificity score

  - `p { color: gray; }` - Specificity: (0, 0, 1)  
  - `html p { color: sienna; }` - Specificity: (0, 0, 2)  
  - `.text { color: blue; }` - Specificity: (0, 1, 0)  
  - `p.text { color: green; }` - Specificity: (0, 1, 1)  
  - `.text.highlight { color: orange; }` - Specificity: (0, 2, 0)  
  - `p.text.highlight { color: purple; }` - Specificity: (0, 2, 1)  
  - `#demo { color: crimson; }` - Specificity: (1, 0, 0)  
  - `p#demo { color: deeppink; }` - Specificity: (1, 0, 1)  
  - `#demo.text { color: darkorange; }` - Specificity: (1, 1, 0)  
  - `p#demo.text.highlight { color: red; }` - Specificity: (1, 2, 1) ← THẮNG!

2. Element cuối cùng hiển thị màu gì? Tại sao?

Màu: `red` — do Rule 10 có selector `p#demo.text.highlight` với specificity cao nhất.

Tính theo hệ 3 cột (ID, Class, Tag):

  - `p `→ tag → cột Tag +1 → (0, 0, 1)  
  - `#demo` → ID → cột ID +1 → (1, 0, 0)  
  - `.text` → class → cột Class +1 → (0, 1, 0)  
  - `.highlight` → class → cột Class +1 → (0, 1, 0)  

  - Tổng: (1, 2, 1)

So sánh với tất cả rules còn lại từ cột trái sang phải — Rule 10 có cột ID = 1, trong khi Rules 1–6 có cột ID = 0 nên thua ngay. Rules 7–9 tuy cùng cột ID = 1 nhưng cột Class thấp hơn (tối đa 1, trong khi Rule 10 có 2) → Rule 10 thắng tất cả.

3. Thay đổi thứ tự rules trong CSS — Kết quả có đổi không?

Không đổi.  
Khi các rules có specificity khác nhau, thứ tự viết trong file CSS không ảnh hưởng. Rule có specificity cao hơn luôn thắng dù viết trước hay sau.

Thứ tự chỉ quan trọng khi 2 rules có specificity bằng nhau — lúc đó rule viết sau thắng (cascade). Ví dụ nếu có 2 rule cùng specificity 121, rule nào đứng sau trong file CSS sẽ được áp dụng.

## PHẦN C:

## Câu C1: 

1. Chiều rộng thực tế (content-box)

  Sidebar: 300 + 20×2 + 1×2 = 342px
  Content: 660 + 30×2 + 1×2 = 722px
  Tổng: 342 + 722 = 1064px

2. Tại sao layout bị vỡ?
  Container chỉ rộng 960px nhưng tổng 2 cột là 1064px — vượt quá 104px. Vì đang dùng content-box (mặc định), padding và border được cộng thêm ra ngoài width, làm 2 cột phình to hơn dự tính. Không đủ chỗ → content bị đẩy xuống dòng mới.

3. Hai cách sửa

  ## Cách 1: Dùng border-box
  Thêm `box-sizing: border-box` vào cả sidebar và content. Padding và border sẽ co vào trong, width giữ đúng như đặt → tổng = 300 + 660 = 960px, vừa khít container.

  ```css
.sidebar {
  box-sizing: border-box;
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  float: left;
}

.content {
  box-sizing: border-box;
  width: 660px;
  padding: 30px;
  border: 1px solid #ccc;
  float: left;
}
```

  ## Cách 2: Tự trừ padding + border khỏi width (không dùng border-box)
  Tính ngược lại width cần khai báo để chiều rộng thực tế vừa khít 960px.

    - Sidebar muốn chiều rộng thực tế = 300px → width khai báo = 300 - 20×2 - 1×2 = 258px
    - Content muốn chiều rộng thực tế = 660px → width khai báo = 660 - 30×2 - 1×2 = 598px
    - Kiểm tra: (258 + 40 + 2) + (598 + 60 + 2) = 300 + 660 = 960px ✓

   .sidebar {
  width: 258px;
  padding: 20px;
  border: 1px solid #ccc;
  float: left;
}

.content {
  width: 598px;
  padding: 30px;
  border: 1px solid #ccc;
  float: left;
}   

## Câu C2: 

1. "Sản phẩm A" — h2.title.highlight trong #featured.card

## font-size = 20px

Các rules liên quan:

 `body` → font-size: 16px — specificity: (0, 0, 1)
 `.container ` → font-size: 14px — specificity: (0, 1, 0)
.card .title → font-size: 20px — specificity: (0, 2, 0) ← THẮNG
.card .title có specificity cao nhất trong các rules về font-size → font-size = 20px

color = green
Các rules liên quan:

.card → color: blue — specificity: (0, 1, 0)
#featured .title → color: red — specificity: (1, 1, 0)
.highlight → color: green !important ← THẮNG
!important phá vỡ mọi quy tắc specificity, kể cả ID selector → color = green

"Mô tả sản phẩm" — p trong #featured.card
color = blue
Các rules liên quan:

body → color: #333 — specificity: (0, 0, 1)
.card → color: blue — specificity: (0, 1, 0)
.card p → color: inherit — specificity: (0, 1, 1) ← THẮNG về specificity
.card p có specificity cao nhất → áp dụng color: inherit.

"Sản phẩm B" — h2.title trong .card thứ 2 (không có id)
font-size = 20px
Chỉ có 1 rule liên quan đến font-size:

.card .title → font-size: 20px — specificity: (0, 2, 0) ← áp dụng
→ font-size = 20px

color = blue
Các rules liên quan:

.card → color: blue — specificity: (0, 1, 0) ← THẮNG
#featured .title → color: red — specificity: (1, 1, 0), nhưng rule này chỉ target #featured, h2 này không có id featured nên không áp dụng
Chỉ còn .card với color: blue → color = blue

"Mô tả sản phẩm B" — p.highlight trong .card thứ 2
color = green
Các rules liên quan:

.card → color: blue — specificity: (0, 1, 0)
.card p → color: inherit — specificity: (0, 1, 1)
.highlight → color: green !important ← THẮNG
!important thắng tất cả → color = green






