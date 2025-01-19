// Завантаження відгуків
async function loadReviews() {
    try {
      const response = await fetch('http://localhost:3000/reviews');
      const reviews = await response.json();
  
      const reviewsList = document.getElementById('reviewsList');
      reviewsList.innerHTML = ''; // Очищуємо попередні відгуки
  
      reviews.forEach(review => {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review');
        reviewItem.innerHTML = `<strong>${review.name}</strong><p>${review.text}</p>`;
        reviewsList.appendChild(reviewItem);
      });
    } catch (error) {
      console.error('Fehler beim Laden der Bewertungen:', error);
    }
  }
  
  // Надсилання нового відгуку
  const reviewForm = document.getElementById('reviewForm');
  reviewForm.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const name = document.getElementById('reviewName').value.trim();
    const text = document.getElementById('reviewText').value.trim();
  
    if (!name || !text) return alert('Bitte geben Sie Name und Bewertung ein.');
  
    try {
      const response = await fetch('http://localhost:3000/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, text }),
      });
  
      if (response.ok) {
        loadReviews(); // Оновлюємо список відгуків
        reviewForm.reset(); // Очищуємо форму
      } else {
        throw new Error('Fehler beim Hinzufügen der Bewertung.');
      }
    } catch (error) {
      console.error('Fehler beim Hinzufügen der Bewertung:', error);
    }
  });
  
  // Слайдер
  let currentIndex = 0;
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  
  function changeSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  }
  
  // Автоматичне перемикання кожні 2 секунди
  setInterval(changeSlide, 2000);
  
  // Завантаження відгуків при старті сторінки
  loadReviews();
