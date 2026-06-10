# Content Studio

Template educacional para praticar APIs modernas do React 19 no conteúdo complementar da Rocketseat.

## Como rodar

```bash
npm install
npm run dev
```

## Stack

- Vite, React 19 e TypeScript
- React Router em Declarative Mode
- Tailwind CSS v4 com tokens via `@theme`
- shadcn/ui com Base UI
- Zod, date-fns, Vitest e Testing Library

## Rotas

- `/` - dashboard e biblioteca de conteúdos
- `/contents/:contentId` - detalhe, preview, comentários e métricas
- `/contents/:contentId/edit` - editor com formulário e autosave local
- `/feedback` - moderação de comentários
- `/components` - preview visual dos componentes compartilhados

## Dados locais

O mock backend usa `localStorage` com a chave `content-studio:mock-db`. Use o botão `Resetar dados` no topo para restaurar o seed inicial.

## Como estudar

Comece pela branch `main`, tente cada checkpoint e compare sua solução com as branches `solution/*` depois de assistir ao vídeo correspondente.

Branches de solução planejadas:

- `solution/01-actions-formularios`
- `solution/02-ui-otimista-transitions`
- `solution/03-suspense-use-lazy`
- `solution/04-use-effect-event`
- `solution/05-activity-compiler`
- `solution/final`

As bibliotecas de infraestrutura ajudam o template a ficar realista, mas o foco do estudo está nas APIs e decisões do React 19.
