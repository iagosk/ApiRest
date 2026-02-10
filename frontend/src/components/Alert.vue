<script setup lang="ts">
const emit = defineEmits(['fechar'])

defineProps({
    titulo: String,
    cor: String,
    text: String,
})

const fecharJanela = () => {
    emit('fechar')
}
</script>
<template>
    <div class="alert">
        <header :style="{backgroundColor: cor }">
            <h2>{{ titulo }}</h2>
        </header>
        <main>
            {{ text }}
        </main>
        <footer>
            <button :style="{backgroundColor: cor}" @click="fecharJanela">Cancelar</button>
            <button :style="{backgroundColor: cor}">Ok</button>
        </footer>
    </div>
</template>