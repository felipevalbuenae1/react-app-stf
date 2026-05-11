import React from 'react'

const css = `
  /* === DESKTOP === */
  @media (min-width: 1025px) {
    .vtex-slider-layout-0-x-paginationDot--prueba-hero > * {
      display: none !important;
    }

    .vtex-slider-layout-0-x-paginationDotsContainer--prueba-hero {
      bottom: auto !important;
      top: 0;
      gap: 2rem;
    }

    .vtex-slider-layout-0-x-paginationDot--prueba-hero {
      background: transparent !important;
      border-radius: 0 !important;
      width: auto !important;
      height: auto !important;
      padding: 0.5rem 0 !important;
      margin: 0 !important;
      color: rgba(255,255,255,0.7);
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      border-bottom: 2px solid transparent;
    }

    .vtex-slider-layout-0-x-paginationDot--prueba-hero--isActive {
      color: white !important;
      border-bottom: 2px solid white !important;
    }

    .vtex-slider-layout-0-x-paginationDotsContainer--prueba-hero .vtex-slider-layout-0-x-paginationDot:nth-child(1)::after { content: "JEANS"; }
    .vtex-slider-layout-0-x-paginationDotsContainer--prueba-hero .vtex-slider-layout-0-x-paginationDot:nth-child(2)::after { content: "PANTS"; }
    .vtex-slider-layout-0-x-paginationDotsContainer--prueba-hero .vtex-slider-layout-0-x-paginationDot:nth-child(3)::after { content: "COATS"; }
    .vtex-slider-layout-0-x-paginationDotsContainer--prueba-hero .vtex-slider-layout-0-x-paginationDot:nth-child(4)::after { content: "BOOTS"; }
  }

  /* === MOBILE === */
  @media (max-width: 1024px) {
    .vtex-slider-layout-0-x-paginationDot--prueba-hero {
      width: 2.25rem !important;
      height: 0.5rem !important;
      border-radius: 0.25rem !important;
    }

    .vtex-slider-layout-0-x-paginationDot--prueba-hero--isActive {
      background-color: #B67839 !important;
    }
  }
`

const SliderHeroStyles = () => (
  // eslint-disable-next-line react/no-danger
  <style dangerouslySetInnerHTML={{ __html: css }} />
)

export default SliderHeroStyles
