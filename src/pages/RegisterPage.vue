<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store';
import Alert from '../components/Alert.vue'
import { storeToRefs } from 'pinia';

const router = useRouter()
const userStore = useUserStore();
const { registerError } = storeToRefs(userStore);

// Referencias reac
const email = ref('');
const password = ref('');

const register = async () => {
  try {
    // Validaciones previas
    if (!email.value || !password.value) {
      return;
    }

    const result = await userStore.registerUser(email.value, password.value);

    if (result.success) {
      // Registro exitoso
      console.log("Registro exitoso");
    }
  } catch (error) {
    console.error('Error de registro:', error);
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
          <!-- Mostrar error de registro -->
          <Alert v-if="registerError" :error="registerError"></Alert>

          <form @submit.prevent="register">
            <div class="mb-3">
              <label for="email" class="form-label">Correo electrónico</label>
              <input v-model="email" type="email" class="form-control" id="email" placeholder="Ingresa tu correo"
                required>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Contraseña</label>
              <input v-model="password" type="password" class="form-control" id="password"
                placeholder="Ingresa tu contraseña" required minlength="6">
            </div>
            <button type="submit" class="btn btn-primary w-100" :disabled="!email || !password">
              Registrarse
            </button>
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