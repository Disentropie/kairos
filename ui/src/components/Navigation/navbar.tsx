import {
    AppBar,
    Box,
    Button,
    Drawer,
    IconButton,
    Toolbar,
    Typography,
    useTheme,
} from "@suid/material";
import { useLocation } from "@solidjs/router";
import { useI18n } from "@solid-primitives/i18n";
import { createSignal } from "solid-js";
import { SideMenu } from "./side-menu";
import { LanguageMenu } from "./language-menu";
import { FiMenu } from 'solid-icons/fi'
export type IMenuNavigation = {
    path: string,
    name: string,
    isActive?: boolean
}

type NavBarProps = {
    menus: Array<IMenuNavigation>
}

const NavBar = (props: NavBarProps) => {
    const theme = useTheme();
    const location = useLocation()
    const [t] = useI18n()
    const [menuOpen, setMenuOpen] = createSignal(false)
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => setMenuOpen(true)}
                    >
                        <FiMenu />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {t(`routes.names.${location.pathname}`)}
                    </Typography>
                    
                    <LanguageMenu/>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor={"left"}
                open={menuOpen()}
                sx={{ zIndex: 999 }}
                onClose={() => setMenuOpen(false)}
            >
                <SideMenu />
            </Drawer>
        </Box>
    );
}

export { NavBar }