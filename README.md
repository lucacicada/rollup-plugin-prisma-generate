# rollup-plugin-prisma-generate

A rollup plugin that generate `@prisma/client` automatically

```ts
import { defineConfig } from 'rollup'
import prismaGenerate from 'rollup-plugin-prisma-generate'

export default defineConfig({
  plugins: [
    prismaGenerate()
  ]
})
```
