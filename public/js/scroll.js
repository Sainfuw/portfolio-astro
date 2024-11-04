function onScroll() {
  const hero = document.getElementById('hero')
  if (window.scrollY > 0) {
    hero.classList.add('scrolled')
  } else {
    hero.classList.remove('scrolled')
  }
}

document.addEventListener('scroll', onScroll)
