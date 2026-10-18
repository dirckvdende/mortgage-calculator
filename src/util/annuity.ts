/** Maximum number of iterations to use when calculating the maximum interest */
const INTEREST_MAX_ITERATIONS = 1000

/**
 * Definition of an annuity mortgage problem, where one of the fields needs to
 * be calculated. This type is passed to all functions that calculate each of
 * the four fields.
 */
export type AnnuityMortgageProblem = {
    /** The total mortgage in € */
    mortgage: number
    /** The interest to pay per year as fraction (i.e. 3% = 0.03) */
    interest: number
    /** Number of years in which the mortgage needs to payed off */
    years: number
    /** Amount payed each year (interest + payed off) */
    yearlyPayment: number
}

/**
 * Calculate the yearly payment for a mortgage to be payed off in time
 * @param problem The mortgage problem to calculate the yearly payment for
 * @returns The yearly payment amount, or null if there is no solution
 */
export function getYearlyPayment(
    problem: AnnuityMortgageProblem,
): number | null {
    const { mortgage, interest, years } = problem
    if (mortgage < 0 || interest < 0 || years <= 0) return null
    if (interest == 0) return mortgage / years
    return (
        (interest * Math.exp(interest * years) * mortgage) /
        (Math.exp(interest * years) - 1)
    )
}

/**
 * Get the number of years a mortgage would have to run for such that a specific
 * amount would have to be payed each year
 * @param problem The mortgage problem to calculate the years for
 * @returns The number of years, or null if the parameters imply there is
 * no solution
 */
export function getYears(problem: AnnuityMortgageProblem): number | null {
    const { mortgage, interest, yearlyPayment } = problem
    if (mortgage < 0 || interest < 0 || yearlyPayment <= 0) return null
    if (interest == 0) return mortgage / yearlyPayment
    if (interest * mortgage >= yearlyPayment) return null
    return (
        Math.log(yearlyPayment / (yearlyPayment - interest * mortgage)) /
        interest
    )
}

/**
 * Calculate the interest rate a mortgage would have to be to be paid off in a
 * specific number of years for a specific amount each year
 * @param problem The mortgage problem to calculate the interest for
 * @returns The interest rate, or null if the parameters imply there is no
 * solution
 */
export function getInterest(problem: AnnuityMortgageProblem): number | null {
    const { mortgage, years, yearlyPayment } = problem
    if (mortgage <= 0 || years <= 0 || yearlyPayment <= 0) return null
    if (yearlyPayment * years < mortgage) return null
    let lo = 0
    let hi = yearlyPayment / mortgage
    for (let i = 0; i < INTEREST_MAX_ITERATIONS && hi - lo > 1e-5; i++) {
        const mid = (lo + hi) / 2
        const midYears = getYears({
            mortgage,
            interest: mid,
            years: 0,
            yearlyPayment,
        })
        if (midYears == null || midYears > years) hi = mid
        else lo = mid
    }
    return lo
}

/**
 * Get the mortgage you could get given some interest rate, number of years of
 * payment, and a fixed monthly cost
 * @param problem The mortgage problem to calculate the maximum mortgage for
 * @returns The maximum mortgage, or null if there no solution
 */
export function getMortgage(problem: AnnuityMortgageProblem): number | null {
    const { interest, years, yearlyPayment } = problem
    if (interest < 0 || years <= 0 || yearlyPayment < 0) return null
    if (interest == 0) return years * yearlyPayment
    return (yearlyPayment / interest) * (1 - Math.exp(-interest * years))
}
