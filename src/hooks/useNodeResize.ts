import { MutableRefObject, useEffect, useRef } from 'react'
import { debounce } from 'lodash'

type ChangeType = 'shrink' | 'grow'
interface Options {
    field: keyof typeof HTMLElement.prototype
    trigger: number
    callback: (type: ChangeType) => void
}
const useNodeResize = (nodeRef: MutableRefObject<HTMLElement | null>, { field, trigger, callback }: Options) => {
    const cacheState = useRef<ChangeType>()
    useEffect(() => {
        const run = debounce((value: number) => {
            const state = value < trigger ? 'shrink' : 'grow'
            if (cacheState.current !== state) {
                callback(state)
                cacheState.current = state
            }
        }, 300)
        const handler = () => {
            if (!nodeRef.current) return
            if (field in nodeRef.current) {
                run(Number(nodeRef.current[field]))
            }
        }
        window.addEventListener('resize', handler)
        return () => {
            window.removeEventListener('resize', handler)
        }
    }, [])
}

export default useNodeResize
