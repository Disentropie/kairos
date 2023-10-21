import { JSX, Setter, createContext, Accessor, createSignal, useContext, createEffect, createMemo, batch, onMount } from "solid-js";
import { createStore, produce } from "solid-js/store";
export type DndKey = string | symbol | number
import "./dnd.css"
type DndSignal = Record<DndKey, Container>
type Container = {
    el: HTMLElement,
    name: DndKey,
    childs: Array<HTMLElement>
}

export type DropEndState = {
    from: DropstateTypeFrom,
    to: DndKey
}
export type DropstateTypeFrom = {
    container: DndKey,
    element_id: number,
    element_key?: DndKey
}


function makeDndContext(dragEnd: (el: DropEndState) => void) {

    const [dndZone, setDndZone] = createStore<DndSignal>({})
    const [activeEl, setActiveEl] = createSignal<DropstateTypeFrom | null>(null)


    function addNewDropZone(id: DndKey, ref: HTMLElement) {
        const container_name = id.toString()

        setDndZone(
            produce((dnd) => {
                const container: Container = { el: ref, name: container_name, childs: [] }
                dnd[id] = container
            })
        )

        ref.ondragleave = (e) => { e.preventDefault(); ref.classList.remove("dragover") }
        ref.ondrop = (e) => {
            if (activeEl()!.container === id) return false
            e.preventDefault();
            ref.classList.remove("dragover");
            const dropState: DropEndState = { from: activeEl()!, to: id };
            dragEnd(dropState)
            setActiveEl(null)
        }
        ref.ondragenter = (e) => { e.preventDefault(); }
        ref.ondragover = (e) => {
            if (activeEl()!.container === id) return false
            ref.classList.add("dragover")
            e.preventDefault();
        }
    }
    function removeDraggable(drop_id: DndKey, ref: HTMLElement) {

        setDndZone(
            produce((dnd) => {
                const remove_id = dnd[drop_id].childs.findIndex((child) => child === ref)
                dnd[drop_id].childs.splice(remove_id, 1)
            })
        )
    }

    function addNewDraggable(drop_id: DndKey, ref: HTMLElement, ref_key?: DndKey) {
        setDndZone(
            produce((dnd) => {
                dnd[drop_id].childs.push(ref)
            })
        )
        ref.classList.add("draggable")
        ref.draggable = true
        const ref_id = createMemo(() => dndZone[drop_id].childs.findIndex((child) => child === ref))
        ref.ondragstart = (e) => {

            ref.classList.add("dragging");
            setActiveEl({ container: drop_id, element_id: ref_id(), element_key: ref_key })
        }

        ref.ondragend = () => {
            ref.classList.remove("dragging");
            setActiveEl(null)
        }
    }

    return { addNewDropZone: addNewDropZone, removeDraggable: removeDraggable, addNewDraggable: addNewDraggable }
}



type DndZoneProps = {
    children: (ref: Setter<HTMLElement | null>) => JSX.Element,
    onDragStart?: () => void
    onDrop: (el: DropEndState) => void
}
const DndContext = createContext<ReturnType<typeof makeDndContext>>()
function useDnd() { return useContext(DndContext)! }
function DndZone(props: DndZoneProps) {

    const [ref, setRef] = createSignal<HTMLElement | null>(null)
    onMount(() => {
        if (ref()) {
            ref()!.ondragover = (e) => { e.preventDefault() }
        }
    })
    return (
        <DndContext.Provider value={makeDndContext(props.onDrop)}>
            {props.children(setRef)}
        </DndContext.Provider>
    )
}


export { useDnd, DndZone }