export default {
  title: 'Usuário', // Titulo do Formulário
  sections: [
    {
      id: '10', //Id unico da secção
      title: 'Dados do Usuário', //Titulo do secção
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
              params: [2, "Nome não pode ser menor que 2 letras"]
            },
          ]
        },
        {
          id: '12', //Id unico do elemento
          label: 'Email', //Label que vai aparecer
          name: 'email', //Nome do campo no banco de dados
          type: 'text', //Tipo do input
          defaultValue: '', //Valor inicial do campo
          editable: true, // Boolean se é editavel ou não
          config: { // Configurações extras do campo
            inputSize: 4, //1-12
          },
          // validation: [
          //   {
          //     type: "required",
          //     params: ["Campo email obrigatório"]
          //   },
          //   {
          //     type: "email",
          //     params: ["Campo email inválido"]
          //   }
          // ]
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
          ]
        },
        {
          id: '14', //Id unico do elemento
          label: 'Celular', //Label que vai aparecer
          name: 'celular', //Nome do campo no banco de dados
          type: 'mask', //Tipo do input
          defaultValue: '', //Valor inicial do campo
          editable: true, // Boolean se é editavel ou não
          config: { // Configurações extras do campo
            inputSize: 2, //1-12
            mask: '(99) 99999-9999',
          },
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
    // {
    //   id: '30', //Id unico da secção
    //   title: 'Senha', //Titulo do secção
    //   fields: [
    //     {
    //       id: '31', //Id unico do elemento
    //       label: 'Senha', //Label que vai aparecer
    //       name: 'password', //Nome do campo no banco de dados
    //       type: 'password', //Tipo do input
    //       defaultValue: '', //Valor inicial do campo
    //       editable: true, // Boolean se é editavel ou não
    //       config: { // Configurações extras do campo
    //         inputSize: 6, //1-12
    //         offset: 6,
    //       },
    //       validationEdit: [
    //         {
    //           type: "min",
    //           params: [5, "Senha deve conter no minimo 5 caracteres"]
    //         },
    //         {
    //           type: "minLowercase",
    //           params: [1, "Senha deve conter no minimo 1 letra minuscula"]
    //         },
    //         {
    //           type: "minUppercase",
    //           params: [1, "Senha deve conter no minimo 1 letra maiuscula"]
    //         },
    //         {
    //           type: "minSymbols",
    //           params: [1, "Senha deve conter no minimo 1 caracter especial"]
    //         },
    //       ],
    //       validation: [
    //         {
    //           type: "required",
    //           params: ["Campo senha obrigatório"]
    //         },
    //         {
    //           type: "min",
    //           params: [5, "Senha deve conter no minimo 5 caracteres"]
    //         },
    //         {
    //           type: "minLowercase",
    //           params: [1, "Senha deve conter no minimo 1 letra minuscula"]
    //         },
    //         {
    //           type: "minUppercase",
    //           params: [1, "Senha deve conter no minimo 1 letra maiuscula"]
    //         },
    //         {
    //           type: "minSymbols",
    //           params: [1, "Senha deve conter no minimo 1 caracter especial"]
    //         },
    //       ]
    //     },
    //     {
    //       id: '32', //Id unico do elemento
    //       label: 'Confirmar Senha', //Label que vai aparecer
    //       name: 'cofirmpassword', //Nome do campo no banco de dados
    //       type: 'password', //Tipo do input
    //       defaultValue: '', //Valor inicial do campo
    //       editable: true, // Boolean se é editavel ou não
    //       config: { // Configurações extras do campo
    //         inputSize: 6, //1-12
    //         offset: 6,
    //       },
    //       validationEdit: [
    //         {
    //           type: "equalTo",
    //           params: ['password', 'Valor deve ser o mesmo do campo senha']
    //         },
    //       ],
    //       validation: [
    //         {
    //           type: "required",
    //           params: ["Campo confirmar senha obrigatório"]
    //         },
    //         {
    //           type: "equalTo",
    //           params: ['password', 'Valor deve ser o mesmo do campo senha']
    //         },
    //       ]
    //     },
    //   ],
    // },
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