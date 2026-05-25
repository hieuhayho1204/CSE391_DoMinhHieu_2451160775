### Phần A:

### Câu A1

## 1.Thẻ `<meta viewport>` chuẩn và giải thích

`<meta name="viewport" content="width=device-width, initial-scale=1.0">`

- width=device-width: Thiết lập chiều rộng của trang web luôn bằng với chiều rộng màn hình của thiết bị (thay vì mặc định của các trình duyệt di động là tự giả định màn hình desktop khoảng 980px).

- initial-scale=1.0: Thiết lập mức độ zoom ban đầu khi trang vừa được tải lần đầu tiên là 1:1 (không phóng to, không thu nhỏ).

## 2. Hiện tượng hiển thị trên iPhone nếu THIẾU thẻ này

- Nếu thiếu thẻ viewport, iPhone (và đa số trình duyệt di động) sẽ coi trang web như một trang desktop có độ rộng khoảng 980px. Trình duyệt sẽ tự động thu nhỏ toàn bộ trang web (zoom out) để nhét vừa khít vào màn hình điện thoại.

- Hậu quả: Chữ nghĩa, hình ảnh và các nút bấm trở nên tí hon, người dùng phải dùng hai ngón tay phóng to (pinch-to-zoom) và cuộn ngang mới đọc được nội dung. Các dòng @media query dựa trên chiều rộng thiết bị cũng sẽ không hoạt động đúng như kỳ vọng.

## 3.phân biệt

- Mobile-First: Viết CSS cho màn hình nhỏ nhất (Mobile) trước, sau đó dùng Media Queries để thêm thắt/mở rộng bố cục cho màn hình lớn ( dùng min-width)
- ví dụ:

```html
.sidebar { display: none; } @media (min-width: 768px) { .sidebar { display:
block; } }
```

- Desktop-First: Viết CSS cho màn hình lớn (Desktop) trước, sau đó dùng Media Queries để thu gọn/ẩn bớt các thành phần khi màn hình nhỏ đi.(max-width)

- ví dụ

```html
.sidebar { display: block; } @media (max-width: 767.98px) { .sidebar { display:
none; } }
```

- Tại sao Mobile-First được khuyên dùng?

- Tối ưu hiệu năng (Performance): Thiết bị di động có cấu hình phần cứng và tốc độ mạng yếu hơn desktop. Cách tiếp cận này giúp mobile tải ít CSS thừa hơn và không phải tính toán ghi đè các layout phức tạp của desktop.

- Xu hướng người dùng: Lượng truy cập web từ thiết bị di động hiện nay đã vượt trội so với desktop.

- Tư duy thiết kế gọn gàng: Ép nhà phát triển phải chắt lọc những nội dung cốt lõi nhất lên màn hình nhỏ trước, tránh tình trạng "tham lam" nhồi nhét giao diện.

### Câu A2:

### Extra Small (xs)

- kích thước : < 576px
- thiết bị đại diện :Điện thoại di động ở trạng thái xoay dọc
- số lượng cột : 1 cột

### Small (sm)

- kích thước : ≥ 576px
- thiết bị đại diện :Điện thoại di động ở trạng thái xoay ngang
- số lượng cột : 2 cột

### Medium (md)

- kích thước :≥ 768px
- thiết bị đại diện :Máy tính bảng ở trạng thái xoay dọc (iPad,...)
- số lượng cột : 2 hoặc 3 cột

### Large (lg)

- kích thước :≥ 992px
- thiết bị đại diện :Máy tính bảng xoay ngang hoặc Laptop nhỏ
- số lượng cột : 3 hoặc 4 cộct

### Extra Large (xl)

- kích thước :≥ 1200px
- thiết bị đại diện :Màn hình máy tính Desktop thông thường
- số lượng cột : 4 cột

### XX Large (xxl)

- kích thước :≥ 1200px
- thiết bị đại diện :Màn hình PC kích thước lớn, Màn hình Ultra-wide
- số lượng cột : 4 hoặc 6 cột

### Câu A3

- 375px (iPhone SE) 100%
- 600px 540px
- 800px 720px
- 1000px 960px
- 1400px 1140px

### Câu A4

### 1. Variables

- Cho phép đặt tên và lưu trữ các giá trị được sử dụng lặp đi lặp lại nhiều lần (màu sắc chủ đạo, font chữ, khoảng cách padding,...) vào một nơi tập trung để dễ dàng cập nhật đồng loạt khi cần.
- ví dụ:

```html
$color-primary: #3498db; .button { background-color: $color-primary; }
```

- Nesting (Cấu trúc lồng nhau): Hỗ trợ viết các bộ chọn CSS lồng trực tiếp vào nhau theo đúng sơ đồ phả hệ cây cấu trúc HTML. Việc này giúp mã nguồn gọn gàng, giảm thiểu viết lặp tên class cha.
- ví dụ:

