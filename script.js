// ===== CURSOR GLOW =====
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

// ===== SCROLL PROGRESS BAR =====
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = scrollPercent + '%';
});

// ===== MENU MOBILE =====
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

// ===== SCROLL ATIVO: HEADER STICKY + SEÇÃO ATIVA =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  const scrollTop = window.scrollY;

  // Seção ativa no navbar
  sections.forEach(sec => {
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');

    if (scrollTop >= offset && scrollTop < offset + height) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`header nav a[href*="${id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });

  // Header sticky
  const header = document.querySelector('.header');
  header.classList.toggle('sticky', scrollTop > 100);

  // Fechar menu mobile ao scrollar
  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');

  // Animação das skill bars ao entrar na seção
  animateSkillBarsOnScroll();

  // Animação dos contadores ao entrar na seção
  animateCountersOnScroll();
};

// ===== TYPED.JS =====
const typed = new Typed('.multiple-text', {
  strings: ['Full-Stack', 'Front-End', 'Back-End'],
  typeSpeed: 90,
  backSpeed: 60,
  backDelay: 1500,
  loop: true,
  smartBackspace: true,
});

// ===== SCROLL REVEAL (corrigido) =====
ScrollReveal({
  reset: false,
  distance: '60px',
  duration: 1000,
  delay: 100,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
});

ScrollReveal().reveal('.home-content, .heading, .section-subtitle', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-container, .contact-wrapper', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });
ScrollReveal().reveal('.skills-container', { origin: 'bottom' });
ScrollReveal().reveal('.portfolio-filter', { origin: 'top', delay: 200 });

// ===== ANIMAÇÃO DAS SKILL BARS =====
let skillsAnimated = false;

function animateSkillBarsOnScroll() {
  if (skillsAnimated) return;
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  const sectionTop = skillsSection.offsetTop;
  const sectionHeight = skillsSection.offsetHeight;

  if (window.scrollY >= sectionTop - window.innerHeight * 0.6 &&
    window.scrollY < sectionTop + sectionHeight) {
    skillsAnimated = true;
    document.querySelectorAll('.skill-progress').forEach(bar => {
      const targetWidth = bar.getAttribute('data-width');
      setTimeout(() => {
        bar.style.width = targetWidth + '%';
      }, 200);
    });
  }
}

// ===== ANIMAÇÃO DOS CONTADORES =====
let countersAnimated = false;

function animateCountersOnScroll() {
  if (countersAnimated) return;
  const aboutSection = document.getElementById('about');
  if (!aboutSection) return;

  const sectionTop = aboutSection.offsetTop;

  if (window.scrollY >= sectionTop - window.innerHeight * 0.7) {
    countersAnimated = true;
    document.querySelectorAll('.stat-number').forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      let current = 0;
      const increment = target / 40;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, 40);
    });
  }
}

// ===== FILTRO DO PORTFÓLIO =====
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioBoxes = document.querySelectorAll('.portfolio-box');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Atualizar botão ativo
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    portfolioBoxes.forEach(box => {
      const category = box.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        box.classList.remove('hidden');
        box.style.animation = 'fadeInUp 0.4s ease forwards';
      } else {
        box.classList.add('hidden');
      }
    });
  });
});

// ===== FORMULÁRIO DE CONTATO =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<i class="bx bx-check"></i> Mensagem enviada!';
    btn.style.background = 'rgb(0, 200, 150)';

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });
}

// ===== ANIMAÇÃO DE ENTRADA DO CSS =====
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
