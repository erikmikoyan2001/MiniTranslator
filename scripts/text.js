// Этот файл отвечает за перевод текста и контроля языков.

// 1. Проверяет, есть ли выбранные языки. 
//    При отсутствии устанавливает по умолчанию.
//    (Функция checkLanguage)
// 2. 'Выключает' выбранные языки в противоположном поле.
//    (Функция updateLanguageSelects)

// Элементы из меню выбора языков
const selectLanguageOriginal = document.getElementById('selectLanguageOriginal');
const selectLanguageTranslation = document.getElementById('selectLanguageTranslation');
const buttonChangeLanguage = document.getElementById('buttonChangeLanguage');

// Элементы из меню ввода и вывода текста
const textOriginal = document.getElementById('textOriginal');
const textTranslated = document.getElementById('textTranslated');
const buttonGetText = document.getElementById('buttonGetText');

// Проверка наличия выбранных языков
function checkLanguage () {
  // Если языков нет, устанавливает языки по умолчанию
  // Язык оригинала -- Английский 
  // Язык перевода -- Русский
  let originalLanguage = localStorage.getItem('originalLanguage');
  let translationLanguage = localStorage.getItem('translationLanguage');

  if (originalLanguage){
    selectLanguageOriginal.value = originalLanguage;
    selectLanguageTranslation.value = translationLanguage;
  } else {
    selectLanguageOriginal.value = 'en';
    selectLanguageTranslation.value = 'ru';
  }
}

// Обновление списка языков
function updateLanguageSelects () {
  let event = new Event('change');
	selectLanguageOriginal.dispatchEvent(event);
	selectLanguageTranslation.dispatchEvent(event);
}

// Изменение языка
function changeLanguage (allLanguages, elementValue, fieldName) {
	for (var i = 0; i < allLanguages.length; i++){
		allLanguages[i].disabled = (elementValue == allLanguages[i].value);
  };
  localStorage.setItem(fieldName, elementValue);
}

// Изменить язык оригинала
selectLanguageOriginal.onchange = () => {
  changeLanguage(selectLanguageTranslation.getElementsByTagName('option'),
                 selectLanguageOriginal.value,
                 'originalLanguage');          
};

// Изменить язык перевода
selectLanguageTranslation.onchange = () => {
  changeLanguage(selectLanguageOriginal.getElementsByTagName('option'), 
                 selectLanguageTranslation.value,
                 'translationLanguage');               
};

// Поменять язык оригинала и язык перевода
buttonChangeLanguage.onclick = () => {
	var bufer = selectLanguageTranslation.value;
  
	selectLanguageTranslation.value = selectLanguageOriginal.value;
	selectLanguageOriginal.value = bufer;

	updateLanguageSelects()
};

// Перевод текста
buttonGetText.onclick = () => {
	var http = new XMLHttpRequest();
	var url = `https://translate.yandex.net/api/v1.5/tr.json/translate`;
	var token = localStorage.getItem('token')

	http.open('POST', url);

	http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

	http.onreadystatechange= () => {
		var result = JSON.parse(http.responseText);
		textTranslated.value = result.text[0];
	};

  http.send(`key=${token}\
  &lang=${selectLanguageOriginal.value}-${selectLanguageTranslation.value}\
  &text=${encodeURI(textOriginal.value)}`);
};

// Проверка на наличие выбранных языков
document.addEventListener('DOMContentLoaded', checkLanguage);
// Установка языков
document.addEventListener('DOMContentLoaded', updateLanguageSelects);
// Нажатие на ENTER
document.addEventListener('keydown', (key) => {
  if (key.code == 'Enter') {
	  let event = new Event('click');
	  buttonGetText.dispatchEvent(event);
  };
});