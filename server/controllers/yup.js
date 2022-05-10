

    import * as yup from 'yup';
    import { setLocale } from 'yup';
  
    setLocale({
      // use constant translation keys for messages without values
      mixed: {
        default: 'field_invalid',
      },
      // use functions to generate an error object that includes the value from the schema
      number: {
        min: ({ min }) => ({ key: 'field_too_short', values: { min } }),
        max: ({ max }) => ({ key: 'field_too_big', values: { max } }),
      },
    });
    
    // ...
    
    let schema = yup.object().shape({
      family_id: yup.string(),
      task_name: yup.number().min(18),
    });
    
    try {
      await schema.validate({ family_id: 'jimmy', task_name: 11 });
    } catch (err) {
      messages = err.errors.map((err) => i18next.t(err.key));
    }

