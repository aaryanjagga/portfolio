// portfolio.js
        const menuToggle = document.getElementById('menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuIcon = document.getElementById('menu-icon');
        const mobileLinks = document.querySelectorAll('.mobile-link');
        const mainHeader = document.getElementById('main-header');

        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            const isActive = mobileMenu.classList.contains('active');
            if (isActive) {
                menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
                document.body.style.overflow = 'hidden';
            } else {
                menuIcon.setAttribute('d', 'M4 6h16M4 12h16m-7 6h7');
                document.body.style.overflow = '';
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                menuIcon.setAttribute('d', 'M4 6h16M4 12h16m-7 6h7');
                document.body.style.overflow = '';
            });
        });

        // Optimized Typing Effect
        const words = ["Builder", "Learner", "Developer"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const target = document.getElementById("typing-text");

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                target.innerText = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                target.innerText = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }
            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(type, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, isDeleting ? 40 : 100);
            }
        }

        // Optimized Intersection Observer for smoother reveals
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Optional: Unobserve after activation to save resources
                    // observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
        
        window.onload = () => {
            type();
            // Trigger an initial check for elements in viewport
            document.querySelectorAll('.reveal').forEach(el => {
                if(el.getBoundingClientRect().top < window.innerHeight) el.classList.add('active');
            });
        };

        // Sticky Header Adjustment
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                mainHeader.classList.add('scrolled');
                mainHeader.classList.remove('py-6');
            } else {
                mainHeader.classList.remove('scrolled');
                mainHeader.classList.add('py-6');
            }
        });
