jQuery.noConflict();

jQuery(document).ready(function ($) {

    "use strict";

    var mo_options = mo_options || {};
    mo_options.ajax_portfolio = true;
    mo_options.disable_smooth_page_load=false;
    mo_options.disable_animations_on_page=false;

    var template_dir = "http://portfoliotheme.org/enigmatic/wp-content/themes/enigmatic";

    /* ---------------------------------- Drop-down Menu.-------------------------- */


    /* For sticky and primary menu navigation */
    $('.dropdown-menu-wrap ul.menu').superfish({
        delay: 100, // one second delay on mouseout
        animation: {height: 'show'}, // fade-in and slide-down animation
        speed: 'fast', // faster animation speed
        autoArrows: false // disable generation of arrow mark-up
    });

    $('.responsive-select-menu').change(function () {
        window.location = $(this).find('option:selected').val();
    });

    /* Hide all first and open only the top parent next */
    $('#mobile-menu-toggle').click(function () {
        $("#mobile-menu > ul").slideToggle(500);
        return false;
    });

    $("#mobile-menu ul li").each(function () {
        var sub_menu = $(this).find("> ul");
        if (sub_menu.length > 0 && $(this).addClass("has-ul")) {
            $(this).find("> a").append('<span class="sf-sub-indicator"><i class="icon-arrow-down-3"></i></span>');
        }
    });
    $('#mobile-menu ul li:has(">ul") > a').click(function () {
        $(this).parent().toggleClass("open");
        $(this).parent().find("> ul").stop(true, true).slideToggle();
        return false;
    });

    $(window).scroll(function () {
        var width = $(window).width();
        var yPos = $(window).scrollTop();
        /* show sticky menu after screen has scrolled down 200px from the top in desktop and big size tablets only */
        if (width > 768 && (yPos > 200)) {
            $("#sticky-menu-area-wrap").fadeIn();
        } else {
            $("#sticky-menu-area-wrap").fadeOut();
        }
    });

    /*--------------------------------------------------
     Home Page
     ---------------------------------------------------*/
    /*-----------------------------------------------------------------------------------*/
    /*	Toggle Portfolio and Blog Showcase for the Homepage
     /*-----------------------------------------------------------------------------------*/

    $('#blog-tab a').click(function () {

        $('#portfolio-showcase').fadeOut(400, function () {
            $('#blog-showcase').fadeIn(400);
        })

        $('#project-tab').removeClass('current-tab');
        $('#blog-tab').addClass('current-tab');


    });

    $('#project-tab a').click(function () {

        $('#blog-showcase').fadeOut(400, function () {
            $('#portfolio-showcase').fadeIn(400);
        })

        $('#blog-tab').removeClass('current-tab');
        $('#project-tab').addClass('current-tab');

    });


    /* ------------------- Scroll Effects ----------------------------- */

    function mo_scroll_effects() {
        if (typeof $().waypoint === 'undefined')
            return;

        $('#service-stats').waypoint(function (direction) {
            setTimeout(function () {
                $('#service-stats').addClass("anim");
            }, 0);
        }, { offset: function () {
            var window_height = $.waypoints('viewportHeight');
            var element_height = $(this).outerHeight();
            return window_height - (element_height - 100) /* Increase pixels to account for 100px bottom padding */;
        },
            triggerOnce: true});

        $('#pricing-action').waypoint(function (direction) {
            setTimeout(function () {
                $('#pricing-action .pointing-arrow img').addClass("animated fadeInRightBig");
            }, 0);
        }, { offset: function () {
            var window_height = $.waypoints('viewportHeight');
            var element_height = $(this).outerHeight();
            return window_height - (element_height - 100) /* Increase pixels to account for 100px bottom padding */;
        },
            triggerOnce: true});

        $('#marketing-policy').waypoint(function (direction) {
            setTimeout(function () {
                $('#marketing-policy .symmetric-left h3').addClass("animated fadeInLeft");
            }, 0);
            setTimeout(function () {
                $('#marketing-policy .symmetric-right h3').addClass("animated fadeInRight");
            }, 400); // delay the second effect
        }, { offset: function () {
            var window_height = $.waypoints('viewportHeight');
            var element_height = $(this).outerHeight();
            return window_height - (element_height - 100) /* Increase pixels to account for 100px bottom padding */;
        },
            triggerOnce: true});

        $('#business-growth').waypoint(function (direction) {
            $('#business-growth img.video-pointer').addClass("animated fadeInLeft");
        }, { offset: function () {
            var window_height = $.waypoints('viewportHeight');
            var element_height = $(this).outerHeight();
            return window_height - (element_height - 100) /* Increase pixels to account for 100px bottom padding */;

        },
            triggerOnce: true});

    }

    if (!mo_options.disable_animations_on_page) {
        mo_scroll_effects();
    }

    function mo_smooth_page_load_effect() {
        $('#before-content-area, #custom-before-content-area, #content').css({opacity: 1});
        $('.sidebar-right-nav, .sidebar-left-nav').css({opacity: 1});
    }

    if (!mo_options.disable_smooth_page_load) {
        mo_smooth_page_load_effect();
    }

    /* ------------------- Tabs and Accordions ------------------------ */

    $("ul.tabs").tabs(".pane");

    $(".accordion").tabs("div.pane", {
        tabs: 'div.tab',
        effect: 'slide',
        initialIndex: 0
    });

    /* ------------------- Back to Top and Close ------------------------ */

    $(".back-to-top").click(function (e) {
        $('html,body').animate({
            scrollTop: 0
        }, 600);
        e.preventDefault();
    });

    $('a.close').click(function (e) {
        e.preventDefault();
        $(this).closest('.message-box').fadeOut();
    });


    /* ------------------- Toggle ------------------------ */

    function toggle_state(toggle_element) {
        var active_class;
        var current_content;

        active_class = 'active-toggle';

        // close all others first
        toggle_element.siblings().removeClass(active_class);
        toggle_element.siblings().find('.toggle-content').slideUp("fast");

        current_content = toggle_element.find('.toggle-content');

        if (toggle_element.hasClass(active_class)) {
            toggle_element.removeClass(active_class);
            current_content.slideUp("fast");
        }
        else {
            toggle_element.addClass(active_class);
            current_content.slideDown("fast");
        }
    }

    $(".toggle-label").toggle(
        function () {
            toggle_state($(this).parent());
        },
        function () {
            toggle_state($(this).parent());
        }
    );

    /* ------------------- Contact Form Validation ------------------------ */

    var mo_theme = {"name_required":"Please provide your name","name_format":"Your name must consist of at least 5 characters","email_required":"Please provide a valid email address","url_required":"Please provide a valid URL","phone_required":"Minimum 5 characters required","human_check_failed":"The input the correct value for the equation above","message_required":"Please input the message","message_format":"Your message must be at least 15 characters long","success_message":"Your message has been sent. Thanks!"};

    var rules = {
        contact_name: {
            required: true,
            minlength: 5
        },
        contact_email: {
            required: true,
            email: true
        },
        contact_phone: {
            required: false,
            minlength: 5
        },
        contact_url: {
            required: false,
            url: true
        },
        human_check: {
            required: true,
            range: [13, 13]
        },
        message: {
            required: true,
            minlength: 15
        }
    };
    var messages = {
        contact_name: {
            required: mo_theme.name_required,
            minlength: mo_theme.name_format
        },
        contact_email: mo_theme.email_required,
        contact_url: mo_theme.url_required,
        contact_phone: {
            minlength: mo_theme.phone_required
        },
        human_check: mo_theme.human_check_failed,
        message: {
            required: mo_theme.message_required,
            minlength: mo_theme.message_format
        }
    };
    $("#content .contact-form").validate({
        rules: rules,
        messages: messages,
        errorClass: 'form-error',
        submitHandler: function (theForm) {
            $.post(
                theForm.action,
                $(theForm).serialize(),
                function (response) {
                    $("#content .feedback").html('<div class="success-msg">' + mo_theme.success_message + '</div>');
                });

        }

    });

    $(".widget .contact-form").validate({
        rules: rules,
        messages: messages,
        errorClass: 'form-error',
        submitHandler: function (theForm) {
            $.post(
                theForm.action,
                $(theForm).serialize(),
                function (response) {
                    $(".widget .feedback").html('<div class="success-msg">' + mo_theme.success_message + '</div>');
                });

        }

    });


    /* -------------------------------- PrettyPhoto Lightbox --------------------------*/


    function mo_prettyPhoto() {

        if (typeof $().prettyPhoto === 'undefined') {
            return;
        }

        var theme_selected = 'pp_default';

        $("a[rel^='prettyPhoto']").prettyPhoto({
            "theme": theme_selected, /* light_rounded / dark_rounded / light_square / dark_square / facebook */
            social_tools: false
        });

    }

    mo_prettyPhoto();

    /* -------------------------------- Image Overlay ------------------------------ */

    function mo_imageOverlay() {

        $(".hfeed .post .image-area, .image-grid .image-area").hover(function () {
            $(this).find(".image-info").fadeTo(400, 1);
        }, function () {
            $(this).find(".image-info").fadeTo(400, 0);
        });
    }

    mo_imageOverlay();

    /*-----------------------------------------------------------------------------------*/
    /*	jQuery isotope functions and Infinite Scroll
     /*-----------------------------------------------------------------------------------*/

    $(function () {

        if (typeof $().isotope === 'undefined') {
            return;
        }

        var post_snippets = $('.post-snippets.full-width-snippets');

        post_snippets.imagesLoaded(function () {
            $(this).isotope({
                // options
                itemSelector: '.entry-item',
                layoutMode: 'fitRows'
            });
        });

        var container = $('#portfolio-items');
        if (container.length === 0)
            return;

        container.imagesLoaded(function () {
            $(this).isotope({
                // options
                itemSelector: '.portfolio-item',
                layoutMode: 'fitRows'
            });

            $('#portfolio-filter a').click(function (e) {
                e.preventDefault();

                var selector = $(this).attr('data-value');
                container.isotope({ filter: selector });
                return false;
            });
        });

        if (mo_options.ajax_portfolio) {
            if (typeof $().infinitescroll !== 'undefined' && $('.pagination').length) {

                container.infinitescroll({
                        navSelector: '.pagination', // selector for the paged navigation
                        nextSelector: '.pagination .next', // selector for the NEXT link (to page 2)
                        itemSelector: '.portfolio-item', // selector for all items you'll retrieve
                        loading: {
                            finishedMsg: 'No more items  to load.',
                            img: template_dir + '/images/loader.gif'
                        }
                    },
                    // call Isotope as a callback
                    function (newElements) {
                        mo_imageOverlay();
                        var $newElems = $(newElements);
                        $newElems.imagesLoaded(function () {
                            container.isotope('appended', $newElems);
                        });
                        mo_prettyPhoto();
                    });
            }
        }
    });

    /*-----------------------------------------------------------------------------------*/
    /*	Handle videos in responsive layout - Credit - http://css-tricks.com/NetMag/FluidWidthVideo/Article-FluidWidthVideo.php
     /*-----------------------------------------------------------------------------------*/

    $("#container").fitVids();

    // Take care of maps too - https://github.com/davatron5000/FitVids.js - customSelector option
    $("#content").fitVids({ customSelector: "iframe[src^='http://maps.google.com/']"});

    /*var mo_twitter_id = mo_twitter_id || 'twitter';
     var mo_tweet_count = mo_tweet_count || 3;*/
    if (typeof mo_options.mo_twitter_id !== 'undefined') {
        jQuery('#twitter').jtwt({
            username: mo_options.mo_twitter_id,
            count: mo_options.mo_tweet_count,
            image_size: 32,
            loader_text: 'Loading Tweets'
        });
    }

})
;