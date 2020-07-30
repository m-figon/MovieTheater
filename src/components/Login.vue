<template>
  <div class="login">
    <div class="login-form">
      <div class="login-form-content">
        <input
          v-model="account"
          v-on:focus="focusFunc('Account Name',$event,false)"
          v-on:blur="blurFunc('Account Name',$event,false)"
        />
        <input
          v-model="password"
          v-bind:type="type"
          v-on:focus="focusFunc('Password',$event,true)"
          v-on:blur="blurFunc('Password',$event,true)"
        />
        <button>Login</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: "Account Name",
      password: "Password",
      type: "text"
    };
  },
  methods: {
    focusFunc(text, event, condition) {
      let texts = ["Account Name", "Password"];
      let states = ["this.account", "this.password"];
      for (let i = 0; i < texts.length; i++) {
        if (text === texts[i] && eval(states[i] + "=== text")) {
          eval(states[i] + " = ''");
        }
      }
      if (condition) {
        this.type = "password";
      }
    },
    blurFunc(text, event, condition) {
      let texts = ["Account Name", "Password"];
      let states = ["this.account", "this.password"];
      for (let i = 0; i < texts.length; i++) {
        if (text === texts[i] && eval(states[i] + "=== ''")) {
          eval(states[i] + " = text");
          if (condition) {
            this.type = "text";
          }
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  width: 100vw;
  height: calc(100vh - 5rem);
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-form {
  border-radius: 30px;
  width: 30rem;
  height: 13rem;
  background: url("../assets/bg.jpg");
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-form-content {
  width: 70%;
  height: 80%;
  display: flex;
  flex-direction: column;
}
.login-form-content input {
  background: rgba(0, 0, 0, 0);
  border: 0;
  border-bottom: 1px solid gray;
  width: 100%;
  height: 2rem;
  font-size: 1.2rem;
  color: #c8006d;
  margin: 1rem 0;
}
.login-form-content button {
  background: #c8006e71;
  background: #c8006d;
  border-radius: 10px;
  border: 1px solid gray;
  width: 4rem;
  height: 2rem;
  font-size: 1.2rem;
  color: white;
  margin: 1rem 0;
}
.login-form-content button:hover {
  background: #c8006e71;
  cursor: pointer;
}
</style>
