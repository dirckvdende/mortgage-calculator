/**
 * Definition of a linear mortgage problem, where one of the fields needs to
 * be calculated. This type is passed to all functions that calculate each of
 * the four fields.
 */
export type LinearMortgageProblem = {
    /** The total mortgage in € */
    mortgage: number
    /** The interest to pay per year as fraction (i.e. 3% = 0.03) */
    interest: number
    /** Number of years in which the mortgage needs to paid off */
    years: number
    /** Amount paid each year at the start of the loan (interest + paid off)
     */
    initialYearlyPayment: number
}

/**
 * Calculate the initial yearly payment for a mortgage to be paid off in time
 * @param problem The mortgage problem to calculate the yearly payment for
 * @returns The yearly payment amount, or null if there is no solution
 */
export function getInitialYearlyPayment(
    problem: LinearMortgageProblem,
): number | null {
    const { mortgage, interest, years } = problem
    if (mortgage < 0 || interest < 0 || years <= 0) return null
    const initialInterest = mortgage * interest
    const initialPayOff = mortgage / years
    return initialInterest + initialPayOff
}

/**
 * Get the number of years a mortgage would have to run for such that a specific
 * amount would have to be paid in the first year
 * @param problem The mortgage problem to calculate the years for
 * @returns The number of years, or null if the parameters imply there is
 * no solution
 */
export function getYears(problem: LinearMortgageProblem): number | null {
    const { mortgage, interest, initialYearlyPayment } = problem
    if (mortgage < 0 || interest < 0 || initialYearlyPayment <= 0) return null
    const initialInterest = mortgage * interest
    if (initialInterest >= initialYearlyPayment) return null
    return mortgage / (initialYearlyPayment - initialInterest)
}

/**
 * Calculate the interest rate a mortgage would have to be to be paid off in a
 * specific number of years for a specific amount in the first year
 * @param problem The mortgage problem to calculate the interest for
 * @returns The interest rate, or null if the parameters imply there is no
 * solution
 */
export function getInterest(problem: LinearMortgageProblem): number | null {
    const { mortgage, years, initialYearlyPayment } = problem
    if (mortgage <= 0 || years <= 0 || initialYearlyPayment <= 0) return null
    if (initialYearlyPayment * years < mortgage) return null
    const initialInterestAmount = initialYearlyPayment - mortgage / years
    return initialInterestAmount / mortgage
}

/**
 * Get the mortgage you could get given some interest rate, number of years of
 * payment, and an initial yearly cost
 * @param problem The mortgage problem to calculate the maximum mortgage for
 * @returns The maximum mortgage, or null if there no solution
 */
export function getMortgage(problem: LinearMortgageProblem): number | null {
    const { interest, years, initialYearlyPayment } = problem
    if (interest < 0 || years <= 0 || initialYearlyPayment < 0) return null
    return initialYearlyPayment / (interest + 1 / years)
}
