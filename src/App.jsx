import { useState, useEffect, useRef } from 'react'
import FloatingHearts from './components/FloatingHearts'
import './App.css'

const config = {
  mainPassword: 'Aisha',
  hiddenPassword: 'Aisha',
  giftUnlockDate: '2027-02-21',
  nextBirthdayDate: '2027-02-21',
  backgroundMusicPath: './audio/WhatsApp Video 2026-02-20 at 9.53.31 PM.mp4',
  specialAudioPath: './audio/WhatsApp Video 2026-02-20 at 9.53.31 PM.mp4',
  backgroundMusicVolume: 0.15,
  specialAudioVolume: 0.7,
}

const IMAGES = [
  './images/WhatsApp Image 2026-08-25 at 5.52.59 AM.jpeg',
  './images/WhatsApp Image 2026-08-25 at 5.53.46 AM (1).jpeg',
  './images/WhatsApp Image 2026-08-25 at 5.53.46 AM.jpeg',
  './images/WhatsApp Image 2026-08-25 at 5.53.47 AM (1).jpeg',
  './images/WhatsApp Image 2026-08-25 at 5.53.47 AM (2).jpeg',
  './images/WhatsApp Image 2026-08-25 at 5.53.47 AM (3).jpeg',
]

const VIDEOS = [
  '[VIDEO 1]',
  '[VIDEO 2]',
  '[VIDEO 3]',
  '[VIDEO 4]',
]

const GIFTS = [
  { emoji: '🍽️', name: 'Private Birthday Dinner' },
  { emoji: '📸', name: 'Professional Couple Photoshoot' },
  { emoji: '🎉', name: 'A Full Surprise Day' },
  { emoji: '🎁', name: 'Mystery Gift' },
]

const LOVE_PARAGRAPHS = [
  'You make me feel safe in ways I never knew I needed.',
  'With you, life feels softer, lighter, and more meaningful.',
  'Your presence turns ordinary moments into memories I want to keep forever.',
  'Loving you has taught me that peace can exist in another person.',
  'Sometimes I look at you and quietly thank Allah for bringing you into my life.',
]

const THOUGHTS = [
  'I look forward to your notifications more than I admit.',
  'Some of the happiest moments of my day begin with a message from you.',
  'There are random moments when something reminds me of you and I smile without realizing it.',
  'Sometimes I reread our conversations just because I miss you.',
  'You occupy more of my thoughts than you probably know.',
  'Your happiness matters to me more than you realize.',
  'I notice the little things about you, even the things you think nobody sees.',
  'Even on difficult days, thoughts of you make things feel easier.',
  'I silently pray for you more often than I mention.',
  'The future feels brighter when I imagine it with you in it.',
]

const LETTERS = [
  {
    title: 'Open when you miss me.',
    message: 'Even when we are apart, you are never far from my heart. I miss you in the quietest ways and carry your love with me through every ordinary moment. We are learning how to be close in all the ways that matter, and I am grateful for every little step of this journey together.',
  },
  {
    title: 'Open when we have a disagreement.',
    message: 'A disagreement does not change how deeply I love you. We are two people growing together, and even in hard moments, I still choose you with patience, grace, and a heart that wants us to understand each other better. We are allowed to be human, and we are also allowed to come back to love.',
  },
  {
    title: 'Open when you feel sad.',
    message: 'When sadness visits, remember this: you are not too much, not too difficult, and never alone. I see your strength even when you are tired. Rest for a while, breathe deeply, and remember that love has a place for your hurt too. I am here, gently and wholeheartedly.',
  },
  {
    title: 'Open when you doubt yourself.',
    message: 'You are more beautiful, more capable, and more loved than you know. Your worth is not defined by your doubts or your struggles. You are thoughtful, kind, and deeply precious. The world is better because you are in it, and I am lucky to know you the way I do.',
  },
  {
    title: 'Open when you need a reminder of how loved you are.',
    message: 'You are loved in ways that are quiet and strong. You are loved in the way I pray for you, think of you, and make space for you in my heart. You are cherished, respected, and deeply desired in every good way. Never forget that.',
  },
  {
    title: 'For My Baby, Aisha.',
    message: 'My baby, Aisha, you are the kind of love that makes a person slow down and feel grateful. You are gentle and strong, beautiful in both softness and resilience. I hope you know that I love you in ways I cannot always explain, but feel with every part of me. You are my comfort, my joy, and my favorite person to share life with.',
  },
]

