<script setup lang="ts">
const emit = defineEmits(['fechar', 'redirecionar'])

defineProps({
    titulo: String,
    cor: String,
    msg: String,
    type: String,
})

const fecharJanela = () => {
    emit('fechar')
}

const redirecionar = () => {
    emit('redirecionar')
}

</script>
<template>
    <div class="alertArea">
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
                <button v-if="type == 'alert'" :style="{backgroundColor: cor}" @click="redirecionar()">Ok</button>
            </footer>
        </div>
    </div>
</template>