<script setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '../store'

const useUser = useUserStore()
const { user } = storeToRefs(useUser)

</script>

<template>
    <div id="carouselExampleFade" class="carousel slide carousel-fade">
        <div class="position-absolute top-50 start-50 translate-middle text-center" style="z-index: 10;">
            <h1 class="display-8 text-white bg-dark bg-opacity-50 px-3 py-2 rounded">
                Welcome: {{ user === null ? 'No name' : user.email }}
            </h1>
        </div>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="../imagenes/fondo1.png" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="../imagenes/fondo2.png" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="../imagenes/fondo3.png" class="d-block w-100" alt="...">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</template>
<style scoped>
.background-image {
    background-image: url('/src/imagenes/fondoAuth.png');
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>