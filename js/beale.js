/* Note that these functions rely on the global variable "declaraion"
See get_data.js for the declaration of independence encoding */

function encode_beale(message) {
	message = message.toLowerCase();
	var num;
	var encode_array;
	var new_msg = [];
	for (i in message) {
		num = message.charCodeAt(i);
		if (isLetter(num)) {
			encode_array = declaration["encode"][message[i]]
			new_msg.push(encode_array[Math.floor(Math.random() * encode_array.length)] + 1);
		} else {
			new_msg.push(message[i]);
		}
	}

	return new_msg.join(' ');
}

function decode_beale(message) {
	var num, letters;
	var new_msg = "";
	var words = message.split("  ");
	for (i in words) {
		letters = words[i].split(" ");
		for (j in letters) {
			if (letters[j] !== "") {
				if (!isNaN(+letters[j]) && +letters[j] <= declaration["decode"].length) {
					new_msg += declaration["decode"][letters[j] - 1];
				} else {
					new_msg += letters[j];
				}
			}
		}
		new_msg += " ";
	}
	return new_msg;
}