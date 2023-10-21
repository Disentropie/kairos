import { TodoProvider } from "./todos-store";
import { TodosView } from "./components/todos_view";

const Todos = () => {
    return (
        <TodoProvider>
            <TodosView/>
        </TodoProvider>
    )
}

export { Todos }