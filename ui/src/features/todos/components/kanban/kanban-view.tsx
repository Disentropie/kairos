import { For } from "solid-js";
import { Box, Grid, Typography, styled } from "@suid/material"
import { Categories, todos_categories, useTodos } from "../../todos-store";
import { useI18n } from "@solid-primitives/i18n";
import { DndZone, Droppable, Dropstate } from "../../../../components/Dnd";
import { KanbanActionBar } from "./kanban-action-bar";
import { KanbanTodoSnippet } from "./kanban-todo-snippet";

function KanbanView() {

    const [todos, { addTodo, removeTodo }] = useTodos()
    const [t] = useI18n()

    function onDrop(el: Dropstate) {
        const todo_id=todos.findIndex(todo=>todo.id===el.from.element_key)
        const new_todo = {...todos[todo_id]}
        new_todo.category=el.to as Categories
        addTodo(new_todo)
        const id_toremove = el.from.element_id
        removeTodo(el.from.element_key!)
    }

    const StyledGrid = styled(Grid)({
        minHeight: "200px"
    });
    const StyledBox = styled(Box)({
        height: '100%',
        padding: '10px 0px'
    });

    return (
        <DndZone onDrop={onDrop}>
            {(ref) => (
                <>
                    <KanbanActionBar />
                    <Grid ref={ref} container justifyContent="space-around">

                        <For each={todos_categories}>
                            {
                                (category, idx) => (
                                    <StyledGrid item xs={12} sm={12} md={12} lg={2} >
                                        <Typography textAlign="center">{t(`todos.categories.${category}.name`)}</Typography>


                                        <Droppable
                                            key={category}>
                                            {(drop_ref) => (

                                                <StyledBox ref={drop_ref}>
                                                    <For each={todos.filter(todo=>todo.category===category)}>
                                                        {
                                                            (todo, idx) => <KanbanTodoSnippet todo={todo} />
                                                        }
                                                    </For>

                                                </StyledBox>
                                            )}
                                        </Droppable>
                                    </StyledGrid>
                                )
                            }

                        </For>
                    </Grid>
                </>
            )}
        </DndZone >
    )
}

export { KanbanView }