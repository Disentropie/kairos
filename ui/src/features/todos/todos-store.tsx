import { JSX, createContext, createEffect, useContext } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { DndKey } from "../../components/Dnd/dnd-provider";


export enum Priority {
    lowest = "lowest",
    low = "low",
    medium = "mediuù",
    high = "high",
    critical = "critical",

}

export type ID = string | number
export type TodoType = {
    name: string,
    id: ID,
    category: Categories,
    priority: Priority,
    date_creation: Date,
    create_by: string,
    description?: string,
    attribute_to?: string,
    end_date?: Date

}
export const todos_categories = ['todo', 'in_progress', 'blocked', 'on_hold', 'done'] as const
//export type Categories = 'todo' | 'in_progress' | 'blocked' | 'done' | 'archived'
export type Categories = typeof todos_categories[number]
type TodosCategoriesType = Array<TodoType>

const makeTodoContext = () => {

    const all_todos: TodosCategoriesType = [

        { name: 'todo 1', category: "todo", priority: Priority.low, id: "1", create_by: 'aurelien_clave', date_creation: new Date() },
        { name: 'todo 2', category: 'todo', priority: Priority.low, id: "2", create_by: 'aurelien_clave', date_creation: new Date() },

        { name: 'In progress 1', category: "in_progress", priority: Priority.medium, id: "3", create_by: 'aurelien_clave', date_creation: new Date() }
    ]


    const [todos, setTodos] = createStore<TodosCategoriesType>(all_todos)


    function addTodo( item: TodoType) {
        setTodos(
            produce((todos: TodosCategoriesType) => {
                todos.push(item)
            })
        );
    }

    function removeTodo( id: DndKey) {
        setTodos(
            produce((todos: TodosCategoriesType) => {
                const idx=todos.findIndex((todo)=>todo.id===id)
                todos.splice(idx, 1)
            })
        );
    }


    return [todos, { addTodo: addTodo, removeTodo: removeTodo }] as const
}

const TodosContext = createContext<ReturnType<typeof makeTodoContext>>()

type TodoProviderProps = {
    children?: JSX.Element
}


export function TodoProvider(props: TodoProviderProps) {


    return (
        <TodosContext.Provider value={makeTodoContext()}>
            {props.children}
        </TodosContext.Provider>
    )
}

export function useTodos() { return useContext(TodosContext)! }