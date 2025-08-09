"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Tag, Edit, Trash2 } from "lucide-react"

// Mock data
const mockCategories = [
  { id: 1, code: "FOOD", name: "Food & Dining" },
  { id: 2, code: "TRANS", name: "Transportation" },
  { id: 3, code: "BILLS", name: "Bills & Utilities" },
  { id: 4, code: "ENT", name: "Entertainment" },
  { id: 5, code: "INC", name: "Income" },
  { id: 6, code: "SHOP", name: "Shopping" },
  { id: 7, code: "HEALTH", name: "Healthcare" },
  { id: 8, code: "EDU", name: "Education" },
]

export default function CategoriesPage() {
  const [categories, setCategories] = useState(mockCategories)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newCategory, setNewCategory] = useState({
    code: "",
    name: "",
  })

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Integrate with /categories POST endpoint
    const category = {
      id: Date.now(),
      code: newCategory.code.toUpperCase(),
      name: newCategory.name,
    }
    setCategories((prev) => [...prev, category])
    setNewCategory({ code: "", name: "" })
    setIsAddDialogOpen(false)
    console.log("New category:", category)
  }

  const handleDeleteCategory = (id: number) => {
    // TODO: Integrate with DELETE endpoint if available
    setCategories((prev) => prev.filter((cat) => cat.id !== id))
    console.log("Deleted category:", id)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Organize your transactions with custom categories</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="vintage-button">
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>Create a new category to organize your transactions</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Category Code</Label>
                <Input
                  id="code"
                  placeholder="e.g., FOOD, TRANS"
                  value={newCategory.code}
                  onChange={(e) => setNewCategory((prev) => ({ ...prev, code: e.target.value }))}
                  className="vintage-input"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Short code for the category (will be converted to uppercase)
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Food & Dining, Transportation"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory((prev) => ({ ...prev, name: e.target.value }))}
                  className="vintage-input"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="hover:bg-vintage-sage/20 bg-transparent"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="vintage-button">
                  Add Category
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.id} className="relative vintage-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="bg-vintage-rose/20 rounded-lg p-2"
                    style={{ backgroundColor: "rgba(214, 169, 157, 0.2)" }}
                  >
                    <Tag className="h-4 w-4 text-vintage-rose" style={{ color: "#2d2319" }} />
                  </div>
                  <Badge
                    variant="outline"
                    className="border-vintage-sage text-vintage-teal"
                    style={{ borderColor: "#D6DAC8", color: "#2d2319" }}
                  >
                    {category.code}
                  </Badge>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-vintage-sage/20"
                    style={{ backgroundColor: "transparent", hover: { backgroundColor: "rgba(214, 169, 157, 0.2)" } }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-vintage-sage/20"
                    onClick={() => handleDeleteCategory(category.id)}
                    style={{ backgroundColor: "transparent", hover: { backgroundColor: "rgba(214, 169, 157, 0.2)" } }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold">{category.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">Category for organizing transactions</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Categories Table */}
      <Card className="vintage-card">
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
          <CardDescription className="text-2d2319">{categories.length} categories available</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-2d2319">Code</TableHead>
                <TableHead className="text-2d2319">Name</TableHead>
                <TableHead className="text-right text-2d2319">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="text-2d2319">
                    <Badge
                      variant="outline"
                      className="border-vintage-sage text-vintage-teal"
                      style={{ borderColor: "#D6DAC8", color: "#2d2319" }}
                    >
                      {category.code}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-2d2319">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground" style={{ color: "#2d2319" }} />
                      {category.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-2d2319">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-vintage-sage/20"
                        style={{
                          backgroundColor: "transparent",
                          hover: { backgroundColor: "rgba(214, 169, 157, 0.2)" },
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-vintage-sage/20"
                        onClick={() => handleDeleteCategory(category.id)}
                        style={{
                          backgroundColor: "transparent",
                          hover: { backgroundColor: "rgba(214, 169, 157, 0.2)" },
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
