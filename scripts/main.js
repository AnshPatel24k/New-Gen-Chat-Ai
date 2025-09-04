// Fuki AI - Main JavaScript File
// Enhanced with modern interactions, parallax effects, and smooth animations

class FukiAI {
    constructor() {
        this.init();
    }

    init() {
        this.initializeNavigation();
        this.initializeHeroEffects();
        this.initializeParallax();
        this.initializeGallery();
        this.initializePricing();
        this.initializeFAQ();
        this.initializeTestimonials();
        this.initializeLightbox();
        this.initializeParticles();
        this.initializeSmoothScroll();
        this.initializeIntersectionObserver();
        this.generateMockGalleryData();
    }

    // Navigation
    initializeNavigation() {
        const navbar = document.getElementById('navbar');
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');

        // Mobile menu toggle
        navToggle?.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Navbar background on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Close mobile menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Hero Effects
    initializeHeroEffects() {
        const heroPrompt = document.getElementById('heroPrompt');
        const heroGenerate = document.getElementById('heroGenerate');
        const samplePrompts = document.querySelectorAll('.sample-prompt');

        // Sample prompt clicks
        samplePrompts.forEach(prompt => {
            prompt.addEventListener('click', () => {
                const promptText = prompt.getAttribute('data-prompt');
                if (heroPrompt) {
                    heroPrompt.value = promptText;
                    heroPrompt.focus();
                    this.animatePromptInput();
                }
            });
        });

        // Generate button functionality
        heroGenerate?.addEventListener('click', () => {
            this.handleGenerate(heroPrompt?.value || '');
        });

        // Enter key on prompt input
        heroPrompt?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleGenerate(heroPrompt.value);
            }
        });
        
        // Playground functionality
        this.initializePlayground();
    }

    // Parallax Effects
    initializeParallax() {
        const hero = document.querySelector('.hero');
        const gradientBg = document.getElementById('gradientBg');
        const blobs = document.querySelectorAll('.blob');

        if (!hero) return;

        // Mouse move parallax
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPos = (clientX / innerWidth) - 0.5;
            const yPos = (clientY / innerHeight) - 0.5;

            // Apply subtle tilt to hero content
            const heroContent = document.getElementById('heroContent');
            if (heroContent) {
                heroContent.style.transform = `
                    rotateY(${xPos * 5}deg) 
                    rotateX(${-yPos * 5}deg) 
                    translateZ(0)
                `;
            }

            // Move blobs
            blobs.forEach((blob, index) => {
                const multiplier = (index + 1) * 0.5;
                blob.style.transform = `
                    translate(${xPos * 20 * multiplier}px, ${yPos * 20 * multiplier}px)
                `;
            });
        });

        // Reset on mouse leave
        hero.addEventListener('mouseleave', () => {
            const heroContent = document.getElementById('heroContent');
            if (heroContent) {
                heroContent.style.transform = '';
            }
            blobs.forEach(blob => {
                blob.style.transform = '';
            });
        });

        // Scroll parallax for background elements
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (gradientBg) {
                gradientBg.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Playground Functionality
    initializePlayground() {
        const playgroundPrompt = document.getElementById('playgroundPrompt');
        const playgroundGenerate = document.getElementById('playgroundGenerate');
        const playgroundDemo = document.getElementById('playgroundDemo');
        const presetChips = document.querySelectorAll('.preset-chip');
        
        // Preset prompt chips
        presetChips.forEach(chip => {
            chip.addEventListener('click', () => {
                const promptText = chip.getAttribute('data-prompt');
                if (playgroundPrompt) {
                    playgroundPrompt.value = promptText;
                    playgroundPrompt.focus();
                }
            });
        });
        
        // Generate button
        playgroundGenerate?.addEventListener('click', () => {
            this.handleGenerate(playgroundPrompt?.value || '');
        });
        
        // Demo button
        playgroundDemo?.addEventListener('click', () => {
            this.showDemo();
        });
        
        // Enter key support
        playgroundPrompt?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleGenerate(playgroundPrompt.value);
            }
        });
    }

    showDemo() {
        const demoPrompts = [
            'A futuristic neon sign saying "HELLO WORLD" in cyberpunk style',
            'Minimalist logo design for a coffee shop called "Brew & Co"',
            'Vintage poster with the text "ROCK FESTIVAL 2024" in bold letters'
        ];
        
        const randomPrompt = demoPrompts[Math.floor(Math.random() * demoPrompts.length)];
        
        // Fill the playground prompt
        const playgroundPrompt = document.getElementById('playgroundPrompt');
        if (playgroundPrompt) {
            playgroundPrompt.value = randomPrompt;
            playgroundPrompt.focus();
        }
        
        // Automatically generate
        setTimeout(() => {
            this.handleGenerate(randomPrompt);
        }, 500);
    }

    // Gallery Management
    initializeGallery() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const loadMoreBtn = document.getElementById('loadMore');

        // Filter functionality
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');

                const filter = btn.getAttribute('data-filter');
                this.filterGallery(filter);
            });
        });

        // Load more functionality
        loadMoreBtn?.addEventListener('click', () => {
            this.loadMoreGalleryItems();
        });
    }

    // Pricing Toggle
    initializePricing() {
        const billingToggle = document.getElementById('billingToggle');
        const monthlyPrices = document.querySelectorAll('.monthly-price');
        const yearlyPrices = document.querySelectorAll('.yearly-price');

        billingToggle?.addEventListener('click', () => {
            const isYearly = billingToggle.classList.toggle('active');
            billingToggle.setAttribute('aria-checked', isYearly);

            monthlyPrices.forEach(price => {
                price.style.display = isYearly ? 'none' : 'inline';
            });

            yearlyPrices.forEach(price => {
                price.style.display = isYearly ? 'inline' : 'none';
            });
        });

        // Plan CTA buttons
        document.querySelectorAll('.plan-cta').forEach(btn => {
            btn.addEventListener('click', () => {
                const planName = btn.closest('.pricing-card').querySelector('.plan-name').textContent;
                this.handlePlanSelection(planName);
            });
        });
    }

    // FAQ Accordion
    initializeFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question?.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                    }
                });

                // Toggle current item
                item.classList.toggle('active');
                question.setAttribute('aria-expanded', !isActive);
            });
        });
    }

    // Testimonials Slider
    initializeTestimonials() {
        const slides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.nav-dot');
        let currentSlide = 0;

        // Auto-advance testimonials
        setInterval(() => {
            this.showTestimonial((currentSlide + 1) % slides.length);
        }, 5000);

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.showTestimonial(index);
            });
        });

        // Show testimonial function
        this.showTestimonial = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            if (slides[index]) slides[index].classList.add('active');
            if (dots[index]) dots[index].classList.add('active');
            
            currentSlide = index;
        };
    }

    // Lightbox Modal
    initializeLightbox() {
        const lightboxOverlay = document.getElementById('lightboxOverlay');
        const lightboxClose = document.getElementById('lightboxClose');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxPrompt = document.getElementById('lightboxPrompt');
        const downloadBtn = document.getElementById('downloadBtn');
        const shareBtn = document.getElementById('shareBtn');

        // Close lightbox
        const closeLightbox = () => {
            lightboxOverlay?.classList.remove('active');
            document.body.style.overflow = '';
        };

        lightboxClose?.addEventListener('click', closeLightbox);
        lightboxOverlay?.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay) closeLightbox();
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxOverlay?.classList.contains('active')) {
                closeLightbox();
            }
        });

        // Download functionality
        downloadBtn?.addEventListener('click', async () => {
            const imageUrl = lightboxImage?.src;
            const prompt = lightboxPrompt?.textContent;
            if (imageUrl && prompt) {
                this.downloadImage(imageUrl, prompt);
            }
        });

        // Share functionality
        shareBtn?.addEventListener('click', async () => {
            const imageUrl = lightboxImage?.src;
            const prompt = lightboxPrompt?.textContent;
            
            if (navigator.share && imageUrl) {
                try {
                    await navigator.share({
                        title: 'Check out this AI-generated image from Fuki AI',
                        text: `Prompt: ${prompt}`,
                        url: window.location.href
                    });
                } catch (err) {
                    console.log('Error sharing:', err);
                    this.copyToClipboard(window.location.href);
                }
            } else {
                this.copyToClipboard(window.location.href);
            }
        });

        // Open lightbox function
        this.openLightbox = (imageSrc, prompt) => {
            if (lightboxImage && lightboxPrompt) {
                lightboxImage.src = imageSrc;
                lightboxPrompt.textContent = prompt;
                lightboxOverlay?.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Update download button for this specific image
                const downloadBtn = document.getElementById('downloadBtn');
                if (downloadBtn) {
                    downloadBtn.onclick = () => this.downloadImage(imageSrc, prompt);
                }
            }
        };
    }

    // Particle System
    initializeParticles() {
        const particlesContainer = document.getElementById('particlesContainer');
        if (!particlesContainer) return;

        const createParticle = () => {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(0, 212, 255, 0.6);
                border-radius: 50%;
                pointer-events: none;
                animation: particle ${Math.random() * 3 + 2}s linear infinite;
            `;

            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = '100%';
            
            particlesContainer.appendChild(particle);

            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
            }, 5000);
        };

        // Create particles periodically
        setInterval(createParticle, 200);

        // Add particle CSS animation
        if (!document.getElementById('particle-styles')) {
            const style = document.createElement('style');
            style.id = 'particle-styles';
            style.textContent = `
                @keyframes particle {
                    0% {
                        transform: translateY(0) translateX(0);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Smooth Scrolling
    initializeSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Intersection Observer for animations
    initializeIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.feature-card, .pricing-card, .gallery-item').forEach(el => {
            observer.observe(el);
        });
    }

    // Utility Functions
    handleGenerate(prompt) {
        if (!prompt.trim()) {
            this.showNotification('Please enter a prompt to generate an image.', 'warning');
            return;
        }

        console.log(`Generating image with prompt: "${prompt}"`);
        
        // Show realistic generation process
        const btn = document.getElementById('heroGenerate') || document.getElementById('playgroundGenerate');
        if (btn) {
            this.showGenerationProcess(btn, prompt);
        }
    }

    showGenerationProcess(btn, prompt) {
        const originalText = btn.textContent;
        btn.disabled = true;
        
        // Stage 1: Analyzing prompt
        btn.textContent = '🧠 Analyzing prompt...';
        
        setTimeout(() => {
            // Stage 2: Initializing AI model
            btn.textContent = '⚙️ Initializing AI model...';
            
            setTimeout(() => {
                // Stage 3: Generating image
                btn.textContent = '🎨 Generating image...';
                
                setTimeout(() => {
                    // Stage 4: Finalizing
                    btn.textContent = '✨ Finalizing...';
                    
                    setTimeout(() => {
                        // Stage 5: Complete
                        btn.textContent = originalText;
                        btn.disabled = false;
                        this.generateAndShowImage(prompt);
                    }, 800);
                }, 1500);
            }, 1000);
        }, 800);
    }

    generateAndShowImage(prompt) {
        // Use a more realistic AI image generation approach
        // We'll use Pollinations.ai which generates images based on actual prompts
        const cleanPrompt = encodeURIComponent(prompt);
        const seed = Math.floor(Math.random() * 1000000);
        const width = 800;
        const height = 800;
        
        // Use Pollinations.ai API for actual AI-generated images based on prompts
        const imageUrl = `https://image.pollinations.ai/prompt/${cleanPrompt}?width=${width}&height=${height}&seed=${seed}&model=flux`;
        
        // Create and show the generated image
        this.showGeneratedImage(imageUrl, prompt);
        
        // Add to gallery
        this.addToGallery(imageUrl, prompt);
        
        // Show success notification
        this.showNotification('🎨 AI image generated successfully! Added to gallery.', 'success');
    }

    showGeneratedImage(imageUrl, prompt) {
        // Create a modal to show the generated image
        const modal = document.createElement('div');
        modal.className = 'generated-image-modal';
        modal.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.95);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
            animation: fadeIn 0.3s ease-out;
        `;
        
        modal.innerHTML = `
            <div class="generated-content" style="
                background: var(--glass-bg);
                border: 1px solid var(--glass-border);
                border-radius: var(--radius-2xl);
                padding: var(--spacing-xl);
                max-width: 90vw;
                max-height: 90vh;
                backdrop-filter: blur(20px);
                position: relative;
                text-align: center;
            ">
                <button class="close-generated" style="
                    position: absolute;
                    top: var(--spacing-md);
                    right: var(--spacing-md);
                    width: 40px;
                    height: 40px;
                    background: var(--glass-bg);
                    border: 1px solid var(--glass-border);
                    border-radius: 50%;
                    color: var(--text-primary);
                    font-size: 1.5rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all var(--transition-normal);
                ">&times;</button>
                
                <h3 style="color: var(--text-primary); margin-bottom: var(--spacing-lg); font-size: 1.5rem;">
                    🎨 AI Image Generated Successfully!
                </h3>
                
                <div class="image-container" style="position: relative; margin-bottom: var(--spacing-lg);">
                    <div class="image-wrapper" style="
                        position: relative;
                        overflow: hidden;
                        border-radius: var(--radius-lg);
                        box-shadow: var(--shadow-glow);
                        max-width: 100%;
                        max-height: 60vh;
                        margin: 0 auto;
                    ">
                        <img class="generated-img" style="
                            width: 100%;
                            height: auto;
                            display: block;
                            opacity: 0;
                            transition: opacity 0.5s ease-out;
                            transform: translateY(-40px);
                            object-fit: cover;
                        ">
                    </div>
                    <div class="loading-indicator" style="
                        position: absolute;
                        inset: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: var(--glass-bg);
                        border-radius: var(--radius-lg);
                        color: var(--cyan);
                        font-size: 1.2rem;
                        min-height: 300px;
                    ">
                        <div style="text-align: center;">
                            <div class="spinner" style="
                                width: 40px;
                                height: 40px;
                                border: 3px solid rgba(0, 212, 255, 0.2);
                                border-top: 3px solid var(--cyan);
                                border-radius: 50%;
                                animation: spin 1s linear infinite;
                                margin: 0 auto 1rem;
                            "></div>
                            <p>Loading your AI masterpiece...</p>
                        </div>
                    </div>
                </div>
                
                <p class="prompt-display" style="color: var(--text-secondary); margin-bottom: var(--spacing-lg); font-style: italic; font-size: 1.1rem;">"${prompt}"</p>
                
                <div style="display: flex; gap: var(--spacing-md); justify-content: center; flex-wrap: wrap;">
                    <button class="btn btn-primary download-generated">💾 Download</button>
                    <button class="btn btn-secondary share-generated">🔗 Share</button>
                    <button class="btn btn-secondary view-in-gallery">🖼️ View in Gallery</button>
                </div>
            </div>
        `;
        
        // Add spinner animation CSS if not exists
        if (!document.getElementById('spinner-styles')) {
            const spinnerStyle = document.createElement('style');
            spinnerStyle.id = 'spinner-styles';
            spinnerStyle.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(spinnerStyle);
        }
        
        // Load the image
        const imgElement = modal.querySelector('.generated-img');
        const loadingIndicator = modal.querySelector('.loading-indicator');
        
        imgElement.onload = () => {
            loadingIndicator.style.display = 'none';
            imgElement.style.opacity = '1';
        };
        
        imgElement.onerror = () => {
            loadingIndicator.innerHTML = `
                <div style="text-align: center; color: var(--pink);">
                    <p>⚠️ Image generation failed</p>
                    <p style="font-size: 0.9rem; margin-top: 0.5rem;">Falling back to placeholder...</p>
                </div>
            `;
            // Fallback to a themed placeholder
            imgElement.src = `https://picsum.photos/800/800?random=${Date.now()}`;
        };
        
        imgElement.src = imageUrl;
        
        // Add event listeners
        const closeBtn = modal.querySelector('.close-generated');
        const downloadBtn = modal.querySelector('.download-generated');
        const shareBtn = modal.querySelector('.share-generated');
        const viewGalleryBtn = modal.querySelector('.view-in-gallery');
        
        closeBtn.addEventListener('click', () => {
            modal.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => modal.remove(), 300);
        });
        
        downloadBtn.addEventListener('click', () => {
            this.downloadImage(imageUrl, prompt);
        });
        
        shareBtn.addEventListener('click', () => {
            this.shareImage(imageUrl, prompt);
        });
        
        viewGalleryBtn.addEventListener('click', () => {
            modal.remove();
            document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
        });
        
        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeBtn.click();
            }
        });
        
        document.body.appendChild(modal);
    }

    addToGallery(imageUrl, prompt) {
        const galleryGrid = document.getElementById('galleryGrid');
        if (!galleryGrid) return;
        
        const item = document.createElement('div');
        item.className = 'gallery-item new-generated';
        item.style.animation = 'fadeInUp 0.6s ease-out';
        
        // Determine category based on prompt keywords
        const category = this.categorizePrompt(prompt);
        item.classList.add(category);
        
        item.innerHTML = `
            <div class="gallery-image-wrapper" style="
                width: 100%;
                height: 100%;
                overflow: hidden;
                position: relative;
            ">
                <img src="${imageUrl}" alt="AI Generated Image" loading="lazy" 
                     style="transform: translateY(-40px); object-fit: cover; width: 100%; height: 120%;">
            </div>
            <div class="gallery-overlay">
                <div class="gallery-info">
                    <h4>✨ Just Generated</h4>
                    <p>${prompt}</p>
                </div>
            </div>
        `;
        
        // Add click handler for lightbox
        item.addEventListener('click', () => {
            this.openLightbox(imageUrl, prompt);
        });
        
        // Insert at the beginning of gallery
        galleryGrid.insertBefore(item, galleryGrid.firstChild);
    }

    categorizePrompt(prompt) {
        const lowerPrompt = prompt.toLowerCase();
        
        if (lowerPrompt.includes('logo') || lowerPrompt.includes('brand') || lowerPrompt.includes('icon')) {
            return 'logos';
        } else if (lowerPrompt.includes('poster') || lowerPrompt.includes('flyer') || lowerPrompt.includes('advertisement')) {
            return 'posters';
        } else if (lowerPrompt.includes('shirt') || lowerPrompt.includes('merch') || lowerPrompt.includes('product')) {
            return 'merch';
        } else {
            return 'typography';
        }
    }

    downloadImage(imageUrl, prompt) {
        // Create a canvas to crop the watermark from the image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        // Enable CORS for cross-origin images
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
            try {
                // Set canvas dimensions to crop out bottom 40px (watermark area)
                const cropHeight = 40; // Height to crop from bottom
                canvas.width = img.width;
                canvas.height = img.height - cropHeight;
                
                // Draw the image on canvas, excluding the bottom watermark area
                ctx.drawImage(
                    img,
                    0, 0, img.width, img.height - cropHeight, // Source: exclude bottom 40px
                    0, 0, canvas.width, canvas.height        // Destination: full canvas
                );
                
                // Convert canvas to blob and download
                canvas.toBlob((blob) => {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `fuki-ai-${prompt.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.png`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    // Clean up
                    setTimeout(() => URL.revokeObjectURL(url), 100);
                    this.showNotification('🎉 Watermark-free image downloaded!', 'success');
                }, 'image/png', 0.95);
            } catch (error) {
                console.error('Canvas cropping failed:', error);
                this.fallbackDownload(imageUrl, prompt);
            }
        };
        
        img.onerror = () => {
            console.warn('Image CORS failed, using fallback download');
            this.fallbackDownload(imageUrl, prompt);
        };
        
        // Try to load with CORS proxy if available
        img.src = imageUrl;
    }
    
    fallbackDownload(imageUrl, prompt) {
        // Fallback: direct download if CORS fails
        this.showNotification('⚠️ Downloaded with watermark (CORS limitation)', 'warning');
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `fuki-ai-${prompt.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.jpg`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    shareImage(imageUrl, prompt) {
        if (navigator.share) {
            navigator.share({
                title: 'Check out this AI-generated image!',
                text: `Generated with Fuki AI: "${prompt}"`,
                url: window.location.href
            }).catch(() => {
                this.copyToClipboard(`Generated with Fuki AI: "${prompt}" - ${window.location.href}`);
                this.showNotification('Link copied to clipboard!', 'success');
            });
        } else {
            this.copyToClipboard(`Generated with Fuki AI: "${prompt}" - ${window.location.href}`);
            this.showNotification('Link copied to clipboard!', 'success');
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const bgColor = type === 'success' ? 'var(--gradient-primary)' : 
                       type === 'warning' ? 'linear-gradient(135deg, #f59e0b, #d97706)' :
                       'var(--gradient-secondary)';
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--radius-xl);
            z-index: 9999;
            animation: slideInRight 0.3s ease-out;
            box-shadow: var(--shadow-glow);
            max-width: 300px;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }

    filterGallery(filter) {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.5s ease-out';
            } else {
                item.style.display = 'none';
            }
        });
    }

    loadMoreGalleryItems() {
        const galleryGrid = document.getElementById('galleryGrid');
        if (!galleryGrid) return;

        // Add loading state
        const loadMoreBtn = document.getElementById('loadMore');
        if (loadMoreBtn) {
            loadMoreBtn.textContent = 'Loading...';
            loadMoreBtn.disabled = true;
        }

        // Simulate loading delay
        setTimeout(() => {
            this.generateMockGalleryData(6); // Load 6 more items
            
            if (loadMoreBtn) {
                loadMoreBtn.textContent = 'Load More';
                loadMoreBtn.disabled = false;
            }
        }, 1000);
    }

    generateMockGalleryData(count = 12) {
        const galleryGrid = document.getElementById('galleryGrid');
        if (!galleryGrid) return;

        const categories = ['typography', 'logos', 'posters', 'merch'];
        const mockPrompts = [
            'Modern minimalist logo design with clean typography and geometric shapes',
            'Futuristic neon cyberpunk poster with glowing text effects',
            'Vintage retro album cover with bold hand-lettered typography',
            'Corporate business logo with professional serif font and gold accents',
            'Typography t-shirt design with motivational quote in bold letters',
            'Elegant wedding invitation card with script calligraphy',
            'Sci-fi movie poster with metallic chrome text and space background',
            'Social media post design with trendy sans-serif typography',
            'Gaming logo with neon RGB colors and futuristic font style',
            'Coffee shop branding with warm brown tones and handwritten text',
            'Music festival poster with psychedelic colors and wavy text',
            'Tech startup logo with gradient colors and modern geometric design'
        ];

        for (let i = 0; i < count; i++) {
            const item = document.createElement('div');
            const category = categories[Math.floor(Math.random() * categories.length)];
            const prompt = mockPrompts[Math.floor(Math.random() * mockPrompts.length)];
            
            // Generate AI images for gallery using actual prompts
            const cleanPrompt = encodeURIComponent(prompt);
            const seed = Math.floor(Math.random() * 1000000) + i;
            const imageUrl = `https://image.pollinations.ai/prompt/${cleanPrompt}?width=400&height=400&seed=${seed}&model=flux`;
            
            item.className = `gallery-item ${category}`;
            item.innerHTML = `
                <div class="gallery-image-wrapper" style="
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    position: relative;
                ">
                    <img src="${imageUrl}" alt="AI Generated ${category}" loading="lazy" 
                         style="transform: translateY(-40px); object-fit: cover; width: 100%; height: 120%;"
                         onerror="this.src='https://picsum.photos/400/400?random=${seed}'">
                </div>
                <div class="gallery-overlay">
                    <div class="gallery-info">
                        <h4>AI Generated ${category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                        <p>${prompt}</p>
                    </div>
                </div>
            `;

            // Add click handler for lightbox
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                this.openLightbox(img.src, prompt);
            });

            galleryGrid.appendChild(item);
        }
    }

    handlePlanSelection(planName) {
        console.log(`Selected plan: ${planName}`);
        
        // Show success message
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--gradient-primary);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            z-index: 9999;
        `;
        notification.textContent = `Redirecting to ${planName} plan checkout...`;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    animatePromptInput() {
        const promptInput = document.getElementById('heroPrompt');
        if (promptInput) {
            promptInput.style.animation = 'pulse 0.3s ease-out';
            setTimeout(() => {
                promptInput.style.animation = '';
            }, 300);
        }
    }

    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Link copied to clipboard');
        }).catch(() => {
            console.log('Failed to copy link');
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FukiAI();
});

// Add CSS animations for intersection observer and new features
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.02);
        }
    }
    
    .new-generated {
        border: 2px solid var(--cyan);
        box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
    }
    
    .close-generated:hover {
        background: var(--gradient-primary) !important;
    }
`;
document.head.appendChild(animationStyles);