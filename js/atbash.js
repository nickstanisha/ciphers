function encode_atbash(message) {
	var num;
	var new_msg = [];
	for (i in message) {
		num = message.charCodeAt(i);
		if (isLetter(num)) {
			if (num >= 97) {
				new_msg.push((25 - (num - 97)) + 97);
			} else {
				new_msg.push((25 - (num - 65)) + 65);
			}
		} else {
			new_msg.push(num);
		}
	}

	return String.fromCharCode.apply(this, new_msg);
}

function decode_atbash(message) {
	return encode_atbash(message);
}