 // Page Load Animation
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.classList.remove('loading');
                document.body.classList.add('loaded');
            }, 150);
        });

        // Add click ripple effect to buttons
        document.querySelectorAll('.link-button').forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
                ripple.style.pointerEvents = 'none';
                ripple.style.animation = 'ripple 0.8s ease-out';
                ripple.style.zIndex = '1';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 800);
            });
        });

        // Add CSS for ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(2.5);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Dynamic floating particles
        function createFloatingParticle() {
            const container = document.querySelector('.floating-elements');
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            
            const size = Math.random() * 25 + 12;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (Math.random() * 6 + 8) + 's';
            
            container.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 14000);
        }

        // Create new particles periodically
        setInterval(createFloatingParticle, 4000);

        // Add parallax effect to floating elements
        window.addEventListener('mousemove', (e) => {
            const particles = document.querySelectorAll('.floating-particle');
            const x = (e.clientX / window.innerWidth) - 0.5;
            const y = (e.clientY / window.innerHeight) - 0.5;
            
            particles.forEach((particle, index) => {
                const speed = (index + 1) * 0.3;
                const xPos = x * speed * 30;
                const yPos = y * speed * 30;
                
                particle.style.transform += ` translate(${xPos}px, ${yPos}px)`;
            });
        });

        // Add entrance animation trigger on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        document.querySelectorAll('.link-button').forEach(button => {
            observer.observe(button);
        });