
let isScrolling = false;
let debounceTimer = null;

function updateInView() {
  const listItems = document.querySelectorAll('#list-view ul li');
  const centerY = window.innerHeight / 2;
  let closestItem = null;
  let closestDistance = Infinity;

  listItems.forEach(item => {
    const rect = item.getBoundingClientRect();
    const itemCenterY = rect.top + rect.height / 2;
    const distance = Math.abs(centerY - itemCenterY);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestItem = item;
    }
  });

  // Verwijder eerst alle 'in-view'-classes
  listItems.forEach(item => item.classList.remove('in-view'));

  if (closestItem) {
    closestItem.classList.add('in-view');

    // Scroll naar het midden zonder vertraging
    if (!isScrolling) {
      isScrolling = true;

      closestItem.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });

      setTimeout(() => {
        isScrolling = false;
      }, 400); // Verkort de tijd tussen scrolls
    }
  }
}

// Snellere debounce versie (50ms delay)
function debounceScroll() {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(updateInView, 50); // Snellere delay
}

// Voeg de debounced scroll-functie toe
window.addEventListener('scroll', debounceScroll);
window.addEventListener('resize', updateInView);
window.addEventListener('load', updateInView);


