import { Box, Paper, styled } from "@suid/material";
import { TodoType } from "../../todos-store";
import { Draggable } from "../../../../components/Dnd";
import { TodoSnippet } from "../shared/todo-snippet";

type TodoSnippetProps = {
    todo: TodoType,
}



function KanbanTodoSnippet(props: TodoSnippetProps) {
    return (
        <Draggable key={props.todo.id}>{
            (drag_ref) => (
                <TodoSnippet
                    ref={drag_ref}
                    todo={props.todo}
                />
            )

        }
        </Draggable>)
}

export { KanbanTodoSnippet }