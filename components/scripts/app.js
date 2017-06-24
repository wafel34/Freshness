var $ = require('jquery');


$(function () {
    var $hamburger = $('.hamburger'),
        $hamburgerLine = $('.hamburger__line'),
        $navbar = $('.navbar'),
        images = $('.slider-screen__image'),
        headers = $('.slider-text__header'),
        paragraphs = $('.slider-text__paragraph'),
        indicators = $('.indicators__item'),
        sliderLength = images.length,
        slide = null,
        index = 0;
    var SLIDER = {
        onClickSlideChange: function() {
            var dataValue = parseInt(this.dataset.value);
            clearInterval(slide);
            SLIDER.removeSliderClass(index);
            SLIDER.addSliderClass(dataValue);
            index = dataValue;
            slide = setInterval(SLIDER.startSliding, 5000);
        },
        
        startSliding: function () {
            if(index !== sliderLength - 1){   
                index++;
            } else {
                SLIDER.removeSliderClass(index);
                SLIDER.addSliderClass(0);
                index=0;
            }
            SLIDER.removeSliderClass(index-1);
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
    
    
    slide = setInterval(SLIDER.startSliding, 5000);
    $(indicators).on('click', SLIDER.onClickSlideChange);
    
    
    
    //HAMBURGER HANDLE
    $hamburger.on('click', function (){
        $hamburgerLine.toggleClass('hamburger__line--clicked');
        $navbar.toggleClass('navbar--show');
    });
});
