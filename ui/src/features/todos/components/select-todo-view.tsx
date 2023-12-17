import { Button, Typography, styled } from "@suid/material"
import { For,  createSignal } from "solid-js"
import { VsTable } from 'solid-icons/vs'
import { Tabs } from "../../../components/Tabs/tabs"
import { BsKanban } from 'solid-icons/bs'
import { AiOutlineCalendar } from 'solid-icons/ai'
import { useI18n } from "@solid-primitives/i18n"

export const views = ['main_table', 'kanban', 'timeline'] as const
type View = typeof views[number]


const StyledButton = styled(Button)({
    color: "black"
});

type SelectViewProps = {
    activeView: View,
    onViewChanged: (view: View) => void
}

function SelectTodoView(props: SelectViewProps) {
    const [value, setValue] = createSignal(0);
    const [t] = useI18n()
    const icons = [<VsTable size={16} />, <BsKanban size={16} />, <AiOutlineCalendar size={16}/>]
    

    return (
        <Tabs
            value={value()}
            onChange={(e, newValue) => {
                setValue(newValue)
                props.onViewChanged(views[newValue])
            }}
        >
            <For each={views}>
                {
                    (view, idx) => (
                        <StyledButton>
                            {icons[idx()]}
                            <Typography margin={"0px 5px"} fontSize={12}>{t(`todos.views.${view}.name`)}</Typography>
                        </StyledButton>
                    )
                }
            </For>
        </Tabs>

    )
}

export { SelectTodoView }