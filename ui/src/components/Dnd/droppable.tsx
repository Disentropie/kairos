import { JSX, Setter, createContext, createSignal, onMount, useContext } from "solid-js"
import { DndKey, useDnd } from "./dnd-provider"


function makeDroppableContext(key: DndKey, addNewDraggable: (drop_id: DndKey, ref: HTMLElement,ref_key?:DndKey) =>void, cleanDraggable: (drop_id: DndKey, ref: HTMLElement) => void) {
    function addDraggable(ref: HTMLElement,ref_key?:DndKey) {
        return addNewDraggable(key, ref,ref_key)
    }
    function removeDraggable(ref: HTMLElement) {
        cleanDraggable(key, ref)
    }
    return { addDraggable: addDraggable, removeDraggable: removeDraggable } as const
}


type DroppableProps = {
    key: DndKey,
    children: (ref: Setter<HTMLElement | null>) => JSX.Element,
}
const DroppableContext = createContext<ReturnType<typeof makeDroppableContext>>()
function useDroppable() { return useContext(DroppableContext)! }
function Droppable(props: DroppableProps) {
    const { addNewDropZone, addNewDraggable, removeDraggable } = useDnd()
    const [ref, setRef] = createSignal<HTMLElement | null>(null);

    onMount(() => {
        const computeRef = ref();
        if (computeRef) {
            addNewDropZone(props.key, computeRef)

        }
    })
    return (
        <DroppableContext.Provider value={makeDroppableContext(props.key, addNewDraggable, removeDraggable)}>
            {props.children(setRef)}
        </DroppableContext.Provider >
    )
}


export { Droppable, useDroppable }