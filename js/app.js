function isLetter(num) {
  return ((num >= 97 && num <=122) || (num >= 65 && num <= 90))
}

var key_req = {'caesar': 'numeric',
               'vigenere': 'alphabet',
               'provenzano': 'numeric',
               'atbash': '',
               'beale': ''};

function valid_key(cipher, key) {
  if (key_req[cipher] == "") {
    return true;
  } else if (key_req[cipher] == "numeric") {
    return (!isNaN(+key) && +key >= 0);
  } else if (key_req[cipher] == 'alphabet') {
    var RegExpression = /^[a-zA-Z]*$/;
    return RegExpression.test(key.replace(/\s+/g, ''));
  }
};

var description = {'caesar': "One of the simplest and earliest known ciphers, the Caesar cipher is \
                              created by shifting all letters in a message by a fixed amount. \
                              This amount is the cipher's key. For a key of 1, A is replaced by B, B by C, \
                              etc. until Z is replaced with A. The Caesar cipher is considered weak because, \
                              even without knowledge of the key, the original message can be determined by \
                              examining the frequency of the letters that appear in the message. The Caesar cipher was \
                              named after Julius Ceasar who encrypted military messages using 3 as his key.",
                'vigenere' : 'A Vigen&egrave;re cipher is like a bunch of Caesar ciphers put together. Unlike \
                              the Caesar cipher, a Vigen&egrave;re cipher\'s keyword is a passphrase. Each letter \
                              in the message is translated according to the position in the alphabet of the \
                              corresponding letter in the passphrase (looping back to the beginning if the message \
                              is longer than the passphrase).  A Vigen&egrave;re cipher using the key "abcd" would \
                              keep the first letter the same, shift the second letter by one, the third by two, and \
                              the fourth by three before looping and keeping the fifth letter the same. During the US \
                              Civil War, the Confederate states communicated using Vigen&egrave;re ciphers with the \
                              passphrases "Manchester Bluff", "Complete Victory" and "Come Retribution".<br>A \
                              Vigen&egrave;re cipher is much harder to crack than a Caesar cipher-- in fact, if the \
                              key used is longer than the message, frequency analysis (which can be used to break the \
                              Caesar cipher) becomes impossible. <a href="https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher#Cryptanalysis">A series of more sophisticated methods</a> \
                              must be used to crack the Vigen&egrave;re cipher reliably.',
              'provenzano' : 'Infamously used by Mafia boss Bernardo Provenzano, this cipher is a simple \
                              variation on a Caesar cipher where, instead of translating each letter to a new \
                              letter in the alphabet, the letters are first translated to numbers representing \
                              their position in the alphabet, and those numbers are incremented by the key. \
                              Provenzano used the key "4" to translate every "A" in his messages to the number \
                              "4", "B" to "5" etc. Partly because Caesar ciphers are \
                              <a href="https://en.wikipedia.org/wiki/Caesar_cipher#Breaking_the_cipher">easy to break</a> \
                              by frequency analysis or plain old guessing, Bernardo Provenzano was captured in Sicily \
                              in 2006.',
              'atbash'     : 'The Atbash cipher is created by replacing each letter in a message with the corresponding letter \
                              in the reversed alphabet (i.e. A -> Z, B -> Y, ...). Originally developed in the Hebrew alphabet, the name \
                              "Atbash" come from the first, second, second-to-last, and last letters of the Hebrew alphabet: \
                              Aleph, Tav, Beth, and Shin.',
              'beale'      : 'Between 1819 and 1821, an otherwise ordinary man named Thomas J. Beale buried a secret treasure in \
                              Bedford County Virginia. Before mysteriously vanishing, he left a box containing 3 encrypted messages \
                              with a local innkeeper named Robert Morriss. These encrypted messages became known as the \
                              Beale papers and describe the location, content, and rightful heirs to Beale\'s fortune. \
                              To date, only one of the three encrypted messages has been deciphered. If \
                              <a href="https://en.wikipedia.org/wiki/Beale_ciphers#The_deciphered_message">the contents of the deciphered \
                              message</a> are true, Beale\'s treasure is currently worth more than $63 million.<br> \
                              The only one of Beale\'s papers ever deciphered used a code based on the text of the Declaration of \
                              Independence. To encode his message, Beale replaced each letter with the index of a random word in \
                              the Declaration of Independence beginning with that letter (i.e. the letter "e" could be replaced with \
                              the index of any word in the Declaration beginning with the letter "e"). Because there are no words \
                              in the Declaration of Independence beginning with X, Y or Z, Beale chose word 811 to represent "y" and \
                              word 1005 to represeent "x". I have arbitrarily chosen word 1015 for "z".'};

/* Highlights the key box in light red if not applicable */
function key_highlighter() {
  var selected = $("#cipher-options").val();
  $("#description").html(description[selected]);
  $("#cipher_key").css('background-color', function () {
    if (key_req[selected] == "") {
      return '#ff9999';
    } else {
      return 'white';
    }
  });
}

/**
 * Checks if key is valid. Returns false and triggers error message
 * on page if incorrect. Else, returns true 
 * @param {string, int} key - Key provided by user
 * @param {string} selected - Name of the cipher selected
 */
function check_key(key, selected) {
  if (key == "" && key_req[selected] != "") {
    $("#error_msg").text("A valid cipher key must be provided!");
    return false;
  } else if (!valid_key(selected, key)) {
    if (key_req[selected] == 'numeric') {
      $("#error_msg").text("Current cipher requires a positive numeric key.");
    } else if (key_req[selected] == 'alphabet') {
      $("#error_msg").text("Current cipher requires a key containing only letters.");
    }
    return false;
  }
  return true;
}

/* Contains functions for encoding and decoding */
var functions = {'encode': {'provenzano': encode_provenzano,
                            'caesar'    : encode_caesar,
                            'vigenere'  : encode_vigenere,
                            'atbash'    : encode_atbash,
                            'beale'     : encode_beale},
                 'decode': {'provenzano': decode_provenzano,
                            'caesar'    : decode_caesar,
                            'vigenere'  : decode_vigenere,
                            'atbash'    : decode_atbash,
                            'beale'     : decode_beale}};

$(document).ready(function(){
  key_highlighter();


  $("#cipher-options").change(key_highlighter);

  $(".btn").click(function(){
    var selected = $("#cipher-options").val();
    var key = $("#cipher_key").val();
    if ($(this).attr('id') == 'encode') {
      var source = "#decoded_box";
      var dest = "#encoded_box";
      var direction = 'encode';
    } else {
      var source = "#encoded_box";
      var dest = "#decoded_box";
      var direction = 'decode';
    }
    if (check_key(key, selected)) {
      $("#error_msg").text("");
      if ($(source).val() !== "") {
        var message = $(source).val();
        switch ($("#cipher-options").val()) {
          case 'caesar':
            $(dest).val(functions[direction]['caesar'](message, key));
            $(source).val("");
            break;

          case 'vigenere':
            $(dest).val(functions[direction]['vigenere'](message, key.replace(/\s+/g, '')));
            $(source).val("");
            break;

          case 'provenzano':
            $(dest).val(functions[direction]['provenzano'](message, key));
            $(source).val("");
            break;

          case 'atbash':
            $(dest).val(functions[direction]['atbash'](message));
            $(source).val("");
            break;

          case 'beale':
            $(dest).val(functions[direction]['beale'](message));
            $(source).val("");
            break;
        }
      }
    }
  });
});
