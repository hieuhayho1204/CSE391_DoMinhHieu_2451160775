PHẦN A: KIỂM TRA ĐỌC HIỂU

Câu A1:

1. type="email" → Ô nhập dạng text nhưng có kiểm tra định dạng email (phải có @, domain) → Dùng cho đăng ký tài khoản, nhập email khách hàng

2. type="password" → Ô nhập nhưng ký tự bị ẩn (hiển thị dấu ● hoặc *) → Dùng cho đăng nhập, tạo tài khoản

3. type="number" → Ô nhập chỉ cho phép số, có nút tăng/giảm → Dùng chọn số lượng sản phẩm khi mua

4. type="tel" → Ô nhập số điện thoại (bàn phím mobile hiện số) → Dùng nhập số điện thoại khi đặt hàng

5. type="url" → Ô nhập link, kiểm tra định dạng URL → Dùng khi nhập website (ví dụ shop đối tác, affiliate)

6. type="search" → Ô tìm kiếm, có thể có nút x để xoá nhanh → Dùng thanh tìm kiếm sản phẩm

7. type="date" → Hiển thị lịch để chọn ngày → Dùng chọn ngày giao hàng hoặc ngày sinh

8. type="radio" → Nút chọn 1 trong nhiều lựa chọn → Dùng chọn phương thức thanh toán (COD, chuyển khoản)

9. type="checkbox" → Cho phép chọn nhiều lựa chọn → Dùng chọn nhiều sản phẩm hoặc đồng ý điều khoản

10. type="file" → Cho phép tải file từ máy lên → Dùng upload ảnh đánh giá sản phẩm hoặc khiếu nại

Câu A2:

TH1: Form không submit vì required bắt buộc phải có giá trị. value="" = rỗng → vi phạm, hiện tooltip "Vui lòng điền vào trường này"

TH2: Form không submit vì type="email" tự validate định dạng phải có @ và domain. "abc" không có @ → sai định dạng, hiện tooltip "Vui lòng nhập địa chỉ email"

TH3: Form không submit vì max="10" giới hạn giá trị tối đa. 15 > 10 → vi phạm, hiện tooltip "Giá trị phải nhỏ hơn hoặc bằng 10"

TH4: Form không submit vì pattern yêu cầu đúng 10 chữ số liên tiếp. "abc123" có chữ cái và chỉ 6 ký tự → không khớp regex, hiện tooltip "Vui lòng khớp định dạng yêu cầu"

TH5: Form không submit vì minlength="8" yêu cầu độ dài tối thiểu 8 ký tự. "123" chỉ có 3 ký tự → vi phạm, hiện tooltip "Phải có từ 8 ký tự trở lên"

Câu A3:

1.
Screen reader sẽ đọc nội dung của thẻ <label> khi người dùng focus vào ô nhập liệu, giúp họ biết chính xác ô đó dùng để nhập thông tin gì (ví dụ: "Email").

2.
Khi nào dùng: Dùng để nhóm các phần tử có liên quan logic với nhau trong một form lớn, giúp cấu trúc form mạch lạc và dễ hiểu hơn cho cả người dùng bình thường và công cụ hỗ trợ.
Ví dụ cụ thể: Nhóm các thông tin về địa chỉ giao hàng trong form thanh toán:
  <fieldset>
      <legend>Thông tin giao hàng</legend>
      <label for="city">Thành phố:</label>
      <input type="text" id="city" name="city">
      <label for="addr">Địa chỉ chi tiết:</label>
      <input type="text" id="addr" name="addr">
  </fieldset>
3.

1. Thẻ ` <label for="email"> ` rất quan trọng vì nó giúp người dùng dùng screen reader (trình đọc màn hình) hiểu được ô nhập liệu đó dùng để làm gì.

2. ` <fieldset> ` và ` <legend> ` được dùng để gom nhóm các thông tin liên quan với nhau.
Ví dụ: Nhóm phần "Thông tin giao hàng" bao gồm các ô Địa chỉ, Thành phố và Số điện thoại.

3. aria-label dùng để mô tả chức năng cho những thành phần chỉ có icon mà không có chữ đi kèm (Ví dụ: Nút có icon giỏ hàng).
Không nên dùng aria-label khi đã có thẻ ` <label> ` vì nó gây lặp thông tin và dư thừa đối với screen reader.

Tài liệu tham chiếu: tuan_1_html5/07_forms_interactive.md -> Accessibility — Form cho mọi người

Câu A4:

 1. Thuộc tính loading="lazy" trên <img>

Giải thích:
  Thuộc tính `loading="lazy"` giúp trì hoãn việc tải ảnh cho đến khi ảnh gần xuất hiện trong vùng nhìn của người dùng (viewport).

Cải thiện:

  - Tăng tốc độ tải trang ban đầu
  - Giảm dung lượng tải (tiết kiệm băng thông)
  - Cải thiện hiệu năng, đặc biệt với trang có nhiều ảnh (như trang bán hàng)

Khi KHÔNG nên dùng:

  - Ảnh ở đầu trang (above-the-fold)
  - Ảnh quan trọng như banner hoặc ảnh sản phẩm chính
  - Khi cần tối ưu chỉ số LCP (Largest Contentful Paint)

---

 2. Tại sao nên cung cấp nhiều <source> trong <video>

Lý do:

  - Mỗi trình duyệt hỗ trợ định dạng video khác nhau
  - Đảm bảo video có thể chạy trên nhiều nền tảng
  - Tăng khả năng tương thích và trải nghiệm người dùng

