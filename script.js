/* ========== CONFIGURATION (EDIT THESE) ========== */
const CONFIG = {
    mainPassword: 'Aisha',          // Main site password (case-sensitive)
    hiddenPassword: 'Aisha',        // Hidden page password (case-insensitive)
    giftUnlockDate: '2026-08-27',   // Gift unlock date (YYYY-MM-DD)
    nextBirthdayDate: '2027-02-21', // Next birthday date (YYYY-MM-DD)
    
    // Audio file paths - using MP4 directly for audio playback
    backgroundMusicPath: './audio/WhatsApp Video 2026-02-20 at 9.53.31 PM.mp4',
    specialAudioPath: './audio/WhatsApp Video 2026-02-20 at 9.53.31 PM.mp4',
    
    // Audio settings
    backgroundMusicVolume: 0.15,    // 0.0 to 1.0
    specialAudioVolume: 0.7,        // 0.0 to 1.0
    
    // Image captions for gallery
    imageCaptions: [
        '',
        '',
        '',
        '',
        '',
        '',
        ''
    ]
};

/* ========== STATE ========== */
let isBackgroundMusicPlaying = true;
let isSpecialAudioPlaying = false;
let selectedGift = null;

/* ========== INITIALIZATION ========== */
document.addEventListener('DOMContentLoaded', function() {
    // Load saved gift selection
    const savedGift = localStorage.getItem('selectedGift');
    if (savedGift !== null) {
        selectedGift = parseInt(savedGift);
        displayGiftSelection();
    }
    
    // Setup audio elements
    const bgMusic = document.getElementById('backgroundMusic');
    const specialAudio = document.getElementById('specialAudio');
    
    bgMusic.src = CONFIG.backgroundMusicPath;
    bgMusic.volume = CONFIG.backgroundMusicVolume;
    bgMusic.loop = true;
    bgMusic.muted = false;
    
    specialAudio.src = CONFIG.specialAudioPath;
    specialAudio.volume = CONFIG.specialAudioVolume;
    
    // Start background music - try autoplay immediately, fallback to click
    let audioStarted = false;
    function startAudio() {
        if (!audioStarted && bgMusic.src) {
            bgMusic.play().then(() => {
                isBackgroundMusicPlaying = true;
                audioStarted = true;
                document.getElementById('bgMusicIcon').textContent = '⏸';
            }).catch(err => {
                console.log('Audio play error:', err);
            });
        }
        if (audioStarted) {
            document.removeEventListener('click', startAudio);
        }
    }
    
    // Try autoplay on load
    bgMusic.play().then(() => {
        isBackgroundMusicPlaying = true;
        audioStarted = true;
        document.getElementById('bgMusicIcon').textContent = '⏸';
    }).catch(() => {
        // Fallback: wait for user interaction
        document.addEventListener('click', startAudio);
    });
    
    // Update countdowns (only if the related elements exist)
    updateCountdowns();
    setInterval(updateCountdowns, 1000);
    
    // Focus password input
    const passwordInput = document.getElementById('passwordInput');
    passwordInput.focus();
    
    // Allow Enter key for passwords
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') checkPassword();
    });
});

/* ========== PASSWORD GATE ========== */
function checkPassword() {
    const inputPassword = document.getElementById('passwordInput').value;
    const errorEl = document.getElementById('passwordError');
    
    if (inputPassword === CONFIG.mainPassword) {
        errorEl.textContent = '';
        revealSite();
    } else {
        errorEl.textContent = 'Not quite.';
        document.getElementById('passwordInput').value = '';
        document.getElementById('passwordInput').focus();
    }
}

function revealSite() {
    const gate = document.getElementById('passwordGate');
    const site = document.getElementById('mainSite');
    
    gate.classList.add('hidden');
    site.style.opacity = '0';
    site.classList.remove('hidden');
    
    setTimeout(() => {
        site.style.transition = 'opacity 0.6s ease-in-out';
        site.style.opacity = '1';
    }, 50);
    
    // Start background music
    const bgMusic = document.getElementById('backgroundMusic');
    if (bgMusic.src) {
        bgMusic.play().catch(err => {
            console.log('Audio autoplay prevented:', err);
        });
    }
}

