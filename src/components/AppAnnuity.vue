<script setup lang="ts">
    import { computed, ref, watch, type Ref } from "vue"
    import InputField from "@/components/InputField.vue"
    import type { FieldNameAnnuity } from "@/util/FieldName"
    import {
        getInterest,
        getMonthlyCost,
        getMortgage,
        getYearsOfLoan,
    } from "@/util/annuity"

    const mortgage = ref<number | null>(100_000)
    const interest = ref<number | null>(3)
    const interestFraction = computed(() => {
        if (interest.value == null) return null
        return interest.value / 100
    })
    const years = ref<number | null>(30)
    const monthlyCost = ref<number | null>(0)

    const lockedField = ref<FieldNameAnnuity>("monthly-cost")

    function updateFields(): void {
        let dependencies: [number | null, number | null, number | null] = [
            null,
            null,
            null,
        ]
        let func: (x: number, y: number, z: number) => number | null = () =>
            null
        let target: Ref<number | null> = ref(0)

        if (lockedField.value == "mortgage") {
            dependencies = [
                interestFraction.value,
                years.value,
                monthlyCost.value,
            ]
            func = getMortgage
            target = mortgage
        }
        if (lockedField.value == "interest") {
            dependencies = [mortgage.value, years.value, monthlyCost.value]
            func = getInterest
            target = interest
        }
        if (lockedField.value == "years") {
            dependencies = [
                mortgage.value,
                interestFraction.value,
                monthlyCost.value,
            ]
            func = getYearsOfLoan
            target = years
        }
        if (lockedField.value == "monthly-cost") {
            dependencies = [mortgage.value, interestFraction.value, years.value]
            func = getMonthlyCost
            target = monthlyCost
        }

        for (const dep of dependencies) if (dep == null) return

        target.value = func(...(dependencies as [number, number, number]))
    }

    function updateIfUnlocked(
        r: Ref<number | null>,
        field: FieldNameAnnuity,
    ): void {
        watch(
            [r, lockedField],
            ([_, lockedField]) => {
                if (lockedField == field) return
                updateFields()
            },
            { immediate: true, flush: "sync" },
        )
    }

    updateIfUnlocked(mortgage, "mortgage")
    updateIfUnlocked(interest, "interest")
    updateIfUnlocked(years, "years")
    updateIfUnlocked(monthlyCost, "monthly-cost")
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
