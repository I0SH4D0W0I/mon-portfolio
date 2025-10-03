// main.js — version robuste (mettre à la racine / même dossier que tes pages)
document.addEventListener('DOMContentLoaded', () => {
  /* ------------------ apparition des sections ------------------ */
  const sections = document.querySelectorAll('.section');
  if (sections.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.2 });
    sections.forEach(s => observer.observe(s));
  }

  /* ------------------ bouton "Retour en haut" ------------------ */
  const topBtn = document.getElementById('topBtn');
  if (topBtn) {
    const toggleTop = () => topBtn.style.display = (window.scrollY > 300) ? 'block' : 'none';
    // état initial + écoute
    toggleTop();
    window.addEventListener('scroll', toggleTop);
    topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ------------------ mode sombre ------------------ */
  const toggleBtn = document.getElementById('darkModeToggle');
  if (toggleBtn) {
    // restaure préférence si souhaité (optionnel)
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.body.classList.add('dark');
      toggleBtn.textContent = '☀️';
    } else {
      toggleBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
    }

    toggleBtn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark');
      toggleBtn.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  /* ------------------ mini-jeu : clique rapide ------------------ */
  const playBtn = document.getElementById('playBtn');
  const scoreDisplay = document.getElementById('score');
  const timerDisplay = document.getElementById('timer');

  if (playBtn && scoreDisplay && timerDisplay) {
    let score = 0;
    let timeLeft = 10;
    let timerInterval = null;
    let gameActive = false;

    const updateScore = () => scoreDisplay.textContent = `Score : ${score}`;
    const updateTimer = () => timerDisplay.textContent = `Temps restant : ${timeLeft}s`;

    playBtn.addEventListener('click', () => {
      if (!gameActive) {
        // démarrer la partie
        score = 0;
        timeLeft = 10;
        gameActive = true;
        updateScore();
        updateTimer();

        timerInterval = setInterval(() => {
          timeLeft--;
          updateTimer();
          if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            gameActive = false;
            timerDisplay.textContent = '⏳ Temps écoulé !';
            alert(`🎉 Partie terminée ! Ton score est de ${score} clics.`);
          }
        }, 1000);
      } else {
        // incrémenter le score pendant la partie
        score++;
        updateScore();
        // animation simple si tu l'ajoutes en CSS (.score-animate)
        scoreDisplay.classList.add('score-animate');
        setTimeout(() => scoreDisplay.classList.remove('score-animate'), 160);
      }
    });
  }
});
