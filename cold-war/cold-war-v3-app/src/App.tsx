import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Incident from './pages/Incident'
import Personnel from './pages/Personnel'
import Analysis from './pages/Analysis'
import Evidence from './pages/Evidence'
import Assessment from './pages/Assessment'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/incident" element={<Incident />} />
        <Route path="/personnel" element={<Personnel />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/evidence" element={<Evidence />} />
        <Route path="/assessment" element={<Assessment />} />
      </Routes>
    </Layout>
  )
}
