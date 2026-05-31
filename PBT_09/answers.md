# Phần A: Kiểm tra đọc hiểu

## Câu A1 — DOM Tree

1. Sơ đồ DOM Tree

```
document
└── div#app
    ├── header
    │   ├── h1
    │   │   └── "Todo App"
    │   └── nav
    │       ├── a.active
    │       │   └── "All"
    │       ├── a
    │       │   └── "Active"
    │       └── a
    │           └── "Completed"
    └── main
        ├── form#todoForm
        │   ├── input#todoInput
        │   └── button
        │       └── "Add"
        └── ul#todoList
            ├── li.todo-item
            │   └── "Learn HTML"
            └── li.todo-item.completed
                └── "Learn CSS"
```

2. querySelector

- Chọn thẻ h1

```javascript
document.querySelector("h1");
```

- Chọn input trong form

```javascript
document.querySelector("#todoForm input");
```

- Chọn tất cả .todo-item

```javascript
document.querySelectorAll(".todo-item");
```

- Chọn link đang active

```javascript
document.querySelector("a.active");
```

- Chọn li đầu tiên trong #todoList

```javascript
document.querySelector("#todoList li");
```

- Chọn tất cả a bên trong nav

```javascript
document.querySelectorAll("nav a");
```

# Câu A2 (5đ) — innerHTML vs textContent
1. Sự khác nhau giữa innerHTML và textContent

| Tiêu chí	| innerHTML	| textContent |
|--:|--:|--:|
| Bản chất |	Lấy hoặc thay đổi nội dung HTML (bao gồm cả các thẻ tag) bên trong phần tử.	| Lấy hoặc thay đổi văn bản thuần túy (gốc) bên trong phần tử, loại bỏ tất cả thẻ HTML. |
| Hiệu năng	| Chậm hơn vì trình duyệt phải biên dịch (parse) chuỗi thành các phần tử DOM.	| Nhanh hơn vì trình duyệt chỉ xử lý nó như một chuỗi văn bản thuần túy. |
| Độ an toàn | Kém an toàn, dễ bị tấn công Cross-Site Scripting (XSS) nếu chèn dữ liệu chưa kiểm duyệt từ user. | An toàn tuyệt đối trước XSS vì mọi ký tự nguy hiểm (như <, >) đều được biến thành text an toàn. |

- Khi nào nên dùng?
  + Dùng innerHTML khi: Bạn chủ động muốn chèn một đoạn mã cấu trúc HTML mới vào trang (ví dụ: tạo một danh sách <li> từ một mảng dữ liệu có sẵn của hệ thống).
  + Dùng textContent khi: Bạn chỉ muốn cập nhật chữ (text) như tên người dùng, số lượng, tiêu đề bài viết, hoặc hiển thị chính xác những gì người dùng nhập vào.

2. Tại sao innerHTML có thể gây lỗ hổng XSS?
- Lỗ hổng XSS (Cross-Site Scripting) xảy ra khi kẻ tấn công lừa trình duyệt thực thi các đoạn mã JavaScript độc hại trên máy của người dùng khác.
- Khi bạn dùng innerHTML, trình duyệt sẽ đọc chuỗi truyền vào và cố gắng chuyển đổi nó thành các node DOM. Nếu chuỗi đó chứa mã độc, trình duyệt vẫn sẽ biên dịch và chạy nó.
- Phân tích ví dụ minh họa:
```
// Giả sử user cố tình nhập chuỗi này vào ô tìm kiếm:
// <img src=x onerror="alert('Hacked!')">

const userInput = document.querySelector("#search").value;

// Trình duyệt biên dịch chuỗi này thành một thẻ <img>
document.querySelector("#result").innerHTML = userInput;
```
- Cơ chế kích hoạt mã độc:
  + Trình duyệt cố gắng tải ảnh từ nguồn src="x" (đây là một nguồn sai/không tồn tại).
  + Vì tải ảnh thất bại, sự kiện lỗi onerror được kích hoạt ngay lập tức.
  + Đoạn mã nằm trong onerror (ở đây là alert('Hacked!'), hoặc nguy hiểm hơn là lấy cắp Token/Cookie document.cookie) sẽ bị thực thi.
