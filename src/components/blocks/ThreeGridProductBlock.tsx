import Image from 'next/image'
import Link from 'next/link'

import type { ThreeGridProductsBlock } from '@/payload-types'
import { formatCurrency } from '@/utilities/formatCurrency'

type ThreeGridProductsProps = {
  block: ThreeGridProductsBlock
}

export function ThreeGridProducts({ block }: ThreeGridProductsProps) {
  const large = block.items.find((x) => x.position === 'largeLeft')?.product
  const top = block.items.find((x) => x.position === 'topRight')?.product
  const bottom = block.items.find((x) => x.position === 'bottomRight')?.product

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      {large && <ProductCard product={large} large />}

      <div className="grid gap-6">
        {top && <ProductCard product={top} />}
        {bottom && <ProductCard product={bottom} />}
      </div>
    </div>
  )
}

type Props = {
  product: any
  large?: boolean
}

export function ProductCard({ product, large = false }: Props) {
  return (
    <Link href={`/products/${product.slug}`} className="group relative overflow-hidden rounded-3xl">
      <Image
        src={product.thumbnail.url}
        alt={product.name}
        width={900}
        height={900}
        className={`w-full object-cover transition duration-500 group-hover:scale-105 ${
          large ? 'aspect-[4/5]' : 'aspect-auto'
        }`}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <div className="absolute bottom-0 left-0 p-6 text-white">
        <h3 className="text-xl font-semibold">{product.name}</h3>

        <p className="mt-1 text-sm opacity-90">{formatCurrency(product.price)}</p>
      </div>
    </Link>
  )
}
