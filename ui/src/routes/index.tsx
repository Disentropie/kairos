import { Router, Route, Routes } from "@solidjs/router";
import { Component, For } from "solid-js";
import { routes_definition } from "./routes_definition";
import { NavBar } from "../components/Navigation/navbar";
const RouterApp: Component = () => {
    return (
        <Router>
            <NavBar menus={routes_definition.map(route=>({path:route.path,name:Router.name}))}/>
            <Routes>
                <For each={routes_definition}>
                    {(route, i) => {
                        return <Route path={route.path} component={route.component} ref={i()} />
                    }
                    }
                </For>

            </Routes>
        </Router>
    )
}

export { RouterApp }