import { Menu, MenuItem, Button } from '@suid/material';
import { IoLanguageOutline } from 'solid-icons/io'
import { useI18n } from "@solid-primitives/i18n";
import { createSignal } from 'solid-js';

export function LanguageMenu() {
    const [t,{locale}]=useI18n()
    const [anchorEl, setAnchorEl] = createSignal<null | HTMLElement>(null);
    const open = () => Boolean(anchorEl());
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                sx={{
                    border: "1px solid rgb(220,220,220)",
                    m:1
                }}
                id="basic-button"
                aria-controls={open() ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open() ? "true" : undefined}
                onClick={(event) => {
                    setAnchorEl(event.currentTarget);
                }}
            >
                <IoLanguageOutline size={20} color='white' />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl()}
                open={open()}
                onClose={handleClose}
                MenuListProps={{ "aria-labelledby": "basic-button" }}
            >
                <MenuItem onClick={()=>{locale("fr");handleClose()}}>Francais</MenuItem>
                <MenuItem onClick={()=>{locale("en");handleClose()}}>English</MenuItem>  
            </Menu>
        </div>
    );


}