/* ========== HIDDEN PAGE ========== */
function showHiddenGate() {
    const hiddenGate = document.getElementById('hiddenGate');
    const hiddenInput = document.getElementById('hiddenPasswordInput');
    
    hiddenGate.classList.remove('hidden');
    hiddenInput.focus();
    
    // Allow Enter key
    hiddenInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') checkHiddenPassword();
    });
}

function closeHiddenGate() {
    document.getElementById('hiddenGate').classList.add('hidden');
    document.getElementById('hiddenPasswordInput').value = '';
    document.getElementById('hiddenPasswordError').textContent = '';
}

function checkHiddenPassword() {
    const inputPassword = document.getElementById('hiddenPasswordInput').value.toLowerCase();
    const errorEl = document.getElementById('hiddenPasswordError');
    
    if (inputPassword === CONFIG.hiddenPassword.toLowerCase()) {
        errorEl.textContent = '';
        revealHiddenPage();
    } else {
        errorEl.textContent = 'Not quite. Try again.';
        document.getElementById('hiddenPasswordInput').value = '';
        document.getElementById('hiddenPasswordInput').focus();
    }
}

function revealHiddenPage() {
    document.getElementById('hiddenGate').classList.add('hidden');
    document.getElementById('hiddenPage').classList.remove('hidden');
}

function backFromHidden() {
    document.getElementById('hiddenPage').classList.add('hidden');
    document.getElementById('hiddenPasswordInput').value = '';
    document.getElementById('hiddenPasswordError').textContent = '';
}

/* ========== SMOOTH SCROLL ========== */
function smoothScroll(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

/* ========== GIFT SELECTION ========== */
function selectGift(index) {
    selectedGift = index;
    localStorage.setItem('selectedGift', index);
    displayGiftSelection();
}

function displayGiftSelection() {
    // Update card selection visual
    document.querySelectorAll('.gift-card').forEach((card, idx) => {
        if (idx === selectedGift) {
            card.classList.add('selected');
        } else {
            card.classList.remove('selected');
        }
    });
    
    // Show confirmation message
    const message = document.getElementById('giftMessage');
    message.textContent = 'I\'m looking forward to that day.';
}

/* ========== COUNTDOWN TIMERS ========== */
function updateCountdowns() {
    // Gift countdown (only update if countdown exists)
    if (document.getElementById('countdown')) {
        updateCountdownTo(CONFIG.giftUnlockDate, 'countdown');
    }

    // Next birthday countdown (guarded)
    updateNextBirthdayCountdown();
}

function updateCountdownTo(targetDate, elementId) {
    const target = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const distance = target - now;
    
    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const elDays = document.getElementById('days');
        const elHours = document.getElementById('hours');
        const elMinutes = document.getElementById('minutes');
        const elSeconds = document.getElementById('seconds');
        if (elDays && elHours && elMinutes && elSeconds) {
            elDays.textContent = String(days).padStart(2, '0');
            elHours.textContent = String(hours).padStart(2, '0');
            elMinutes.textContent = String(minutes).padStart(2, '0');
            elSeconds.textContent = String(seconds).padStart(2, '0');
        }
    }
}

function updateNextBirthdayCountdown() {
    const target = new Date(CONFIG.nextBirthdayDate).getTime();
    const now = new Date().getTime();
    const distance = target - now;

    const daysUntilUnlock = document.getElementById('daysUntilUnlock');

    if (!daysUntilUnlock) return; // nothing to update on this page

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        daysUntilUnlock.textContent = days;
    } else {
        // Letter is unlocked
        unlockNextBirthdayLetter();
    }
}

function unlockNextBirthdayLetter() {
    const lockedSection = document.getElementById('nextBirthdayContent');
    const letterContent = document.getElementById('nextBirthdayLetter');
    if (!letterContent) return;

    if (lockedSection) lockedSection.classList.add('hidden');
    letterContent.classList.remove('hidden');
    letterContent.innerHTML = `
        <p><strong>For Your Next Birthday.</strong></p>
        <p><br></p>
        <p><strong>A letter for you, written in advance, waiting for the day to arrive.</strong></p>
    `;
}

