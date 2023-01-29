import generator from 'creditcard-generator';
import identifyCard from 'credit-card-identifier'

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
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
};

export const hideNumberCard = (number) => {
  if (number !== undefined || number !== null) {
    number = number.toString();
    var acumulator = '';
    for (let i = 0; i < number.length; i++) {
      if (i < 12) {
        acumulator = acumulator + ''
      } else {
        acumulator = acumulator + number[i]
      }
    }

    return acumulator;
  }
}

export const agregarCaracter = (cadena, caracter, pasos) => {
  let cadenaConCaracteres = "";
  const longitudCadena = cadena.length;
  for (let i = 0; i < longitudCadena; i += pasos) {
      if (i + pasos < longitudCadena) {
          cadenaConCaracteres += cadena.substring(i, i + pasos) + caracter;
      } else {
          cadenaConCaracteres += cadena.substring(i, longitudCadena);
      }
  }
  return cadenaConCaracteres;
}

export const cartType = (num) => identifyCard(num)