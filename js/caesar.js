function encode_caesar(message, key) {
  key = key % 26;
  var num;
  var new_msg = [];
  for (i in message) {
    num = message.charCodeAt(i);
    if (isLetter(num)) {
      if (num >= 97) {
        new_msg.push((num+key-97)%26 + 97);
      } else {
        new_msg.push((num+key-65)%26 + 65);
      }
    } else {
      new_msg.push(num);
    }
  }

  return String.fromCharCode.apply(this, new_msg);
}

function decode_caesar(message, key) {
  key = key % 26;
  var num;
  var new_msg = [];
  for (i in message) {
    num = message.charCodeAt(i);
    if (isLetter(num)) {
      if (num >= 97) {
        num -= key + 97;
        if (num < 0) {
          num = 26 + num;
        }
        new_msg.push(num%26 + 97);
      } else {
        num -= key + 65;
        if (num < 0) {
          num = 26 + num;
        }
        new_msg.push(num%26 + 65);
      }
    } else {
      new_msg.push(num)
    }
  }
  return String.fromCharCode.apply(this, new_msg);
}