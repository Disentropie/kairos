import { JSX, children, createEffect, createSignal, onMount } from "solid-js"
import  './tabs.css'
type TabsProps = {
    children: JSX.Element
    value: number,
    onChange: (event: MouseEvent | TouchEvent | null, newValue: number) => number | void
}
export function Tabs(props: TabsProps) {
    const childrens = children(() => props.children)
    const [style, setStyle] = createSignal<JSX.CSSProperties>()
    onMount(() => {
    
        childrens.toArray().map((children, index) => {
            const child = children as HTMLElement;
            child.tabIndex=index
            child.classList.add("tab_child")
            child.onclick = (e) => { props.onChange(e, index) }
            child.ontouchstart = (e) => { props.onChange(e, index) }
        })
    })

    createEffect(() => {
        childrens.toArray().map((children,idx)=>{
            const child=children as HTMLElement;
            if(idx===props.value){
                child.classList.add("active")
            }
            else{
                child.classList.remove("active")
            }
        })
    })


    return (
        <div class="tab">
            {childrens()}
        </div>
    )

}