const schema = {
    properties: {
      body: {
        type: 'object',
        properties: {
            title: {
            type: 'string',
          },
          amount:{
              type:'number',
              default: 0,
          },
        },
        required:['title']
      },
    },
    required: [
        'body',
    ]
  };
  
  export default schema;
  