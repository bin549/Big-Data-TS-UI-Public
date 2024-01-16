import { defineConfig, presetUno, presetAttributify, presetIcons, transformerDirectives, transformerVariantGroup } from 'unocss'


export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle'
      }
    }),
    presetAttributify(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ]
})