```html
.navbar { background: #333; .nav-item { display: inline-block; } }
```

- Mixins (Đoạn mã tái sử dụng): Hoạt động giống như các hàm chức năng, cho phép định nghĩa sẵn một tập hợp nhiều thuộc tính CSS phức tạp (có thể truyền thêm các tham số đầu vào linh hoạt) rồi nhúng nhanh vào các class khác bằng từ khóa @include.
- ví dụ:

```html
@mixin center-element { display: flex; justify-content: center; align-items:
center; } .box { @include center-element; }
```

- @extend / Inheritance (Tính kế thừa): Cho phép một bộ chọn chiếm dụng và thừa hưởng lại toàn bộ tất cả các thuộc tính CSS đã được định nghĩa của một bộ chọn khác trước đó, hạn chế mã nguồn bị trùng lặp.
- ví dụ:

```html
.message-box { border: 1px solid #ccc; padding: 10px; } .error-box { @extend
.message-box; border-color: red; }
```

## 2.

- Lý do: Các trình duyệt hiện đại (Chrome, Edge, Firefox,...) chỉ tích hợp bộ thông dịch hiểu được cú pháp chuẩn hóa của ngôn ngữ CSS thông thường. Các cú pháp nâng cao của SCSS (biến, lồng nhau, hàm mixin,...) không nằm trong quy chuẩn này.

- Quy trình chuyển đổi: Chúng ta bắt buộc phải sử dụng một công cụ biên dịch (Compiler) chuyên dụng của hệ sinh thái Sass (chẳng hạn như thư viện Sass chạy trên Node.js hoặc thông qua Extension Live Sass Compiler của VS Code) để quét và biên dịch (compile) toàn bộ logic trong file .scss đầu vào để xuất bản ra thành một file .css thuần túy. Sau đó, ta mới nhúng file .css này vào mã nguồn HTML bằng thẻ <link>.

### Bài B3

```bash
sass scss/style.scss scss/style.css --watch
```

### Phần C

### Bài C1

#### 1. Sự biến đổi của hệ thống Navigation (Thanh điều hướng)

- **Trên màn hình Desktop (1440px):** Thanh điều hướng hiển thị đầy đủ danh sách các danh mục tin tức chính (Thời sự, Thế giới, Kinh doanh, Giải trí, Thể thao,...) theo một hàng ngang cố định trên đầu trang. Khi di chuột (hover) vào một số danh mục chính, hệ thống sẽ thả xuống (dropdown) các menu con chứa các chủ đề nhỏ hơn.
- **Trên màn hình Tablet (768px):** Không gian chiều ngang bị thu hẹp, thanh menu ngang tự động ẩn bớt các chuyên mục ít quan trọng hơn và gom tất cả chúng vào một nút chức năng chung mang tên "Tất cả" hoặc "Danh mục".
- **Trên màn hình Mobile (375px):** Thanh menu hàng ngang biến mất hoàn toàn để nhường chỗ cho không gian hiển thị tiêu đề bài viết. Thay vào đó, một biểu tượng **Hamburger Menu (☰)** xuất hiện ở góc trên. Khi người dùng bấm chạm (click) vào, một menu danh sách dọc mới trượt ra, chiếm toàn bộ không gian màn hình để người dùng lựa chọn chuyên mục.

#### 2. Sự co giãn của lưới nội dung (Content Grid)

- **Desktop (1440px):** Giao diện được tổ chức theo cấu trúc đa cột rất rõ ràng (thường là 3 cột: Cột trái to nhất hiển thị bài viết tiêu điểm, cột giữa chứa luồng các tin tức phụ mới cập nhật, cột phải dành riêng cho các widget tiện ích như giá vàng, thời tiết và các banner quảng cáo).
- **Tablet (768px):** Bố cục tự động co rút lại còn 2 cột (Cột tin tức chính và cột danh sách tin tức phụ, toàn bộ không gian cho quảng cáo hoặc các widget chạy dọc bị loại bỏ hoặc đẩy xuống cuối trang).
- **Mobile (375px):** Toàn bộ giao diện chuyển dịch sang cấu trúc **1 cột duy nhất (Single Column Layout)**. Tất cả nội dung từ ảnh đại diện, tiêu đề bài viết cho đến các dòng tin vắn đều được xếp dọc, tuần tự chồng lên nhau từ trên xuống dưới, tối ưu hóa tuyệt đối cho thao tác cuộn vuốt bằng ngón cái của người dùng di động.

#### 3. Các thành phần (Elements) bị ẩn đi trên giao diện Mobile

- Các banner quảng cáo kích thước lớn chạy dọc theo hai bên rìa màn hình nền (Skyscraper Ads).
- Khối hiển thị bảng dữ liệu chi tiết dài (Biểu đồ chứng khoán chi tiết, Lịch thi đấu thể thao dày đặc).
- Các đoạn văn tóm tắt nội dung ngắn (Sapo) nằm ngay dưới tiêu đề của các bài viết phụ. Trên mobile chỉ giữ lại đúng Tiêu đề in đậm và một ảnh thu nhỏ (thumbnail) để tiết kiệm diện tích cuộn trang.

