<script setup lang="ts">
const emit = defineEmits(['fechar'])

defineProps({
    titulo: String,
    cor: String,
    msg: String,
    type: String,
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
            {{ msg }}
        </main>
        <footer>
            <button :style="{backgroundColor: cor}" @click="fecharJanela" v-if="type == 'confirm'">Cancelar</button>
            <button :style="{backgroundColor: cor}" @click="fecharJanela">Ok</button>
        </footer>
    </div>
</template>