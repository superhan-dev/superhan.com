import { Canvas } from '@react-three/fiber'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'



createRoot(document.getElementById('root')!).render(
  <Canvas>
    <ambientLight intensity={Math.PI / 2} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
    <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
    <App />
  </Canvas>,
  )