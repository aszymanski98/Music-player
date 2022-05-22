import {
  configure,
  defineRule,
  ErrorMessage,
  Field as VeeField,
  Form as VeeForm,
} from 'vee-validate';

import AllRules, { confirmed, required } from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    // All rules
    Object.keys(AllRules)
      .forEach((rule) => {
        defineRule(rule, AllRules[rule]);
      });

    defineRule('passwords_mismatch', confirmed);
    defineRule('tos', required);

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: 'This field is required.',
          min: 'The value is too short.',
          max: 'The value is too long.',
          alpha_spaces: 'This field can only contain alphabetical characters and spaces.',
          email: 'Email address is not valid.',
          min_value: `The ${ctx.field} is too low.`,
          max_value: `The ${ctx.field} is too high.`,
          passwords_mismatch: 'Password is not the same.',
          tos: 'You must accept Terms of Service.',
        };

        return messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid.`;
      },
    });
  },
};