const FUTURE_HOPE = [
  'I hope we continue choosing each other every single day.',
  'I hope our home is filled with peace, laughter, and love.',
  'I hope we grow together and support each other through every season of life.',
  'I hope we create beautiful memories that we will one day look back on and smile.',
  'I hope that years from now, we still look at each other with the same warmth and gratitude.',
]

export default function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [showHiddenGate, setShowHiddenGate] = useState(false)
  const [hiddenPassword, setHiddenPassword] = useState('')
  const [hiddenPasswordError, setHiddenPasswordError] = useState('')
  const [showHiddenPage, setShowHiddenPage] = useState(false)
  const [selectedGift, setSelectedGift] = useState(null)
  const [giftMessage, setGiftMessage] = useState('')
  const [activeLetter, setActiveLetter] = useState(null)
  const [countdown, setCountdown] = useState({
    gift: { days: 0, hours: 0, minutes: 0, seconds: 0 },
    birthday: { days: 0 },
  })
  const [isBackgroundMusicPlaying, setIsBackgroundMusicPlaying] = useState(true)
  const [isSpecialAudioPlaying, setIsSpecialAudioPlaying] = useState(false)
  const bgMusicRef = useRef(null)
  const specialAudioRef = useRef(null)
  const [unlockNextBirthdayLetter, setUnlockNextBirthdayLetter] = useState(false)
  const [giftResponseEmail, setGiftResponseEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('selectedGift')
    if (saved !== null) {
      const index = parseInt(saved)
      setSelectedGift(index)
      setGiftMessage("I'm looking forward to that day.")
    }
  }, [])

  useEffect(() => {
    if (bgMusicRef.current) {
      bgMusicRef.current.src = config.backgroundMusicPath
      bgMusicRef.current.volume = config.backgroundMusicVolume
      bgMusicRef.current.preload = 'metadata'
    }
    if (specialAudioRef.current) {
      specialAudioRef.current.src = config.specialAudioPath
      specialAudioRef.current.volume = config.specialAudioVolume
      specialAudioRef.current.preload = 'metadata'
    }
  }, [])

  useEffect(() => {
    if (authenticated && bgMusicRef.current) {
      const playAudio = async () => {
        try {
          bgMusicRef.current.muted = false
          const playPromise = bgMusicRef.current.play()
          if (playPromise !== undefined) {
            await playPromise
            setIsBackgroundMusicPlaying(true)
          }
        } catch (error) {
          console.log('Autoplay blocked, audio will play on user interaction:', error.message)
        }
      }

      playAudio()

      const handleUserInteraction = () => {
        if (bgMusicRef.current && !isBackgroundMusicPlaying) {
          bgMusicRef.current.play().catch(() => {})
        }
        document.removeEventListener('click', handleUserInteraction)
        document.removeEventListener('touchstart', handleUserInteraction)
      }

      document.addEventListener('click', handleUserInteraction, { once: true })
      document.addEventListener('touchstart', handleUserInteraction, { once: true })

      return () => {
        document.removeEventListener('click', handleUserInteraction)
        document.removeEventListener('touchstart', handleUserInteraction)
      }
    }
  }, [authenticated, isBackgroundMusicPlaying])

  useEffect(() => {
    const ms = (n) => n * 24 * 60 * 60 * 1000

    const computeNextBirthdayUnlock = () => {
      const now = new Date()
      let year = now.getFullYear()
      const birthday = new Date(year, 1, 21, 0, 0, 0, 0)
      if (birthday.getTime() <= now.getTime()) year += 1
      return new Date(year, 1, 21, 0, 0, 0, 0).getTime()
    }

    const giftDate = new Date(config.giftUnlockDate).getTime()
    let birthdayDate = computeNextBirthdayUnlock()

    const interval = setInterval(() => {
      const now = Date.now()

      const giftDistance = giftDate - now
      if (giftDistance > 0) {
        setCountdown((prev) => ({
          ...prev,
          gift: {
            days: Math.floor(giftDistance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((giftDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((giftDistance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((giftDistance % (1000 * 60)) / 1000),
          },
        }))
      }

      birthdayDate = computeNextBirthdayUnlock()
      const birthdayDistance = birthdayDate - now
      if (birthdayDistance > 0) {
        setCountdown((prev) => ({
          ...prev,
          birthday: {
            days: Math.ceil(birthdayDistance / (1000 * 60 * 60 * 24)),
          },
        }))
      } else {
        setUnlockNextBirthdayLetter(true)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const fadeAudio = (audio, startVol, endVol, duration) => {
    const steps = 30
    let currentStep = 0
    const stepDuration = duration / steps

    const interval = setInterval(() => {
      currentStep += 1
      const progress = currentStep / steps
      const currentVol = startVol + (endVol - startVol) * progress
      audio.volume = Math.max(0, Math.min(1, currentVol))

      if (currentStep >= steps) {
        clearInterval(interval)
        audio.volume = endVol
      }
    }, stepDuration)
  }

  const handleMainPassword = (e) => {
    e.preventDefault()
    if (password === config.mainPassword) {
      setAuthenticated(true)
      setPassword('')
      setPasswordError('')
    } else {
      setPasswordError('Not quite.')
      setPassword('')
    }
  }

  const handleHiddenPassword = (e) => {
    e.preventDefault()
    if (hiddenPassword.toLowerCase() === config.hiddenPassword.toLowerCase()) {
      setShowHiddenGate(false)
      setShowHiddenPage(true)
      setHiddenPassword('')
      setHiddenPasswordError('')
    } else {
      setHiddenPasswordError('Not quite. Try again.')
      setHiddenPassword('')
    }
  }

  const selectGift = (index) => {
    setSelectedGift(index)
    setGiftMessage(`You selected: ${GIFTS[index].name}. I'll make sure it's perfect. 💕`)
    localStorage.setItem('selectedGift', index)
  }

  const submitGiftSelection = async () => {
    if (selectedGift === null) {
      alert('Please select a gift first')
      return
    }

    setEmailLoading(true)

    try {
      const subject = encodeURIComponent('Gift selection from Birthday Site')
      const bodyLines = [
        `Selected Gift: ${GIFTS[selectedGift].name}`,
        `Emoji: ${GIFTS[selectedGift].emoji}`,
        `Sender Email: ${giftResponseEmail || 'N/A'}`,
        `Date: ${new Date().toISOString()}`,
      ]
      const body = encodeURIComponent(bodyLines.join('\n'))

      window.location.href = `mailto:[EMAIL]?subject=${subject}&body=${body}`

      localStorage.setItem(
        'giftSelection',
        JSON.stringify({
          email: giftResponseEmail || 'N/A',
          selectedGift: GIFTS[selectedGift].name,
          date: new Date().toISOString(),
        }),
      )
      setEmailSent(true)
      setTimeout(() => setEmailSent(false), 5000)
    } catch (error) {
      console.error('Email submission error:', error)
      localStorage.setItem(
        'giftSelection',
        JSON.stringify({
          email: giftResponseEmail || 'N/A',
          selectedGift: GIFTS[selectedGift].name,
          date: new Date().toISOString(),
        }),
      )
      alert('Selection saved locally. Please update the contact email placeholder before sending.')
    } finally {
      setEmailLoading(false)
    }
  }

  const toggleBackgroundMusic = () => {
    if (bgMusicRef.current) {
      if (isBackgroundMusicPlaying) {
        fadeAudio(bgMusicRef.current, config.backgroundMusicVolume, 0, 500)
        setTimeout(() => {
          if (bgMusicRef.current) bgMusicRef.current.pause()
          setIsBackgroundMusicPlaying(false)
        }, 500)
      } else {
        bgMusicRef.current.currentTime = 0
        const playPromise = bgMusicRef.current.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsBackgroundMusicPlaying(true)
              fadeAudio(bgMusicRef.current, 0, config.backgroundMusicVolume, 500)
            })
            .catch((error) => {
              console.error('Error playing audio:', error)
              setIsBackgroundMusicPlaying(false)
            })
        } else {
          setIsBackgroundMusicPlaying(true)
          fadeAudio(bgMusicRef.current, 0, config.backgroundMusicVolume, 500)
        }
      }
    }
  }

  const playSpecialAudio = () => {
    if (!isSpecialAudioPlaying && bgMusicRef.current && specialAudioRef.current) {
      fadeAudio(bgMusicRef.current, config.backgroundMusicVolume, 0, 300)
      setTimeout(() => {
        if (bgMusicRef.current) bgMusicRef.current.pause()
        specialAudioRef.current.currentTime = 0
        const playPromise = specialAudioRef.current.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsSpecialAudioPlaying(true))
            .catch((error) => {
              console.error('Could not play special audio:', error)
              setIsSpecialAudioPlaying(false)
            })
        }
      }, 300)

      specialAudioRef.current.onended = () => {
        setIsSpecialAudioPlaying(false)
        if (bgMusicRef.current) {
          bgMusicRef.current.currentTime = 0
          bgMusicRef.current.play().catch(() => {})
          fadeAudio(bgMusicRef.current, 0, config.backgroundMusicVolume, 500)
          setIsBackgroundMusicPlaying(true)
        }
      }
    }
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!authenticated) {
    return (
      <div className="password-gate">
        <div className="gate-container">
          <form onSubmit={handleMainPassword}>
            <h1>For Aisha</h1>
            <p>A message from the heart</p>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            {passwordError && <p className="error">{passwordError}</p>}
            <button type="submit">Enter</button>
          </form>
        </div>
      </div>
    )
  }

  if (showHiddenPage) {
    return (
      <div className="hidden-page">
        <button
          className="back-btn"
          onClick={() => {
            setShowHiddenPage(false)
            scrollToSection('main')
          }}
        >
          ← Back
        </button>
        <div className="hidden-letter-content">
          <p><strong>For My Baby, Aisha.</strong></p>
          <p><br /></p>
          <p>There are moments when I find myself smiling for no reason, and then I realize it is because I was thinking of you.</p>
          <p><br /></p>
          <p>You are not just someone I love; you are someone I feel at peace with. You make my days softer, my thoughts kinder, and my heart fuller.</p>
          <p><br /></p>
          <p>I hope you always remember how deeply you are cherished, how beautifully you are seen, and how much love lives in the quiet spaces between us.</p>
          <p><br /></p>
          <p>Thank you for being my calm, my comfort, and my favorite place to land.</p>
          <p><br /></p>
          <p>With all my love,<br />💗</p>
        </div>
      </div>
    )
  }

  return (
    <div id="main" className="app">
      <FloatingHearts />

      <audio ref={bgMusicRef} loop />
      <audio ref={specialAudioRef} />

      <section id="landing" className="landing" style={{ backgroundImage: 'url(./images/WhatsApp Image 2026-08-25 at 5.53.47 AM.jpeg)' }}>
        <div className="landing-overlay">
          <h1 className="landing-title">Happy Birthday</h1>
          <p className="landing-subtitle">Aisha</p>
          <p className="landing-text">For every soft moment, every dream, and every future we are still building together</p>
          <button onClick={() => scrollToSection('gallery')} className="landing-btn">
            Enter ↓
          </button>
        </div>
      </section>

      <button className="audio-control" onClick={toggleBackgroundMusic}>
        <span>{isBackgroundMusicPlaying ? '⏸' : '▶'}</span>
      </button>

      <section id="gallery" className="gallery-section">
        <div className="section-title">Chapter 1: Things I Never Said But Always Felt</div>
        <div className="gallery-grid">
          {IMAGES.map((img, idx) => (
            <div key={idx} className="gallery-item gallery-placeholder" style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="placeholder-media">{img}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="why-love" className="why-love-section">
        <div className="section-title">Things I Never Said But Always Felt</div>
        <div className="love-paragraphs">
          {LOVE_PARAGRAPHS.map((para, idx) => (
            <p key={idx} className="love-paragraph" style={{ animationDelay: `${idx * 200}ms` }}>
              {para}
            </p>
          ))}
        </div>
      </section>

      <section className="chapter-section">
        <div className="section-title">Chapter 2: Things You Probably Didn’t Know</div>
        <div className="chapter-list">
          {THOUGHTS.map((thought, idx) => (
            <div key={idx} className="chapter-item" style={{ animationDelay: `${idx * 120}ms` }}>
              {thought}
            </div>
          ))}
        </div>
      </section>

      <section className="chapter-section letters-section">
        <div className="section-title">Chapter 3: Letters</div>
        <div className="letter-grid">
          {LETTERS.map((letter, idx) => (
            <button key={idx} className="letter-card" onClick={() => setActiveLetter(letter)}>
              <span>{letter.title}</span>
            </button>
          ))}
        </div>
      </section>

      {activeLetter && (
        <div className="letter-modal-overlay" onClick={() => setActiveLetter(null)}>
          <div className="letter-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setActiveLetter(null)}>✕</button>
            <h3>{activeLetter.title}</h3>
            <p>{activeLetter.message}</p>
          </div>
        </div>
      )}

      <section id="gift" className="gift-section">
        <div className="section-title">When you come back on [DATE]...</div>
        <p className="gift-intro-text">Choose what makes you smile, and I’ll make sure it’s perfect.</p>

        <div className="gift-cards">
          {GIFTS.map((gift, idx) => (
            <div
              key={idx}
              className={`gift-card ${selectedGift === idx ? 'selected' : ''}`}
              onClick={() => selectGift(idx)}
            >
              <span className="gift-emoji">{gift.emoji}</span>
              <p>{gift.name}</p>
            </div>
          ))}
        </div>
        {giftMessage && <p className="gift-message">{giftMessage}</p>}

        {selectedGift !== null && !emailSent && (
          <div className="gift-submission">
            <p className="submission-label">Let me know you chose this gift:</p>
            <div className="email-input-group">
              <input
                type="email"
                placeholder="Your email"
                value={giftResponseEmail}
                onChange={(e) => setGiftResponseEmail(e.target.value)}
                className="email-input"
              />
              <button onClick={submitGiftSelection} disabled={emailLoading} className="submit-btn">
                {emailLoading ? 'Sending...' : 'Send'}
              </button>
            </div>
            <p className="submission-note">Your response will be saved locally and can be sent later.</p>
          </div>
        )}

        {emailSent && (
          <div className="email-success">
            <p>✓ Perfect! I’ll be waiting for that day 💕</p>
          </div>
        )}

        <div className="countdown-timer">
          <div className="countdown-label">Until That Day</div>
          <div className="countdown">
            <div className="countdown-item">
              <span className="countdown-value">{String(countdown.gift.days).padStart(2, '0')}</span>
              <span className="countdown-label">Days</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{String(countdown.gift.hours).padStart(2, '0')}</span>
              <span className="countdown-label">Hours</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{String(countdown.gift.minutes).padStart(2, '0')}</span>
              <span className="countdown-label">Minutes</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{String(countdown.gift.seconds).padStart(2, '0')}</span>
              <span className="countdown-label">Seconds</span>
            </div>
          </div>
        </div>
      </section>

      <section className="chapter-section future-section">
        <div className="section-title">Chapter 4: The Future I Hope We Build</div>
        <div className="future-grid">
          {FUTURE_HOPE.map((future, idx) => (
            <div key={idx} className="future-card" style={{ animationDelay: `${idx * 150}ms` }}>
              {future}
            </div>
          ))}
        </div>
      </section>

      <section id="videos" className="video-gallery-section">
        <div className="section-title">[PHOTOS] & [VIDEOS]</div>
        <div className="video-gallery-grid">
          {VIDEOS.map((video, idx) => (
            <div key={idx} className="video-placeholder" style={{ animationDelay: `${idx * 100}ms` }}>
              {video}
            </div>
          ))}
        </div>
      </section>

      <section className="special-audio-section">
        <button onClick={playSpecialAudio} className="special-audio-btn">
          {isSpecialAudioPlaying ? '⏸ Stop' : '▶ Play something special'}
        </button>
      </section>

      <section className="hidden-link-section">
        <p onClick={() => setShowHiddenGate(true)} className="hidden-link">
          some things are not for display
        </p>
        {showHiddenGate && (
          <div className="hidden-gate-overlay">
            <div className="hidden-gate">
              <button className="close-btn" onClick={() => setShowHiddenGate(false)}>✕</button>
              <form onSubmit={handleHiddenPassword}>
                <h2>Secret</h2>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={hiddenPassword}
                  onChange={(e) => setHiddenPassword(e.target.value)}
                  autoFocus
                />
                {hiddenPasswordError && <p className="error">{hiddenPasswordError}</p>}
                <button type="submit">Unlock</button>
              </form>
            </div>
          </div>
        )}
      </section>

      <section id="birthday-letter" className="birthday-letter-section">
        <div className="section-title">For My Baby, Aisha</div>
        {!unlockNextBirthdayLetter ? (
          <div id="nextBirthdayContent" className="locked-content">
            <p className="lock-icon">🔒</p>
            <p className="lock-text">A letter awaits you</p>
            <p className="lock-countdown">{countdown.birthday.days} days until unlock — I’ll be here then, always.</p>
          </div>
        ) : (
          <div id="nextBirthdayLetter" className="birthday-letter">
            <p><strong>For My Baby, Aisha.</strong></p>
            <p><br /></p>
            <p><strong>Every new day with you is a quiet reminder that love can be both deep and gentle.</strong></p>
            <p><br /></p>
            <p>I want you to know that with each passing season, my gratitude for you grows. Thank you for being my home, my softness, and my peace.</p>
            <p><br /></p>
            <p>I love the life we are creating, the tenderness we carry, and the future we are still learning to trust together.</p>
          </div>
        )}
      </section>

      <section className="final-section">
        <div className="final-card">
          <p>“So…</p>
          <p>We’ve reached the end.</p>
          <p>Or maybe…</p>
          <p>This is simply the end of one chapter.</p>
          <p><br /></p>
          <p>Thank you for taking the time to read all of this.</p>
          <p>Thank you for being patient enough to scroll through every memory, every thought, and every letter.</p>
          <p><br /></p>
          <p>This website may have been built with code…</p>
          <p>But every word came from my heart.</p>
          <p><br /></p>
          <p>I know a website could never fully express what you mean to me.</p>
          <p>But I hope it reminded you of one thing.</p>
          <p><br /></p>
          <p>You are appreciated.</p>
          <p>You are respected.</p>
          <p>You are deeply loved.</p>
          <p><br /></p>
          <p>And I’m incredibly grateful that our paths crossed.</p>
          <p><br /></p>
          <p>I don’t know what every tomorrow will bring.</p>
          <p>But I know who I’d love to keep sharing them with.</p>
          <p><br /></p>
          <p>You.</p>
          <p><br /></p>
          <p>Happy Birthday, Wifey ❤️</p>
          <p><br /></p>
          <p>With all my love,</p>
          <p>— Ibrahim”</p>
        </div>
      </section>
    </div>
  )
}
