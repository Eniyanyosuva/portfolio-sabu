document.addEventListener('DOMContentLoaded', () => {
  // Cursor Follower
  const cursor = document.getElementById('cursor');
  // Background Glow
  const glow = document.getElementById('bg-glow');

  document.addEventListener('mousemove', e => {
    // Custom cursor
    if (cursor) {
      cursor.style.left = e.clientX - 4 + 'px';
      cursor.style.top  = e.clientY - 4 + 'px';
    }
    // Background glow follow
    if (glow) {
      // Delay it slightly by using requestAnimationFrame if needed, or direct for snap
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    }
  });

  // Reveal Animations on Scroll
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => observer.observe(el));

  // 3D Tilt Effect on Cards
  if (window.innerWidth > 768) {
    const cards = document.querySelectorAll('.skill-card, .project-row');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate tilt
        const rotateX = ((y - centerY) / centerY) * -5; // max 5 degrees
        const rotateY = ((x - centerX) / centerX) * 5;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      });
    });
  }
});
