<template>
  <!-- Login Form -->
  <div
      class="text-white text-center font-bold p-5 mb-4"
      v-if="login_show_alert"
      :class="login_alert_variant"
  >
    {{ login_alert_message }}
  </div>
  <VeeForm
      @submit="login"
      :validation-schema="schema"
  >
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block" for="loginEmail">
        Email
        <VeeField
            type="email"
            id="loginEmail"
            name="email"
            class="block w-full mt-1 py-1.5 px-3 text-gray-800 border border-gray-300
                       transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Email"
        />
        <ErrorMessage class="text-red-600 block mt-1" name="email"/>
      </label>
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block" for="loginPassword">
        Password
        <VeeField
            type="password"
            id="loginPassword"
            name="password"
            class="block w-full mt-1 py-1.5 px-3 text-gray-800 border border-gray-300
                       transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Password"/>
        <ErrorMessage class="text-red-600 block mt-1" name="password"/>
      </label>

    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
              hover:bg-purple-700"
      :disabled="login_in_progress"
    >
      Submit
    </button>
  </VeeForm>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      schema: {
        email: 'required|min:3|max:100|email',
        password: 'required|min:8|max:100',
      },
      login_in_progress: false,
      login_show_alert: false,
      login_alert_variant: 'bg-blue-500',
      login_alert_message: 'Please wait! Credentials are being checked.',
    };
  },
  methods: {
    login(values, { resetForm }) {
      this.login_in_progress = true;
      this.login_show_alert = true;
      this.login_alert_variant = 'bg-blue-500';
      this.login_alert_message = 'Please wait! Credentials are being checked.';

      this.login_alert_variant = 'bg-green-500';
      this.login_alert_message = 'Success! Your are logged in.';

      resetForm();
      console.log(values);
    },
  },
};
</script>
