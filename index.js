// Speakers data
const speakers = [
    {
        id: 1,
        name: 'John Doe',
        role: 'Chief Marketing Officer',
        company: 'Acme Corp',
        bio: 'Monotonectally synergize business communities rather than client-centric convergence. Assertively unleash cross-platform best practices rather than pandemic total linkage. Synergistically monetize parallel infomediaries whereas 2.0 mindshare.',
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
        fallbackImage: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff',
        socials: {
            drupal: "#",
            linkedIn: "#",
            x: "#",
        }
    },
    {
        id: 2,
        name: 'John Doe',
        role: 'Chief Engagement Officer',
        company: 'Acquia',
        bio: 'Expert in driving customer engagement and community building strategies with a focus on scalable solutions.',
        image: 'https://randomuser.me/api/portraits/men/2.jpg',
        fallbackImage: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff',
        socials: {
            drupal: "#",
            linkedIn: "#",
            x: "#",
        }
    },
    {
        id: 3,
        name: 'John Doe',
        role: 'Chief Technical Developer',
        company: 'Pantheon',
        bio: 'Specialized in architecture and implementation of scalable solutions.',
        image: 'https://randomuser.me/api/portraits/men/3.jpg',
        fallbackImage: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff',
        socials: {
            drupal: "#",
            linkedIn: "#",
            x: "#",
        }
    },
    {
        id: 4,
        name: 'John Doe',
        role: 'Chief Marketing Officer',
        company: 'Specbee',
        bio: 'Leading innovative marketing strategies and digital transformations.',
        image: 'https://randomuser.me/api/portraits/men/4.jpg',
        fallbackImage: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff',
        socials: {
            drupal: "#",
            linkedIn: "#",
            x: "#",
        }
    },
    {
        id: 5,
        name: 'John Doe',
        role: 'Chief Technical Developer',
        company: 'Pantheon',
        bio: 'Specialized in architecture and implementation of scalable solutions.',
        image: 'https://randomuser.me/api/portraits/men/3.jpg',
        fallbackImage: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff',
        socials: {
            drupal: "#",
            linkedIn: "#",
            x: "#",
        }
    },
    {
        id: 6,
        name: 'John Doe',
        role: 'Chief Marketing Officer',
        company: 'Specbee',
        bio: 'Leading innovative marketing strategies and digital transformations.',
        image: 'https://randomuser.me/api/portraits/men/4.jpg',
        fallbackImage: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff',
        socials: {
            drupal: "#",
            linkedIn: "#",
            x: "#",
        }
    }
];

class SpeakersSlider {
    constructor() {
        // DOM Elements
        this.track = document.querySelector('.speakers-slider__track');
        this.prevButton = document.querySelector('.speakers-slider__nav--prev');
        this.nextButton = document.querySelector('.speakers-slider__nav--next');
        this.speakerDetail = document.getElementById('speakerDetail');
        this.closeButton = document.querySelector('.speaker-detail__close');

        // State
        this.currentSlide = 0;
        this.isMobile = window.innerWidth <= 480;
        this.slidesPerView = this.getSlidesPerView();
        this.activeCard = null;

        // Initialize
        this.init();
    }

    init() {
        this.renderSpeakers();
        this.addEventListeners();
        if (!this.isMobile) {
            this.updateSliderVisibility();
        }
    }

