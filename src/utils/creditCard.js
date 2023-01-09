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