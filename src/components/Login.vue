<template>
  <div class="login">
    <div class="login-form">
      <div class="login-form-content">
        <div class="x-button">
          <button v-on:click="quit()">X</button>
        </div>
        <input
          v-model="account"
          v-on:focus="focusFunc('Account Name',$event,false)"
          v-on:blur="blurFunc('Account Name',$event,false)"
        />
        <p v-bind:style="[accountId ? {'display':'block'} : {'display':'none'}]">Invalid user data</p>
        <input
          v-model="password"
          v-bind:type="type"
          v-on:focus="focusFunc('Password',$event,true)"
          v-on:blur="blurFunc('Password',$event,true)"
        />
        <button v-on:click="login()">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";

export default {
  store,
  data() {
    return {
      account: "Account Name",
      password: "Password",
      type: "text",
      users: [],
      accountId: false,
    };
  },
  created() {
    fetch("https://rocky-citadel-32862.herokuapp.com/MovieTheater/users")
      .then((response) => response.json())
      .then((data) => {
        this.users = data.slice();
        console.log(this.users);
      });
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
    login() {
      let correct = false;
      for (let item of this.users) {
        if (item.account === this.account && item.password === this.password) {
          this.$store.commit("changeName", this.account);
          this.accountId = false;
          this.account = "Account Name";
          this.type = "text";
          this.password = "Password";
          alert("login completed");
          correct = true;
        }
      }
      if (!correct) {
        this.accountId = true;
        alert("there isnt such user");
      }
    },
    quit() {
      this.$store.commit("changeLogin", false);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  z-index: 5;
}
.login-form {
  border-radius: 30px;
  width: 25rem;
  height: auto;
  background: url("../assets/bg.jpg");
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
}
.login-form-content {
  width: 70%;
  height: 80%;
  display: flex;
  flex-direction: column;
}
.login-form-content p {
  margin: 0;
  font-size: 1rem;
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
.x-button {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.x-button button {
  width: 2rem;
}
@media only screen and (max-width: 650px) {
  .login-form{
    width:17rem;
  }
  
  .login-form-content input{
    font-size: 1rem;
  }
  .login-form-content button{
    font-size: 0.8rem;
    width: 3rem;
  }
  .x-button button{
    width: 1.5rem;
    height: 1.5rem;
    font-size: 0.7rem;
  }
}
</style>