Các định dạng video phổ biến:

  - MP4 (.mp4)
  - WebM (.webm)
  - OGG (.ogv)

---

 3. Thuộc tính alt trên <img>

Công dụng:

  - Mô tả nội dung ảnh cho công cụ tìm kiếm (SEO)
  - Hỗ trợ người khiếm thị (screen reader)
  - Hiển thị khi ảnh không tải được

---

4. Ví dụ alt tốt

Ảnh sản phẩm iPhone 16:

```html
<img src="iphone.jpg" alt="iPhone 16 Pro màu đen, mặt lưng kính, 3 camera">
```

Ảnh trang trí (decorative):

```html
<img src="bg.png" alt="">
```

Ảnh biểu đồ doanh thu Q1/2026:

```html
<img src="chart.png" alt="Biểu đồ doanh thu quý 1 năm 2026 tăng từ 1 tỷ lên 2 tỷ đồng">
```

Câu A5:

Cách 1 — `<img>`

Dùng khi ảnh chỉ để minh họa, không cần chú thích hiển thị trên trang.
Ảnh là một phần của nội dung xung quanh, không đứng độc lập. Ví dụ thực tế:
Avatar người dùng trong header hoặc comment → chỉ cần hiển thị ảnh, không cần caption.

Cách 2 — `<figure>` + `<figcaption>`

Dùng khi ảnh cần có chú thích hiển thị bên dưới để bổ sung thông tin.
Ảnh và caption là một khối nội dung độc lập, có thể tách ra khỏi văn bản mà vẫn hiểu được. Ví dụ thực tế:
Trang chi tiết sản phẩm → ảnh sản phẩm kèm tên, giá, màu sắc bên dưới.

PHẦN C: PHÂN TÍCH VÀ SUY LUẬN

Câu C1:

Danh sách lỗi và cách sửa

Lỗi 1: Dòng 2 — Input "Tên" không có <label for="...">, vi phạm accessibility
Sửa:

<label for="name">Tên:</label>
<input type="text" id="name" name="name" required>

Lỗi 2: Dòng 4 — Input email không có <label>
Sửa:

<label for="email">Email:</label>
<input type="email" id="email" name="email" placeholder="Email của bạn" required>

Lỗi 3: Dòng 6–7 — Hai input password không có label và không phân biệt
Sửa:

<label for="password">Mật khẩu:</label>
<input type="password" id="password" name="password" required>

<label for="confirm">Nhập lại mật khẩu:</label>
<input type="password" id="confirm" name="confirm" required>

Lỗi 4: Dòng 9 — Phone dùng type="text" thay vì type="tel"
Sửa:

<label for="phone">Phone:</label>
<input type="tel" id="phone" name="phone" pattern="[0-9]{10}" required>

Lỗi 5: Dòng 9 — Không nên dùng value mặc định cho số điện thoại
Sửa:
→ Xóa value="0901234567"

Lỗi 6: Dòng 11 — <select> không có <label>
Sửa:

<label for="city">Thành phố:</label>
<select id="city" name="city">

Lỗi 7: Dòng 16 — Checkbox không có input đi kèm
Sửa:

<label>
    <input type="checkbox" name="terms" required>
    Tôi đồng ý điều khoản
</label>

Lỗi 8: Dòng 19 — Nút submit không rõ nghĩa (thiếu type + aria)
Sửa:

<button type="submit" aria-label="Gửi form">Gửi</button>

Câu C2:  

1. Pattern regex cho CMND/CCCD và Số tài khoản
- CMND/CCCD đúng 12 chữ số: pattern="[0-9]{12}"
- Số tài khoản 10-15 chữ số: pattern="[0-9]{10,15}"
2. HTML5 validation đủ an toàn cho ứng dụng ngân hàng chưa?
- Chưa đủ, hoàn toàn không đủ cho ứng dụng ngân hàng.
- HTML5 validation chỉ chạy trên trình duyệt, user có thể tắt JavaScript, dùng DevTools sửa DOM, hoặc gửi request thẳng lên server bằng Post mà bỏ qua toàn bộ validation phía frontend.
3. 3 loại validation HTML5 KHÔNG THỂ làm được
- So sánh 2 trường với nhau — ví dụ kiểm tra confirm PIN có khớp PIN không, HTML5 không thể so sánh giá trị giữa 2 input, bắt buộc dùng JavaScript.
- Kiểm tra dữ liệu đã tồn tại trong database — ví dụ email đã được đăng ký chưa, số CCCD đã có tài khoản chưa, - phải dùng JavaScript gọi API lên server để kiểm tra.
Validate theo logic nghiệp vụ phức tạp — ví dụ kiểm tra số CCCD có hợp lệ theo thuật toán của Bộ Công an không, kiểm tra số tài khoản có thuộc ngân hàng nào không, HTML5 chỉ kiểm tra được định dạng bề ngoài.
4. 2 rủi ro bảo mật nếu chỉ validate Frontend, không validate Backend
- Kẻ tấn công bypass hoàn toàn validation — dùng Postman gửi request thẳng lên server với dữ liệu giả mạo, độc hại như SQL injection mà không qua bất kỳ kiểm tra nào vì frontend bị bỏ qua hoàn toàn.
- Dữ liệu rác và giả mạo tràn vào database — kẻ tấn công có thể tạo hàng nghìn tài khoản với CCCD giả, số tài khoản không tồn tại, hoặc inject mã độc vào các trường dữ liệu gây hỏng hệ thống, rò rỉ dữ liệu khách hàng khác.