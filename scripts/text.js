// Этот файл отвечает за перевод текста и контроля языков.

// Элементы из меню выбора языков
const selectLanguageOriginal = document.getElementById('selectLanguageOriginal');
const selectLanguageTranslation = document.getElementById('selectLanguageTranslation');
const buttonChangeLanguage = document.getElementById('buttonChangeLanguage');

// Элементы из меню ввода и вывода текста
const textOriginal = document.getElementById('textOriginal');
const textTranslated = document.getElementById('textTranslated');
const buttonGetText = document.getElementById('buttonGetText');

// Выбор языка

function updateLanguageSelects () {
  let event = new Event('change');
	selectLanguageOriginal.dispatchEvent(event);
	selectLanguageTranslation.dispatchEvent(event);
}

selectLanguageOriginal.onchange = () => {
	var allLanguages = selectLanguageTranslation.getElementsByTagName('option');
	
	for (var i = 0; i < allLanguages.length; i++){
		if (selectLanguageOriginal.value == allLanguages[i].value){
			allLanguages[i].disabled = true;
		} else{
			allLanguages[i].disabled = false;
		};
	};
};

selectLanguageTranslation.onchange = () => {
	var allLanguages = selectLanguageOriginal.getElementsByTagName('option');
  
	for (var i = 0; i < allLanguages.length; i++){
		if (selectLanguageTranslation.value == allLanguages[i].value){
			allLanguages[i].disabled = true;
		} else{
			allLanguages[i].disabled = false;
		};
	};
};

buttonChangeLanguage.onclick = () => {
	var bufer = selectLanguageTranslation.value;
  
	selectLanguageTranslation.value = selectLanguageOriginal.value;
	selectLanguageOriginal.value = bufer;

	updateLanguageSelects()
};

updateLanguageSelects()

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





