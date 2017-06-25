var $ = require('jquery');


$(function () {
    'use strict';
    var $hamburger = $('.hamburger'),
        $hamburgerLine = $('.hamburger__line'),
        $menuItem = $('.navbar__menu-item'),
        $navbar = $('.navbar'),
        images = $('.slider-screen__image'),
        headers = $('.slider-text__header'), //NOT USED FOR NOW
        paragraphs = $('.slider-text__paragraph'), //NOT USED FOR NOW
        indicators = $('.indicators__item'),
        sliderLength = images.length,
        slide = null,
        index = 0,
        SLIDER = {};
    
    
    //SLIDER LOGIC
    SLIDER = {
        onClickSlideChange: function () {
            var dataValue = parseInt(this.dataset.value);
            clearInterval(slide);
            SLIDER.removeSliderClass(index);
            SLIDER.addSliderClass(dataValue);
            index = dataValue;
            slide = setInterval(SLIDER.startSliding, 5000);
        },
        
        startSliding: function () {
            if (index !== sliderLength - 1) {
                index = +1;
            } else {
                SLIDER.removeSliderClass(index);
                SLIDER.addSliderClass(0);
                index = 0;
            }
            SLIDER.removeSliderClass(index - 1);
            SLIDER.addSliderClass(index);
        },
        
        addSliderClass: function (i) {
            $(indicators[i]).addClass('indicators__item--active');
            $(images[i]).addClass('slider-screen__image--active');
        },
        removeSliderClass: function (i) {
            $(indicators[i]).removeClass('indicators__item--active');
            $(images[i]).removeClass('slider-screen__image--active');
        }
    };
    
    
    //SLIDER HANDLE
    slide = setInterval(SLIDER.startSliding, 5000);
    $(indicators).on('click', SLIDER.onClickSlideChange);
    
    
    
    //HAMBURGER HANDLE
    $hamburger.on('click', function () {
        $hamburgerLine.toggleClass('hamburger__line--clicked');
        $navbar.toggleClass('navbar--show');
    });
    
    $menuItem.on('click', function () {
        var link = $(this).find('a').attr('href'),
            offset = 0;
        $hamburgerLine.removeClass('hamburger__line--clicked');
        $navbar.removeClass('navbar--show');
        
        if ($(window).width() > 486) {
            offset = 50;
        } else {
            offset = 100;
        }

        $('html, body').animate({
        scrollTop: $(link).offset().top - offset
    }, 'slow');
    });
});
