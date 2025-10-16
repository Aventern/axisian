// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// モバイルメニュー
function toggleMobileMenu() {
  const navLinks = document.querySelector(".nav-links")
  if (navLinks.style.display === "flex") {
    navLinks.style.display = "none"
  } else {
    navLinks.style.display = "flex"
    navLinks.style.flexDirection = "column"
    navLinks.style.position = "absolute"
    navLinks.style.top = "70px"
    navLinks.style.left = "0"
    navLinks.style.right = "0"
    navLinks.style.background = "rgba(0, 0, 0, 0.98)"
    navLinks.style.padding = "20px"
    navLinks.style.borderBottom = "1px solid #333"
  }
}

// スクロール時のヘッダー背景変更
let lastScroll = 0
window.addEventListener("scroll", () => {
  const header = document.querySelector("header")
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    header.style.background = "rgba(0, 0, 0, 0.98)"
  } else {
    header.style.background = "rgba(0, 0, 0, 0.95)"
  }

  lastScroll = currentScroll
})

// スキルバーのアニメーション
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const skillBars = entry.target.querySelectorAll(".skill-progress")
      skillBars.forEach((bar) => {
        const width = bar.style.width
        bar.style.width = "0"
        setTimeout(() => {
          bar.style.width = width
        }, 100)
      })
    }
  })
}, observerOptions)

const skillsSection = document.querySelector("#skills")
if (skillsSection) {
  observer.observe(skillsSection)
}

// ページ読み込み時のアニメーション
window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s"
    document.body.style.opacity = "1"
  }, 100)
})
