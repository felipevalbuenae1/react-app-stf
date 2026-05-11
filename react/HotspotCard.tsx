import React, { useState } from 'react'
import styles from './HotspotCard.css'

interface HotspotConfig {
  top?: string
  left?: string
  size?: string
  color?: string
  productName?: string
  skuId?: string
  sizes?: string[]      // used from JSONC
  sizesText?: string    // used from Site Editor: comma-separated, e.g. "XS, S, M, L, XL"
}

interface Props {
  imageUrl: string
  altText?: string
  productUrl?: string
  productName?: string
  skuId?: string
  sizes?: string[]
  hotspots?: HotspotConfig[]
}

function HotspotCard({
  imageUrl,
  altText = '',
  productUrl = '#',
  productName: cardProductName = '',
  skuId: cardSkuId = '',
  sizes: cardSizes = ['XS', 'S', 'M', 'L', 'XL'],
  hotspots,
}: Props) {
  const resolvedHotspots: HotspotConfig[] =
    hotspots && hotspots.length > 0 ? hotspots : [{ top: '58%', left: '50%' }]

  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)
  const [added, setAdded] = useState(false)

  const toggle = (index: number) => {
    setOpenIndex(prev => {
      setSelectedSize(null)
      return prev === index ? null : index
    })
  }

  const active = openIndex !== null ? resolvedHotspots[openIndex] : null
  const activeName = active?.productName ?? cardProductName
  const activeSkuId = active?.skuId ?? cardSkuId
  const activeSizes =
    active?.sizes && active.sizes.length > 0
      ? active.sizes
      : active?.sizesText
        ? active.sizesText.split(',').map(s => s.trim()).filter(Boolean)
        : cardSizes

  const handleAddToCart = async () => {
    if (!selectedSize || !activeSkuId || adding) return
    setAdding(true)
    try {
      const ofRes = await fetch('/api/checkout/pub/orderForm', { credentials: 'include' })
      const { orderFormId } = await ofRes.json()
      await fetch(`/api/checkout/pub/orderForm/${orderFormId}/items`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderItems: [{ id: activeSkuId, quantity: 1, seller: '1' }] }),
      })
      setAdded(true)
      setTimeout(() => {
        setAdded(false)
        setOpenIndex(null)
        setSelectedSize(null)
      }, 1500)
    } catch {
      // silently fail
    } finally {
      setAdding(false)
    }
  }

  const getBtnStyle = (h: HotspotConfig, index: number): React.CSSProperties => {
    const isActive = openIndex === index
    return {
      position: 'absolute',
      top: h.top ?? '58%',
      left: h.left ?? '50%',
      transform: 'translate(-50%, -50%)',
      width: h.size ?? '2rem',
      height: h.size ?? '2rem',
      borderRadius: '50%',
      background: isActive ? '#B67839' : (h.color ?? 'rgba(255,255,255,0.88)'),
      color: isActive ? '#fff' : '#333',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.4rem',
      fontWeight: 600,
      lineHeight: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
      transition: 'background 0.2s, color 0.2s',
      zIndex: 2,
    }
  }

  const panelStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'transparent',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: '8px',
    padding: '0 8px 8px',
    opacity: openIndex !== null ? 1 : 0,
    transform: openIndex !== null ? 'translateY(0)' : 'translateY(6px)',
    transition: 'opacity 0.25s ease, transform 0.25s ease',
    pointerEvents: openIndex !== null ? 'auto' : 'none',
    zIndex: 3,
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img src={imageUrl} alt={altText || cardProductName} className={styles.image} />

        {resolvedHotspots.map((h, i) => (
          <button
            key={i}
            className={styles.hotspotBtn}
            style={getBtnStyle(h, i)}
            onClick={() => toggle(i)}
            aria-label="Ver tallas"
          >
            {openIndex === i ? '×' : '+'}
          </button>
        ))}

        <div style={panelStyle}>
          {/* Left: product info + sizes */}
          <div className={styles.panelLeft}>
            <p className={styles.sizesLabel}>Selecciona tu talla</p>
            {activeName && <p className={styles.productName}>{activeName}</p>}
            <div className={styles.sizesRow}>
              {activeSizes.map(size => (
                <button
                  key={size}
                  className={`${styles.sizeBtn} ${selectedSize === size ? styles.sizeBtnActive : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Right: add to cart */}
          <button
            className={styles.addToCartBox}
            onClick={handleAddToCart}
            disabled={!selectedSize || adding}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <span>{added ? '✓' : 'Añadir'}</span>
          </button>
        </div>
      </div>

      <a href={productUrl} className={styles.buyBtn}>
        COMPRAR
      </a>
    </div>
  )
}

HotspotCard.schema = {
  title: 'Hotspot Card',
  type: 'object',
  properties: {
    imageUrl: {
      title: 'Imagen del producto',
      type: 'string',
      widget: { 'ui:widget': 'image-uploader' },
    },
    altText: {
      title: 'Texto alternativo de la imagen',
      type: 'string',
    },
    productUrl: {
      title: 'URL del producto (botón COMPRAR)',
      type: 'string',
    },
    hotspots: {
      title: 'Botones Hotspot',
      type: 'array',
      minItems: 0,
      items: {
        title: 'Hotspot',
        type: 'object',
        properties: {
          top: {
            title: 'Posición vertical',
            description: 'Porcentaje desde arriba. Ej: 35%',
            type: 'string',
            default: '50%',
          },
          left: {
            title: 'Posición horizontal',
            description: 'Porcentaje desde la izquierda. Ej: 50%',
            type: 'string',
            default: '50%',
          },
          size: {
            title: 'Tamaño del botón',
            description: 'Ej: 2rem',
            type: 'string',
            default: '2rem',
          },
          color: {
            title: 'Color del botón (inactivo)',
            description: 'Ej: rgba(255,255,255,0.88) o #ffffff',
            type: 'string',
          },
          productName: {
            title: 'Nombre del producto',
            type: 'string',
          },
          skuId: {
            title: 'SKU ID',
            description: 'ID del SKU en VTEX para agregar al carrito',
            type: 'string',
          },
          sizesText: {
            title: 'Tallas disponibles',
            description: 'Separadas por coma. Ej: XS, S, M, L, XL',
            type: 'string',
          },
        },
      },
    },
  },
}

export default HotspotCard
