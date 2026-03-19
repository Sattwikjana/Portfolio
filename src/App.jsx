import { Canvas } from '@react-three/fiber'
import { ScrollControls } from '@react-three/drei'
import Experience from './components/Experience'
import Overlay from './components/Overlay'

function App() {
  return (
    <>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ width: '100vw', height: '100vh', display: 'block' }}
      >
        <color attach="background" args={['#0a0a1a']} />
        
        {/* We use 4 pages of scrolling content */}
        <ScrollControls pages={4} damping={0.2}>
          <Experience />
          <Overlay />
        </ScrollControls>
      </Canvas>
    </>
  )
}

export default App
