var $ = require('jquery');

$(function () {
    var $hamburger = $('.hamburger'),
        $hamburgerLine = $('.hamburger__line'),
        $navbar = $('.navbar');
    $hamburger.on('click', function (){
        $hamburgerLine.toggleClass('hamburger__line--clicked');
        $navbar.toggleClass('navbar--show');
    });
});