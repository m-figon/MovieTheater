<template>
  <div class="login">
    <div class="login-form">
      <div class="login-form-content">
        <input
          v-model="account"
          v-on:focus="focusFunc('Account Name',$event,0)"
          v-on:blur="blurFunc('Account Name',$event,0)"
        />
        <p
          v-bind:style="[accountShow ? {'display':'block'} : {'display':'none'}]"
        >Account must consist of 3-12 letters or digits</p>
        <input
          v-model="email"
          v-on:focus="focusFunc('Email Address',$event,0)"
          v-on:blur="blurFunc('Email Address',$event,0)"
        />
        <p
          v-bind:style="[emailShow ? {'display':'block'} : {'display':'none'}]"
        >Please enter correct email</p>
        <input
          v-model="password"
          v-bind:type="type1"
          v-on:focus="focusFunc('Password',$event,1)"
          v-on:blur="blurFunc('Password',$event,1)"
        />
        <p
          v-bind:style="[passwordShow ? {'display':'block'} : {'display':'none'}]"
        >Password must consist of 3-12 letters and digits, at least one upper and lowercase letter, special character</p>
        <input
          v-model="password2"
          v-bind:type="type2"
          v-on:focus="focusFunc('Confirm Password',$event,2)"
          v-on:blur="blurFunc('Confirm Password',$event,2)"
        />
        <p
          v-bind:style="[password2Show ? {'display':'block'} : {'display':'none'}]"
        >Must be same as entered password and password must be correct</p>
        <button v-on:click="register()">Register</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: "Account Name",
      email: "Email Address",
      password: "Password",
      password2: "Confirm Password",
      type1: "text",
      type2: "text",
      users: [],
      accountShow: false,
      emailShow: false,
      passwordShow: false,
      password2Show: false,
    };
  },
  methods: {
    focusFunc(text, event, condition) {
      let texts = [
        "Account Name",
        "Email Address",
        "Password",
        "Confirm Password",
      ];
      let states = [
        "this.account",
        "this.email",
        "this.password",
        "this.password2",
      ];
      for (let i = 0; i < texts.length; i++) {
        if (text === texts[i] && eval(states[i] + "=== text")) {
          eval(states[i] + " = ''");
        }
      }
      if (condition === 1) {
        this.type1 = "password";
      } else if (condition === 2) {
        this.type2 = "password";
      }
    },
    blurFunc(text, event, condition) {
      let texts = [
        "Account Name",
        "Email Address",
        "Password",
        "Confirm Password",
      ];
      let states = [
        "this.account",
        "this.email",
        "this.password",
        "this.password2",
      ];
      for (let i = 0; i < texts.length; i++) {
        if (text === texts[i] && eval(states[i] + "=== ''")) {
          eval(states[i] + " = text");
          if (condition === 1) {
            this.type1 = "text";
          } else if (condition === 2) {
            this.type2 = "text";
          }
        }
      }
    },
    valuesReset() {
      this.account = "Account Name";
      this.email = "Email Address";
      this.password = "Password";
      this.password2 = "Confirm Password";
      this.type1 = "text";
      this.type2 = "text";
      this.accountShow=false;
      this.emailShow=false;
      this.passwordShow=false;
      this.password2Show=false;
    },
    ifCheck(condition) {
      if (condition) {
        return false;
      } else {
        this.registerFlag = false;
        return true;
      }
    },
    register() {
      this.registerFlag = true;
      this.emailShow = this.ifCheck(
        !(
          this.email.match(/^[a-z0-9\._\-]+@[a-z0-9\.\-]+\.[a-z]{2,4}$/) ===
          null
        )
      );
      this.accountShow = this.ifCheck(
        !(this.account.match(/^[a-zA-Z0-9\.\-_]{4,10}$/) === null)
      );
      this.passwordShow = this.ifCheck(
        !(
          this.password.match(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\.\-_@$!%*#?&])[A-Za-z\d\.\-_@$!%*#?&]{8,13}$/
          ) === null
        )
      );
      this.password2Show = this.ifCheck(
        this.password === this.password2 &&
          !(
            this.password.match(
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\.\-_@$!%*#?&])[A-Za-z\d\.\-_@$!%*#?&]{8,13}$/
            ) === null
          )
      );
      if (this.registerFlag) {
        fetch(
          "https://rocky-citadel-32862.herokuapp.com/MovieTheater/users",
          {
            method: "POST",
            body: JSON.stringify({
              email: this.email,
              account: this.account,
              password: this.password,
              playlists: [],
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );
        this.valuesReset();
        alert("New user created");
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
  height: auto;
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
  width: 6rem;
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
