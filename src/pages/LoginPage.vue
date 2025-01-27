<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router'
import { useUserStore } from '../store'
import Alert from '../components/Alert.vue'
import { storeToRefs } from 'pinia';

const router = useRouter()
const store = useUserStore();

const { error } = storeToRefs(store)
const { loginUser } = store;


const email = ref('mar204@gmail.com')
const password = ref('mar123')

const isActive = computed(() => {
    if (email.value.length > 4 && password.value.length >= 4) return false;
    return true;
})

const handledSubmit = async () => {
    try {
        const resp = await loginUser(email.value, password.value)
        console.log('to home')
        if (resp.email && resp.uid) {
            console.log('router.push')
            return router.push('/')
        }

        email.value = password.value = ''
    } catch (errores) {
        console.log({ 'ErrorLogin': errores });
    }
}
</script>

<template>
    <div class="background-image">
        <div class="login-container">
            <h1 class="text-center text-primary display-6">Login</h1>
            <hr class="text-primary">
            <Alert v-if="error" :error="error"></Alert>
            <form @:submit.prevent="handledSubmit">
                <div class="form-floating mb-3">
                    <input id="correo" class="form-control" type="email" placeholder="omar1204@gmail.com" name="email"
                        v-model="email">
                    <label for="correo" class="text-primary">Email</label>

                </div>
                <div class="form-floating mb-3">
                    <input id="password" class="form-control" type="password" name="password" v-model="password">
                    <label for="password" class="text-primary">Password</label>
                </div>
                <div class="d-grid gap-2">
                    <button class="btn btn-primary p-2" :disabled="isActive"> Login </button>
                </div>
            </form>
        </div>
    </div>

</template>

<style scoped>
.background-image {
    background-image: url('/src/imagenes/fondo.png');
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