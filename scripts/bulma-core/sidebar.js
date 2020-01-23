//Mobile menu toggle
        if ($('.nav-toggle').length) {
            $('.nav-toggle').on("click", function () {
                $(this).toggleClass('is-active');
                $(this).siblings('.nav-menu').toggleClass('is-active');
            })
        }

        //Main menu icon behaviour and push sidebar
        $('.side-icon').on("click", function () {
            $('.side-icon.is-active').removeClass('is-active');
            $(this).addClass('is-active');
            $('.menu-wrapper .icon-box-toggle').addClass('active');
            $('.child-menu').addClass('is-sidebar-translated');
            // $('.dashboard-nav, #dashboard-wrapper').addClass('is-pushed');
            //disable reader mode switch when sidebar is opened
            $('.reader-switch label').addClass('is-disabled');
        })

        $('.menu-wrapper').on("click", function () {
            $('.child-menu').toggleClass('is-sidebar-translated');
            // $('.dashboard-nav, #dashboard-wrapper').toggleClass('is-pushed');
            //enable reader mode switch when sidebar is closed
            $('.reader-switch label').removeClass('is-disabled');
        });

        $('.icon-box-toggle').bind('click', function (e) {
            $(this).toggleClass('active');
            e.preventDefault();
        });

        //Sidebar menu submenu transitions
        $(".sidebar-menu > li.have-children a.parent-link").on("click", function (i) {
            i.preventDefault();
            if (!$(this).parent().hasClass("active")) {
                $(".sidebar-menu li ul").slideUp();
                $(this).next().slideToggle();
                $(".sidebar-menu li").removeClass("active");
                $(this).parent().addClass("active");
            }
            else {
                $(this).next().slideToggle();
                $(".sidebar-menu li").removeClass("active");
            }
        });

        //Data child menu setup
        $('.main-menu ul li.side-icon').on("click", function () {
            var menu_id = $(this).attr('data-child-menu');
            $('.sidebar-menu.is-active').removeClass('is-active');
            $("#" + menu_id).addClass('is-active');
        })

        //Reader mode (only for mobile)
        $('#reader-mode-toggle').on("click", function () {
            $('body').toggleClass('reader-mode');
        })

        //Custom quickview initialization with data attributes
        if ($('.custom-quickview').length) {
            var quickID;
            $('.quickview-trigger').on("click", function () {
                quickID = $(this).attr('data-quickview');
                $('#' + quickID).addClass('is-active');
            })
            $('.quickview-close').on("click", function () {
                quickID = $(this).attr('data-quickview');
                $('#' + quickID).removeClass('is-active');
            })
        }

        $('.tooltipster').tooltipster({
            animation: 'fade',
            delay: 200,
            maxWidth: 300,
            theme: ['tooltipster-punk', 'tooltipster-punk-customized'],
            functionInit: function (instance, helper) {

                var $origin = $(helper.origin),
                    dataOptions = $origin.attr('data-tooltipster');

                if (dataOptions) {

                    dataOptions = JSON.parse(dataOptions);

                    $.each(dataOptions, function (name, option) {
                        instance.option(name, option);
                    });
                }
            }
        });
        console.log("Tooltipster enabled.");