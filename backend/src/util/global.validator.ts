import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator"

function isValidCPF(cpf) {
  if (typeof cpf !== "string") return false
  cpf = cpf.replace(/[\s.-]*/igm, '')
  if (
    !cpf ||
    cpf.length != 11 ||
    cpf == "00000000000" ||
    cpf == "11111111111" ||
    cpf == "22222222222" ||
    cpf == "33333333333" ||
    cpf == "44444444444" ||
    cpf == "55555555555" ||
    cpf == "66666666666" ||
    cpf == "77777777777" ||
    cpf == "88888888888" ||
    cpf == "99999999999"
  ) {
    return false
  }
  var soma = 0
  var resto
  for (var i = 1; i <= 9; i++)
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
  resto = (soma * 10) % 11
  if ((resto == 10) || (resto == 11)) resto = 0
  if (resto != parseInt(cpf.substring(9, 10))) return false
  soma = 0
  for (var i = 1; i <= 10; i++)
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
  resto = (soma * 10) % 11
  if ((resto == 10) || (resto == 11)) resto = 0
  if (resto != parseInt(cpf.substring(10, 11))) return false
  return true
}

function isValidCnpj(cnpj) {
  // Verifica se a variável cnpj é igua a "undefined", exibindo uma msg de erro
  if (this.cnpj === undefined) {
    return false;
  }

  // Esta função retira os caracteres . / - da string do cnpj, deixando apenas os números 
  var strCNPJ = this.cnpj.replace('.', '').replace('.', '').replace('/', '').replace('-', '');

  // Testa as sequencias que possuem todos os dígitos iguais e se o cnpj não tem 14 dígitos, retonando falso e exibindo uma msg de erro
  if (strCNPJ === '00000000000000' || strCNPJ === '11111111111111' || strCNPJ === '22222222222222' || strCNPJ === '33333333333333' ||
    strCNPJ === '44444444444444' || strCNPJ === '55555555555555' || strCNPJ === '66666666666666' || strCNPJ === '77777777777777' ||
    strCNPJ === '88888888888888' || strCNPJ === '99999999999999' || strCNPJ.length !== 14) {
    return false;
  }

  // A variável numeros pega o bloco com os números sem o DV, a variavel digitos pega apenas os dois ultimos numeros (Digito Verificador).
  var tamanho = strCNPJ.length - 2;
  var numeros = strCNPJ.substring(0, tamanho);
  var digitos = strCNPJ.substring(tamanho);
  var soma = 0;
  var pos = tamanho - 7;

  // Os quatro blocos seguintes de funções irá reaizar a validação do CNPJ propriamente dito, conferindo se o DV bate. Caso alguma das funções não consiga verificar
  // o DV corretamente, mostrará uma mensagem de erro ao usuário e retornará falso, para que o usário posso digitar novamente um número 
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(0)) {
    return false;
  }

  tamanho = tamanho + 1;
  numeros = strCNPJ.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let k = tamanho; k >= 1; k--) {
    soma += numeros.charAt(tamanho - k) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(1)) {
    return false;
  }

  return true;
}

@ValidatorConstraint({ name: 'isCpf', async: false })
export class IsCpf implements ValidatorConstraintInterface {
  validate(cpf: string) {
    // @ts-ignore
    return isValidCPF(cpf)
  }

  defaultMessage(args: ValidationArguments) {
    return `Invalid cpf`;
  }
}

@ValidatorConstraint({ name: 'isCnpj', async: false })
export class IsCnpj implements ValidatorConstraintInterface {
  validate(cnpj: string) {
    // @ts-ignore
    return isValidCnpj(cnpj)
  }

  defaultMessage(args: ValidationArguments) {
    return `Invalid cnpj`;
  }
}