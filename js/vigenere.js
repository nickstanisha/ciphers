function caesarKey(let) {
	if (let.charCodeAt(0) >= 97) {
		return let.charCodeAt(0) - 97;
	} else {
		return let.charCodeAt(0) - 65;
	}
}

function encode_vigenere(msg, key) {
	var j = 0;
	var new_msg = "";

	for (i in msg) {
		if (isLetter(msg.charCodeAt(i))) {
			new_msg += encode_caesar(msg[i], caesarKey(key[j]));
			j = (j + 1) % key.length;
		} else {
			new_msg += msg[i];
		}
	}

	return new_msg;
}

function decode_vigenere(msg, key) {
	var j = 0;
	var new_msg = "";

	for (i in msg) {
		if (isLetter(msg.charCodeAt(i))) {
			new_msg += decode_caesar(msg[i], caesarKey(key[j]));
			j = (j + 1) % key.length;
		} else {
			new_msg += msg[i];
		}
	}

	return new_msg;
}