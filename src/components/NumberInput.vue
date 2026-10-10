<script setup lang="ts">
    import { onMounted, ref, watch } from "vue"

    const {
        prefix = "",
        postfix = "",
        name,
        disabled = false,
    } = defineProps<{
        /** Prefix to display before the number */
        prefix?: string
        /** Postfix to display after the number */
        postfix?: string
        /** Name attribute of the input field */
        name?: string
        /** Whether the input field is disabled */
        disabled?: boolean
    }>()

    const value = defineModel<number>({ default: 0 })
    const text = ref("0")

    const { pause: pauseText, resume: resumeText } = watch(text, updateValue, {
        flush: "sync",
    })

    const { pause: pauseValue, resume: resumeValue } = watch(
        value,
        updateText,
        {
            flush: "sync",
        },
    )

    /**
     * Update the value ref from the text ref
     */
    function updateValue(): void {
        const newText = text.value
        pauseValue()
        const num = Number(newText)
        if (isNaN(num)) return
        value.value = num
        resumeValue()
    }

    /**
     * Update the text ref from the value ref
     */
    function updateText(): void {
        const newValue = value.value
        pauseText()
        if (Number(text.value) == newValue) return
        text.value = String(newValue)
        resumeText()
    }

    onMounted(updateText)
</script>

<template>
    <div :class="$style.container">
        <input
            type="text"
            v-model="text"
            :class="$style.input"
            :name="name"
            :disabled="disabled"
        />
        <div :class="$style.overlay">
            <span :class="$style.prefix">{{ prefix }}</span>
            <span :class="$style.postfix">{{ postfix }}</span>
        </div>
    </div>
</template>

<style lang="scss" module>
    .container {
        position: relative;
    }

    .input {
        width: 15em;
        height: calc(2.5em / 1.1);
        box-sizing: border-box;
        outline: none;
        font-family: inherit;
        font-size: 1.1em;
        border: 0.1em solid #ddd;
        border-radius: 0.2em;
        padding: 0 2.6em;
        text-align: right;
        transition: border-color 0.1s;

        &:focus {
            border-color: #333;
        }
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 0 1.2em;
        user-select: none;
        pointer-events: none;
    }

    .prefix {
        color: #aaa;
        left: 1em;
    }

    .postfix {
        color: #aaa;
        right: 1em;
    }
</style>
