// Window management
let activeWindow = null
let draggedWindow = null
const dragOffset = { x: 0, y: 0 }
let windowZIndex = 10
const openWindows = new Set()

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  updateClock()
  setInterval(updateClock, 1000)
  setupTerminal()
  positionWindows()
})

// Clock
function updateClock() {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, "0")
  const minutes = String(now.getMinutes()).padStart(2, "0")
  document.getElementById("clock").textContent = `${hours}:${minutes}`
}

// Start Menu
function toggleStartMenu() {
  const menu = document.getElementById("startMenu")
  menu.style.display = menu.style.display === "none" ? "block" : "none"
}

// Close start menu when clicking outside
document.addEventListener("click", (e) => {
  const menu = document.getElementById("startMenu")
  const startButton = document.querySelector(".start-button")
  if (!menu.contains(e.target) && !startButton.contains(e.target)) {
    menu.style.display = "none"
  }
})

// Window positioning
function positionWindows() {
  const windows = ["about", "skills", "projects", "contact", "terminal"]
  windows.forEach((id, index) => {
    const window = document.getElementById(`${id}-window`)
    const offset = index * 30
    window.style.left = `${100 + offset}px`
    window.style.top = `${80 + offset}px`
  })
}

// Open Window
function openWindow(windowId) {
  const window = document.getElementById(`${windowId}-window`)
  window.style.display = "flex"
  window.style.zIndex = ++windowZIndex
  openWindows.add(windowId)
  updateTaskbar()
  toggleStartMenu()
  setActiveWindow(window)
}

// Close Window
function closeWindow(windowId) {
  const window = document.getElementById(`${windowId}-window`)
  window.style.display = "none"
  openWindows.delete(windowId)
  updateTaskbar()
}

// Minimize Window
function minimizeWindow(windowId) {
  const window = document.getElementById(`${windowId}-window`)
  window.style.display = "none"
}

// Maximize Window
function maximizeWindow(windowId) {
  const window = document.getElementById(`${windowId}-window`)
  if (window.dataset.maximized === "true") {
    window.style.left = window.dataset.originalLeft
    window.style.top = window.dataset.originalTop
    window.style.width = window.dataset.originalWidth
    window.style.height = window.dataset.originalHeight
    window.dataset.maximized = "false"
  } else {
    window.dataset.originalLeft = window.style.left
    window.dataset.originalTop = window.style.top
    window.dataset.originalWidth = window.style.width
    window.dataset.originalHeight = window.style.height
    window.style.left = "0"
    window.style.top = "0"
    window.style.width = "100vw"
    window.style.height = "calc(100vh - 42px)"
    window.dataset.maximized = "true"
  }
}

// Set Active Window
function setActiveWindow(window) {
  document.querySelectorAll(".window").forEach((w) => w.classList.remove("active"))
  window.classList.add("active")
  window.style.zIndex = ++windowZIndex
  activeWindow = window
}

// Taskbar
function updateTaskbar() {
  const taskbarItems = document.getElementById("taskbarItems")
  taskbarItems.innerHTML = ""

  const windowTitles = {
    about: "About Me",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
    terminal: "Terminal",
  }

  openWindows.forEach((windowId) => {
    const item = document.createElement("div")
    item.className = "taskbar-item"
    item.textContent = windowTitles[windowId]
    item.onclick = () => {
      const window = document.getElementById(`${windowId}-window`)
      if (window.style.display === "none") {
        window.style.display = "flex"
      }
      setActiveWindow(window)
    }
    taskbarItems.appendChild(item)
  })
}

// Window Dragging
document.addEventListener("mousedown", (e) => {
  const titleBar = e.target.closest(".title-bar")
  if (titleBar && !e.target.closest(".title-bar-controls")) {
    draggedWindow = titleBar.closest(".window")
    setActiveWindow(draggedWindow)
    const rect = draggedWindow.getBoundingClientRect()
    dragOffset.x = e.clientX - rect.left
    dragOffset.y = e.clientY - rect.top
  }
})

document.addEventListener("mousemove", (e) => {
  if (draggedWindow) {
    const x = e.clientX - dragOffset.x
    const y = e.clientY - dragOffset.y
    draggedWindow.style.left = `${Math.max(0, x)}px`
    draggedWindow.style.top = `${Math.max(0, y)}px`
  }
})

document.addEventListener("mouseup", () => {
  draggedWindow = null
})

// Click on window to make it active
document.addEventListener("mousedown", (e) => {
  const window = e.target.closest(".window")
  if (window) {
    setActiveWindow(window)
  }
})

// Tab Switching
function switchTab(tabName) {
  document.querySelectorAll(".tab").forEach((tab) => tab.classList.remove("active"))
  document.querySelectorAll(".tab-content").forEach((content) => (content.style.display = "none"))

  event.target.classList.add("active")
  document.getElementById(tabName).style.display = "block"
}

// Terminal
function setupTerminal() {
  const input = document.getElementById("terminal-input")
  const output = document.getElementById("terminal-output")

  const commands = {
    help: () => {
      return `Available commands:
  help     - Show this help message
  about    - Display information about me
  skills   - List my technical skills
  projects - Show my projects
  contact  - Display contact information
  clear    - Clear the terminal
  date     - Show current date and time
  echo     - Echo back the input`
    },
    about: () => {
      return `Computer Science Engineer
Passionate about software development, algorithms, and system design.
Specializing in full-stack development and performance optimization.`
    },
    skills: () => {
      return `Technical Skills:
- Languages: JavaScript, Python, Java, C/C++
- Frameworks: React, Node.js, Django, Spring Boot
- Tools: Git, Docker, AWS, PostgreSQL`
    },
    projects: () => {
      return `Recent Projects:
1. Distributed System - Microservices architecture
2. ML Pipeline - Image recognition system
3. Real-time Chat - WebSocket-based chat app
4. Encryption Tool - Secure file encryption utility`
    },
    contact: () => {
      return `Contact Information:
GitHub: github.com/yourusername
LinkedIn: linkedin.com/in/yourusername
Email: your.email@example.com
Twitter: @yourusername`
    },
    clear: () => {
      output.innerHTML = ""
      return ""
    },
    date: () => {
      return new Date().toString()
    },
    echo: (args) => {
      return args.join(" ")
    },
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const command = input.value.trim()
      const outputLine = document.createElement("div")
      outputLine.textContent = `C:\\> ${command}`
      output.appendChild(outputLine)

      if (command) {
        const [cmd, ...args] = command.split(" ")
        const result = commands[cmd.toLowerCase()]

        if (result) {
          const resultLine = document.createElement("div")
          resultLine.innerHTML =
            typeof result === "function" ? result(args).replace(/\n/g, "<br>") : result.replace(/\n/g, "<br>")
          output.appendChild(resultLine)
        } else {
          const errorLine = document.createElement("div")
          errorLine.textContent = `'${cmd}' is not recognized as an internal or external command.`
          output.appendChild(errorLine)
        }
      }

      const spacer = document.createElement("div")
      spacer.innerHTML = "&nbsp;"
      output.appendChild(spacer)

      input.value = ""
      output.scrollTop = output.scrollHeight
    }
  })
}
