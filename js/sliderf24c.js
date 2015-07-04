/* jshint undef: true, unused: false */
/* global mo_options, jQuery */

jQuery.noConflict();

jQuery(document).ready(function ($) {

    "use strict";


var mo_options = mo_options || {};
mo_options.nivo_effect="random";
mo_options.nivo_slices=15;
mo_options.nivo_animation_speed=500;
mo_options.nivo_pause_time=3000;
mo_options.nivo_dir_navigation="true";
mo_options.nivo_controls="true";
mo_options.nivo_pause_on_hover="true";
mo_options.nivo_start_random_slide="false";

mo_options.flex_slider_effect="slide";
mo_options.flex_slider_animation_speed=600;
mo_options.flex_slider_pause_time=4000;
mo_options.flex_slider_pause_on_hover="true";
mo_options.flex_slider_display_random_slide="false";

    function bool_of(bool_string) {
        var bool_value = ((bool_string === "true" || bool_string === "1") ? true : false);
        return bool_value;
    }

    function toggle_of(bool_string) {
        var toggle_value = (bool_string === "true" ? 1 : 0);
        return toggle_value;
    }

    /*function onBeforeThumbnail(currentSlide, nextSlide, options, forwardFlag) {
        $(nextSlide).find('.thumbnail-caption').hide();
    }

    function onAfterThumbnail(currentSlide, nextSlide, options, forwardFlag) {
        $(nextSlide).find('.thumbnail-caption').show(300);
    }*/

    function onBeforeThumbnail(slider) {
        slider.slides.eq(slider.animatingTo).find('.thumbnail-caption').hide();
    }

    function onAfterThumbnail(slider) {
        slider.slides.eq(slider.animatingTo).find('.thumbnail-caption').show(300);
    }

    function onStartThumbnail(slider) {

        $('#thumbnail-slider-wrapper .slideshow_toggle').click(
            function () {
                var $element = $('#thumbnail-slider-wrapper');
                if ($element.hasClass('paused')) {
                    slider.play();
                    $element.removeClass('paused');
                }
                else {
                    slider.pause();
                    $element.addClass('paused');
                }
                return false;
            });
    }

    $('#thumbnail-slider').flexslider({
        animation:'fade',
        easing: 'swing',
        selector:'.hentry',
        animationSpeed:1000,
        slideshowSpeed:2000,
        controlNav: false,
        directionNav: false,
        nextText: 'Next<span></span>',
        prevText: 'Previous<span></span>',
        before:onBeforeThumbnail,
        after:onAfterThumbnail,
        start:onStartThumbnail
    });

    $('#thumbnail-slider-wrapper').hover(
        function () {
            $(this).find(".slideshow_controls").show();
        },
        function () {
            $(this).find(".slideshow_controls").hide();
        }
    );


    if (typeof $().nivoSlider !== 'undefined') {

        $('#nivo-slider').nivoSlider({
            effect: mo_options.nivo_effect, // Specify sets like: 'fold,fade,sliceDown'
            slices: parseInt(mo_options.nivo_slices, 10), // For slice animations
            animSpeed: parseInt(mo_options.nivo_animation_speed, 10), // Slide transition speed
            pauseTime: parseInt(mo_options.nivo_pause_time, 10), // How long each slide will show
            startSlide: 0, // Set starting Slide (0 index)
            directionNav: bool_of(mo_options.nivo_dir_navigation), // Next & Prev navigation
            controlNav: bool_of(mo_options.nivo_controls), // 1,2,3... navigation
            keyboardNav: false, // Use left & right arrows
            pauseOnHover: bool_of(mo_options.nivo_pause_on_hover), // Stop animation while hovering
            manualAdvance: false, // Force manual transitions
            randomStart: bool_of(mo_options.nivo_start_random_slide), // Start on a random slide
            prevText: 'Prev<span></span>',
            nextText: 'Next<span></span>'
        });
    }
    $('#slider-area .flexslider').flexslider({
            animation: mo_options.flex_slider_effect,
            slideshowSpeed: parseInt(mo_options.flex_slider_pause_time, 10), //Integer: Set the speed of the slideshow cycling, in milliseconds
            animationSpeed: parseInt(mo_options.flex_slider_animation_speed, 10),
            pauseOnHover: toggle_of(mo_options.flex_slider_pause_on_hover),
            randomize: toggle_of(mo_options.flex_slider_display_random_slide),
            nextText: 'Next<span></span>',
            prevText: 'Previous<span></span>'
        });

});