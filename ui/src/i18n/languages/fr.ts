import { en_dict } from './en'

export const fr_dict: typeof en_dict = {
    home: "Bonjour accueil",
    routes: {
        names: {
            "/": "Todos"
        }
    },
    todos: {
        categories: {
            todo: {
                name: "A faire"
            },
            in_progress: {
                name: "En cours"
            },
            blocked: {
                name: "Bloqué"
            },
            done: {
                name: "Effectué"
            },
            on_hold: {
                name: "En attente"
            }
        },
        views:{
            main_table:{
                name:"Table"
            },
            kanban:{
                name:"Kanban"
            },
            timeline:{
                name:"Calendrier"
            }
        }
    }
}