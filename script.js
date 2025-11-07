// Dados do usuário
const user = {
  nome: "Arthur Neves Rangel",
  nascimento: "2008-09-29",
  whatsapp: "5531999393414",
};

// Idade dinâmica e ano no rodapé
function calcularIdade(isoDate) {
  const nasc = new Date(isoDate);
  const hoje = new Date();
  let idade = hoje.getFullYear() - nasc.getFullYear();
  const m = hoje.getMonth() - nasc.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
  return idade;
}
document.getElementById("idade").textContent = calcularIdade(user.nascimento);
document.getElementById("year").textContent = new Date().getFullYear();

// Parallax da grade de fundo
const grid = document.querySelector(".grid-bg");
let parallaxAtivo = true;
window.addEventListener("mousemove", (e) => {
  if (!parallaxAtivo) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1..1
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  grid.style.transform = `perspective(800px) rotateX(${30 + y * 4}deg) translateY(${(-8 + y * 2)}%) translateX(${x * 1.5}%)`;
});

// Efeito Tilt simples (3D) em elementos .tilt
let tiltAtivo = true;
document.querySelectorAll(".tilt").forEach((el) => {
  const damp = 12;
  el.addEventListener("mousemove", (e) => {
    if (!tiltAtivo) return;
    const rect = el.getBoundingClientRect();
    const rx = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1..1
    const ry = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    el.style.transform = `rotateY(${rx * damp}deg) rotateX(${-ry * damp}deg)`;
  });
  el.addEventListener("mouseleave", () => {
    el.style.transform = "rotateY(0) rotateX(0)";
  });
});

// Reveal on scroll
let revealAtivo = true;
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (revealAtivo && e.isIntersecting) e.target.classList.add("reveal");
  }
}, { threshold: 0.16 });
document.querySelectorAll(".section, .card, .time-card, .skill-card, .project-card, .contact-card").forEach((el) => io.observe(el));

// Botões magnéticos (seguem o cursor)
document.querySelectorAll(".magnetic").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    btn.style.setProperty("--mx", `${mx}%`);
    btn.style.setProperty("--my", `${my}%`);
  });
});

// Painel de interações
const panel = document.getElementById("interactionsPanel");
document.getElementById("interactionsBtn").addEventListener("click", () => panel.showModal());
document.getElementById("closePanel").addEventListener("click", () => panel.close());

const optTilt = document.getElementById("optTilt");
const optParallax = document.getElementById("optParallax");
const optReveal = document.getElementById("optReveal");
optTilt.addEventListener("change", (e) => { tiltAtivo = e.target.checked; });
optParallax.addEventListener("change", (e) => { parallaxAtivo = e.target.checked; });
optReveal.addEventListener("change", (e) => { revealAtivo = e.target.checked; });

// Alternância de tema
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  const html = document.documentElement;
  const atual = html.getAttribute("data-theme");
  const proximo = atual === "neon" ? "light" : "neon";
  html.setAttribute("data-theme", proximo);
  themeToggle.textContent = proximo === "neon" ? "Neon 🌙" : "Claro ☀️";
});

// Lightbox para imagens da galeria e avatar
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

function abrirLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt || "Imagem";
  lightbox.showModal();
}
document.querySelectorAll(".gallery-card img, .avatar-img").forEach((img) => {
  img.addEventListener("click", () => abrirLightbox(img.src, img.alt));
});
lightboxClose.addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (e) => {
  const within = e.target.closest("img, button");
  if (!within) lightbox.close();
});