    getSlidesPerView() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return 2;
        if (window.innerWidth <= 1024) return 3;
        return 4;
    }

    renderSpeakers() {
        this.track.innerHTML = speakers.map(speaker => `
            <div class="speaker-card" data-id="${speaker.id}">
                <img 
                    src="${speaker.image}" 
                    alt="${speaker.name}" 
                    class="speaker-card__image"
                    onerror="this.src='${speaker.fallbackImage}'"
                >
                <div class="speaker-card__content">
                    <h3 class="speaker-card__name">${speaker.name}</h3>
                    <p class="speaker-card__role">${speaker.role}</p>
                    <p class="speaker-card__company">${speaker.company}</p>
                   
                </div>
                ${this.isMobile ? `
                    <div class="speaker-card__expanded">
                        <p class="speaker-card__bio">${speaker.bio}</p>
                    </div>
                ` : ''}

                 ${this.isMobile ? `<div class="social-icons">
                    <a href=${speaker.socials.linkedIn} class="social-icon social-icon_linkedIn" aria-label="LinkedIn">
                        <img src="/icons/linkedin.svg" alt="LinkedIn" />
                    </a>
                    <a href=${speaker.socials.x} class="social-icon social-icon_x" aria-label="X">
                        <img src="/icons/x.svg" alt="X (Twitter)" />
                    </a>
                    <a href=${speaker.socials.drupal} class="social-icon social-icon_drupal" aria-label="Drupal">
                        <img src="/icons/drupal.svg" alt="Drupal" />
                    </a>
            </div>` : ''}
            </div>
        `).join('');
    }

    showSpeakerDetail(speaker) {
        const detail = this.speakerDetail;
        const detailImage = detail.querySelector('.speaker-detail__image');

        // Set image with fallback
        detailImage.src = speaker.image;
        detailImage.onerror = () => {
            detailImage.src = speaker.fallbackImage;
        };

        detailImage.alt = speaker.name;
        detail.querySelector('.speaker-detail__name').textContent = speaker.name;
        detail.querySelector('.speaker-detail__role').textContent = speaker.role;
        detail.querySelector('.speaker-detail__company').textContent = speaker.company;
        detail.querySelector('.speaker-detail__bio').textContent = speaker.bio;
        detail.querySelector('.social-icon_linkedIn').href = speaker.socials.linkedIn
        detail.querySelector('.social-icon_x').href = speaker.socials.x
        detail.querySelector('.social-icon_drupal').href = speaker.socials.drupal



        detail.classList.add('is-active');
    }

    hideSpeakerDetail() {
        this.speakerDetail.classList.remove('is-active');
    }

    toggleExpandedView(card) {
        // If clicking the same card, just toggle it
        if (this.activeCard === card) {
            const expandedSection = card.querySelector('.speaker-card__expanded');
            expandedSection.classList.toggle('is-active');
            if (!expandedSection.classList.contains('is-active')) {
                this.activeCard = null;
            }
            return;
        }

        // If there's an active card, close it
        if (this.activeCard) {
            const oldExpanded = this.activeCard.querySelector('.speaker-card__expanded');
            oldExpanded.classList.remove('is-active');
        }

        // Open the new card
        const expandedSection = card.querySelector('.speaker-card__expanded');
        expandedSection.classList.add('is-active');
        this.activeCard = card;

        // Smooth scroll to the expanded card
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    addEventListeners() {
        // Navigation
        this.prevButton?.addEventListener('click', () => this.slide('prev'));
        this.nextButton?.addEventListener('click', () => this.slide('next'));

        // Speaker cards
        this.track.addEventListener('click', (e) => {
            const card = e.target.closest('.speaker-card');
            if (!card) return;

            const speakerId = parseInt(card.dataset.id);
            const speaker = speakers.find(s => s.id === speakerId);

            if (this.isMobile) {
                this.toggleExpandedView(card);
            } else if (speaker) {
                this.showSpeakerDetail(speaker);
            }
        });

        // Close button
        this.closeButton?.addEventListener('click', () => {
            this.hideSpeakerDetail();
        });

        // Handle images not loading
        this.track.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG') {
                const card = e.target.closest('.speaker-card');
                if (card) {
                    const speakerId = parseInt(card.dataset.id);
                    const speaker = speakers.find(s => s.id === speakerId);
                    if (speaker) {
                        e.target.src = speaker.fallbackImage;
                    }
                }
            }
        }, true);

        // Responsive handling
        window.addEventListener('resize', () => {
            const wasMobile = this.isMobile;
            this.isMobile = window.innerWidth <= 480;

            // If switching between mobile and desktop
            if (wasMobile !== this.isMobile) {
                this.activeCard = null; // Reset active card
                this.renderSpeakers();
                if (this.isMobile) {
                    this.hideSpeakerDetail();
                }
            }

            // Handle slider updates for desktop
            if (!this.isMobile) {
                const newSlidesPerView = this.getSlidesPerView();
                if (newSlidesPerView !== this.slidesPerView) {
                    this.slidesPerView = newSlidesPerView;
                    this.currentSlide = 0;
                    this.updateSliderVisibility();
                }
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.speakerDetail.classList.contains('is-active')) {
                    this.hideSpeakerDetail();
                } else if (this.isMobile && this.activeCard) {
                    const expandedSection = this.activeCard.querySelector('.speaker-card__expanded');
                    expandedSection.classList.remove('is-active');
                    this.activeCard = null;
                }
            }
        });


    }

    slide(direction) {
        if (this.isMobile) return;

        const maxSlide = speakers.length - this.slidesPerView;

        if (direction === 'next') {
            this.currentSlide = Math.min(this.currentSlide + 1, maxSlide);
        } else {
            this.currentSlide = Math.max(this.currentSlide - 1, 0);
        }

        this.updateSliderVisibility();
    }

    updateSliderVisibility() {
        if (this.isMobile) return;

        const slideWidth = 95 / this.slidesPerView;
        this.track.style.transform = `translateX(-${this.currentSlide * slideWidth}%)`;

        // Update navigation buttons visibility
        if (this.prevButton && this.nextButton) {
            this.prevButton.style.opacity = this.currentSlide === 0 ? '0.5' : '1';
            this.nextButton.style.opacity =
                this.currentSlide >= speakers.length - this.slidesPerView ? '0.5' : '1';
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SpeakersSlider();
});