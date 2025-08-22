// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeInteractiveElements();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active nav link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('.section, .hero');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll effects
function initializeScrollEffects() {
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 245, 255, 0.1)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const floatingCubes = document.querySelectorAll('.floating-cube');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        floatingCubes.forEach((cube, index) => {
            const speed = 0.2 + (index * 0.1);
            cube.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate cards with stagger effect
                const cards = entry.target.querySelectorAll('.blog-card, .member-card, .project-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Initialize card animations
    document.querySelectorAll('.blog-card, .member-card, .project-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });
}

// Interactive animations
function initializeAnimations() {
    // Floating animation for cubes
    const floatingCubes = document.querySelectorAll('.floating-cube');
    
    floatingCubes.forEach((cube, index) => {
        // Random animation delays and durations
        const delay = Math.random() * 2;
        const duration = 4 + Math.random() * 2;
        
        cube.style.animationDelay = `${delay}s`;
        cube.style.animationDuration = `${duration}s`;
        
        // Add hover effect
        cube.addEventListener('mouseenter', () => {
            cube.style.transform = 'scale(1.2) rotate(45deg)';
            cube.style.boxShadow = '0 20px 40px rgba(0, 245, 255, 0.6)';
        });
        
        cube.addEventListener('mouseleave', () => {
            cube.style.transform = 'scale(1) rotate(0deg)';
            cube.style.boxShadow = '0 8px 32px rgba(0, 245, 255, 0.3)';
        });
    });

    // Text typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 150);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.textContent);
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 30);
    };

    // Observe stats for counter animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Interactive elements
function initializeInteractiveElements() {
    // Add event listeners to project buttons
    const numeroMagicoBtn = document.querySelector('a[href="numero-magico.html"]');
    if (numeroMagicoBtn) {
        numeroMagicoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Placeholder URL - you can change this to your actual project URL
            showLoadingAndOpen('https://ejemplo-numero-magico.com', this);
        });
    }
    
    const calculadoraBtn = document.querySelector('a[href="calculadora.html"]');
    if (calculadoraBtn) {
        calculadoraBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Placeholder URL - you can change this to your actual project URL
            showLoadingAndOpen('https://ejemplo-calculadora.com', this);
        });
    }
    
    // Portfolio buttons - add specific URLs for each member
    const genfiBencosmeBtn = document.querySelector('a[href="genfi-bencosme.html"]');
    if (genfiBencosmeBtn) {
        genfiBencosmeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Placeholder URL - you can change this to Genfi's actual portfolio URL
            showLoadingAndOpen('https://portfolio-genfi-bencosme.com', this);
        });
    }
    
    const christianRollinBtn = document.querySelector('a[href="christian-rollin.html"]');
    if (christianRollinBtn) {
        christianRollinBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Placeholder URL - you can change this to Christian's actual portfolio URL
            showLoadingAndOpen('https://portfolio-christian-rollin.com', this);
        });
    }
    
    const henyaNunezBtn = document.querySelector('a[href="henya-nunez.html"]');
    if (henyaNunezBtn) {
        henyaNunezBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Placeholder URL - you can change this to Henya's actual portfolio URL
            showLoadingAndOpen('https://portfolio-henya-nunez.com', this);
        });
    }
    
    const reynaGarridoBtn = document.querySelector('a[href="reyna-garrido.html"]');
    if (reynaGarridoBtn) {
        reynaGarridoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Placeholder URL - you can change this to Reyna's actual portfolio URL
            showLoadingAndOpen('https://portfolio-reyna-garrido.com', this);
        });
    }
    
    const robertAvilaBtn = document.querySelector('a[href="robert-avila.html"]');
    if (robertAvilaBtn) {
        robertAvilaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Placeholder URL - you can change this to Robert's actual portfolio URL
            showLoadingAndOpen('https://portfolio-robert-avila.com', this);
        });
    }
    
    const josiasMartinezBtn = document.querySelector('a[href="josias-martinez.html"]');
    if (josiasMartinezBtn) {
        josiasMartinezBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Placeholder URL - you can change this to Josias's actual portfolio URL
            showLoadingAndOpen('https://portfolio-josias-martinez.com', this);
        });
    }
    
    // Report buttons - add specific URLs for each report
    const sistemasInfoBtn = document.querySelector('a[href="sistemas-informacion.html"]');
    if (sistemasInfoBtn) {
        sistemasInfoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Placeholder URL - you can change this to your actual report URL
            showLoadingAndOpen('https://informe-sistemas-informacion.com', this);
        });
    }
    
    const wwwRevolucionBtn = document.querySelector('a[href="www-revolucion.html"]');
    if (wwwRevolucionBtn) {
        wwwRevolucionBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Placeholder URL - you can change this to your actual report URL
            showLoadingAndOpen('https://informe-www-revolucion.com', this);
        });
    }
    
    const transicionInternetBtn = document.querySelector('a[href="transicion-internet.html"]');
    if (transicionInternetBtn) {
        transicionInternetBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Placeholder URL - you can change this to your actual report URL
            showLoadingAndOpen('https://informe-transicion-internet.com', this);
        });
    }
    
    const webEvolutionBtn = document.querySelector('a[href="web-evolution.html"]');
    if (webEvolutionBtn) {
        webEvolutionBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Placeholder URL - you can change this to your actual report URL
            showLoadingAndOpen('https://informe-web-evolution.com', this);
        });
    }

    // Button click effects
    const buttons = document.querySelectorAll('.btn-holographic, .btn-metallic');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Hover sound effect (visual feedback)
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Card tilt effect
    const cards = document.querySelectorAll('.blog-card, .member-card, .project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Smooth reveal animation for acknowledgment section
    const acknowledgment = document.querySelector('.acknowledgment');
    if (acknowledgment) {
        const acknowledgmentObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });
        
        acknowledgment.style.opacity = '0';
        acknowledgment.style.transform = 'translateY(30px)';
        acknowledgment.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
        
        acknowledgmentObserver.observe(acknowledgment);
    }
}

