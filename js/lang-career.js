/* LANG LOCATTION ===================================
=====================================================*/
var DEFAULT_LANGUAGE = 'ru';

var arrLang = {};

loadLang(DEFAULT_LANGUAGE, function () {
		console.log('Loaded '+DEFAULT_LANGUAGE);
});

var arrLangSelect = {
      'ru' : {
      'img' : 'img/icons/flag-rus.png',
      'title': 'Русский',
   }
};
