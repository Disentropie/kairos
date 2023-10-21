import { Button, Fade, Grid, Modal, Paper, Stack, Typography, styled } from "@suid/material";
import { createSignal } from "solid-js";
import { IoAdd } from 'solid-icons/io'
import useTheme from "@suid/material/styles/useTheme";
import { MyModal } from "../shared/modal";

const StyledButton = styled(Button)({
    fontSize: ".7rem",
    color: "rgb(120,150,180)",
    width: "fit-content",
    height: "25px",
    margin: '0px auto',
    display: 'flex',
    justifyContent: 'space-between'
});

function AddTodoInput() {


    const [open, setOpen] = createSignal(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false)

    
    return (
        <>
            <StyledButton variant="outlined" onClick={handleOpen}>
                Create a task &#9;<IoAdd />
            </StyledButton>
            <MyModal open={open()} close={handleClose}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
                <Stack sx={{ width: "100%", justifyContent: "space-evenly" }} direction={"row"}>
                    <Button variant="contained" color="info" fullWidth sx={{ marginRight: "10px" }}>Valider</Button>
                    <Button onClick={handleClose} variant="text" color="inherit" fullWidth sx={{ marginLeft: "10px" }} >Annuler</Button>
                </Stack>

            </MyModal>
        </>
    )
}

export { AddTodoInput }