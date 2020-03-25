// Этот файл отвечает за перевод текста и контроля языков.

// Элементы из меню выбора языков
const selectLanguageOriginal = document.getElementById('selectLanguageOriginal');
const selectLanguageTranslation = document.getElementById('selectLanguageTranslation');
const buttonChangeLanguage = document.getElementById('buttonChangeLanguage');

// Элементы из меню ввода и вывода текста
const textOriginal = document.getElementById('textOriginal');
const textTranslated = document.getElementById('textTranslated');
const buttonGetText = document.getElementById('buttonGetText');


function updateLanguageSelects () {
  // Обновление списка языков
  let event = new Event('change');
	selectLanguageOriginal.dispatchEvent(event);
	selectLanguageTranslation.dispatchEvent(event);
}

function changeLanguage (allLanguages, elementValue) {
  // Изменение языка
	for (var i = 0; i < allLanguages.length; i++){
		allLanguages[i].disabled = (elementValue == allLanguages[i].value);
	};
}

selectLanguageOriginal.onchange = () => {
  changeLanguage(selectLanguageTranslation.getElementsByTagName('option'),
                 selectLanguageOriginal.value);
};

selectLanguageTranslation.onchange = () => {
  changeLanguage(selectLanguageOriginal.getElementsByTagName('option'), 
                 selectLanguageTranslation.value)
};

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

updateLanguageSelects()