/* ========== AUDIO CONTROLS ========== */
function toggleBackgroundMusic() {
    const bgMusic = document.getElementById('backgroundMusic');
    const button = document.getElementById('bgMusicToggle');
    const icon = document.getElementById('bgMusicIcon');
    
    if (isBackgroundMusicPlaying) {
        fadeAudio(bgMusic, 1, 0, 500);
        setTimeout(() => bgMusic.pause(), 500);
        icon.textContent = '▶';
        isBackgroundMusicPlaying = false;
    } else {
        bgMusic.play();
        fadeAudio(bgMusic, 0, CONFIG.backgroundMusicVolume, 500);
        icon.textContent = '⏸';
        isBackgroundMusicPlaying = true;
    }
}

function playSpecialAudio() {
    const bgMusic = document.getElementById('backgroundMusic');
    const specialAudio = document.getElementById('specialAudio');
    
    if (isSpecialAudioPlaying) {
        // Stop special audio
        fadeAudio(specialAudio, CONFIG.specialAudioVolume, 0, 300);
        setTimeout(() => {
            specialAudio.pause();
            specialAudio.currentTime = 0;
            isSpecialAudioPlaying = false;
            // Resume background music
            bgMusic.play();
            fadeAudio(bgMusic, 0, CONFIG.backgroundMusicVolume, 500);
            isBackgroundMusicPlaying = true;
            document.getElementById('bgMusicIcon').textContent = '⏸';
        }, 300);
    } else {
        // Start special audio
        isSpecialAudioPlaying = true;
        
        // Fade out background music
        fadeAudio(bgMusic, CONFIG.backgroundMusicVolume, 0, 300);
        
        setTimeout(() => {
            bgMusic.pause();
            
            // Play special audio
            specialAudio.currentTime = 0;
            specialAudio.play().catch(err => {
                console.log('Could not play special audio:', err);
                isSpecialAudioPlaying = false;
            });
        }, 300);
        
        // When special audio ends, fade background back in
        specialAudio.onended = function() {
            isSpecialAudioPlaying = false;
            bgMusic.currentTime = 0;
            bgMusic.play();
            fadeAudio(bgMusic, 0, CONFIG.backgroundMusicVolume, 500);
            isBackgroundMusicPlaying = true;
            document.getElementById('bgMusicIcon').textContent = '⏸';
        };
    }
}

/* ========== AUDIO FADE UTILITY ========== */
function fadeAudio(audio, startVolume, endVolume, duration) {
    const steps = 30;
    const stepDuration = duration / steps;
    let currentStep = 0;
    
    const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const currentVolume = startVolume + (endVolume - startVolume) * progress;
        audio.volume = Math.max(0, Math.min(1, currentVolume));
        
        if (currentStep >= steps) {
            clearInterval(interval);
            audio.volume = endVolume;
        }
    }, stepDuration);
}

/* ========== EVENT LISTENERS ========== */
document.getElementById('bgMusicToggle').addEventListener('click', toggleBackgroundMusic);

/* ========== LIGHTBOX FUNCTIONS ========== */
function openLightbox(src, caption) {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    if (!lb || !img) return;
    img.src = src;
    img.alt = caption || '';
    lb.classList.add('open');
}

function closeLightbox() {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    if (!lb || !img) return;
    lb.classList.remove('open');
    setTimeout(() => { img.src = ''; img.alt = ''; }, 300);
}

/* Envelope interaction: open/close sequences */
function openEnvelope(e, id){
    if(e) e.stopPropagation();
    const env = document.getElementById(id);
    if(!env) return;
    // add open class to trigger CSS transitions
    env.classList.add('open');
    // ensure only one envelope open at a time
    document.querySelectorAll('.envelope.open').forEach(el=>{
        if(el.id !== id) el.classList.remove('open');
    });
}

function closeEnvelope(e, id){
    if(e) { e.stopPropagation(); e.preventDefault(); }
    const env = document.getElementById(id);
    if(!env) return;
    env.classList.remove('open');
}

// Close envelopes when clicking outside
document.addEventListener('click', function(ev){
    if(!ev.target.closest('.envelope')){
        document.querySelectorAll('.envelope.open').forEach(el=> el.classList.remove('open'));
    }
}, { passive: true });

// Keyboard accessibility: Escape closes any open envelope (no keyboard-open)
document.addEventListener('keydown', function(ev){
    if (ev.key === 'Escape'){
        document.querySelectorAll('.envelope.open').forEach(el => el.classList.remove('open'));
    }
});
