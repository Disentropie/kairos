import { Component, lazy } from "solid-js"


type Routedefinition = {
    component: Component;
    path:string;
    name?: string;
    route_logo?: string | Component,
    is_protected?: boolean

}

type Routesdefinition = Array<Routedefinition> 


export const routes_definition: Routesdefinition = [
    {
        component: lazy(() => import("../pages/todos-page")),
        path:"/"
    }
]