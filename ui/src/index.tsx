/* @refresh reload */
import {I18nContext } from "@solid-primitives/i18n";
import { render } from 'solid-js/web';
import { RouterApp } from './routes';
import { i18n_dictionaries } from "./i18n";
import { Component } from "solid-js";
import "tailwindcss/tailwind.css";
import "./index.css";

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

const Index: Component = () => {
  return (
    <I18nContext.Provider value={i18n_dictionaries }>
      <RouterApp />
    </I18nContext.Provider>
  )
}

render(() => <Index/>, root!);
