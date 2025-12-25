function calculate() {
  const n = Number(document.getElementById("n").value);

  if (n <= 0) {
    document.getElementById("result").textContent =
      "1 이상의 정수를 입력하세요.";
    return;
  }

  let fibonacci = [];
  fibonacci[0] = 0;

  if (n > 1) {
    fibonacci[1] = 1;
  }

  for (let i = 2; i < n; i++) {
    fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
  }

  document.getElementById("result").textContent =
    fibonacci.join(" ");

  drawGraph(fibonacci);
}

function drawGraph(data) {
  const canvas = document.getElementById("graph");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const padding = 40;
  const maxValue = Math.max(...data);

  ctx.beginPath();
  ctx.moveTo(padding, canvas.height - padding);

  for (let i = 0; i < data.length; i++) {
    const x =
      padding +
      (i / (data.length - 1)) *
      (canvas.width - 2 * padding);

    const y =
      canvas.height -
      padding -
      (data[i] / maxValue) *
      (canvas.height - 2 * padding);

    ctx.lineTo(x, y);
  }

  ctx.stroke();
}
