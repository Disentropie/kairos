import { Button, Fade, Grid, Modal, Paper, Stack, Typography, styled, useTheme } from "@suid/material";
import { JSX } from "solid-js"

type ModalProps = {
    children: JSX.Element,
    open: boolean,
    close: () => boolean,

}
function MyModal(props: ModalProps) {
    const theme = useTheme();
    return (
        <Modal
            open={props.open}
            onClose={props.close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Fade in={props.open}>

                <Grid container lg={3} md={6} sm={10} xs={12}
                    sx={{
                        position: "relative",
                        top: "50vh",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: theme.palette.background.paper,
                        border: "1px solid #000",
                        boxShadow: "24px",
                        p: 2
                    }}
                >
                    {props.children}
                </Grid>
            </Fade>
        </Modal>
    )
}

export {MyModal}