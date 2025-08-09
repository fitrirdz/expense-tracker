import { redirect } from "next/navigation"

export default function HomePage() {
  // For now, redirect to login - you can modify this logic later
  redirect("/login")
}
