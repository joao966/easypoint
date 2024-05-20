const getUser = sessionStorage.getItem('user');
const user = JSON.parse(getUser);

export default {
  title: 'Nova Comanda', // Titulo do Formulário
  sections: [
    {
      id: '10', //Id unico da secção
      title: 'Dados', //Titulo do secção
      fields: [
        {
          id: '11', //Id unico do elemento
          label: 'Itens', //Label que vai aparecer
          name: 'items', //Nome do campo no banco de dados
          type: 'text', //Tipo do input
          defaultValue: '', //Valor inicial do campo
          editable: true, // Boolean se é editavel ou não
          config: { // Configurações extras do campo
            inputSize: 5, //1-12
          },
          // validation: [
          //   {
          //     type: "required",
          //     params: ["Campo Empresa é obrigatório"]
          //   },
          //   {
          //     type: "min",
          //     params: [1, "Deve selecioar ao menos uma empresa"]
          //   },
          // ]
        },
        {
          id: '12', //Id unico do elemento
          label: 'Valor Total', //Label que vai aparecer
          name: 'valor_total', //Nome do campo no banco de dados
          type: 'text', //Tipo do input
          defaultValue: '', //Valor inicial do campo
          editable: true, // Boolean se é editavel ou não
          config: { // Configurações extras do campo
            inputSize: 3, //1-12
            // Campos monetários podem receber os seguintes parametros
            prefix: "R$ ", // Prefixo que aparecerá antes do numero digitado
            // suffix: " reais", // Sufixo aparece dps do numero digitado
            // precision: "2", // Precisão de casas decimais
            // decimalSeparator: ",", // Como é separado os decimais
            // thousandSeparator: ".", // Como são separados os milhares
          },
          validation: [
            {
              type: "required",
              params: ["Campo nome obrigatório"]
            }
          ]
        },
        {
          id: '13', //Id unico do elemento
          label: 'Descrição', //Label que vai aparecer
          name: 'descricao', //Nome do campo no banco de dados
          type: 'textfield', //Tipo do input
          defaultValue: '', //Valor inicial do campo
          editable: true, // Boolean se é editavel ou não
          config: { // Configurações extras do campo
            inputSize: 10, //1-12
            multiline: true,
            // Campos monetários podem receber os seguintes parametros
            // prefix: "R$", // Prefixo que aparecerá antes do numero digitado
            // suffix: " reais", // Sufixo aparece dps do numero digitado
            // precision: "2", // Precisão de casas decimais
            // decimalSeparator: ",", // Como é separado os decimais
            // thousandSeparator: ".", // Como são separados os milhares
          },
          validation: [ 
            {
              type: "required",
              params: ["Campo nome obrigatório"]
            }
          ]
        },

        {
          id: '14', //Id unico do elemento
          label: 'Atendente', //Label que vai aparecer
          name: 'idUser', //Nome do campo no banco de dados
          type: 'text', //Tipo do input
          defaultValue: user?.nome, //Valor inicial do campo
          editable: false, // Boolean se é editavel ou não
          config: { // Configurações extras do campo
            inputSize: 5, //1-12
          },
        },
        {
          id: '15', //Id unico do elemento
          label: 'Cliente', //Label que vai aparecer
          name: 'idCliente', //Nome do campo no banco de dados
          type: 'text', //Tipo do input
          defaultValue: '', //Valor inicial do campo
          editable: true, // Boolean se é editavel ou não
          config: { // Configurações extras do campo
            inputSize: 5, //1-12
          },
        },
      ]
    },
  ],




  buttons: [
    {
      id: 1,
      function: 'save',
      label: 'Salvar',
      type: 'success',
    }
  ]
} 