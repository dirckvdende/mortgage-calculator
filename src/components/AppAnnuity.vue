<script setup lang="ts">
    import { ref } from "vue"
    import InputField from "@/components/InputField.vue"

    const mortgage = ref(0)
    const interest = ref(0)
    const monthlyCost = ref(0)

    const lockedField = ref<"mortgage" | "interest" | "monthly-cost">(
        "monthly-cost",
    )
</script>

<template>
    <div>
        <InputField
            label="Mortgage"
            field-type="number"
            v-model:value="mortgage"
            :locked="lockedField == 'mortgage'"
            @request-lock="lockedField = 'mortgage'"
            prefix="$"
        />
        <InputField
            label="Interest rate"
            field-type="number"
            v-model:value="interest"
            :locked="lockedField == 'interest'"
            @request-lock="lockedField = 'interest'"
            postfix="%"
        />
        <InputField
            label="Payment per month"
            field-type="number"
            v-model:value="monthlyCost"
            :locked="lockedField == 'monthly-cost'"
            @request-lock="lockedField = 'monthly-cost'"
            prefix="$"
        />
    </div>
</template>

<style lang="scss" module></style>
