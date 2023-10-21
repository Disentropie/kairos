import { JSX, Setter, createSignal, onCleanup, onMount } from "solid-js"
import { useDroppable } from './droppable'
import './dnd.css'
import { DndKey } from "./dnd-provider"
type SortableProps = {
    key?:DndKey
    children: (ref: Setter<HTMLElement | null>) => JSX.Element | JSX.Element,
}

function Draggable(props: SortableProps) {
    const { addDraggable, removeDraggable } = useDroppable()
    const [ref, setRef] = createSignal<HTMLElement | null>(null)
    let id: number = -1
    onMount(() => {
        const computeRef = ref();
        if (computeRef) {
            addDraggable(computeRef,props.key)
        }
    })
    onCleanup(() => {
        if (ref())
            removeDraggable(ref()!)
    })

    return props.children(setRef)

}

export { Draggable }