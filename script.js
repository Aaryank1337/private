document.addEventListener('DOMContentLoaded', () => {
    const envelopeContainer = document.getElementById('envelope-container');
    const envelope = document.querySelector('.envelope');
    const questionContainer = document.getElementById('question-container');
    const successContainer = document.getElementById('success-container');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');

    let yesBtnScale = 1;

    // 1. Envelope Interaction
    envelopeContainer.addEventListener('click', () => {
        envelope.classList.add('open');
        
        // Wait for animation to finish before showing the question
        setTimeout(() => {
            envelopeContainer.style.display = 'none';
            questionContainer.classList.remove('hidden');
            questionContainer.classList.add('visible');
        }, 1500); // Adjust based on CSS transition time
    });

    // 2. No Button Interaction (Moves away)
    const moveNoButton = () => {
        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;
        
        // Calculate max allowed positions (viewport size - button size - padding)
        const padding = 20;
        const maxX = window.innerWidth - btnWidth - padding;
        const maxY = window.innerHeight - btnHeight - padding;

        const randomX = Math.random() * (maxX - padding) + padding;
        const randomY = Math.random() * (maxY - padding) + padding;

        noBtn.style.position = 'fixed'; // Break out of flow completely
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;

        // Make Yes button grow
        yesBtnScale += 0.2;
        yesBtn.style.transform = `scale(${yesBtnScale})`;
    };

    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('click', moveNoButton); // In case they manage to click it on mobile

    // 3. Yes Button Interaction
    yesBtn.addEventListener('click', () => {
        questionContainer.style.display = 'none';
        successContainer.classList.remove('hidden');
        successContainer.classList.add('visible');

        // Trigger confetti or hearts
        createHearts();
    });

    function createHearts() {
        const heartsContainer = document.querySelector('.hearts');
        for (let i = 0; i < 50; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 3 + 2 + 's';
            heart.style.opacity = Math.random();
            heartsContainer.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }
    }
});
