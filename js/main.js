// Menu móvel + Consentimento de Cookies
document.addEventListener('DOMContentLoaded', function() {
    // ====== MENU MÓVEL ======
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
            // Impedir rolagem do corpo quando o menu está aberto
            document.body.style.overflow = isExpanded ? '' : 'hidden';
        });
    }

    // Fechar o menu ao clicar em um link
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992 && menuToggle && navLinks) {
                menuToggle.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Fechar o menu ao redimensionar a tela para um tamanho maior
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992 && menuToggle && navLinks) {
            menuToggle.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ====== CONSENTIMENTO DE COOKIES ======
    try {
        const CONSENT_KEY = 'felixcambotas_cookie_consent';
        const hasConsent = localStorage.getItem(CONSENT_KEY);

        if (!hasConsent) {
            // Cria o banner
            const banner = document.createElement('div');
            banner.className = 'cookie-banner';
            banner.innerHTML = `
                <div class="cookie-content">
                    <div class="cookie-text">
                        Utilizamos cookies para melhorar sua experiência, personalizar conteúdo e analisar nosso tráfego. Ao continuar navegando, você concorda com nossa política de cookies.
                    </div>
                    <div class="cookie-actions">
                        <a href="#" class="cookie-link" aria-label="Saiba mais sobre cookies">Saiba mais</a>
                        <button class="cookie-accept" aria-label="Aceitar cookies">Aceitar</button>
                    </div>
                </div>
            `;

            document.body.appendChild(banner);

            const acceptBtn = banner.querySelector('.cookie-accept');
            const infoLink = banner.querySelector('.cookie-link');

            acceptBtn.addEventListener('click', function() {
                localStorage.setItem(CONSENT_KEY, 'accepted');
                banner.classList.add('hide');
                setTimeout(() => banner.remove(), 300);
            });

            infoLink.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Usamos cookies estritamente necessários e de desempenho para melhorar sua experiência. Nenhum dado sensível é coletado.');
            });
        }
    } catch (e) {
        // Falha segura: se o localStorage não estiver disponível, não faz nada
        console.warn('Cookie consent fallback:', e);
    }
});
