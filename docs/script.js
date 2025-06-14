
  const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snowflakes = [];

function createSnowflakes() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const radius = Math.random() * 3 + 1;
  const speed = Math.random() * 0.7 + 0.3; // بطيء
  snowflakes.push({ x, y, radius, speed });
}

function drawSnowflakes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.beginPath();

  for (let flake of snowflakes) {
    ctx.moveTo(flake.x, flake.y);
    ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
  }

  ctx.fill();
  moveSnowflakes();
}

function moveSnowflakes() {
  for (let flake of snowflakes) {
    flake.y += flake.speed;
    if (flake.y > canvas.height) {
      flake.y = 0;
      flake.x = Math.random() * canvas.width;
    }
  }
}

function update() {
  drawSnowflakes();
  requestAnimationFrame(update);
}

// إنشاء 200 حبة ثلج
for (let i = 0; i < 70; i++) {
  createSnowflakes();
}

update();

// تحديث حجم الكانفاس عند تغيير حجم النافذة
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const words = [
  "Frontend Designer",
  "Web Designer",
  "UI/UX Designer",
  "Web Developer"
];

const typingSpeed = 100;    // سرعة الكتابة (ms)
const deletingSpeed = 50;   // سرعة الحذف (ms)
const delayAfter = 1500;    // تأخير بعد كتابة الكلمة (ms)

let textEl = document.getElementById("text");
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const current = words[wordIndex];

  if (!isDeleting) {
    // اكتب حرف
    textEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      // انتهت الكتابة → انتظر ثم احذف
      setTimeout(() => isDeleting = true, delayAfter);
    }
  } else {
    // احذف حرف
    textEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      // انتهى الحذف → انتقل للكلمة التالية
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  // حدّد التأخير حسب الحالة
  const timeout = isDeleting ? deletingSpeed : typingSpeed;
  setTimeout(typeLoop, timeout);
}

// ابدأ التأثير بعد تحميل الصفحة
document.addEventListener("DOMContentLoaded", typeLoop);
