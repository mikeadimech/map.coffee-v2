import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from "@/components/theme-provider"
import HomePage from '@/pages/home/page'
import MapPage from '@/pages/map/page'

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Router>
        <div className="min-h-screen flex flex-col">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/map" element={<MapPage title={'Hello'} author={'Test'} />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App;
