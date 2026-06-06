const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const form = document.getElementById("borrowForm");

let borrows = JSON.parse(localStorage.getItem("borrows")) || [];

openModal.onclick = () => {
    form.reset();
    clearErrors();
    document.getElementById("editIndex").value = "";
    document.getElementById("borrowId").disabled = false;
    modal.style.display = "block";
};

closeModal.onclick = () => modal.style.display = "none";

function saveData() {
    localStorage.setItem("borrows", JSON.stringify(borrows));
}

function renderTable() {

    const table = document.getElementById("borrowTable");
    table.innerHTML = "";

    borrows.forEach((b, index) => {

        table.innerHTML += `
        <tr>
            <td>${b.borrowId}</td>
            <td>${b.borrower}</td>
            <td>${b.bookId}</td>
            <td>${b.category}</td>
            <td>${b.borrowDate}</td>
            <td>${b.dueDate}</td>
            <td>${b.status}</td>
            <td>
                <button class="edit"
                onclick="editBorrow(${index})">
                Sửa
                </button>

                <button class="delete"
                onclick="deleteBorrow(${index})">
                Xóa
                </button>
            </td>
        </tr>
        `;
    });

    updateStats();
}

function updateStats() {

    document.getElementById("total").innerText = borrows.length;

    document.getElementById("borrowing").innerText =
        borrows.filter(x => x.status === "Đang mượn").length;

    document.getElementById("returned").innerText =
        borrows.filter(x => x.status === "Đã trả").length;
}

function clearErrors() {
    document.querySelectorAll(".error").forEach(e => e.innerText = "");
}

function validate() {

    clearErrors();

    let valid = true;

    const borrowId = borrowIdInput.value.trim();
    const borrower = borrowerInput.value.trim();
    const bookId = bookIdInput.value.trim();
    const category = categoryInput.value;
    const borrowDate = borrowDateInput.value;
    const dueDate = dueDateInput.value;
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();
    const status = statusInput.value;
    const note = noteInput.value.trim();

    if (!/^PM-\d{4}$/.test(borrowId)) {
        errBorrowId.innerText = "PM-XXXX";
        valid = false;
    }

    const editIndex =
        document.getElementById("editIndex").value;

    if (editIndex === "") {
        if (borrows.some(x => x.borrowId === borrowId)) {
            errBorrowId.innerText = "Mã đã tồn tại";
            valid = false;
        }
    }

    if (!/^[A-Za-zÀ-ỹ\s]{2,40}$/.test(borrower)) {
        errBorrower.innerText = "Tên từ 2-40 ký tự";
        valid = false;
    }

    if (!/^BK\d{5}$/.test(bookId)) {
        errBookId.innerText = "BK + 5 số";
        valid = false;
    }

    if (!category) {
        errCategory.innerText = "Chọn thể loại";
        valid = false;
    }

    const today = new Date().toISOString().split("T")[0];

    if (!borrowDate || borrowDate > today) {
        errBorrowDate.innerText = "Ngày mượn không hợp lệ";
        valid = false;
    }

    if (!dueDate) {
        errDueDate.innerText = "Nhập hạn trả";
        valid = false;
    }
    else {

        let start = new Date(borrowDate);
        let end = new Date(dueDate);

        let diff =
            (end - start) / (1000 * 60 * 60 * 24);

        if (diff < 0 || diff > 30) {
            errDueDate.innerText =
                "Từ ngày mượn đến hạn trả <=30 ngày";
            valid = false;
        }
    }

    if (!/^(03|05|07|08|09)\d{8}$/.test(phone)) {
        errPhone.innerText = "SĐT không hợp lệ";
        valid = false;
    }

    if (!/^[^\s@]+@[^\s@]+@?$/.test(email) ||
        !email.endsWith("@library.vn")) {
        errEmail.innerText = "Email @library.vn";
        valid = false;
    }

    if (!status) {
        errStatus.innerText = "Chọn trạng thái";
        valid = false;
    }

    if (note.length > 120) {
        errNote.innerText = "Tối đa 120 ký tự";
        valid = false;
    }

    if (/<script|<iframe|<img/i.test(note)) {
        errNote.innerText = "Không chứa HTML";
        valid = false;
    }

    return valid;
}

const borrowIdInput = document.getElementById("borrowId");
const borrowerInput = document.getElementById("borrower");
const bookIdInput = document.getElementById("bookId");
const categoryInput = document.getElementById("category");
const borrowDateInput = document.getElementById("borrowDate");
const dueDateInput = document.getElementById("dueDate");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const statusInput = document.getElementById("status");
const noteInput = document.getElementById("note");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    if (!validate()) return;

    const data = {
        borrowId: borrowIdInput.value.trim(),
        borrower: borrowerInput.value.trim(),
        bookId: bookIdInput.value.trim(),
        category: categoryInput.value,
        borrowDate: borrowDateInput.value,
        dueDate: dueDateInput.value,
        phone: phoneInput.value.trim(),
        email: emailInput.value.trim(),
        status: statusInput.value,
        note: noteInput.value.trim()
    };

    const editIndex =
        document.getElementById("editIndex").value;

    if (editIndex === "") {
        borrows.push(data);
    }
    else {
        borrows[editIndex] = data;
    }

    saveData();
    renderTable();

    modal.style.display = "none";
});

function editBorrow(index) {

    const b = borrows[index];

    modal.style.display = "block";

    document.getElementById("editIndex").value = index;

    borrowIdInput.value = b.borrowId;
    borrowerInput.value = b.borrower;
    bookIdInput.value = b.bookId;
    categoryInput.value = b.category;
    borrowDateInput.value = b.borrowDate;
    dueDateInput.value = b.dueDate;
    phoneInput.value = b.phone;
    emailInput.value = b.email;
    statusInput.value = b.status;
    noteInput.value = b.note;

    borrowIdInput.disabled = true;
}

function deleteBorrow(index) {

    if (confirm("Bạn có chắc muốn xóa?")) {

        borrows.splice(index, 1);

        saveData();
        renderTable();
    }
}

renderTable();