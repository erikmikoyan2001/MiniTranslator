// Этот файл отвечает за вывод предупреждения, и обработки получения токена.

// Нужные элементы из страницы
const warningWindow = document.getElementById('warningWindow');
const mainWindow = document.getElementById('mainWindow');

const inputUserToken = document.getElementById('inputUserToken');
const buttonGetUserToken = document.getElementById('buttonGetUserToken');
const buttonDeleteUserToken = document.getElementById('buttonDeleteUserToken');

function checkToken () {
  // Функция проверки токена.
  // Если токена нет, то выводит окно предупреждения.
  localStorage.getItem('token') ? warningWindow.remove(): mainWindow.remove()
}

// Добавление токена
function getToken () {
	var token = inputUserToken.value;
	var http = new XMLHttpRequest();
	var url = `https://translate.yandex.net/api/v1.5/tr.json/translate`;

	http.open('POST', url);
	http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	http.onreadystatechange = () => {
		result = JSON.parse(http.responseText);
		
		if (result.code == 401){
			userTokenField.style.background = 'red';
		} else {
			localStorage.setItem('token', token)
			location.reload()
		}
	};

	http.send(`key=${token}&lang=ru&text=house`);
};

function deleteToken(){
	let result = confirm('Вы уверены что хотите удалить токен? \
В таком случае вы не сможете пользоватся переводом.');
	if (result){
		localStorage.removeItem('token');
		location.reload();
	}
}

document.addEventListener('DOMContentLoaded', checkToken);
buttonGetUserToken.addEventListener('click', getToken);
buttonDeleteUserToken.addEventListener('click', deleteToken)