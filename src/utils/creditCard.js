import generator from 'creditcard-generator';

export const valide_a_credit_card = (numbercc) => {
  //only digits, dashes 
  if (/[^0-9-\s]+/.test(numbercc)) return false;

  // The Credit card luhn algorithm (easiest). 
  var qCheck = 0, nigit = 0, bEven = false;
  numbercc = numbercc.replace(/\D/g, "");

  for (var n = numbercc.length - 1; n >= 0; n--) {
    var cigit = numbercc.charAt(n);
    nigit = parseInt(cigit, 10);

    if (bEven) {
      if ((nigit *= 2) > 9) nigit -= 9;
    }

    qCheck += nigit;
    bEven = !bEven;
  }

  return (qCheck % 10) === 0;
}

export const creditCard = generator.GenCC()[0];

export const currencyFormat = (num) => {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export const uuid = () => {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
};