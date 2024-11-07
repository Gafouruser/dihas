(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 45) {
      $(".navbar").addClass("sticky-top shadow-sm");
      $(".navmobile").addClass("fixed-top shadow-sm bg-white p-3");
    } else {
      $(".navbar").removeClass("sticky-top shadow-sm");
      $(".navmobile").removeClass("fixed-top shadow-sm bg-white p-3");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Skills
  $(".skill").waypoint(
    function () {
      $(".progress .progress-bar").each(function () {
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
      });
    },
    { offset: "80%" }
  );

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    margin: 25,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      992: {
        items: 2,
      },
    },
  });

  // Portfolio isotope and filter
  var portfolioIsotope = $(".portfolio-container").isotope({
    itemSelector: ".portfolio-item",
    layoutMode: "fitRows",
  });
  $("#portfolio-flters li").on("click", function () {
    $("#portfolio-flters li").removeClass("active");
    $(this).addClass("active");

    portfolioIsotope.isotope({ filter: $(this).data("filter") });
  });

  /*document.getElementById("read-more").addEventListener("click", function(event) {
    event.preventDefault(); // Empêche l'action par défaut du lien

    const moreContent = document.getElementById("more-content");
    const offsetTop = moreContent.offsetTop;

    // Défilement vers la position de l'élément ciblé
    window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
    });
});*/


  function includeHTML() {
    const elements = document.querySelectorAll("[data-include]");

    elements.forEach((element) => {
      const file = element.getAttribute("data-include");
      fetch(file)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Erreur de chargement : " +
                response.status +
                " " +
                response.statusText
            );
          }
          return response.text();
        })
        .then((data) => {
          element.innerHTML = data;

          // Appeler la fonction pour définir le lien actif après chargement du contenu
          setActiveLink();
        })
        .catch((error) => {
          console.error(
            "Erreur lors du chargement du fichier",
            file,
            ":",
            error
          );
        });
    });
  }

  function setActiveLink() {
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    navLinks.forEach((link) => {
      // Retire la classe 'active' de tous les liens
      link.classList.remove("active");

      // Vérifie si l'URL du lien correspond à l'URL actuelle de la page
      if (link.href === window.location.href) {
        link.classList.add("active");
      }
    });

    // Vérifie si on est sur la page d'accueil et ajoute la classe 'active' au lien "Accueil"
    const homeLink = document.querySelector(
      '.navbar-nav .nav-link[href="index.html"]'
    );
    if (
      window.location.pathname.endsWith("index.html") ||
      window.location.pathname === "/"
    ) {
      homeLink.classList.add("active");
    }

    // Vérifie si on est sur une page du sous-menu "Pages" et active le lien parent
    const pagesDropdownLinks = document.querySelectorAll(
      ".dropdown-menu .dropdown-item"
    );
    const pagesDropdownLink = document.querySelector(
      ".nav-link.dropdown-toggle"
    );

    pagesDropdownLinks.forEach((link) => {
      if (link.href === window.location.href) {
        pagesDropdownLink.classList.add("active");
      }
    });
  }

  // Appel initial pour charger le header et le footer
  includeHTML();
})(jQuery);
