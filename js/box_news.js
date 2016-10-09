// Variables globales
var width_img = 280;


window.addEventListener("resize", organisation_posts);

// Javascript d'affichage des box événements dans la page (plus ou moins de colonnes selon la largeur de la fenêtre)

// Calcul du nombre de colonnes
function get_nb_colonnes(espacement_horizontal, espacement_vertical) {
    var witdh_fenetre = $(window).width();
    
    // Espacements verticaux et horizontaux entre les images
    var width_between = espacement_horizontal;
    var height_between = espacement_vertical;
    
    // Marge minimum sur les côté droite/gauche de la page
    var witdh_cotes_min = 10;

    // Calcul du nombre de colonnes
    var nb_col = Math.floor((((witdh_fenetre - witdh_cotes_min * 2) + width_between) / (width_img + width_between)) - 1) + 1;
    
    return nb_col;
};

// Calcul de la marge à droite et à gauche de la page
function get_marge_lr(nb_col, espacement_horizontal) {
    var witdh_fenetre = $(window).width();
    
    var marge_lr = Math.floor((witdh_fenetre - nb_col * width_img - (nb_col - 1) * espacement_horizontal) / 2);
    
    return marge_lr;
};

// Organisation des posts
function organisation_posts() {
    console.log("Organisation des posts");
    var witdh_fenetre = $(window).width();
    
    var width_between = 20;
    var height_between = 20;

    var nb_col = get_nb_colonnes(width_between, height_between);
    var marge_lr = get_marge_lr(nb_col, width_between);

    var posts = document.querySelectorAll(".post");
    var offset_col = [];

    for(var i = 0; i < nb_col; i++) {
        offset_col[i] = 0;
    };

    for(var i = 0; i < posts.length; i++) {
        var post = posts[i];
        
        var num_col = ((i / nb_col - Math.floor(i / nb_col)) * (nb_col * 1) + 1).toFixed(0);
        
        var pos_left = (num_col - 1) * (width_img + width_between) + marge_lr * 1;
        var pos_top = offset_col[num_col - 1];

        post.style.left = pos_left + "px";
        post.style.top = pos_top + "px";
        post.style.display = "list-item";

        offset_col[num_col - 1] = offset_col[num_col - 1] + post.offsetHeight + height_between;
    };
};


$( document ).ready(function() {

    console.log("Document ready!");
});