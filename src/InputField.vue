<script setup lang="ts">
    import LockButton from "./LockButton.vue"

    const { label, locked = false } = defineProps<{
        /** Label to display next to the input field */
        label: string
        /** Whether the input field is locked (default false) */
        locked?: boolean
    }>()

    const emit = defineEmits<{
        /** Emitted when a lock is requested */
        (e: "request-lock"): void
    }>()

    const value = defineModel<number>("value", { required: true })
</script>

<template>
    <div :class="$style.container">
        <label :class="$style.label" :for="label">{{ label }}</label>
        <input
            type="number"
            :name="label"
            :class="$style.input"
            v-model="value"
        />
        <LockButton @click="emit('request-lock')" :locked="locked" />
    </div>
</template>

<style lang="scss" module>
    .container {
        height: 2.5em;
        margin-bottom: 0.5em;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        column-gap: 0.5em;
    }

    .label {
        font-size: 0.9em;
        color: #666;
        flex-grow: 1;
        flex-shrink: 1;
    }

    .input {
        width: 6em;
        height: 100%;
        border: 0.12em solid #ddd;
        box-sizing: border-box;
        padding: 0 0.5em;
        font-family: inherit;
        font-size: 1em;
        outline: none;
    }
</style>
