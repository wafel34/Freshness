var $ = require('jquery');


var MYAPP = MYAPP || {
    slide: function (images) {


        for (var i = 0; i < images.length; i += 1) {
            $(images[i]).addClass('slider-screen__image--active');
        }
    },

};



$(function () {
    var $hamburger = $('.hamburger'),
        $hamburgerLine = $('.hamburger__line'),
        $navbar = $('.navbar');
    $hamburger.on('click', function (){
        $hamburgerLine.toggleClass('hamburger__line--clicked');
        $navbar.toggleClass('navbar--show');
    });

    var images = $('.slider-screen__image'),
        headers = $('slider-text__header'),
        paragraphs = $('slider-text__paragraph');

        MYAPP.slide(images);
});
