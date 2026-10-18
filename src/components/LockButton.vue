<script setup lang="ts">
    const { locked } = defineProps<{
        /** Whether the lock button shows a "locked" state */
        locked: boolean
    }>()

    const emit = defineEmits<{
        /** Emitted when the button is clicked */
        (e: "click"): void
    }>()
</script>

<template>
    <button
        :class="[
            $style.button,
            {
                [$style.locked]: locked,
            },
        ]"
        @click="emit('click')"
    >
        <span class="material-symbols-outlined" :class="$style.icon">{{
            locked ? "lock" : "lock_open"
        }}</span>
    </button>
</template>

<style lang="scss" module>
    @use "@/assets/colors";

    .button {
        @extend %button;
        box-sizing: border-box;
        width: 2.5em;
        height: 2.5em;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        border-radius: 0.3em;
        cursor: pointer;
        font-size: 1em;
        user-select: none;
        outline: none;
        -webkit-tap-highlight-color: transparent;
        transition:
            background-color 0.1s,
            color 0.1s;

        .icon {
            color: inherit;
            font-size: 1.6em;
        }
    }

    .button.locked {
        @extend %button-active;
    }
</style>
