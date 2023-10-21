import { Box, Paper, styled } from "@suid/material";
import { TodoType } from "../../todos-store";
import { Setter } from "solid-js";

type TodoSnippetProps={
    ref?:Setter<HTMLElement|null>,
    todo:TodoType
}

const StyledPaper = styled(Paper)({
    color: "white",
    backgroundColor:"rgb(180,100,100)",
    padding: 8,
    borderRadius: 4,
    margin:'10px',
    '&:hover': {
        cursor: "pointer",
     }
});

export function TodoSnippet(props:TodoSnippetProps){
    return (
        <StyledPaper ref={props.ref}>
            <Box>
                <span
                >{props.todo.name}</span>
            </Box>
        </StyledPaper>
    )
}