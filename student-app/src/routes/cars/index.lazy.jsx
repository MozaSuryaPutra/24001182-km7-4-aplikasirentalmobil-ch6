import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/cars/")({
  component: () => <div>Hello /cars/!</div>,
});
