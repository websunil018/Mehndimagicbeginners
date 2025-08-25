 // Page Load Animation
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.classList.remove('loading');
                document.body.classList.add('loaded');
            }, 150);
        });

        // Enhanced link opening function for all platforms
        function openLink(platform) {
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            const isInstagram = window.location.href.includes('instagram') ||
                document.referrer.includes('instagram');

            const links = {
                youtube: {
                    app: 'vnd.youtube://channel/UCMehndimagicbeginners',
                    web: 'https://www.youtube.com/@Mehndimagicbeginners',
                    intent: 'intent://www.youtube.com/@Mehndimagicbeginners#Intent;scheme=https;package=com.google.android.youtube;end'
                },
                telegram: {
                    app: 'tg://resolve?domain=Mehndimagicbeginners',
                    web: 'https://t.me/Mehndimagicbeginners',
                    intent: 'intent://resolve?domain=Mehndimagicbeginners#Intent;scheme=tg;package=org.telegram.messenger;end'
                },
                instagram: {
                    app: 'instagram://user?username=mehndi_art_beginners',
                    web: 'https://www.instagram.com/mehndi_art_beginners',
                    intent: 'intent://instagram.com/mehndi_art_beginners#Intent;scheme=https;package=com.instagram.android;end'
                },
                facebook: {
                    app: 'fb://profile/61573210763010',
                    web: 'https://www.facebook.com/profile.php?id=61573210763010',
                    intent: 'intent://www.facebook.com/profile.php?id=61573210763010#Intent;scheme=https;package=com.facebook.katana;end'
                }
            };

            const link = links[platform];

            // Force external browser opening for Instagram in-app browser
            if (isInstagram) {
                // Try to break out of Instagram's in-app browser
                try {
                    if (typeof window !== 'undefined' && window.top !== window) {
                        window.top.location.href = link.web;
                        return;
                    }
                } catch (e) {
                    // Fallback if above fails
                }

                // Create a temporary link with target="_blank" and click it
                const tempLink = document.createElement('a');
                tempLink.href = link.web;
                tempLink.target = '_blank';
                tempLink.rel = 'noopener noreferrer';
                document.body.appendChild(tempLink);
                tempLink.click();
                document.body.removeChild(tempLink);
                return;
            }

            if (isMobile) {
                const isAndroid = /Android/i.test(navigator.userAgent);
                const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

                if (isAndroid && link.intent) {
                    // Android Intent fallback
                    try {
                        window.location.href = link.intent;
                        // Fallback to web if app not installed
                        setTimeout(() => {
                            window.location.href = link.web;
                        }, 1000);
                    } catch (e) {
                        window.location.href = link.web;
                    }
                } else if (isIOS) {
                    // iOS deep link
                    try {
                        window.location.href = link.app;
                        // Fallback to web if app not installed
                        setTimeout(() => {
                            window.location.href = link.web;
                        }, 1000);
                    } catch (e) {
                        window.location.href = link.web;
                    }
                } else {
                    // Generic mobile fallback
                    window.location.href = link.web;
                }
            } else {
                // Desktop - open in new tab
                window.open(link.web, '_blank', 'noopener,noreferrer');
            }
        }

        // Add click ripple effect to buttons
        document.querySelectorAll('.link-button').forEach(button => {
            button.addEventListener('click', function (e) {
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

        // Dynamic floating particles
        function createFloatingParticle() {
            const container = document.querySelector('.floating-elements');
            if (!container) return;

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
                if (particle.parentNode) {
                    particle.remove();
                }
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
