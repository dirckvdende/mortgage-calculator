<script setup lang="ts">
    import { ref } from "vue"
    import AppAnnuity from "@/components/AppAnnuity.vue"

    const activePage = ref<"annuity" | "linear">("annuity")
</script>

<template>
    <div :class="$style.container">
        <div>
            <h1 :class="$style.title">Mortgage Calculator Tool</h1>
            <div :class="$style['selection-menu']">
                <button
                    v-for="page in ['annuity', 'linear']"
                    @click="activePage = page"
                    :class="[
                        $style.item,
                        {
                            [$style.active]: page == activePage,
                        },
                    ]"
                >
                    {{ page }}
                </button>
            </div>
            <AppAnnuity v-show="activePage == 'annuity'" />
        </div>
    </div>
</template>

<style lang="scss" module>
    body {
        margin: 0;
        font-family: "Ubuntu", sans-serif;
    }

    .container {
        width: 100%;
        box-sizing: border-box;
        padding: 5em 1em;
        display: flex;
        flex-direction: column;
        align-items: center;

        & > div {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            width: 100%;
            max-width: 40em;
        }
    }

    .title {
        font-weight: 400;
    }

    .selection-menu {
        width: 100%;
        display: flex;
        flex-direction: row;
        column-gap: 0.5em;
        margin-bottom: 1em;

        .item {
            font-size: 1em;
            font-family: inherit;
            border: none;
            padding: 0.5em 1em;
            border-radius: 0.2em;
            background-color: #eee;
            color: black;
            cursor: pointer;
            transition: opacity 0.1s;
            user-select: none;

            &.active {
                background-color: #333;
                color: white;
            }

            &:hover {
                opacity: 0.9;
            }
        }
    }
</style>
