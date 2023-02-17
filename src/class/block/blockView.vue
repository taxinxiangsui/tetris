<template>
    <span class="block" :id="String(id)" :style="{
        backgroundColor: color,
        width: size + 'px',
        height: size + 'px',
        top: position.top,
        left: position.left
    }"></span>
</template>
<script setup lang="ts">
interface Props {
    id: number,
    color: string,
    size: number,
    position: {
        top: string,
        left: string
    }
}
defineProps<Props>()
</script>
<style scoped>
.block {
    display: inline-block;
    position: absolute;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 2px;
}
</style>