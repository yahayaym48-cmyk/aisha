import { useState, useEffect, useRef } from 'react'

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([])
  const lastHeartTimeRef = useRef(0)
  const HEART_INTERVAL = 800 // Show heart only once every 800ms

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now()
      // Only create a heart if enough time has passed since the last one
      if (now - lastHeartTimeRef.current > HEART_INTERVAL) {
        lastHeartTimeRef.current = now
        // Create a new heart at a random position
        const newHeart = {
          id: Date.now(),
          left: Math.random() * 100,
          delay: 0,
        }
        setHearts(prev => [...prev, newHeart])

        // Remove the heart after animation completes
        setTimeout(() => {
          setHearts(prev => prev.filter(h => h.id !== newHeart.id))
        }, 3000)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="floating-hearts-container">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            animation: 'floatHeart 3s ease-up forwards',
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  )
}

export default FloatingHearts
