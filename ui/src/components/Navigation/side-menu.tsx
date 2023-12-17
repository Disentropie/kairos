
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@suid/material";
import { AiOutlineMail } from 'solid-icons/ai'
import { DrawerProps } from "@suid/material/Drawer";
import { FaSolidClipboardList } from 'solid-icons/fa'
type Anchor = NonNullable<DrawerProps["anchor"]>;

const SideMenu = () => (

  <Box
    sx={{ width: 250 }}
    role="presentation"
  >
    <List>
      {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {index % 2 === 0 ? <AiOutlineMail /> : <FaSolidClipboardList />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      {["All mail", "Trash", "Spam"].map((text, index) => (
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {index % 2 === 0 ? <AiOutlineMail /> : <FaSolidClipboardList />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
);


export { SideMenu }