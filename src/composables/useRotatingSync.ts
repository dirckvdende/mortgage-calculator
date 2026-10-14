import {
    onUnmounted,
    toRef,
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

    function update(): void {
        refs[toValue(target)]!.value = transform[toValue(target)](refs)
    }

    function stop(): void {
        for (const stopWatch of stopWatchFunctions) stopWatch()
    }

    for (const key of Object.keys(refs)) {
        const { stop: stopWatch } = watch(
            refs[key]!,
            () => {
                if (key == toValue(target)) return
                update()
            },
            {
                immediate: true,
            },
        )
        stopWatchFunctions.push(stopWatch)
    }
    const { stop: stopTargetWatch } = watch(toRef(target), update)
    stopWatchFunctions.push(stopTargetWatch)

    onUnmounted(stop)

    return { stop }
}
