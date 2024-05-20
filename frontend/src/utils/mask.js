export const stringToNumber = (number) => {
  if (!number) {
    return ' ';
  }

  number = String(number);
  return Number(number.match(/\d/g).join(''));
};

export const formatCurrency = (money) => {
  const currency = money.replaceAll('.', '').replace(',', '.');
  return Number(currency.replace(/[^0-9.-]+/g, ''));
};

export const removeSpecialCharacter = (string) => {
  return string.replace(/[^a-zA-Z0-9]+/g, '');
};

export const numberToString = (number) => {
  if (!number) {
    return '';
  }

  return parseFloat(number).toFixed(2).replace(/\./g, ',');
};

export const numberStringToNumber = (number) => {
  if (!number) {
    return '';
  }

  return Number(number.replace(/\./g, '').replace(/\,/, '.'));
};

export const cpfFormater = (cpf) => {
  if (!cpf) {
    return '';
  }

  cpf = cpf.replace(/[^\d]/g, '');
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export const cnpjFormater = (cnpj) => {
  if (!cnpj) {
    return '';
  }

  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};

export const telephoneFormater = (number) => {
  if (!number) {
    return '';
  }

  number = String(number);

  if (number.length > 10) {
    return number.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else {
    return number.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
};

export const formatNumberToBRL = (numStr) => {
  const numberFixed = parseFloat(String(numStr / 100)).toFixed(2);
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })
    .format(+numberFixed)
    .slice(0, -2);
};
