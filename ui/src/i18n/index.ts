import { createSignal } from "solid-js";
import { en_dict } from "./languages/en"
import { fr_dict } from "./languages/fr";
import { createI18nContext } from "@solid-primitives/i18n";
const get_browser_language: string = window.navigator.language.split("-")[0]
const dictionaries = {
    en: en_dict,
    fr: fr_dict,
};

const i18n_dictionaries = createI18nContext(dictionaries, get_browser_language)
export { i18n_dictionaries}