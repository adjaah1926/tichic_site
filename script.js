// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
  
  // === GESTION DES FORMULAIRES ===
  const formInscription = document.getElementById('formulaire-inscription');
  const msgInscription = document.getElementById('message-inscription');
  const formContact = document.getElementById('formulaire-contact');
  const msgContact = document.getElementById('message-contact');

  if (formInscription) {
    formInscription.addEventListener('submit', function(e) {
      e.preventDefault();
      msgInscription.style.display = 'block';
      msgInscription.textContent = 'Merci pour votre inscription ! Vous recevrez notre catalogue par email dans les plus brefs délais.';
      formInscription.reset();
      setTimeout(() => {
        msgInscription.style.display = 'none';
      }, 6000);
    });
  }

  if (formContact) {
    formContact.addEventListener('submit', function(e) {
      e.preventDefault();
      msgContact.style.display = 'block';
      msgContact.textContent = 'Merci pour votre message. L\'équipe TICHIC vous répondra sous 24 à 48 heures.';
      formContact.reset();
      setTimeout(() => {
        msgContact.style.display = 'none';
      }, 6000);
    });
  }

  // === GESTION DU CTA (masquer sur la page contact) ===
  const footer = document.getElementById('main-footer');

  function checkIfContactVisible() {
    const contactSection = document.getElementById('contact');
    if (!contactSection || !footer) return;

    const rect = contactSection.getBoundingClientRect();
    const isContactVisible = (
      (rect.top <= window.innerHeight && rect.bottom >= 0) || 
      window.location.hash === '#contact'
    );

    if (isContactVisible) {
      footer.classList.add('hide-cta');
    } else {
      footer.classList.remove('hide-cta');
    }
  }

  if (footer) {
    window.addEventListener('load', checkIfContactVisible);
    window.addEventListener('scroll', checkIfContactVisible);
    window.addEventListener('hashchange', checkIfContactVisible);
  }

  // === GESTION DES VIDÉOS (pause quand hors écran) ===
  const videos = document.querySelectorAll('video');
  
  if (videos.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.play().catch(e => {});
        } else {
          entry.target.pause();
        }
      });
    }, { threshold: 0.3 });

    videos.forEach(video => observer.observe(video));
  }

  // === ANIMATION DOUCE AU SCROLL POUR LES LIENS INTERNES ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

});