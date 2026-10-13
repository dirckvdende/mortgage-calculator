<script setup lang="ts">
    import { computed, ref } from "vue"
    import InputField from "@/components/InputField.vue"
    import type { FieldNameAnnuity } from "@/util/FieldName"
    import {
        getInterest,
        getMonthlyCost,
        getMortgage,
        getYearsOfLoan,
    } from "@/util/annuity"
    import { useRotatingSync } from "@/composables/useRotatingSync"

    const mortgage = ref<number | null>(100_000)
    const interest = ref<number | null>(3)
    const years = ref<number | null>(30)
    const monthlyCost = ref<number | null>(1)

    const lockedField = ref<FieldNameAnnuity>("monthly-cost")
    const lockedFieldCamelCase = computed<
        "mortgage" | "interest" | "years" | "monthlyCost"
    >(() => {
        if (lockedField.value == "monthly-cost") return "monthlyCost"
        return lockedField.value
    })

    function runIfNotNull(
        func: (x: number, y: number, z: number) => number | null,
    ): (x: number | null, y: number | null, z: number | null) => number | null {
        return (x, y, z) => {
            if (x == null || y == null || z == null) return null
            return func(x, y, z)
        }
    }

    useRotatingSync(
        {
            mortgage,
            interest,
            years,
            monthlyCost,
        },
        lockedFieldCamelCase,
        {
            mortgage: ({ interest, years, monthlyCost }) =>
                runIfNotNull(getMortgage)(
                    interest.value != null ? interest.value / 100 : null,
                    years.value,
                    monthlyCost.value,
                ),
            interest: ({ mortgage, years, monthlyCost }) => {
                const result = runIfNotNull(getInterest)(
                    mortgage.value,
                    years.value,
                    monthlyCost.value,
                )
                return result != null ? result * 100 : null
            },
            years: ({ mortgage, interest, monthlyCost }) =>
                runIfNotNull(getYearsOfLoan)(
                    mortgage.value,
                    interest.value != null ? interest.value / 100 : null,
                    monthlyCost.value,
                ),
            monthlyCost: ({ mortgage, interest, years }) =>
                runIfNotNull(getMonthlyCost)(
                    mortgage.value,
                    interest.value != null ? interest.value / 100 : null,
                    years.value,
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
            prefix="$"
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
            prefix="$"
            :round-digits="0"
        />
    </div>
</template>

<style lang="scss" module></style>