#### 4. Sự thay đổi kích thước phông chữ (Font-size)

- Kích thước chữ của Tiêu đề bài viết tiêu điểm (Headline) trên màn hình Desktop lớn dao động khoảng `28px - 32px`. Khi co về màn hình Mobile, font-size của chính tiêu đề đó được tự động giảm xuống chỉ còn khoảng `20px - 22px`. Việc hạ font-size này giúp tiêu đề không chiếm trọn vẹn diện tích hiển thị của một màn hình điện thoại, giữ cho tỷ lệ tương quan giữa chữ và ảnh cân đối.

#### 5. Minh chứng đoạn mã `@media` queries thu thập từ DevTools Styles

Qua kiểm tra công cụ Styles của DevTools trên trang VnExpress, em nhận thấy trang web áp dụng các luật breakpoint để xử lý ẩn hiện và bố cục như sau:

```css
@media screen and (max-width: 767px) {
}

@media screen and (min-width: 1024px) {
}
```

### Bài C2
1. Phương án thiết kế cấu trúc Wireframe (Sơ đồ bố cục)
Giao diện Mobile (< 768px):

Bố cục: Chạy thẳng một mạch đơn cột từ trên xuống dưới theo thứ tự: Header -> Hero Image -> Grid món ăn (1 cột) -> Form đặt bàn -> Footer.

Thành phần ẩn: Bản đồ Google Maps cồng kềnh sẽ bị ẩn đi hoàn toàn để tránh làm chậm tốc độ tải trang trên mạng di động 3G/4G. Thay vào đó, em sẽ đặt một nút bấm gọn gàng mang tên "Xem vị trí & Chỉ đường trên Bản đồ" (khi bấm sẽ mở ứng dụng Google Maps của điện thoại).

Vị trí Form đặt bàn: Biến đổi các ô nhập liệu (ngày, giờ, số người) từ hàng ngang thành một cột dọc đứng, đặt nằm ngay phía dưới khu vực lưới ảnh món ăn để khách hàng sau khi lướt xem thực đơn xong có thể điền thông tin đăng ký ngay lập tức.

Giao diện Tablet (768px - 1023px):

Grid ảnh món ăn: Tự động co giãn và phân bổ lại từ 1 cột thành cấu trúc 3 cột × 2 hàng cân đối.

Khối Bản đồ: Được kích hoạt hiển thị trở lại, kéo giãn chiếm trọn vẹn 100% độ rộng chiều ngang màn hình và nằm ngay sát trên phần Footer.

Giao diện Desktop (≥ 1024px):

Layout: Ứng dụng mô hình bố cục đa cột (Multi-column Layout) bằng CSS Grid. Trang web được chia thành 2 vùng lớn nằm song song với nhau.

Sidebar: Cột bên trái (chiếm 70% diện tích) dùng để hiển thị nội dung trải nghiệm (Logo, ảnh Hero, lưới 6 ảnh món ăn sắc nét). Cột bên phải (chiếm 30% diện tích còn lại) đóng vai trò là một Sidebar cố định (Sticky Sidebar) chứa trọn vẹn Form điền thông tin đặt bàn kèm khối Bản đồ thu nhỏ nằm ngay phía dưới. Cấu trúc này giúp Form đặt bàn luôn đập vào mắt khách hàng dù họ có cuộn trang xuống sâu đến đâu đi chăng nữa.

```html

.restaurant-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: 
    "header"
    "hero"
    "menu-section"
    "booking-section"
    "maps-section"
    "footer";
  gap: 15px;
  padding: 10px;
}

header           { grid-area: header; }
.hero-image      { grid-area: hero; height: 50vh; background: #ddd; }
.food-menu-grid  { 
  grid-area: menu-section; 
  display: grid; 
  grid-template-columns: 1fr; 
  gap: 10px; 
}
.booking-form    { grid-area: booking-section; display: flex; flex-direction: column; gap: 10px; }
.google-maps     { grid-area: maps-section; display: none; } 
footer           { grid-area: footer; text-align: center; }


@media (min-width: 768px) {
  .food-menu-grid {
    grid-template-columns: repeat(3, 1fr); 
  }
  .google-maps {
    display: block; 
    height: 300px;
    background: #eee;
  }
}


@media (min-width: 1024px) {
  .restaurant-container {
    /* Thiết lập chia đôi không gian thành 2 vùng: Vùng chính trái và Thanh Sidebar phải (320px) */
    grid-template-columns: 1fr 320px;
    grid-template-areas: 
      "header           header"
      "hero             hero"
      "menu-section     booking-section
      "maps-section     booking-section
      "footer           footer";
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .food-menu-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```