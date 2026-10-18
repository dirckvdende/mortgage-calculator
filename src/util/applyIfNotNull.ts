/**
 * Apply a function only if all of its arguments (provided as an object) are
 * non-null
 * @param func The function to apply if all items in the object are non-null
 * @param defaultValues Optional list of items to set to a default value if they
 * are null. This means the function `func` can still be applied if these values
 * were initially null
 * @returns Function can be called with null arguments, which calls `func` only
 * if its arguments are non-null
 */
export function applyIfNotNull<T extends object, R>(
    func: (arg: T) => R | null,
    defaultValues?: Partial<T>,
): (arg: {
    [K in keyof T]: T[K] | null
}) => R | null {
    return (arg) => {
        const argOut = { ...arg }
        for (const key in argOut) {
            if (argOut[key] === null) {
                if (
                    defaultValues === undefined ||
                    defaultValues[key] === undefined
                )
                    return null
                argOut[key] = defaultValues[key]
            }
        }
        return func(argOut as T)
    }
}
