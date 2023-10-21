import { Button, Typography, styled } from "@suid/material"
import { For, createEffect, createSignal } from "solid-js"
import { VsTable } from 'solid-icons/vs'
import { Tabs } from "../../../components/Tabs/tabs"
import { TbLayoutKanban } from 'solid-icons/tb'
import { BsBarChartSteps } from 'solid-icons/bs'
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
    const icons = [<VsTable />, <TbLayoutKanban />, <BsBarChartSteps />]
    

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
                            <Typography margin={"0px 5px"} fontSize={11}>{t(`todos.views.${view}.name`)}</Typography>
                        </StyledButton>
                    )
                }
            </For>
        </Tabs>

    )
}

export { SelectTodoView }