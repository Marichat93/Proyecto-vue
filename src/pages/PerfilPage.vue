<script setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '../store'

const useUserr = useUserStore()
const { user } = storeToRefs(useUserr)
</script>

<template>
    <div class="background-image">
        <div>
            <h3 class="display-4 text-white">Bienvenido a tu perfil</h3>
            <h1 class="display-8 text-white">
                Tu correo : {{ user === null ? 'No name' : user.email }}
            </h1>
        </div>
    </div>
</template>

<style scoped>
.background-image {
    background-image: url('../imagenes/fondoPerfil.png');
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>