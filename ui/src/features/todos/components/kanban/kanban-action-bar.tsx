import { Grid, Stack } from "@suid/material";
import { AddTodoInput } from "./add-todo-input";

function KanbanActionBar() {
    return (
        <Grid container direction={"row"} spacing={2} >
            <Grid item>
                <AddTodoInput />
            </Grid>
            <Grid item>
                <div>Filters</div>
            </Grid>
        </Grid>
    )
}

export { KanbanActionBar }