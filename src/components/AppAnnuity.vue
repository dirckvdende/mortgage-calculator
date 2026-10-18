<script setup lang="ts">
    import { computed, ref } from "vue"
    import InputField from "@/components/InputField.vue"
    import type { FieldNameAnnuity } from "@/util/FieldName"
    import {
        getInterest,
        getMortgage,
        getYearlyPayment,
        getYears,
    } from "@/util/annuityMortgage"
    import { useRotatingSync } from "@/composables/useRotatingSync"
    import { applyIfNotNull } from "@/util/applyIfNotNull"
    import { createRefObjectFn } from "@/util/createRefObjectFn"

    const mortgage = ref<number | null>(100_000)
    const interest = ref<number | null>(3)
    const years = ref<number | null>(30)
    const monthlyCost = ref<number | null>(1)

    const yearlyPayment = computed({
        get: () => (monthlyCost.value == null ? null : monthlyCost.value * 12),
        set: (value: number | null) => {
            if (value == null) {
                monthlyCost.value = null
                return
            }
            monthlyCost.value = value / 12
        },
    })
    const interestFraction = computed({
        get: () => (interest.value == null ? null : interest.value / 100),
        set: (value: number | null) => {
            if (value == null) {
                interest.value = null
                return
            }
            interest.value = value * 100
        },
    })

    const lockedField = ref<FieldNameAnnuity>("monthly-cost")
    const lockedFieldCamelCase = computed<
        "mortgage" | "interest" | "years" | "yearlyPayment"
    >(() => {
        if (lockedField.value == "monthly-cost") return "yearlyPayment"
        return lockedField.value
    })

    useRotatingSync(
        {
            mortgage,
            interest: interestFraction,
            years,
            yearlyPayment,
        },
        lockedFieldCamelCase,
        {
            mortgage: createRefObjectFn(
                applyIfNotNull(getMortgage, {
                    mortgage: 0,
                }),
            ),
            interest: createRefObjectFn(
                applyIfNotNull(getInterest, {
                    interest: 0,
                }),
            ),
            years: createRefObjectFn(
                applyIfNotNull(getYears, {
                    years: 0,
                }),
            ),
            yearlyPayment: createRefObjectFn(
                applyIfNotNull(getYearlyPayment, {
                    yearlyPayment: 0,
                }),
            ),
        },
    )
</script>

<template>
    <div>
        <InputField
            label="Mortgage"
            v-model:value="mortgage"
            :locked="lockedField == 'mortgage'"
            @request-lock="lockedField = 'mortgage'"
            prefix="€"
            :round-digits="0"
        />
        <InputField
            label="Yearly interest"
            v-model:value="interest"
            :locked="lockedField == 'interest'"
            @request-lock="lockedField = 'interest'"
            postfix="%"
            :round-digits="2"
        />
        <InputField
            label="Years of loan"
            v-model:value="years"
            :locked="lockedField == 'years'"
            @request-lock="lockedField = 'years'"
            :round-digits="2"
        />
        <InputField
            label="Payment per month"
            v-model:value="monthlyCost"
            :locked="lockedField == 'monthly-cost'"
            @request-lock="lockedField = 'monthly-cost'"
            prefix="€"
            :round-digits="0"
        />
    </div>
</template>

<style lang="scss" module></style>