3. Cách sửa để đảm bảo an toàn
Có 2 cách chính để khắc phục tùy thuộc vào mục đích hiển thị của bạn:
- **Cách 1:** Thay bằng textContent (Khuyến khích nhất)
Nếu bạn chỉ muốn hiển thị chuỗi tìm kiếm của user ra màn hình dưới dạng văn bản thuần túy, hãy đổi sang textContent. Trình duyệt sẽ tự động mã hóa các ký tự đặc biệt, biến thẻ <img> thành một chuỗi chữ vô hại.
```
const userInput = document.querySelector("#search").value;
// AN TOÀN: Thẻ <img> của user sẽ hiển thị ra màn hình dưới dạng chữ chứ không chạy mã độc
document.querySelector("#result").textContent = userInput;
```
- **Cách 2:** Sử dụng các thư viện "Làm sạch" (Sanitize) HTML
Trong trường hợp bạn bắt buộc phải cho phép người dùng nhập HTML (ví dụ: trình soạn thảo văn bản phong phú - Rich Text Editor) nhưng cần loại bỏ mã độc, hãy sử dụng các thư viện chuyên dụng như DOMPurify trước khi gán vào innerHTML.
```
// Cần nhúng thư viện DOMPurify trước khi dùng
const userInput = document.querySelector("#search").value;

// Làm sạch chuỗi đầu vào, loại bỏ các thuộc tính nguy hiểm như onerror, onload, <script>
const cleanInput = DOMPurify.sanitize(userInput);

// Bây giờ gán vào innerHTML đã an toàn
document.querySelector("#result").innerHTML = cleanInput;

```

## Câu A3 — Event Bubbling

Khi click vào button:

```text
BUTTON
INNER
OUTER
```

Giải thích: Sự kiện click xảy ra ở button trước, sau đó nổi bọt lên cha `#inner`, rồi tiếp tục nổi lên `#outer`.

Nếu bỏ comment:

```javascript
e.stopPropagation();
```

Output chỉ còn:

```text
BUTTON
```

Vì `stopPropagation()` chặn không cho event tiếp tục nổi bọt lên các phần tử cha.

---

# PHẦN C — DEBUG & PHÂN TÍCH (15 điểm)
## Câu C1 (8đ) — Debug DOM Code
- Lỗi ```addEventListener("onclick", ...)``` (Dòng 18):
    + Giải thích: Tên sự kiện truyền vào ```addEventListener``` không có tiền tố on. Phải sửa thành "click".
- Lỗi ghi đè biến DOM countDisplay = count (Dòng 24):
    + Giải thích: Biến ```countDisplay``` đang lưu trữ một phần tử DOM (Element). Lệnh này đã vô tình ghi đè giá trị số của count vào biến đó, làm hỏng tham chiếu DOM khiến các lần bấm nút sau không cập nhật được giao diện nữa. Phải sửa thành ```countDisplay.textContent = count;```.
- Lỗi gán ```historyList.innerHTML = null```; (Dòng 25):
    + Giải thích: Trong DOM, gán một thuộc tính chuỗi bằng null sẽ biến nó thành chuỗi "null". Kết quả là giao diện sẽ hiển thị chữ "null" trên màn hình. Cách đúng để xóa sạch là gán bằng chuỗi rỗng "".
- Lỗi hàm item.remove thiếu dấu ngoặc (Dòng 34):
    + Giải thích: .remove là một phương thức (method), không phải thuộc tính. Thiếu cặp dấu ngoặc () khiến trình duyệt chỉ tham chiếu tới hàm chứ không thực thi lệnh xóa element.
- Lỗi rò rỉ bộ nhớ (Memory Leak) do gán event listener trong vòng lặp (Dòng 11):
    + Giải thích: Mỗi lần bấm nút Increment, code lại tạo ra một thẻ ```<li>``` mới và bind một hàm ẩn danh ```function() { deleteHistory(this); }``` vào nó. Việc này vừa tốn bộ nhớ vừa không tận dụng sức mạnh của Event Delegation (Ủy quyền sự kiện).
- Lỗi Ép kiểu dữ liệu (Type Coercion) khi tải LocalStorage (Dòng 44):
    + Giải thích: ```localStorage.getItem("count")``` trả về một chuỗi (string). Khi thực hiện count++ hoặc count-- ở các lần bấm tiếp theo, JavaScript sẽ thực hiện phép cộng chuỗi (ví dụ: "0" + 1 = "01"). Cần ép kiểu về dạng số bằng  ```parseInt()``` hoặc dấu +.
