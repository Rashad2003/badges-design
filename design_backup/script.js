
document.addEventListener('DOMContentLoaded', () => {
    const triggerBtn = document.getElementById('trigger-modal-btn');
    const modal = document.getElementById('congrats-modal');
    const closeBtn = document.querySelector('.close-modal');

    triggerBtn.addEventListener('click', () => {
        openModal();
    });

    closeBtn.addEventListener('click', () => {
        closeModal();
    });

    // Close on backsplash click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    function openModal() {
        modal.classList.remove('hidden');
        // Force reflow
        void modal.offsetWidth; 
        modal.classList.add('active');
        
        // Trigger Confetti
        fireConfetti();
    }

    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }
    
    // Simple Confetti Implementation
    function fireConfetti() {
        const colors = ['#38bdf8', '#fbbf24', '#f472b6', '#4ade80'];
        const container = document.querySelector('.confetti-container');
        container.innerHTML = ''; // Clear old

        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            // Random properties
            const bg = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100 + '%';
            const animDuration = Math.random() * 1 + 1.5 + 's'; // 1.5 - 2.5s
            
            confetti.style.position = 'absolute';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.background = bg;
            confetti.style.left = left;
            confetti.style.top = '-10px';
            confetti.style.opacity = '0';
            
            // Inline animation for simplicity in this demo
            confetti.style.animation = `fall ${animDuration} linear forwards`;
            
            container.appendChild(confetti);
        }
    }

    // Inject styles for confetti
    const style = document.createElement('style');
    style.innerHTML = `
        .confetti-container { 
            position: absolute; top: 0; left: 0; width: 100%; height: 100%; 
            pointer-events: none; overflow: hidden; border-radius: 24px;
        }
        @keyframes fall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(400px) rotate(720deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});
