(function() {

    var urlTemplate = './js/langs/lang.{LANG}.js';

    window.loadLang = function(lang, callback, errorHandler) {

        var scEl;

        try {

            if (!arrLang || !arrLang[lang]) {
                scEl = document.createElement('script');
                scEl.src = urlTemplate.replace('{LANG}', lang);
                

                if (typeof callback === 'function') {
                    scEl.onload = callback;
                }

								document.body.appendChild(scEl);

								
            } else {

                callback();
            }

            return true;

        } catch (ex) {

            if (typeof errorHanlder === 'function') {
                errorHandler(ex);
            }


            return false;

        }

    };


}());
