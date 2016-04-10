function encode_provenzano(message, key) {
	key = key % 26;
	message = message.toLowerCase();
	var num;
	var new_msg = [];
	for (i in message) {
		num = message.charCodeAt(i);
		if (isLetter(num)) {
			new_msg.push((num+key-97)%26);
		} else {
			new_msg.push(message[i]);
		}
	}

	return new_msg.join(' ');
}

function decode_provenzano(message, key) {
	key = key % 26;
	var num, letters;
	var new_msg = "";
	var words = message.split('  ');
	for (i in words) {
		letters = words[i].split(' ');
		for (j in letters) {
			if (letters[j] !== "") {
				num = +letters[j];
				if (isLetter(num + 97)) {
					num -= key;
					if (num < 0) {
						num = 26 + num;
					}
					new_msg += String.fromCharCode(num + 97);
				} else {
					new_msg += letters[j];
				}
			}
		}
		new_msg += " ";
	}
	return new_msg;
}