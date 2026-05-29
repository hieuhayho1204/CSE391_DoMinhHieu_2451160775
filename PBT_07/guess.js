function playGame() {
    const secretNumber = Math.floor(Math.random() * 100) + 1;
    const maxTurns = 7;
    const guessedNumbers = [];
    let turn = 0;
    let isWin = false;

    alert("Game bắt đầu! Hãy đoán một số từ 1 đến 100. Bạn có tối đa 7 lần đoán.");

    while (turn < maxTurns) {
        const input = prompt(`Lần đoán ${turn + 1}/${maxTurns}: Nhập số từ 1 đến 100`);

        if (input === null) {
            alert("Bạn đã hủy game.");
            return;
        }

        const guess = Number(input);

        if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
            alert("Input không hợp lệ! Vui lòng nhập số nguyên từ 1 đến 100.");
            continue;
        }

        let isDuplicated = false;
        for (let i = 0; i < guessedNumbers.length; i++) {
            if (guessedNumbers[i] === guess) {
                isDuplicated = true;
                break;
            }
        }

        if (isDuplicated) {
            alert("Bạn đã đoán số này rồi!");
            continue;
        }

        guessedNumbers.push(guess);
        turn++;

        if (guess === secretNumber) {
            alert(`Đúng rồi! Bạn đoán đúng sau ${turn} lần!`);
            isWin = true;
            break;
        } else if (guess < secretNumber) {
            alert("Cao hơn!");
        } else {
            alert("Thấp hơn!");
        }
    }

    if (!isWin) {
        alert(`Bạn đã hết ${maxTurns} lượt. Bạn thua rồi! Đáp án là ${secretNumber}.`);
    }
}