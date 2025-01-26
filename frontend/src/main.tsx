import React, { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import "./index.css"
import App from "./App"
import { SettingsProvider } from "./components/contexts/SettingsContext"

const rootElement = document.getElementById("root")
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      {/* <Router> */}
        <SettingsProvider>
          <App />
        </SettingsProvider>
      {/* </Router> */}
    </StrictMode>,
  )
} else {
  console.error("Failed to find the root element")
}

