/* LANG LOCATTION ===================================
=====================================================*/
var DEFAULT_LANGUAGE = 'en';

var arrLang = {};

loadLang(DEFAULT_LANGUAGE, function () {
		console.log('Loaded '+DEFAULT_LANGUAGE);
});

var arrLangSelect = {
   'en' : {
      'img' : 'img/icons/flag-eng.png',
      'title': 'English',
   },
      'ru' : {
      'img' : 'img/icons/flag-rus.png',
      'title': 'Русский',
   },
   //    'cn' : {
   //    'img' : 'img/icons/flag-china.png',
   //    'title': '中文',
   // },
   //    'ms' : {
   //    'img' : 'img/icons/MS.png',
   //    'title': 'Bahasa Melayu',
   // },
   //    'ar' : {
   //    'img' : 'img/icons/AR.png',
   //    'title': 'ﺔﻴﺑﺮﻌﻟا‏',
   // },
   //    'ko' : {
   //    'img' : 'img/icons/KO.png',
   //    'title': '한국어',
   // },
   //    'pt' : {
   //    'img' : 'img/icons/PT.png',
   //    'title': 'Português',
   // },
   //    'tr' : {
   //    'img' : 'img/icons/TR.png',
   //    'title': 'Türkçe',
   // },
   //    'es' : {
   //    'img' : 'img/icons/ES.png',
   //    'title': 'Español',
   // }
};
