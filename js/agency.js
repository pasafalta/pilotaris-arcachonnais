// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });


    /* Scroll to top */
    $(window).scroll(function(){
        ( $(this).scrollTop() > 300 ) ? $("a#scroll-to-top").addClass('visible') : $("a#scroll-to-top").removeClass('visible');
    });

    $("a#scroll-to-top").click(function() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

window.addEventListener("resize", adaptCarouselSize);

function adaptCarouselSize() {
    var width_screen = $(window).width();
    var item_carousel = document.querySelectorAll(".item");
    var height_carousel = width_screen * 0.44 + "px";

    for (var i = 0; i < item_carousel.length; i++) {
        item_carousel[i].style.height = height_carousel;
    }
    
    // Boutons intro-heading
    var boutons_carousel = document.querySelectorAll(".intro-heading");
    var mb_bouton = width_screen / 100. + "px";

    for (var i = 0; i < boutons_carousel.length; i++) {
        boutons_carousel[i].style.marginBottom = mb_bouton;
    }

    // Titres intro-lead-in
    var titres_carousel = document.querySelectorAll(".intro-lead-in");
    var mb_titre = width_screen / 20. + 58 + "px";

    for (var i = 0; i < titres_carousel.length; i++) {
        titres_carousel[i].style.marginBottom = mb_titre;
    }
    
    // Titres intro-lead-right
    var titres_carourel_right = document.querySelectorAll(".intro-lead-right");
    var boutons_carourel_right = document.querySelectorAll(".intro-heading-right");
    var ml_titre = width_screen * 3. / 7. + "px";
    var bt_titre = width_screen * 3. / 8. + "px";

    for (var i = 0; i < titres_carourel_right.length; i++) {
        titres_carourel_right[i].style.marginLeft = ml_titre;
        boutons_carourel_right[i].style.marginLeft = bt_titre;
    }
};

$( document ).ready(function() {
    adaptCarouselSize();
});

    