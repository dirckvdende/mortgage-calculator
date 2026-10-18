import { type Ref } from "vue"

/**
 * Convert a function from acception value to accepting refs. The function's
 * arguments are given as a single object
 * @param func The function to transform, which accepts values
 * @returns The same function, but now accepting refs
 */
export function createRefObjectFn<T extends object, R>(
    func: (arg: T) => R,
): (arg: {
    [K in keyof T]: Ref<T[K]>
}) => R {
    return (arg) => {
        const result: any = {}
        for (const key in arg) result[key] = arg[key].value
        return func(result as T)
    }
}
