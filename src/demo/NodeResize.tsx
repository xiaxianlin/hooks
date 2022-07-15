import { useRef, useState } from 'react'
import useNodeResize from '../hooks/useNodeResize'

const NodeResize = () => {
    const [action, setAction] = useState('')
    const nodeRef = useRef<HTMLDivElement>(null)

    useNodeResize(nodeRef, {
        field: 'offsetWidth',
        trigger: 800,
        callback: setAction
    })

    return (
        <div ref={nodeRef} style={{ width: '50%', height: 300, background: 'rgba(0,0,0,0.3)' }}>
            一块可变区域：{action}
        </div>
    )
}

export default NodeResize