// Loading animation and page opening functionality
function showLoadingAndOpen(url, buttonElement) {
    // Add loading class to button
    buttonElement.classList.add('loading');
    buttonElement.disabled = true;
    
    // Show global loading overlay
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'flex';
    }
    
    // Simulate loading time (2 seconds) then open page
    setTimeout(() => {
        // Remove loading states
        buttonElement.classList.remove('loading');
        buttonElement.disabled = false;
        if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
        }
        
        // Open the page in a new tab
        window.open(url, '_blank');
    }, 2000);
}

// Button click handlers (placeholder functions)
function openBlog(blogId) {
    // Show loading animation
    showNotification(`Cargando blog: ${getBlogTitle(blogId)}...`, 'info');
    
    // Simulate loading delay
    setTimeout(() => {
        showNotification('Blog en desarrollo. Próximamente disponible.', 'warning');
    }, 1500);
}

function openPortfolio(memberId) {
    const memberName = getMemberName(memberId);
    showNotification(`Cargando portafolio de ${memberName}...`, 'info');
    
    setTimeout(() => {
        showNotification('Portafolio en desarrollo. Próximamente disponible.', 'warning');
    }, 1500);
}

function openProject(projectId) {
    const projectName = getProjectName(projectId);
    showNotification(`Iniciando ${projectName}...`, 'info');
    
    setTimeout(() => {
        showNotification('Proyecto en desarrollo. Próximamente disponible.', 'warning');
    }, 1500);
}

// Helper functions
function getBlogTitle(blogId) {
    const titles = {
        'sistemas-informacion': 'Los Primeros Sistemas de Información en Internet',
        'www-revolucion': 'La Revolución de la World Wide Web',
        'transicion-internet': 'Transición y Transformación de Internet',
        'web-evolution': 'Internet Hoy: De la Web 1.0 a la Web 3.0'
    };
    return titles[blogId] || 'Blog';
}

function getMemberName(memberId) {
    const names = {
        'genfi-bencosme': 'Genfi Bencosme',
        'christian-rollin': 'Christian Rollin',
        'henya-nunez': 'Henya Nuñez',
        'reyna-garrido': 'Reyna Garrido',
        'robert-avila': 'Robert Avila',
        'josias-martinez': 'Josias Martinez'
    };
    return names[memberId] || 'Miembro';
}

function getProjectName(projectId) {
    const names = {
        'numero-magico': 'Número Mágico',
        'calculadora': 'Calculadora Avanzada'
    };
    return names[projectId] || 'Proyecto';
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--glass);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        padding: 1rem 1.5rem;
        color: var(--text-primary);
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 8px 32px rgba(0, 245, 255, 0.2);
        max-width: 350px;
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        'info': 'info-circle',
        'warning': 'exclamation-triangle',
        'success': 'check-circle',
        'error': 'times-circle'
    };
    return icons[type] || 'info-circle';
}

// CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-link.active {
        color: var(--primary-color) !important;
        background: var(--glass) !important;
        box-shadow: 0 4px 15px rgba(0, 245, 255, 0.2) !important;
    }
`;
document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});