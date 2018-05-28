$(function() {
    var isScrolled = {};

    function elementScrolled(elem) {
        if (isScrolled[elem]) {
            return false;
        } else {
            var docViewTop = $(window).scrollTop();
            var docViewBottom = docViewTop + $(window).height();
            var elemTop = $(elem).offset().top;
            isScrolled[elem] = ((elemTop <= docViewBottom) && (elemTop >= docViewTop)) ||
                ((elemTop >= docViewBottom) && (elemTop <= docViewTop));
            return isScrolled[elem];
        }
    }

    globalInit();

    function globalInit() {
        langChange();
        langSelect();
        offcanvas();
        clickScroll();
        reflex();
        tooltypes();
        telegram();
        timemapDropdown();
        flickSlider();
		flickSlider2();
        faqDropDown();
        timerBlick();
        formSuccess();
        setTimerPrivate();
        // checkWarning();
        //lazyload();
    }

    //$(window).on('load', function() {
        function visit() {
            var page_language = identify_language();

            plg.sendData([
                {
                    action: "updateClient",
                    params: {country: page_language}
                },
                {
                    action: "registerEvent",
                    params: {name: "org_visit"}
                }
            ]);
        }
        setTimeout(visit, 2000);

        function visit_time_90() {
            var page_language = identify_language();

            plg.sendData([
                {
                    action: "updateClient",
                    params: {country: page_language}
                },
                {
                    action: "registerEvent",
                    params: {name: "org_visit_time_45"}
                }
            ]);
        }
        setTimeout(visit_time_90, 90000);

        function visit_time_180() {
            var page_language = identify_language();

            plg.sendData([
                {
                    action: "updateClient",
                    params: {country: page_language}
                },
                {
                    action: "registerEvent",
                    params: {name: "org_visit_time_90"}
                }
            ]);
        }
        setTimeout(visit_time_180, 180000);

        $('a.download-white-paper').click(function(e) {
            e.preventDefault();
            var page_language = identify_language(),
                href = $(this).attr('href'),
                target = $(this).attr('target');

            if(target == undefined) {
                target = '_self';
            }

            plg.sendData([
                {
                    action: "updateClient",
                    params: {country: page_language}
                },
                {
                    action: "registerEvent",
                    params: {name: "org_whitepaper"}
                }
            ]);

            window.open(href, target);
        });

        $('a.download-one-pager').click(function(e) {
            e.preventDefault();
            var page_language = identify_language(),
                href = $(this).attr('href'),
                target = $(this).attr('target');

            if(target == undefined) {
                target = '_self';
            }

            plg.sendData([
                {
                    action: "updateClient",
                    params: {country: page_language}
                },
                {
                    action: "registerEvent",
                    params: {name: "org_onepager"}
                }
            ]);

            window.open(href, target);
        });

        $('a.footer-social-button').click(function(e) {
            e.preventDefault();
            var page_language = identify_language(),
                eventName = $(this).data('event'),
                href = $(this).attr('href'),
                target = $(this).attr('target');

            if(target == undefined) {
                target = '_self';
            }

            plg.sendData([
                {
                    action: "updateClient",
                    params: {country: page_language}
                },
                {
                    action: "registerEvent",
                    params: {name: eventName}
                }
            ]);

            window.open(href, target);
        });

        $(window).scroll(function() {
            if (elementScrolled('#teambanner')) {
                var page_language = identify_language();

                plg.sendData([
                    {
                        action: "updateClient",
                        params: {country: page_language}
                    },
                    {
                        action: "registerEvent",
                        params: {name: "org_scroll_team"}
                    }
                ]);
            }

            if (elementScrolled('#ico')) {
                var page_language = identify_language();

                plg.sendData([
                    {
                        action: "updateClient",
                        params: {country: page_language}
                    },
                    {
                        action: "registerEvent",
                        params: {name: "org_scroll_Pre_ICO"}
                    }
                ]);
            }

            if (elementScrolled('#footer')) {
                var page_language = identify_language();

                plg.sendData([
                    {
                        action: "updateClient",
                        params: {country: page_language}
                    },
                    {
                        action: "registerEvent",
                        params: {name: "org_scroll_100"}
                    }
                ]);
            }
        });

        var teamCardElements = document.querySelectorAll('.team-cards');
        for (var i = 0; i < teamCardElements.length; i++) {
            teamCardElements[i].onSwipe('left', function() {
                var page_language = identify_language();

                plg.sendData([
                    {
                        action: "updateClient",
                        params: {country: page_language}
                    },
                    {
                        action: "registerEvent",
                        params: {name: "org_team"}
                    }
                ]);
            });
        }

        var pcForm = document.querySelector('.private-close__sub-form'),
            pcFormAgreeTerms = pcForm.querySelector('#private-close__terms-check'),
            pcFormAgreePolicy = pcForm.querySelector('#private-close__policy-check'),
            pcFormSubmit = pcForm.querySelector('button'),
            pcFormPopup = document.querySelector('.private-close__submit-popup'),
            pcFormPopupName = document.querySelector('.private-close__submit-popup_name');

        pcFormAgreeTerms.addEventListener('change', checkAgreeState);
        pcFormAgreePolicy.addEventListener('change', checkAgreeState);

        function checkAgreeState() {
            if (pcFormAgreeTerms.checked && pcFormAgreePolicy.checked) {
                pcFormSubmit.removeAttribute('disabled');
            } else {
                pcFormSubmit.setAttribute('disabled', 'disabled');
            }
        }

        pcForm.addEventListener('submit', function(e) {
            pcFormSubmit.setAttribute('disabled', 'disabled');

            var name = pcForm['private-name'].value,
                email = pcForm['e-mail'].value,
                lang = identify_language(),
                user_lang = navigator.language || navigator.browserLanguage,
                esub = (location.href.match(/[&,?]esub=([^&]+)/) || '')[1],
                utm_medium = (location.href.match(/[&,?]utm_medium=([^&]+)/) || '')[1],
                url = ['http://form-dev.metahash.local/metapb/subscribe.php?private-name=',
                    // url = ['http://trafsync.com/meta_current/metapb/sub.php?private-name=',
                    name,
                    '&private-email=',
                    encodeURIComponent(email),
                    '&lang=',
                    lang,
                    '&user_lang=',
                    user_lang,
                    '&esub=',
                    esub,
                    '&utm_medium=',
                    utm_medium
                ].join(''),
                today = new Date(),
                country = lang;

            plg.sendData([
                {
                    action: "updateClient",
                    params: {email: email, full_name: name, country: country}
                },
                {
                    action: "registerEvent",
                    params: {name: "org_pre_ico"}
                },
                {
                    action: "registerEvent",
                    params: {name: "org_subscr_on_email"}
                }
            ]);

            $.ajax({
                url: url,
                method: 'GET'
            })
            .then(function(data) {
                $('.private-close__sub-form')[0].reset(); // pcForm.trigger("reset");
                $('#private-close__terms-check').prop('checked', false);
                $('#private-close__policy-check').prop('checked', false);

                window.showModalForm = false;

                $('.private-close__submit-popup').fadeIn(400,
                    function() {
                        $('#private-close__over-modal')
                            .css('display', 'block')
                            .animate({
                                opacity: 1
                            }, 120);
                    });

                $('body').addClass('modal-open');
                $('.private-close__modal_close').click(function() {
                    $('#private-close__over-modal')
                        .animate({
                                opacity: 0
                            }, 120,
                            function() {
                                $(this).css('display', 'none');
                                $('.private-close__submit-popup').fadeOut(400);
                            }
                        );
                    $('body').removeClass('modal-open')
                });
                $(document).mouseup(function(e) {
                    if ($(".private-close__submit-popup").css('display') == 'block') {
                        var container = $("#private-close__over-modal");
                        if (container.has(e.target).length === 0) {
                            container.animate({
                                    opacity: 0
                                }, 120,
                                function() {
                                    $(this).css('display', 'none');
                                    $('.private-close__submit-popup').fadeOut(400);
                                }
                            );
                            $('body').removeClass('modal-open')
                        }
                    }
                });

            })
            .catch(function(error) {
                pcFormSubmit.removeAttribute('disabled');
            });

            e.preventDefault();
        });

        pcForm["private-name"].addEventListener('change', function(e) {
            if (!!pcFormPopupName) {
                pcFormPopupName.innerText = this.value;
            }
        });

        $("form.sub-form").submit(function(e) {
            e.preventDefault();

            var _this = $(this),
                esub = (location.href.match(/[&,?]esub=([^&]+)/) || '')[1],
                email = $(this).find('input[type=text]').val(),
                lang = identify_language(),
                $subformSubmit = $(this).find('button[type="submit"]');

            $subformSubmit.prop('disabled', true);

            function validateEmail(email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            }

            if (validateEmail(email)) {
                plg.sendData([
                    {
                        action: "updateClient",
                        params: {email: email, country: lang}
                    },
                    {
                        action: "registerEvent",
                        params: {name: "org_subscr_on_push"}
                    },
                    /*{
                        action: "registerEvent",
                        params: {name: "org_subscr_on_email"}
                    }*/
                ]);

                $.ajax({
                    url: "http://form-dev.metahash.local/metapb/mail.php",
                    data: {
                        'type': 'email',
                        'esub': esub,
                        'email': email,
                        'lang': lang,
                    },
                    method: "GET"
                })
                .then(function(data) {
                    $('#modal_form')
                        .animate({
                                opacity: 0
                            }, 120,
                            function() {
                                $subformSubmit.css('display', 'none');
                                $('.over-modal').fadeOut(400);
                            }
                        );
                    $('body').removeClass('modal-open');
                    $subformSubmit.prop('disabled', false);
                    _this.trigger("reset");
                })
                .catch(function(error) {
                    console.log(error);
                    $subformSubmit.prop('disabled', false);
                });
            } else {
                alert("Email is incorrect!");
                $subformSubmit.prop('disabled', false);
            }
        });
    //});

    //OFFCANVAS ==================================================
    //============================================================/
    function offcanvas() {
        var offcanvas = $('.offcanvas-menu'),
            openMenu = $('.offcanvas-icon');

        mobileLinkScroll();

        $(window).resize(function() {
            $(offcanvas).removeClass('-opened');
            $(openMenu).removeClass('-active');
        })

        $(openMenu).on('click', function() {
            var _this = $(this);
            _this.toggleClass('-active');
            $(offcanvas).toggleClass('-opened');
        });
    };

    function mobileLinkScroll() {
        var offcanvas = $('.offcanvas-menu'),
            openMenu = $('.offcanvas-icon'),
            offcanvasLinks = $('.offcanvas-links .menu-item > a');

        for (var i = 0; i < offcanvasLinks.length; i++) {
            var oneLink = $(offcanvasLinks[i]);

            oneLink.on('click', function() {
                var _this = $(this);

                $(offcanvas).removeClass('-opened');
                $(openMenu).removeClass('-active');

                _this.mPageScroll2id({
                    offset: 100,
                    scrollSpeed: 950
                });
            })
        }
    };


    //ANIMATE=====================================================
    //============================================================//
    var Wow = new WOW({
        offset: 100
    }).init();


    //PARALLAX ===================================================
    //============================================================//
    var promoPrallax = new Rellax('.prallax');


    //FAQ ========================================================
    //============================================================/
    function faqDropDown() {
        var faqButtons = $('.faq-title'),
            faqBlocks = $('.faq-block');

        for (var i = 0; i < faqButtons.length; i++) {
            var faqButton = $(faqButtons[i]);

            faqButton.on('click', function() {

                var _this = $(this),
                    parentBlock = _this.parent();
                faqContent = _this.siblings('.faq-content');

                if (!parentBlock.hasClass('-opened')) {

                    closeFaqBlock();

                    faqContent.slideDown(300);
                    parentBlock.addClass('-opened');
                } else {
                    faqContent.slideUp(300)
                    parentBlock.removeClass('-opened');
                }
            })
        };

        function closeFaqBlock() {
            for (var y = 0; y < faqBlocks.length; y++) {
                var block = $(faqBlocks[y]);

                if (block.hasClass('-opened')) {
                    var faqContent = block.find('.faq-content')
                    faqContent.slideUp(300);
                    block.removeClass('-opened');
                }
            }
        }
    };


    //TIMEMAP DROPDOWN ===========================================
    //============================================================/
    function timemapDropdown() {
        var buttons = $('.button-performance'),
            performances = $('.performance-hidden');

        for (var i = 0; i < buttons.length; i++) {
            var button = $(buttons[i]);

            //Повесили на все кнопки «Остальные события» обработчик
            button.on('click', function() {
                var _this = $(this),
                    thisFilter = _this.attr('data-filter');

                if (!_this.hasClass('-active')) {
                    //Показали события
                    showPerformance(thisFilter);
                    _this.addClass('-active');
                    var key = 'timemap-101', default_text = 'Hide events';

                } else {
                    //Спряталя события
                    hidePerformance(thisFilter);
                    _this.removeClass('-active');
                    var key = 'timemap-102', default_text = 'Other events';
                }

                _this.attr('data-key', key);
                var language = identify_language(),
                    text = (arrLang[language][key] !== undefined) ? arrLang[language][key] : default_text;
                _this.html(text);
            })
        };
        //=================Функция — показать события
        function showPerformance(filterItem) {
            for (var y = 0; y < performances.length; y++) {

                var performance = $(performances[y]),
                    performanceFilter = performance.attr('data-filter');

                if (performanceFilter == filterItem) {
                    performance.slideDown(200).addClass('-visible');
                };
            }
        };
        //=================Функция — спрятать события
        function hidePerformance(filterItem) {
            for (var x = 0; x < performances.length; x++) {
                var performance = $(performances[x]),
                    performanceFilter = performance.attr('data-filter');

                if (performance.hasClass('-visible') && performanceFilter == filterItem) {
                    performance.slideUp(200).removeClass('-visible');
                };
            }
        };
    }

    /* AJAX SEND-EMAIL ===================================
     =====================================================*/
    function formSuccess() {
        var success = document.getElementById('success');

        function successSlide() {
            success.style.bottom = 0 + 'px';
            setTimeout(successHide, 2500);
        };

        function successHide() {
            success.style.bottom = -145 + 'px';
        };

        $("#user-question").submit(function(e) { //Change
            e.preventDefault();

            var _this = $(this),
                formData = _this.serializeArray(),
                lang = identify_language(),
                email = $(this).find('input[name="e-mail"]').val(),
                full_name = $(this).find('input[name="name"]').val(),
                text = $(this).find('textarea[name="question"]').val(),
                esub = (location.href.match(/[&,?]esub=([^&]+)/) || '')[1],
                $submitButton = $(this).find('button[type="submit"]');

            $submitButton.prop('disabled', true);

            formData.push({
                name: 'lang',
                value: lang
            });
            formData.push({
                name: 'esub',
                value: esub
            });

            plg.sendData([
                {
                    action: "updateClient",
                    params: {email: email, full_name: full_name, country: lang}
                },
                {
                    action: "registerEvent",
                    params: {name: "org_support"}
                },
                {
                    action: "registerEvent",
                    params: {name: "org_subscr_on_email", context: text}
                }
            ]);

            $.ajax({
                type: "POST",
                url: "http://form-dev.metahash.local/mail.php",
                data: formData,
            }).then(function(res) {
                _this.trigger("reset");
                successSlide();
                $submitButton.prop('disabled', false);
            }).catch(function(error) {
                console.log(error);
                $submitButton.prop('disabled', false);
            });

            return false;
        });
    };

    //MORE STAFF DROP DOWN========================================
    //============================================================/
    function moreStaff() {
        var moreStaffButtons = $('.more-staff-button'),
            loaded = {};

        for (var i = 0; i < moreStaffButtons.length; i++) {
            var moreButton = $(moreStaffButtons[i]);

            moreButton.on('click', function() {
                var _this = $(this),
                    state = _this.attr('data-state'),
                    key = _this.attr('data-key'),
                    cardsContainer = $(_this).siblings('.cards');

                if (!cardsContainer.hasClass('-opened') && state == 'enabled') {
                    if (!loaded[key]) {
                        $.get('./staff-' + key + '.html')
                            .then(function(data) {
                                cardsContainer.html(data);
                                translate_page_element(identify_language(), cardsContainer.find('.lang'));
                                loaded[key] = true;
                        });
                    }
                    cardsContainer.slideDown(300).addClass('-opened');
                    _this.addClass('-active');
                } else {
                    cardsContainer.slideUp(300).removeClass('-opened');
                    _this.removeClass('-active');
                }
            });
        };
    };



    //SCROLL =====================================================
    //============================================================/
    function clickScroll() {
        $('#nav-menu .link, .wrap-btn-default > a, .button-scroll, .link-logo, .whatis-link').mPageScroll2id({
            offset: 140,
            scrollSpeed: 950
        });
        var width_scroll = $(window).width();
        if (width_scroll < 767) {
            $('#nav-menu .link, .wrap-btn-default > a, .button-scroll, .link-logo, .whatis-link').mPageScroll2id({
                offset: 0,
                scrollSpeed: 950
            });
        };
    };


    //LANG SWITCH ===============================================
    //============================================================/
    function langSelect() {
        var select = $('.lang-switch'),
            width = $(window).width(),
            dropDownSelect = $('.lang-switch-container');


        if (width > 991) {
            seletcOn();
        };

        function seletcOn() {
            select.on('click', function() {
                if (select.hasClass('-active')) {
                    dropDownSelect.slideUp(100);
                } else {
                    dropDownSelect.slideDown(100);
                }
                $(this).toggleClass('-active');
            });

            $(document).on('click', function(e) {
                if (!$(e.target).closest(select).length) {
                    $(dropDownSelect).slideUp(100);
                    $(select).removeClass('-active');
                }
                e.stopPropagation();
            });
        }
    };



    // TOOLTYPES =================================================
    //============================================================/
    function tooltypes() {
        var socLinks = $('.lang .link-soc.-tooltype');

        for (var x = 0; x < socLinks.length; x++) {

            var tooltype = $(socLinks[x]).find('.soc-tooltype'),
                tooltypeWidth = $(tooltype).outerWidth(),
                tooltypeRes = tooltypeWidth / 2,
                tooltypePos = 'calc' + '(50% ' + '- ' + tooltypeRes + 'px)';

            setPosition();

            $(window).resize(function() {
                setPosition();
            });

            function setPosition() {
                $(tooltype).css('left', tooltypePos);
            }
        };

        for (var i = 0; i < socLinks.length; i++) {

            $(socLinks[i]).hover(function() {
                $(this).find('.soc-tooltype').fadeIn(200);
            }, function() {
                $(this).find('.soc-tooltype').fadeOut(200);
            });
        }
    };


    //TTMER BLICK ===============================================
    //============================================================/
    function timerBlick() {
        var blick = $('.timer-blick');

        setInterval(function() {
            $(blick).addClass('-blick-active');
            setTimeout(function() {
                $(blick).removeClass('-blick-active')
            }, 1050)
        }, 2000);
    };


    // function timerBlick() {
    //     var blick = $('.timer-blick');
    //     $(blick).addClass('-blick-active');

    // };


    //FLICKITY SLIDER=============================================
    //============================================================/
    function flickSlider() {
        var windowWidth = $(window).width(),
            cards = $('.carousel-for-cards');

        if (windowWidth <= 767) {
            enableCarousel();
        };

        function enableCarousel() {
            $(cards).flickity({
                groupCells: true,
                wrapAround: true,
                draggable: true,
                pageDots: true,
                prevNextButtons: false
            })
        }
    };
	
	function flickSlider2() {
        var windowWidth = $(window).width(),
            cards = $('.carousel-for-cards2');

        if (windowWidth <= 767) {
            enableCarousel();
        };

        function enableCarousel() {
            $(cards).flickity({
                groupCells: 2,
                wrapAround: true,
                draggable: true,
                pageDots: true,
                prevNextButtons: false
            })
        }
		
		if (windowWidth <= 550) {
            enableCarousel2();
        };

        function enableCarousel2() {
            $(cards).flickity({
                groupCells: 1,
                wrapAround: true,
                draggable: true,
                pageDots: true,
                prevNextButtons: false
            })
        }
    };


    //RERLEX ====================================================
    //============================================================/
    function reflex() {
        var buttons = $('.btn'),
            menuLinks = $('.menu-item .link');

        for (var i = 0; i < buttons.length; i++) {
            $(buttons[i]).hover(
                function() {
                    $(this).offsetParent().addClass('-hovered');
                },
                function() {
                    $(this).offsetParent().removeClass('-hovered');
                });
        };
        for (var x = 0; x < menuLinks.length; x++) {
            $(menuLinks[x]).hover(
                function() {
                    $(this).offsetParent().addClass('-hovered');
                },
                function() {
                    $(this).offsetParent().removeClass('-hovered');
                });
        }
    };


    //TELEGRAM BUTTON ============================================
    //============================================================/
    function telegram() {
        var telegaButton = $('.telegram-button');

        telegaButton.hide()

        $(window).scroll(function() {
            if ($(window).scrollTop() > 800) {
                telegaButton.fadeIn(400);
            }
            if ($(window).scrollTop() < 700) {
                telegaButton.hide(400);
            }
        })
    };


    /* SELECT LANG ======================================
     =====================================================*/
    function identify_language() {
        var page_lang = get_local('mh_language') || DEFAULT_LANGUAGE;
        var user_language = get_local('mh_language') || navigator.language || navigator.browserLanguage;
        if (user_language == 'ru') {
            page_lang = user_language;
        }

        return page_lang;
    }

    function addLangClassToBody(className) {
        $('body').removeClass();
        $('body').addClass(className);
    }

    function translate_page_element(language, selector) {
        $(selector).each(function(index, element) {
            var key = $(this).data('key'), type = $(this).data('type');
            if (arrLang[language][key] !== undefined) {
                var transMess = arrLang[language][key];

                switch (type) {
                    case 'value':
                        $(this).val(transMess);
                        break;
                    case 'placeholder':
                        $(this).attr('placeholder', transMess);
                        $(this).attr('title', transMess);
                        break;
                    default:
                        $(this).html(transMess);
                }
            } else if (arrLang['en'][key] !== undefined) {
                var transMess = arrLang['en'][key];

                switch (type) {
                    case 'value':
                        $(this).val(transMess);
                        break;
                    case 'placeholder':
                        $(this).attr('placeholder', transMess);
                        $(this).attr('title', transMess);
                        break;
                    default:
                        $(this).html(transMess);
                }

                //not for PRODUCTION
                //console.log('Translate error: ' + key + ' - have no config elements in "' + language + '" language' + "\n");
            } else {
                //not for PRODUCTION
                //console.log('Translate error FATALITY: ' + key + ' - have no config elements' + "\n");
            }
        });
    }

    function langChange() {
        $(document).on('change', 'select#current_page_language', function() {
            var l = $(this).val();
                        loadLang(l, function () {
            translate_page(l);
                                addLangClassToBody(l);
                        }, function (ex) {
                console.log('Error:', ex);
                        });
        })

        html_generate_language_menu_items();

        var page_language = identify_language();
        addLangClassToBody(page_language);

        $('select#current_page_language option[value="' + page_language + '"]').attr('selected', 'selected');
        //translate_page( page_language );
        html_set_active_language(page_language);
        mobile_html_set_active_language(page_language);

        $(document).on('click', '.lang-switch .lang-switch-container .switch_item', function() {

            html_set_active_language($(this).data('value'));
            addLangClassToBody($(this).data('value'));
        });

        // for mobile ====================================================
        $(document).on('click', '.offcanvas-lang .item', function(event) {

            mobile_html_set_active_language($(this).data('value'));
            addLangClassToBody($(this).data('value'));
        });


        function html_generate_language_menu_items() {
            if (arrLangSelect !== undefined) {

                var language_menu_items_html = $('.lang-switch .lang-switch-container');
                var language_mobile_html = $('.offcanvas-lang');

                for (key_field in arrLangSelect) {
                    language_menu_items_html.append(
                        $('<div/>', {
                            class: 'switch_item',
                            'data-value': key_field
                        })
                            .append($('<span/>', {
                                class: 'flag'
                            }).append($('<img/>', {
                                src: arrLangSelect[key_field]['img']
                            })))
                            .append($('<span/>', {
                                class: 'value',
                                text: arrLangSelect[key_field]['title']
                            }))
                    )

                    language_mobile_html.append(
                        $('<div/>', {
                            class: 'item',
                            'data-value': key_field
                        })
                            .append($('<span/>', {
                                class: 'flag'
                            }).append($('<img/>', {
                                src: arrLangSelect[key_field]['img']
                            })))
                            .append($('<span/>', {
                                class: 'value',
                                text: arrLangSelect[key_field]['title']
                            }))
                    )
                }
            }
        }



        function html_set_active_language(lang) {
            var language = DEFAULT_LANGUAGE;
            if (arrLangSelect[lang] !== undefined) {
                language = lang;
            };

            save_local('mh_language', language);

            // for desktop ====================================================
            $('.lang-switch .switch_item.-output').data('value', language);
            $('.lang-switch .switch_item.-output .flag').html($('<img/>', {
                src: arrLangSelect[language]['img']
            }));
			$('.lang-switch .switch_item.-output .value').html($('<span/>', {
                text: arrLangSelect[language]['title']
            }));

            $('.lang-switch .lang-switch-container .switch_item').removeClass('-active');
            $('.lang-switch .lang-switch-container .switch_item[data-value="' + language + '"]').addClass('-active');
			

            // for mobile ====================================================
            $('.offcanvas-lang .item').removeClass('-active');
            $('.offcanvas-lang .item[data-value="' + language + '"]').addClass('-active');

            translate_page(language);

            mobileLinkScroll();

            tooltypes();

            // $('select#current_page_language option[value="'+ language +'"]').attr( 'selected', 'selected' );
            // translate_page( language );
        }

        function mobile_html_set_active_language(lang) {
            var language = DEFAULT_LANGUAGE;

            if (arrLangSelect[lang] !== undefined) {
                language = lang;
            }

            save_local('mh_language', language);

            // for mobile ====================================================
            $('.offcanvas-lang .item').removeClass('-active');
            $('.offcanvas-lang .item[data-value="' + language + '"]').addClass('-active');

            // for desktop ====================================================
            $('.lang-switch .switch_item.-output').data('value', language);
            $('.lang-switch .switch_item.-output .flag').html($('<img/>', {
                src: arrLangSelect[language]['img']
            }));

            $('.lang-switch .lang-switch-container .switch_item').removeClass('-active');
            $('.lang-switch .lang-switch-container .switch_item[data-value="' + language + '"]').addClass('-active');

            translate_page(language);

            mobileLinkScroll();

            // $('select#current_page_language option[value="'+ language +'"]').attr( 'selected', 'selected' );
            // translate_page( language );
        }

        function translate_page(lang) {
            var language = DEFAULT_LANGUAGE;


            loadLang(lang, function (){
               if (arrLang[lang] !== undefined) {
                   language = lang;
               }

                $('.lang').each(function(index, element) {
                    var key = $(this).data('key');
                    if (arrLang[language][key] !== undefined) {
                        var type = $(this).data('type');

                        switch (type) {
                            case 'value':
                                $(this).val(arrLang[language][key]);
                                break;
                            case 'placeholder':
                                $(this).attr('placeholder', arrLang[language][key]);
                                break;
                            default:
                                $(this).html(arrLang[language][key]);
                        }
                    } else if (arrLang['en'][key] !== undefined) {
                        var type = $(this).data('type');

                        switch (type) {
                            case 'value':
                                $(this).val(arrLang['en'][key]);
                                break;
                            case 'placeholder':
                                $(this).attr('placeholder', arrLang['en'][key]);
                                break;
                            default:
                                $(this).html(arrLang['en'][key]);
                        }

                        //not for PRODUCTION
                        //console.log('Translate error: ' + key + ' - have no config elements in "' + language + '" language' + "\n");
                    } else {
                        //not for PRODUCTION
                        //console.log('Translate error FATALITY: ' + key + ' - have no config elements' + "\n");
                    }
                });
            });
        }
        }


    function setTimerPrivate() {
        var timer_counter = document.querySelector('.timer-counter-result'),
            timer_counter_full = document.querySelector('.timer-counter-result-full'),
            timer_counter_day = document.querySelector('.timer-counter-day'),
            dayKey = 'timer-day-3',
            secKey = 'timer-second-3',
            hourKey = 'timer-hour-3',
            minuteKey = 'timer-minute-3',
            endDate = (new Date(2018, 1, 29)).getTime(),
            now = Date.now(),
            ts = (endDate - now) / 1000,
            days = Math.round(ts / 86400),
            hours = Math.round((ts % 86400) / 3600),
            minutes = Math.round(((ts % 86400) % 3600) / 60),
            seconds = Math.round(((ts % 86400) % 3600) % 60),
            lang = get_local('mh_language') || DEFAULT_LANGUAGE;

        if (ts > 0) {
            timer_counter.innerText = days;
            switch (days % 10) {
                case 1:
                    if (days % 100 !== 11) {
                        dayKey = 'timer-day-1';
                    }
                    break;
                case 2:
                case 3:
                case 4:
                    dayKey = 'timer-day-2'
                    break;
                default:
                    dayKey = 'timer-day-3';
                    break;
            }


            timer_counter_day.setAttribute('data-key', dayKey);
            timer_counter_day.innerText = arrLang[lang][dayKey];

            /* Для работы таймера с секундами нужен будет блок с классом timer-counter-result-full

             setInterval(function() {
             now = Date.now();
             ts = (endDate - now) / 1000;
             days = Math.floor(ts / 86400);
             hours = Math.floor((ts % 86400) / 3600);
             minutes = Math.floor(((ts % 86400) % 3600) / 60);
             seconds = Math.floor(((ts % 86400) % 3600) % 60);

             hours = hours < 10 ? '0' + hours : hours;
             minutes = minutes < 10 ? '0' + minutes : minutes;
             seconds = seconds < 10 ? '0' + seconds : seconds;

             switch (seconds % 10) {
             case 1:
             if (seconds % 100 !== 11) {
             secKey = 'timer-second-1';
             }
             break;
             case 2:
             case 3:
             case 4:
             secKey = 'timer-second-2'
             break;
             default:
             secKey = 'timer-second-3';
             break;
             }

             switch (hours % 10) {
             case 1:
             if (hours % 100 !== 11) {
             hourKey = 'timer-hour-1';
             }
             break;
             case 2:
             case 3:
             case 4:
             hourKey = 'timer-hour-2'
             break;
             default:
             hourKey = 'timer-hour-3';
             break;
             }

             switch (minutes % 10) {
             case 1:
             if (minutes % 100 !== 11) {
             minuteKey = 'timer-minute-1';
             }
             break;
             case 2:
             case 3:
             case 4:
             minuteKey = 'timer-minute-2'
             break;
             default:
             minuteKey = 'timer-minute-3';
             break;
             }


             var str = [hours, arrLang[lang][hourKey], minutes, arrLang[lang][minuteKey], seconds, arrLang[lang][secKey]].join(' ');

             timer_counter.innerText = days;
             //timer_counter_full.innerText = str;

             timer_counter_day.innerHTML = arrLang[lang][dayKey] + '<br>' + str;



             }, 1000);
             */

        }
    }

    function save_local(name, value) {
        try {
            if (localStorage) {
                localStorage[name] = value;
            }

            if (sessionStorage) {
                sessionStorage[name] = value;
            }
        } catch (e) {
            return false;
        }

    }

    function get_local(name) {
        try {
            var value = localStorage[name] || sessionStorage[name] || '';
            return value;
        } catch (e) {
            return '';
        }
    }

    $('input[required], textarea[required]').on('change invalid', function() {
        var textfield = $(this).get(0);

        textfield.setCustomValidity('');

        if (!textfield.validity.valid) {
            var lang = identify_language(), key = $(this).data('key');
            if(typeof arrLang[lang] === 'undefined') {
                lang = 'en';
            }
            if(typeof key !== 'undefined') {
                textfield.setCustomValidity(arrLang[lang][key]);
            }
        }
    });

    var modalLangName = (navigator.language || 'en').split('-')[0];
    if(typeof arrLang[modalLangName] === 'undefined') {
        modalLangName = 'en';
    }

    //loadLang(modalLangName, function () {
        //translate_page_element(modalLangName, $('#modal_form .lang'));

        $('#modal_form .lang').each(function(index, element) {
            if (arrLang[modalLangName][$(this).data('key')] !== undefined) {
                $(this).html(arrLang[modalLangName][$(this).data('key')]);
            } else if (arrLang['en'][$(this).data('key')] !== undefined) {
                $(this).html(arrLang['en'][$(this).data('key')]);


                console.log('Translate error: ' + $(this).data('key') + ' - have no config elements in "' + modalLangName + '" language' + "\n");
            } else {

                console.log('Translate error FATALITY: ' + $(this).data('key') + ' - have no config elements' + "\n");
            }
        });

        window.showModalForm = getCookie('showModalForm') !== 'true';

        var link = location.search.replace('?', '&');

        window.showModalForm = window.showModalForm && (link.indexOf('&esub') !== -1 || link.indexOf('&utm_') !== -1);

        setTimeout(function() {
            if (window.showModalForm) {
                $('.over-modal').fadeIn(400,
                    function() {
                        $('#modal_form')
                            .css('display', 'block')
                            .animate({
                                opacity: 1
                            }, 120);
                    });
                $('body').addClass('modal-open');

                $('#modal_close').click(function() {
                    $('#modal_form')
                        .animate({
                                opacity: 0
                            }, 120,
                            function() {
                                $(this).css('display', 'none');
                                $('.over-modal').fadeOut(400);
                            }
                        );
                    $('body').removeClass('modal-open');
                });
                setCookie('showModalForm', 'true');
            }
        }, 10000);
    //}, function (ex) {
        //console.log(ex);
    //});

    $(document).mouseup(function(e) {
        if ($(".over-modal").css('display') == 'block') {
            var container = $("#modal_form");
            if (container.has(e.target).length === 0) {


                container.animate({
                        opacity: 0
                    }, 120,
                    function() {
                        $(this).css('display', 'none');
                        $('.over-modal').fadeOut(400);
                    }
                );
                $('body').removeClass('modal-open');
            }
        }
    });

    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // function checkWarning() {

    //     function checkFirst() {
    //         var wasVisible = (getCookie('plg_session') || localStorage['uid']) && getCookie('warningshown') !== '1';
				// 		var style;
    //         if (wasVisible) {
				// 				style = document.createElement('link');
				// 				style.href='./css/attention.css';
				// 				style.rel = 'stylesheet';
				// 				document.head.appendChild(style);
    //             setCookie('warningshown', 1);
    //             $('.attention').toggleClass('hiddenobject');
    //         }

    //         $('.attention .buttonclose').on('click', function() {

    //             $('.attention').addClass('hiddenobject');


    //         });
    //     }

    //     checkFirst();
    // }
});
function ShowMore0() {
    $('#showmore0').slideToggle(300);
	$('#buttonmore0').hide();
	$('#buttonless0').show();
}
function ShowLess0() {
    $('#showmore0').slideToggle(300);
	$('#buttonmore0').show();
	$('#buttonless0').hide();	
}
function ShowMore1() {
    $('#showmore1').slideToggle(300);
	$('#buttonmore1').hide();
	$('#buttonless1').show();
	$(location).href('#cards-legal');
}
function ShowLess1() {
    $('#showmore1').slideToggle(300);
	$('#buttonmore1').show();
	$('#buttonless1').hide();	
}
function ShowMore2() {
    $('#showmore2').slideToggle(300);
	$('#buttonmore2').hide();
	$('#buttonless2').show();
	$(location).href('#cards-legal');
}
function ShowLess2() {
    $('#showmore2').slideToggle(300);
	$('#buttonmore2').show();
	$('#buttonless2').hide();	
}
function ShowMore3() {
    $('#showmore3').slideToggle(300);
	$('#buttonmore3').hide();
	$('#buttonless3').show();
}
function ShowLess3() {
    $('#showmore3').slideToggle(300);
	$('#buttonmore3').show();
	$('#buttonless3').hide();	
}
function ShowMore4() {
    $('#showmore4').slideToggle(300);
	$('#buttonmore4').hide();
	$('#buttonless4').show();
}
function ShowLess4() {
    $('#showmore4').slideToggle(300);
	$('#buttonmore4').show();
	$('#buttonless4').hide();	
}
function ShowMoren1() {$('#showmoren1').slideToggle(300);$('#buttonmoren1').hide();$('#buttonlessn1').show();}
function ShowLessn1() {$('#showmoren1').slideToggle(300);$('#buttonmoren1').show();$('#buttonlessn1').hide();}
function ShowMoren2() {$('#showmoren2').slideToggle(300);$('#buttonmoren2').hide();$('#buttonlessn2').show();}
function ShowLessn2() {$('#showmoren2').slideToggle(300);$('#buttonmoren2').show();$('#buttonlessn2').hide();}
function ShowMoren3() {$('#showmoren3').slideToggle(300);$('#buttonmoren3').hide();$('#buttonlessn3').show();}
function ShowLessn3() {$('#showmoren3').slideToggle(300);$('#buttonmoren3').show();$('#buttonlessn3').hide();}
function ShowMoren4() {$('#showmoren4').slideToggle(300);$('#buttonmoren4').hide();$('#buttonlessn4').show();}
function ShowLessn4() {$('#showmoren4').slideToggle(300);$('#buttonmoren4').show();$('#buttonlessn4').hide();}

/*menu scrolling*/
$(document).on("scroll", function() {

	if($(document).scrollTop()>100) {
		$("nav").removeClass("large").addClass("small");
	} else {
		$("nav").removeClass("small").addClass("large");
	}
	
});
/*timer to date*/

var deadline = 'June 2 2018 12:00:00 GMT+0300';

function getTimeRemaining(endtime){
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    var days = Math.floor( t/(1000*60*60*24) );
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock(id, endtime){
    var clock = document.getElementById(id);
    function updateClock(){
        var t = getTimeRemaining(endtime);
        var daysSpan = clock.querySelector('.days');
        var hoursSpan = clock.querySelector('.hours');
        var minutesSpan = clock.querySelector('.minutes');
        var secondsSpan = clock.querySelector('.seconds');
        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = t.hours;
        minutesSpan.innerHTML = ":"+('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ":"+('0' + t.seconds).slice(-2);
        if(t.total<=0){

        }

    }

    updateClock(); // run function once at first to avoid delay
    var timeinterval = setInterval(updateClock,1000);
}

initializeClock('clockdiv', deadline);
