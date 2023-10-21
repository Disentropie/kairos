import { Match, Switch, createSignal } from "solid-js"
import { SelectTodoView, views } from "./select-todo-view"
import { KanbanView } from "./kanban/kanban-view"
import { MainTableView } from "./maintable/maintable_view"

function TodosView() {
    const [currentView, setCurrentView] = createSignal<typeof views[number]>(views[0])

    return (
        <>
            <SelectTodoView activeView={currentView()} onViewChanged={setCurrentView} />
            <Switch>
                <Match when={currentView() === 'main_table'}>
                    <MainTableView />
                </Match>
                <Match when={currentView() === "kanban"}>
                    <KanbanView />
                </Match>
                <Match when={currentView() === "timeline"}>
                    <p>timelineview</p>
                </Match>
            </Switch>
        </>
    )
}

export { TodosView }