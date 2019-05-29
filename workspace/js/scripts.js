/*
Toggle variable header - Code by Zsolt Király
v1.1.4 - 2018-3-28
*/

'use strict';
var toggle = function() {

    function signatura() {
        if (window['console']) {
            const text = {
                black: '%c     ',
                blue: '%c   ',
                author: '%c  Zsolt Király  ',
                github: '%c  https://zsoltkiraly.com/'
            }

            const style = {
                black: 'background: #282c34',
                blue: 'background: #61dafb',
                author: 'background: black; color: white',
                github: ''
            }

            console.log(text.black + text.blue + text.author + text.github, style.black, style.blue, style.author, style.github);
        }
    }

    signatura();

    if (!Element.prototype.matches)
        Element.prototype.matches = Element.prototype.msMatchesSelector || 
                                    Element.prototype.webkitMatchesSelector;
                                    
    if (!Element.prototype.closest) {
        Element.prototype.closest = function(s) {
            var el = this;
            if (!document.documentElement.contains(el)) return null;
            do {
                if (el.matches(s)) return el;
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1); 
            return null;
        };
    }

    function firstElementOpen(toggle, config) {

        if (config.firstOpen == true) {
            var firstElement = toggle[0];
            var arrowIcon = firstElement.firstElementChild.querySelector('i');
            var toggleContent = firstElement.lastElementChild.firstElementChild;

            upAdd(arrowIcon, config);

            toggleContent.classList.remove('collapsed');
            toggleContent.classList.add('expand');
            toggleContent.style.marginTop = 0;
            toggleContent.style.display = 'block';
        }
    }

    function setTopAttribute(margin) {
        var height = margin.offsetHeight;
        margin.setAttribute('data-margin', height);
    }

    function setMarginTop(margin) {
        margin.style.marginTop = '-' + margin.getAttribute('data-margin') + 'px';
    }

    function displayNone(none) {
        none.style.display = 'none';
    }

    function displayBlock(block) {
        block.style.display = 'block';
    }

    function marginTop(zero) {
        zero.style.marginTop = 0 + 'px';
    }

    function upAdd(arrowIcon, config) {
        arrowIcon.classList.add('' + config.upArrow + '');
        arrowIcon.classList.remove('' + config.downArrow + '');
    }

    function downAdd(arrowIcon, config) {
        arrowIcon.classList.add('' + config.downArrow + '');
        arrowIcon.classList.remove('' + config.upArrow + '');
    }

    function addShow(element) {
        element.classList.add('expand');
        element.classList.remove('collapsed');
    }

    function addHide(element) {
        element.classList.add('collapsed');
        element.classList.remove('expand');
    }

    function toggle(toggler, config) {
        var i = 0,
            len = toggler.length,
            togglerContentArrays = [];

        for (; i < len; i++) {

            var toggle = toggler[i],
                toggleHeader = toggle.querySelector('.header'),
                toggleI = toggleHeader.querySelector('i'),
                wrapper = toggle.querySelector('.wrapper'),
                wrapperContent = wrapper.querySelector('.container');

            togglerContentArrays.push(toggle);
            wrapperContent.classList.remove('hide');

            var toggleI = document.createElement('I');
            toggleI.setAttribute('class', config.downArrow);
            toggleHeader.appendChild(toggleI);

            wrapperContent.style.WebkitTransition = 'margin-top ' + config.time + 'ms ease';
            wrapperContent.style.transition = 'margin-top ' + config.time + 'ms ease';

            function resize() {
                var i = 0,
                    lenTop = togglerContentArrays.length;
                for (; i < lenTop; i++) {
                    var toggleTop = togglerContentArrays[i];

                    var wrapperTop = toggleTop.querySelector('.wrapper'),
                        wrapperContentTop = wrapperTop.querySelector('.container');

                    if (wrapperContentTop.classList.contains('expand')) {
                        setTopAttribute(wrapperContentTop);

                    } else {

                        wrapperContentTop.style.display = 'block';

                        setTopAttribute(wrapperContentTop);
                        setMarginTop(wrapperContentTop);
                        displayNone(wrapperContentTop);
                    }
                }
            }

            function header(o) {
                if (config.toggleOneExpand == true) {

                    var i = 0,
                        lenArray = togglerContentArrays.length;
                    for (; i < lenArray; i++) {
                        var togglerContentArray = togglerContentArrays[i],
                            toggleHeader = togglerContentArray.querySelector('.header'),
                            toggleWrapper = togglerContentArray.querySelector('.wrapper'),
                            toggleContent = toggleWrapper.querySelector('.container'),
                            toggleI = toggleHeader.querySelector('i');

                        togglerContentArray.classList.add('click-disabled');

                        if (toggleHeader == o) {
                            if (toggleContent.classList.contains('collapsed')) {
                                addShow(toggleContent);
                                upAdd(toggleI, config);
                                displayBlock(toggleContent);

                                setTimeout(function() {
                                    var i = 0,
                                        lenStartTime = togglerContentArrays.length;
                                    for (; i < lenStartTime; i++) {
                                        var startTime = togglerContentArrays[i],
                                            headerStartTime = startTime.querySelector('.header'),
                                            wrapperStartTime = startTime.querySelector('.wrapper'),
                                            contentStartTime = wrapperStartTime.querySelector('.container');

                                        if (headerStartTime == o) {
                                            marginTop(contentStartTime);
                                        }
                                    };
                                }, 50);


                            } else {
                                addHide(toggleContent);
                                downAdd(toggleI, config);
                                setTopAttribute(toggleContent);
                                setMarginTop(toggleContent);

                            }
                        } else {
                            addHide(toggleContent);
                            downAdd(toggleI, config);
                            setMarginTop(toggleContent);
                        }
                    };

                    setTimeout(function() {
                        var i = 0,
                            lenFinishTime = togglerContentArrays.length;
                        for (; i < lenFinishTime; i++) {

                            var finishTime = togglerContentArrays[i],
                                headerFinishTime = finishTime.querySelector('.header'),
                                wrapperFinishTime = finishTime.querySelector('.wrapper'),
                                contentFinishTime = wrapperFinishTime.querySelector('.container');

                            finishTime.classList.remove('click-disabled');

                            if (headerFinishTime == o) {
                                if (!(contentFinishTime.classList.contains('expand'))) {
                                    displayNone(contentFinishTime);
                                }

                            } else {
                                displayNone(contentFinishTime);
                            }
                        };
                    }, config.time);

                } else if (config.toggleOneExpand == false) {

                    var container = o.closest('.toggle');

                    var wrapper = container.querySelector('.wrapper'),
                        content = wrapper.querySelector('.container'),
                        icon = o.querySelector('i');

                    container.classList.add('click-disabled');

                    setTimeout(function() {
                        container.classList.remove('click-disabled');
                    }, config.time);

                    if (content.classList.contains('collapsed')) {
                        addShow(content);
                        upAdd(icon, config);
                        displayBlock(content);

                        setTimeout(function() {
                            marginTop(content);
                        }, 50);

                    } else {
                        addHide(content);
                        setTopAttribute(content);
                        setMarginTop(content);

                        setTimeout(function() {
                            displayNone(content);
                        }, config.time);

                        downAdd(icon, config);
                    }
                }
            }

            window.addEventListener('resize', function() {
                resize();
            }, false);

            setTopAttribute(wrapperContent);
            setMarginTop(wrapperContent);
            displayNone(wrapperContent);

            toggleHeader.addEventListener('click', function() {
                var obj = this;
                header(obj);
            }, false);
        }
    };


    function loading(container) {
        setTimeout(function() {
            container.classList.remove('show');

            setTimeout(function() {
                container.classList.remove('loading');
            }, 500);

        }, 500);
    }

    function app(config) {

        var toggleId = document.querySelector('#' + config.contentBox +'');

        if(toggleId) {
            var toggler = toggleId.querySelectorAll('.' + config.toggleGlobalClass);
            toggle(toggler, config);
            firstElementOpen(toggler, config);
            loading(toggleId);
        }
    };

    return {
        app: app
    }
}();
