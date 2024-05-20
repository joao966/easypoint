export default {
  title: 'Novo Pedido', // Titulo do Formulário
  sections: [
    {
      id: '10', //Id unico da secção
      title: 'Dados do usuário', //Titulo do secção
      fields: [
        // {
        //   id: '11', //Id unico do elemento
        //   label: 'CPF ou CNPJ', //Label que vai aparecer
        //   name: 'documentId', //Nome do campo no banco de dados
        //   type: 'mask', //Tipo do input
        //   defaultValue: '', //Valor inicial do campo
        //   editable: true, // Boolean se é editavel ou não
        //   config: {
        //     // Configurações extras do campo
        //     inputSize: 5, //1-12
        //     mask: '99.999.999/9999-99',
        //   },
        //   validation: [
        //     {
        //       type: 'required',
        //       params: ['Campo Empresa é obrigatório'],
        //     },
        //   ],
        // },
        {
          id: '23', //Id unico do elemento
          label: 'Empresa', //Label que vai aparecer
          name: 'documentId', //Nome do campo no banco de dados
          type: 'select', //Tipo do input
          defaultValue: '', //Valor inicial do campo
          editable: true, // Boolean se é editavel ou não
          config: {
            // Configurações extras do campo
            inputSize: 5, //1-12
          },
          validation: [
            {
              type: 'required',
              params: ['Campo Empresa é obrigatório'],
            },
            {
              type: 'min',
              params: [1, 'Deve selecioar ao menos uma empresa'],
            },
          ],
        },
        {
          id: '12', //Id unico do elemento
          label: 'Email', //Label que vai aparecer
          name: 'email', //Nome do campo no banco de dados
          type: 'text', //Tipo do input
          defaultValue: '', //Valor inicial do campo
          editable: true, // Boolean se é editavel ou não
          config: {
            // Configurações extras do campo
            inputSize: 4, //1-12
          },
          validation: [
            {
              type: 'required',
              params: ['Campo email obrigatório'],
            },
            {
              type: 'email',
              params: ['Campo email inválido'],
            },
          ],
        },
        {
          id: '13', //Id unico do elemento
          label: 'Telefone Celular', //Label que vai aparecer
          name: 'telephone', //Nome do campo no banco de dados
          type: 'mask', //Tipo do input
          defaultValue: '', //Valor inicial do campo
          editable: true, // Boolean se é editavel ou não
          config: {
            // Configurações extras do campo
            inputSize: 3, //1-12
            mask: '(99) 99999-9999',
          },
          validation: [
            {
              type: 'required',
              params: ['Campo nome obrigatório'],
            },
            {
              type: 'min',
              params: [11, 'Campo deve conter todos os numeros'],
            },
          ],
        },
        // {
        //   id: '16', //Id unico do elemento
        //   label: 'identificador Externo', //Label que vai aparecer
        //   name: 'externalIdentifier', //Nome do campo no banco de dados
        //   type: 'text', //Tipo do input
        //   defaultValue: '', //Valor inicial do campo
        //   editable: true, // Boolean se é editavel ou não
        //   config: {
        //     // Configurações extras do campo
        //     inputSize: 2, //1-12
        //   },
        //   // validation: [
        //   //   {
        //   //     type: 'required',
        //   //     params: ['Campo nome obrigatório'],
        //   //   },
        //   // ],
        // },
      ],
    },
    {
      id: '20', //Id unico da secção
      title: 'Dados da campanha', //Titulo do secção
      fields: [
        {
          id: '21', //Id unico do elemento
          label: 'Alguma coisa', //Label que vai aparecer
          name: 'amount', //Nome do campo no banco de dados
          type: 'currency', //Tipo do input
          defaultValue: '0,00', //Valor inicial do campo
          editable: true, // Boolean se é editavel ou não
          config: {
            // Configurações extras do campo
            inputSize: 3, //1-12
            // Campos monetários podem receber os seguintes parametros
            // prefix: "R$", // Prefixo que aparecerá antes do numero digitado
            // suffix: " reais", // Sufixo aparece dps do numero digitado
            // precision: "2", // Precisão de casas decimais
            // decimalSeparator: ",", // Como é separado os decimais
            // thousandSeparator: ".", // Como são separados os milhares
          },
          /* validation: [
            {
              type: "required",
              params: ["Campo nome obrigatório"]
            }
          ] */
        },
        // {
        //   id: '22', //Id unico do elemento
        //   label: 'Receber', //Label que vai aparecer
        //   name: 'isReceiveCash', //Nome do campo no banco de dados
        //   type: 'select', //Tipo do input
        //   defaultValue: '', //Valor inicial do campo
        //   editable: true, // Boolean se é editavel ou não
        //   config: {
        //     // Configurações extras do campo
        //     inputSize: 2, //1-12
        //     boolean: true,
        //   },
        //   validation: [
        //     {
        //       type: 'required',
        //       params: ['Campo Receber é obrigatório'],
        //     },
        //     {
        //       type: 'min',
        //       params: [1, 'Deve selecionar sim ou não'],
        //     },
        //   ],
        // },
        // {
        //   id: '23', //Id unico do elemento
        //   label: 'Empresa', //Label que vai aparecer
        //   name: 'empresa', //Nome do campo no banco de dados
        //   type: 'select', //Tipo do input
        //   defaultValue: '', //Valor inicial do campo
        //   editable: true, // Boolean se é editavel ou não
        //   config: {
        //     // Configurações extras do campo
        //     inputSize: 5, //1-12
        //   },
        //   validation: [
        //     {
        //       type: 'required',
        //       params: ['Campo Empresa é obrigatório'],
        //     },
        //     {
        //       type: 'min',
        //       params: [1, 'Deve selecioar ao menos uma empresa'],
        //     },
        //   ],
        // },
        {
          id: '24', //Id unico do elemento
          label: 'Descrição', //Label que vai aparecer
          name: 'description', //Nome do campo no banco de dados
          type: 'textfield', //Tipo do input
          defaultValue: '', //Valor inicial do campo
          editable: true, // Boolean se é editavel ou não
          config: {
            // Configurações extras do campo
            inputSize: 9, //1-12
            multiline: true,
          },
          validation: [
            {
              type: 'required',
              params: ['Campo nome obrigatório'],
            },
          ],
        },
      ],
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
      },
    },
    {
      id: 2,
      function: 'clear',
      label: 'Voltar',
      type: 'reset',
      config: {
        color: 'success',
      },
    },
  ],
};
