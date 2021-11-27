String.prototype.substrSearchAutomata = function (substr) {	
	let table = getTransitionTable(substr);
	let data = this;
	let result = new Array();
	
	let position = 0;
	for(let i = 0; i < data.length; i++) {
		if (table[position][data.charAt(i)] != undefined) { 
			position = table[position][data.charAt(i)];
			if (position == substr.length)
				result.push(i - substr.length + 1);
		} else 
			position = 0;
	}
	return result;	
}


function getTransitionTable(substr) {
	let alph = new Array();
	
	//Определяем алфавит строки substr
	for(let letter of substr)
		alph[letter] = 0;
	
	// "Двумерный" массив del - таблица переходов
	let del = new Array(substr.length + 1);
	for(let i = 0; i < del.length; i++)
		del[i] = new Array();
	
	//Инициализия таблицы переходов
	for(i in alph)
		del[0][i] = 0;
	
	//Формирование таблицы переходов
	for(let j = 0; j < substr.length; j++) {
		let prev = del[j][substr.charAt(j)];
		del[j][substr.charAt(j)]= j + 1;
		for(i in alph)
			del[j+1][i] = del[prev][i];
	}
	return del;	
}
