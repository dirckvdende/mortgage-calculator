<script setup lang="ts">
    import { ref } from "vue"
    import AppAnnuity from "@/components/AppAnnuity.vue"
    import AppLinear from "./AppLinear.vue"

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
            <AppLinear v-show="activePage == 'linear'" />
            <div :class="$style.note">
                This is not financial advice. This tool is only meant for
                educational purposes. Calculations of mortgages can vary.<br /><br />
                Source code is available on
                <a href="https://github.com/dirckvdende/mortgage-calculator"
                    >GitHub</a
                >.
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
    body {
        margin: 0;
        font-family: "Ubuntu", sans-serif;

        @media screen and (max-width: 600px) {
            font-size: 0.9em;
        }
    }

    .container {
        width: 100%;
        box-sizing: border-box;
        padding: 5em 2em 7em 2em;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100vh;
        justify-content: center;

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
            outline: none;
            -webkit-tap-highlight-color: transparent;

            &.active {
                background-color: #333;
                color: white;
            }

            &:hover {
                opacity: 0.9;
            }
        }
    }

    .note {
        max-width: 30em;
        padding: 0 2em;
        box-sizing: border-box;
        margin: 2em auto;
        font-size: 0.8em;
        color: #666;
        text-align: center;

        a {
            color: inherit;
            text-decoration: underline;
        }
    }
</style>
