import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { getRouter } from './router.tsx'
import './styles.css'

// ✅ Intro animation dismissal
setTimeout(() => {
  const intro = document.getElementById('intro');
  if (intro) {
    intro.classList.add('fade-out');
    setTimeout(() => intro.style.display = 'none', 1100);
  }
}, 2000);

const router = getRouter()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)