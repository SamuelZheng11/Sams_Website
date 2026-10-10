// "Products Shipped" is loaded from its own JSON blob (S3 / API) so the list can
// grow without a redeploy. Each product links out to the live product as well
// as any coverage / mentions (webpages, LinkedIn posts, press).

export interface IProductsShippedData {
  eyebrow?: string
  heading?: string
  intro?: string
  products: IShippedProduct[]
}

export interface IShippedProduct {
  name: string
  summary: string
  // Short state shown as a badge, e.g. "Live", "Beta", "Sunset".
  status?: string
  // Where it ships, e.g. "Chrome Web Store", "iOS", "Web".
  platform?: string
  // Cover / screenshot for the product card. An S3 URL (absolute or a key
  // relative to the S3 bucket root). Falls back to the generated visual.
  image?: string
  launchDate?: string | null
  // Primary destination for the product itself.
  url?: string
  tags?: string[]
  metrics?: IProductMetric[]
  mentions?: IProductMention[]
}

export interface IProductMetric {
  label: string
  value: string
}

// A piece of coverage or a mention of the product: a webpage or a LinkedIn
// article, for example.
export interface IProductMention {
  title: string
  url: string
  source?: string
  date?: string
}