- Lỗi giá trị mặc định của count khi LocalStorage trống (Dòng 44):
    + Giải thích: Trong lần đầu tiên người dùng vào trang, LocalStorage chưa có dữ liệu -> ```getItem``` trả về null. Ép kiểu dữ liệu của null sẽ làm hỏng biến đếm. Cần có giá trị fallback mặc định là 0.
- Lỗi bảo mật / Hiệu năng innerHTML không cần thiết (Dòng 6 & Dòng 20):
    + Giải thích: Giá trị hiển thị của count hoàn toàn là text thuần túy. Sử dụng ```innerHTML``` bắt trình duyệt phải chạy bộ phân tích cú pháp HTML (HTML parser) một cách dư thừa và kém an toàn. Nên thay bằng ```textContent```.

- **Sửa lại code:**
```
// App: Counter with history
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");
let count = 0;

// 1. Nút tăng giá trị (Increment)
document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++;
    countDisplay.textContent = count; // Thay bằng textContent cho an toàn và nhanh hơn
    
    // Lưu history
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    // Bỏ việc gán addEventListener tại đây để chống rò rỉ bộ nhớ (Memory Leak)
    historyList.append(li);
});

// 2. SỬA LỖI: Đổi "onclick" thành "click"
document.querySelector("#decrementBtn").addEventListener("click", function() {
    count--;
    countDisplay.textContent = count;
});

// 3. SỬA LỖI: Sửa việc ghi đè biến DOM và sửa gán innerHTML bằng chuỗi rỗng thay vì null
document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    countDisplay.textContent = count; 
    historyList.innerHTML = ""; 
});

// 4. TỐI ƯU: Sử dụng Event Delegation cho danh sách history
// Lắng nghe trực tiếp tại thẻ cha, bấm vào li nào thì xóa li đó
historyList.addEventListener("click", (e) => {
    if (e.target && e.target.tagName === "LI") {
        e.target.remove(); // Cú pháp hiện đại, ngắn gọn hơn removeChild
    }
});

// 5. SỬA LỖI: Thêm dấu ngoặc () vào hàm item.remove()
document.querySelector("#clearHistory").addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");
    items.forEach(item => {
        item.remove(); 
    });
});

// 6. Lưu trạng thái vào localStorage khi đóng/refresh trang
window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML); // Lưu cấu trúc li cũ
});

// 7. SỬA LỖI: Tải dữ liệu từ localStorage và ép kiểu số, chống lỗi null
window.addEventListener("load", () => {
    const savedCount = localStorage.getItem("count");
    // Ép kiểu chuỗi sang Số, nếu chưa có dữ liệu (null) thì mặc định lấy số 0
    count = savedCount ? parseInt(savedCount, 10) : 0;
    countDisplay.textContent = count;

    const savedHistory = localStorage.getItem("history");
    if (savedHistory) {
        historyList.innerHTML = savedHistory;
    }
});
```

## Câu C2 — Performance

### 1. Vì sao bind event lên 1000 elements là bad practice?

Nếu có 1000 phần tử và mỗi phần tử đều có một `addEventListener`, trình duyệt phải lưu và quản lý 1000 listener. Điều này làm tốn bộ nhớ, khó bảo trì, và khi thêm/xóa phần tử động thì phải bind/unbind event liên tục.

Event Delegation giải quyết bằng cách gắn một listener duy nhất lên phần tử cha. Khi user click vào phần tử con, event sẽ bubble lên cha. Ta kiểm tra `event.target` để biết phần tử nào được click.

Ví dụ:

```javascript
const list = document.querySelector("#list");

list.addEventListener("click", (e) => {
    if (e.target.classList.contains("item")) {
        console.log("Clicked:", e.target.textContent);
    }
});
```

### 2. Refactor dùng DocumentFragment

Code cũ:

```javascript
for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    document.body.appendChild(div);
}
```

Code tốt hơn:

```javascript
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div);
}

document.body.appendChild(fragment);
```

Giải thích:

`DocumentFragment` là vùng chứa DOM tạm thời trong bộ nhớ. Ta thêm 1000 phần tử vào fragment trước, sau đó append fragment vào DOM thật một lần. Nhờ vậy trình duyệt giảm số lần reflow/repaint, hiệu năng tốt hơn.