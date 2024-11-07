import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/models/create')({
  component: () => <div>Hello /models/create!</div>,
})
