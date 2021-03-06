const d = document,
    w = window;
    
const header = document.querySelector("header");
const sectionOne = document.querySelector(".home-intro");
const faders = document.querySelectorAll(".fade-in");
const sliders = document.querySelectorAll(".slide-in");

if(sectionOne) {

    const sectionOneOptions = {
        rootMargin: "-200px 0px 0px 0px"
    };

    const sectionOneObserver = new IntersectionObserver(function(
        entries, sectionOneObserver
    ) {
        entries.forEach(entry => {
            if(!entry.isIntersecting) {
                header.classList.add("nav-scrolled");
            } else {
                header.classList.remove("nav-scrolled");
            }
        })
    }, 
    sectionOneOptions);

    sectionOneObserver.observe(sectionOne);

    const appearOptions = {
        threshold: 0,
        rootMargin: "0px 0px -250px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(
        entries, appearOnScroll
    ) {
        entries.forEach(entry => {
            if(!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("is-active");
                appearOnScroll.unobserve(entry.target);
            }
        })
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    sliders.forEach(slider => {
        appearOnScroll.observe(slider);
    });

}

/* Hero */

if(d.querySelector(".hero__text")) {
    const $heroText = d.querySelector(".hero__text");

    function homeAnimation() {
        setTimeout(() => {
            header.classList.add("is-active");   
        }, 300);

        setTimeout(() => {
            $heroText.classList.add("is-active");    
        }, 900);
    }

    homeAnimation();
} else {
    header.classList.add("is-active");
    header.style.background = "#2d314d";
    header.style.position = "sticky";

    scrollNav();
}

/* Modal */

if(d.querySelector(".modal")) {
    const $modal = d.querySelector(".modal");
    const $previews = d.querySelectorAll(".gallery img");
    const $original = d.querySelector(".full-img");
    const $modalText = d.querySelectorAll(".modal-description");
    const $caption = d.querySelector(".caption");

    $previews.forEach(e => {
        e.addEventListener("click", () => {
            $modal.classList.add("open");
            $original.classList.add("open");
            // Cambiar dinamicamente el texto y imagen
            const originalSrc = e.getAttribute("data-original");
            $original.src = originalSrc;

            const altText = e.alt;
            $caption.textContent = altText;
        });
    });

    $modal.addEventListener("click", (e) => {
        // console.log(e);
        if(e.target.classList.contains("modal")) {
            $modal.classList.remove("open");
        }
    });
}

/* Testimonial */

function slider() {
    const $slides = d.querySelectorAll(".slide");
    const $next = d.querySelector(".btn__next");
    const $prev = d.querySelector(".btn__prev");

    let i = 0;

    d.addEventListener("click", (e) => {
        if(e.target === $prev) {
            // e.preventDefault();
            $slides[i].style.display = 'none';
            i--;

            if(i < 0) {
                i = $slides.length - 1;
            }

            $slides[i].style.display = 'flex';
        }

        if(e.target === $next) {
            // e.preventDefault();
            $slides[i].style.display = 'none';
            i++;

            if(i >= $slides.length) {
                i = 0;
            }

            $slides[i].style.display = 'flex';
        }
    });

}

slider();

/* Newsletter */

if(d.querySelector(".footer__btn")) {
    function newsletter() {
        const $footerBtn = d.querySelector(".footer__btn");
        const $mailBox = d.querySelector(".footer__mailbox");
        
        $footerBtn.addEventListener("click", e => {
            
            $footerBtn.innerHTML = `<img src="/assets/loader-spinner.svg" alt="Loading..." />`
            
            setTimeout(() => {
                $footerBtn.classList.add("is-active");
                $footerBtn.innerHTML = `<i class="loader fas fa-check" alt="Enviado"></i>`;
            }, 3000);
            
            setTimeout(() => {
                $mailBox.value = "";
                $mailBox.setAttribute("placeholder", "¡ Mensaje Recibido !");
            }, 3000);

            $footerBtn.disabled = "true";
        });
    }
    newsletter();
}


if(d.querySelectorAll(".input")) {
    const $inputs = d.querySelectorAll(".input");
    function focusInput() {
        $inputs.forEach(input => {
            input.addEventListener("keyup", e => {
                const parentEl = e.target.offsetParent;
                if(e.target.value !== "") {
                    parentEl.classList.add("focus");
                } else {
                    parentEl.classList.remove("focus");
                }
            });
        });
    }
    focusInput();
}

function scrollNav() {
    w.addEventListener("scroll", e => {
        const scrollTop = w.pageYOffset || d.documentElement.scrollTop;
        
        if(scrollTop > 120) {
            header.classList.add("hidden");
        } else {
            header.classList.remove("hidden");
        }
    });
}