import {
    onUnmounted,
    toValue,
    watch,
    type MaybeRefOrGetter,
    type Ref,
    type UnwrapRef,
} from "vue"

export function useRotatingSync<T extends Record<string, Ref<any>>>(
    refs: T,
    target: MaybeRefOrGetter<keyof T>,
    transform: {
        [P in keyof T]: (refs: T) => UnwrapRef<T[P]>
    },
): { stop: () => void } {
    const stopWatchFunctions: (() => void)[] = []

    function update(updatedValue: keyof T): void {
        if (updatedValue == toValue(target)) return
        refs[toValue(target)]!.value = transform[toValue(target)](refs)
    }

    function stop(): void {
        for (const stopWatch of stopWatchFunctions) stopWatch()
    }

    for (const key of Object.keys(refs)) {
        const { stop: stopWatch } = watch(refs[key]!, () => update(key), {
            immediate: true,
        })
        stopWatchFunctions.push(stopWatch)
    }

    onUnmounted(stop)

    return { stop }
}
