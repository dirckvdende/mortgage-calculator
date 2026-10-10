/**
 * Calculate the monthly cost of a mortgage
 * @param mortgage The mortgage amount
 * @param interest The yearly interest as a fraction (e.g. 3% = 0.03)
 * @param years Number of years the mortgage runs for
 * @returns The monthly cost, or null if the parameters imply there is no
 * solution
 */
export function getMonthlyCost(
    mortgage: number,
    interest: number,
    years: number,
): number | null {
    if (mortgage < 0 || interest < 0 || years < 1) return null
    const months = years * 12
    const monthlyInterest = Math.pow(1 + interest, 1 / 12) - 1
    let lo = 0
    let hi = mortgage
    while (hi - lo > 0.001) {
        const monthlyCost = (lo + hi) / 2
        let mortgageLeft = mortgage
        for (let month = 0; month < months; month++) {
            const currentInterest = mortgageLeft * monthlyInterest
            if (currentInterest > monthlyCost) break
            mortgageLeft -= monthlyCost - currentInterest
            if (mortgageLeft < 0) break
        }
        if (mortgageLeft < 0) hi = monthlyCost
        else lo = monthlyCost
    }
    return lo
}

/**
 * Get the number of years a mortgage would have to run for for a specific
 * monthly payment amount
 * @param mortgage The mortgage amount
 * @param interest The yearly interest as a fraction (e.g. 3% = 0.03)
 * @param monthlyCost The targeted monthly cost
 * @returns The number of years, or null if the parameters imply there is
 * no solution
 */
export function getYearsOfLoan(
    mortgage: number,
    interest: number,
    monthlyCost: number,
): number | null {
    // TODO: Implement
    return 2
}

/**
 * Calculate the interest rate a mortgage would have to be to be a paid in a
 * specific number of years for a specific amount each month
 * @param mortgage The mortgage amount
 * @param years Number of years the mortgage runs for
 * @param monthlyCost The targeted monthly cost
 * @returns The interest rate, or null if the parameters imply there is no
 * solution
 */
export function getInterest(
    mortgage: number,
    years: number,
    monthlyCost: number,
): number | null {
    // TODO: Implement
    return 3
}

/**
 * Get the mortgage you could get given some interest rate, number of years of
 * payment, and a fixed monthly cost
 * @param interest The yearly interest as a fraction (e.g. 3% = 0.03)
 * @param years Number of years the mortgage runs for
 * @param monthlyCost The targeted monthly cost
 * @returns The interest rate, or null if the parameters imply there is no
 * solution
 */
export function getMortgage(
    interest: number,
    years: number,
    monthlyCost: number,
): number | null {
    // TODO: Implement
    return 4
}
