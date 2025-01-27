<script setup>
import { ref } from 'vue'
import { useUserStore } from '../store';
import Alert from '../components/Alert.vue'
import { storeToRefs } from 'pinia';
const email = ref("");
const password = ref("");

const userStore = useUserStore();
const { error } = storeToRefs(userStore)

const { registerUser } = userStore;

const register = async () => {
  try {
    const result = await userStore.registerUser(email.value, password.value);
    if (result) {
      console.log("Registro exitoso");
    }
  } catch (error) {
    console.error("Error en registro", error);
  }
}
</script>

<template>
  <div class="background-image">
    <div class="login-container">
      <div class="card">
        <div class="card-header text-center">
          <h3>Registro de Usuario</h3>
        </div>
        <div class="card-body">
          <form @submit.prevent="register">
            <div class="mb-3">
              <label for="email" class="form-label">Correo electrónico</label>
              <input v-model="email" type="email" class="form-control" id="email" placeholder="Ingresa tu correo">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Contraseña</label>
              <input v-model="password" type="password" class="form-control" id="password"
                placeholder="Ingresa tu contraseña">
            </div>
            <button type="submit" class="btn btn-primary w-100">Registrarse</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.background-image {
  background-image: url('../imagenes/fondo2.png');
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-container {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>