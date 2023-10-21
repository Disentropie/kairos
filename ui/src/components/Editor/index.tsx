import { createMemo, createSignal, onCleanup, onMount } from 'solid-js';
import { Editor, editorViewOptionsCtx, rootCtx, defaultValueCtx, } from '@milkdown/core';
import { commonmark, paragraphAttr } from '@milkdown/preset-commonmark';
import { history } from '@milkdown/plugin-history';
import { gfm } from '@milkdown/preset-gfm';
import { nord } from '@milkdown/theme-nord';
import '@milkdown/theme-nord/style.css'
import { Box } from '@suid/material';

import { listener, listenerCtx } from '@milkdown/plugin-listener';

type AppEditorProps = {
  editorContent?: string
}

const AppEditor = ({ editorContent }: AppEditorProps) => {
  let ref: HTMLDivElement | undefined;
  let editor: Editor;
  const [editor_content, set_editor_content] = createSignal(editorContent);
  const is_empty = createMemo(() => {
    return (
      editor_content() === undefined || editor_content() === ''
    )
  })
  onMount(async () => {
    editor = await Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, ref);
      })
      .config(nord)
      .config((ctx) => {
        // Add attributes to the editor container
        ctx.update(editorViewOptionsCtx, (prev) => ({
          ...prev,
          attributes: { class: 'milkdown-editor', translate: 'true', spellcheck: 'true', placeholder: 'You can start to edit' },
        }))
        //ctx.set(defaultValueCtx, defaultValue);
        ctx.set(paragraphAttr.key, () => ({ style: 'padding:5px 2px;margin-block-start: 0em;margin-block-end: 0em,border:none' }));

        if (!is_empty()) {
          ctx.set(defaultValueCtx, editorContent!);
        }
        else {
          ctx.set(defaultValueCtx, 'Please type something');
        }
      })
      .config((ctx) => {
        const listener = ctx.get(listenerCtx);

        listener.focus((ctx) => {
          console.log("here")
          console.log(is_empty())
          if (is_empty()) {

            ctx.set(defaultValueCtx, 'Hello babar');

          }
        })

      })
      .use(listener)
      .use(commonmark)
      .use(gfm)
      .use(history)
      .create();
  });

  onCleanup(() => {
    editor.destroy();
  });

  return <Box sx={{ border: '1px solid black', width: '80%', margin: '0 auto' }} ref={ref} />;
}
export { AppEditor }