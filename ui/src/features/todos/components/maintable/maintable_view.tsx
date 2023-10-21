import { For } from "solid-js"
import { useTodos } from "../../todos-store"
import { TodoSnippet } from "../shared/todo-snippet"

export function MainTableView() {
    const [todos] = useTodos()
    return (
        <For each={todos}>
            {
                (todo) => (
                    <TodoSnippet todo={todo} />
                )
            }

        </For>
    )
}