(function ($) {
    "use strict";  

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
            $('.navmobile').addClass('fixed-top shadow-sm bg-white p-3'); 
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
            $('.navmobile').removeClass('fixed-top shadow-sm bg-white p-3');
        }
    });
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    /*const currentUrl = window.location.pathname;
    console.log('URL actuelle:', currentUrl); // Affiche l'URL actuelle

    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {
        console.log('Lien href:', link.getAttribute('href')); // Affiche l'URL de chaque lien
        if (link.getAttribute('href') === currentUrl) {
            link.classList.add('active');
        }
    });*/

/*
    // Sélectionne tous les liens de navigation
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

// Fonction pour activer le lien correspondant à la page actuelle
function setActiveLink() {
    navLinks.forEach(link => {
        // Retire la classe 'active' de tous les liens
        link.classList.remove('active');
        
        // Vérifie si l'URL du lien correspond à l'URL actuelle de la page
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });
}

// Appelle la fonction pour activer le lien correspondant à la page actuelle
setActiveLink();

// Pour la page de démarrage, ajoute la classe 'active' au lien "Accueil"
window.addEventListener('load', () => {
    const homeLink = document.querySelector('.navbar-nav .nav-link[href="index.html"]');
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        homeLink.classList.add('active');
    }
});*/

function includeHTML() {
    const elements = document.querySelectorAll("[data-include]");

    elements.forEach(element => {
        const file = element.getAttribute("data-include");
        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur de chargement : ' + response.status + ' ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                element.innerHTML = data;

                // Appeler la fonction pour définir le lien actif après chargement du contenu
                setActiveLink();
            })
            .catch(error => {
                console.error('Erreur lors du chargement du fichier', file, ':', error);
            });
    });
}

// Fonction pour activer le lien correspondant à la page actuelle
/*function setActiveLink() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {
        // Retire la classe 'active' de tous les liens
        link.classList.remove('active');

        // Vérifie si l'URL du lien correspond à l'URL actuelle de la page
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });

    // Vérifie si on est sur la page d'accueil et ajoute la classe 'active' au lien "Accueil"
    const homeLink = document.querySelector('.navbar-nav .nav-link[href="index.html"]');
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        homeLink.classList.add('active');
    }
}*/

function setActiveLink() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {
        // Retire la classe 'active' de tous les liens
        link.classList.remove('active');

        // Vérifie si l'URL du lien correspond à l'URL actuelle de la page
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });

    // Vérifie si on est sur la page d'accueil et ajoute la classe 'active' au lien "Accueil"
    const homeLink = document.querySelector('.navbar-nav .nav-link[href="index.html"]');
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        homeLink.classList.add('active');
    }

    // Vérifie si on est sur une page du sous-menu "Pages" et active le lien parent
    const pagesDropdownLinks = document.querySelectorAll('.dropdown-menu .dropdown-item');
    const pagesDropdownLink = document.querySelector('.nav-link.dropdown-toggle');

    pagesDropdownLinks.forEach(link => {
        if (link.href === window.location.href) {
            pagesDropdownLink.classList.add('active');
        }
    });
}


// Appel initial pour charger le header et le footer
includeHTML();



})(jQuery);
