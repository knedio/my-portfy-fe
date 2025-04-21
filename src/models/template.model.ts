export interface Template {
  id: number
  name: string
  description: string
  preview_image: string
  default_data?: Record<string, unknown> | null
}
