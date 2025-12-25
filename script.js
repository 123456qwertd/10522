function calculate() {
  const n = parseInt(document.getElementById("n").value);
  const result = document.getElementById("result");
  const canvas = document.getElementById("chart");
  const ctx = canvas.getContext("2d");

  if (n < 2) {
    result.textContent = "2 이상의 수를 입력하세요.";
    return;
  }

  // ① 반복 알고리즘으로 피보나치 수열 계산
  let fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }

  result.textContent = fib.join(", ");

  // ② 그래프 초기화
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const padding = 50;
  const graphWidth = canvas.width - padding * 2;
  const graphHeight = canvas.height - padding * 2;
  const maxValue = Math.max(...fib);

  // ③ 축 그리기
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, canvas.height - padding);
  ctx.lineTo(canvas.width - padding, canvas.height - padding);
  ctx.stroke();

  // ④ 축 이름
  ctx.font = "14px Arial";
  ctx.fillText("항 번호 (n)", canvas.width / 2 - 30, canvas.height - 10);

  ctx.save();
  ctx.translate(15, canvas.height / 2 + 40);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("피보나치 수 F(n)", 0, 0);
  ctx.restore();

  // ⑤ x축 눈금
  for (let i = 0; i < n; i++) {
    let x = padding + (i / (n - 1)) * graphWidth;
    ctx.fillText(i + 1, x - 3, canvas.height - padding + 15);
  }

  // ⑥ y축 눈금
  for (let i = 0; i <= 5; i++) {
    let value = Math.round((maxValue / 5) * i);
    let y = canvas.height - padding - (value / maxValue) * graphHeight;
    ctx.fillText(value, 5, y + 3);
  }

  // ⑦ 그래프 선 그리기
  ctx.beginPath();
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 2;

  fib.forEach((value, index) => {
    let x = padding + (index / (n - 1)) * graphWidth;
    let y = canvas.height - padding - (value / maxValue) * graphHeight;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.stroke();
}
