import React from 'react'

interface Props {
  backgroundColor?: string
  textColor?: string
  fontSize?: string
  padding?: string
  margin?: string
  width?: string
  borderRadius?: string
  letterSpacing?: string
}

function HotspotCardConfig({
  backgroundColor = '#4C2B08',
  textColor = '#ffffff',
  fontSize = '0.75rem',
  padding = '0.55rem 1.5rem',
  margin = '0.5rem auto 0',
  width = 'fit-content',
  borderRadius = '0px',
  letterSpacing = '0.12em',
}: Props) {
  const css = `
    :root {
      --hotspot-buy-bg: ${backgroundColor};
      --hotspot-buy-color: ${textColor};
      --hotspot-buy-font-size: ${fontSize};
      --hotspot-buy-padding: ${padding};
      --hotspot-buy-margin: ${margin};
      --hotspot-buy-width: ${width};
      --hotspot-buy-border-radius: ${borderRadius};
      --hotspot-buy-letter-spacing: ${letterSpacing};
    }
  `
  // eslint-disable-next-line react/no-danger
  return <style dangerouslySetInnerHTML={{ __html: css }} />
}

HotspotCardConfig.schema = {
  title: 'Hotspot Card — Config botón COMPRAR',
  type: 'object',
  properties: {
    backgroundColor: {
      title: 'Color de fondo',
      description: 'Ej: #4C2B08',
      type: 'string',
      default: '#4C2B08',
    },
    textColor: {
      title: 'Color del texto',
      description: 'Ej: #ffffff',
      type: 'string',
      default: '#ffffff',
    },
    fontSize: {
      title: 'Tamaño del texto',
      description: 'Ej: 0.75rem, 14px',
      type: 'string',
      default: '0.75rem',
    },
    padding: {
      title: 'Padding (relleno interior)',
      description: 'Ej: 0.55rem 1.5rem',
      type: 'string',
      default: '0.55rem 1.5rem',
    },
    margin: {
      title: 'Margen exterior vertical',
      description: 'Solo arriba/abajo — el centrado horizontal es automático. Ej: 0.5rem auto 0',
      type: 'string',
      default: '0.5rem auto 0',
    },
    width: {
      title: 'Ancho del botón',
      description: 'fit-content, 100%, 80%, 200px, etc.',
      type: 'string',
      default: 'fit-content',
    },
    borderRadius: {
      title: 'Border radius (bordes redondeados)',
      description: 'Ej: 0px, 4px, 50px',
      type: 'string',
      default: '0px',
    },
    letterSpacing: {
      title: 'Espaciado entre letras',
      description: 'Ej: 0.12em',
      type: 'string',
      default: '0.12em',
    },
  },
}

export default HotspotCardConfig
