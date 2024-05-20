import * as yup from "yup";

export default (schema, config) => {
  function equalTo(ref, msg) {
    return this.test({
      name: 'equalTo',
      exclusive: false,
      message: msg || '${path} must be the same as ${reference}',
      params: {
        reference: ref.path
      },
      test: function (value) {
        return value === this.resolve(ref)
      }
    })
  };

  yup.addMethod(yup.string, 'equalTo', equalTo);
  
  const { id, validationType, validations = [] } = config;

  if (!(yup)[validationType]) {
    return schema;
  }

  let validator = (yup)[validationType]();

  validations.forEach((validation) => {
    const { params, type } = validation;
    if (!validator[type]) {
      return;
    }
    if (type == 'equalTo') {
      validator = validator[type](yup.ref(params[0]), params[1]);
    } else {
      validator = validator[type](...params);
    }
  });

  schema[id] = validator;
  return schema;
}