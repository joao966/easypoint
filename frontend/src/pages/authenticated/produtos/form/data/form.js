export default {
  title: 'Produtos', // Titulo do Formulário
  sections: [
    {
      id: '10', //Id unico da secção
      title: 'Dados do produto', //Titulo do secção
      fields: [
        {
          id: '11', //Id unico do elemento
          label: 'Nome', //Label que vai aparecer
          name: 'name', //Nome do campo no banco de dados
          type: 'text', //Tipo do input
          defaultValue: '', //Valor inicial do campo
          placeHolder: '', //Valor PlaceHolder
          editable: true, // Boolean se é editavel ou não
          config: { // Configurações extras do campo
            inputSize: 5, //1-12
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
          label: 'Preço', //Label que vai aparecer
          name: 'price', //Nome do campo no banco de dados
          type: 'number', //Tipo do input
          defaultValue: '', //Valor inicial do campo
          editable: true, // Boolean se é editavel ou não
          config: { // Configurações extras do campo
            inputSize: 3, //1-12
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
          label: 'Categoria', //Label que vai aparecer
          name: 'category', //Nome do campo no banco de dados
          type: 'text', //Tipo do input
          defaultValue: '', //Valor inicial do campo
          editable: true, // Boolean se é editavel ou não
          config: { // Configurações extras do campo
            inputSize: 2, //1-12
          },
        },
        {
          id: '14', //Id unico do elemento
          label: 'Quantidade', //Label que vai aparecer
          name: 'quantity', //Nome do campo no banco de dados
          type: 'numbe', //Tipo do input
          defaultValue: '', //Valor inicial do campo
          editable: true, // Boolean se é editavel ou não
          config: { // Configurações extras do campo
            inputSize: 2, //1-12
          },
          validation: [
            {
              type: "required",
              params: ["Campo nome obrigatório"]
            }
          ]
        },
        {
          id: '15', //Id unico do elemento
          label: 'Imagem', //Label que vai aparecer
          name: 'imageUrl', //Nome do campo no banco de dados
          type: 'text', //Tipo do input
          defaultValue: '', //Valor inicial do campo
          editable: true, // Boolean se é editavel ou não
          config: { // Configurações extras do campo
            inputSize: 5, //1-12
          }
        }
      ],
    }
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