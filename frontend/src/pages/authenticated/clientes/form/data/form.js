export default {
  title: 'Clientes', // Titulo do Formulário
  sections: [
    {
      id: '10', //Id unico da secção
      title: 'Dados do Cliente', //Titulo do secção
      fields: [
        {
          id: '11', //Id unico do elemento
          label: 'Nome', //Label que vai aparecer
          name: 'nome', //Nome do campo no banco de dados
          type: 'text', //Tipo do input
          defaultValue: '', //Valor inicial do campo
          placeHolder: '', //Valor PlaceHolder
          editable: true, // Boolean se é editavel ou não
          config: { // Configurações extras do campo
            inputSize: 4, //1-12
          },
          validation: [
            {
              type: "required",
              params: ["Campo nome obrigatório"]
            },
            {
              type: "min",
              params: [8, "Nome não pode ser menor que 8 letras"]
            },
          ]
        },
        {
          id: '13', //Id unico do elemento
          label: 'CPF', //Label que vai aparecer
          name: 'cpf', //Nome do campo no banco de dados
          type: 'mask', //Tipo do input
          defaultValue: '', //Valor inicial do campo
          placeHolder: '', //Valor PlaceHolder
          editable: true, // Boolean se é editavel ou não
          config: { // Configurações extras do campo
            inputSize: 2, //1-12
            mask: "999.999.999-99",
          },
          validation: [
            {
              type: "required",
              params: ["Campo CPF obrigatório"]
            },
            {
              type: "min",
              params: [11, "Cpf incompleto"]
            },
          ]
        },
        {
          id: '14', //Id unico do elemento
          label: 'Data de Nascimento', //Label que vai aparecer
          name: 'dtNascimento', //Nome do campo no banco de dados
          type: 'date', //Tipo do input
          defaultValue: '', //Valor inicial do campo
          placeHolder: '', //Valor PlaceHolder
          editable: true, // Boolean se é editavel ou não
          config: { // Configurações extras do campo
            inputSize: 2, //1-12
          },
          validation: [
            {
              type: "required",
              params: ["Campo Data de nascimento obrigatório"]
            },
          ]
        },
        {
          id: '16', //Id unico do elemento
          label: 'Chave Pix', //Label que vai aparecer
          name: 'chavePix', //Nome do campo no banco de dados
          type: 'text', //Tipo do input
          defaultValue: '', //Valor inicial do campo
          editable: true, // Boolean se é editavel ou não
          config: { // Configurações extras do campo
            inputSize: 4, //1-12
          },
          validation: [
            {
              type: "required",
              params: ["Informação do PIX obrigatório"]
            },
            {
              type: "min",
              params: [4, "Campo deve conter no minimo 4 caracteres"]
            },
          ]
        },
      ],
    },
    {
      id: '20', //Id unico da secção
      title: 'Localização', //Titulo do secção
      fields: [
        {
          id: '21', //Id unico do elemento
          label: 'CEP', //Label que vai aparecer
          name: 'cep', //Nome do campo no banco de dados
          type: 'cep', //Tipo do input
          defaultValue: '', //Valor inicial do campo
          editable: true, // Boolean se é editavel ou não
          config: { // Configurações extras do campo
            inputSize: 2, //1-12
            offset: 10,
          },
          validation: [
            {
              type: "required",
              params: ["Campo CEP obrigatório"]
            },
          ]
        },
        {
          id: '22', //Id unico do elemento
          label: 'Logradouro', //Label que vai aparecer
          name: 'logradouro', //Nome do campo no banco de dados
          type: 'text', //Tipo do input
          defaultValue: '', //Valor inicial do campo
          editable: true, // Boolean se é editavel ou não
          config: { // Configurações extras do campo
            inputSize: 4, //1-12
          },
          validation: [
            {
              type: "required",
              params: ["Campo logradouro obrigatório"]
            },
          ]
        },
        {
          id: '23', //Id unico do elemento
          label: 'Numero', //Label que vai aparecer
          name: 'numero', //Nome do campo no banco de dados
          type: 'number', //Tipo do input
          defaultValue: '', //Valor inicial do campo
          editable: true, // Boolean se é editavel ou não
          config: { // Configurações extras do campo
            inputSize: 2, //1-12
            offset: 10,
          }
        },
        {
          id: '24', //Id unico do elemento
          label: 'Bairro', //Label que vai aparecer
          name: 'bairro', //Nome do campo no banco de dados
          type: 'text', //Tipo do input
          defaultValue: '', //Valor inicial do campo
          editable: true, // Boolean se é editavel ou não
          config: { // Configurações extras do campo
            inputSize: 4, //1-12
          },
          validation: [
            {
              type: "required",
              params: ["Campo bairro obrigatório"]
            },
          ]
        },
        {
          id: '25', //Id unico do elemento
          label: 'Cidade', //Label que vai aparecer
          name: 'localidade', //Nome do campo no banco de dados
          type: 'text', //Tipo do input
          defaultValue: '', //Valor inicial do campo
          editable: true, // Boolean se é editavel ou não
          config: { // Configurações extras do campo
            inputSize: 4, //1-12
          },
          validation: [
            {
              type: "required",
              params: ["Campo cidade obrigatório"]
            },
          ]
        },
        {
          id: '26', //Id unico do elemento
          label: 'Estado', //Label que vai aparecer
          name: 'uf', //Nome do campo no banco de dados
          type: 'mask', //Tipo do input
          defaultValue: '', //Valor inicial do campo
          editable: true, // Boolean se é editavel ou não
          config: { // Configurações extras do campo
            inputSize: 2, //1-12
            mask: "AA",
          },
          validation: [
            {
              type: "required",
              params: ["Campo estado obrigatório"]
            },
          ]
        },
      ],
    },
    {
      id: '30', //Id unico da secção
      title: 'Vincular Empresa', //Titulo do secção
      fields: [
        {
          id: '31', //Id unico do elemento
          label: 'Empresas', //Label que vai aparecer
          name: 'empresas', //Nome do campo no banco de dados
          type: 'select', //Tipo do input
          defaultValue: '', //Valor inicial do campo
          editable: true, // Boolean se é editavel ou não
          config: { // Configurações extras do campo
            inputSize: 5, //1-12
          },
          validation: [
            {
              type: "required",
              params: ["Campo Empresa é obrigatório"]
            },
            {
              type: "min",
              params: [1, "Deve selecioar ao menos uma empresa"]
            },
          ]
        }
      ]
    },
  ],
  buttons: [
    {
      id: 1,
      function: 'save',
      label: 'Salvar',
      type: 'submit',
      config: {
        color: 'success',
      }
    },
    {
      id: 2,
      function: 'clear',
      label: 'Limpar',
      type: 'reset',
      config: {
        color: 'success',
      }
    }
  ]
} 