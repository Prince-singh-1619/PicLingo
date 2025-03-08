"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, ImageIcon, X } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)

      // Create preview
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setPreview(result)
        localStorage.setItem("uploadedImage", result)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      setFile(droppedFile)

      // Create preview
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setPreview(result)
        localStorage.setItem("uploadedImage", result)
      }
      reader.readAsDataURL(droppedFile)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setIsUploading(true)

    // Simulate upload and processing
    setTimeout(() => {
      setIsUploading(false)
      router.push("/results")
    }, 2000)
  }

  const clearFile = () => {
    setFile(null)
    setPreview(null)
    localStorage.removeItem("uploadedImage")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="container max-w-4xl py-12 md:py-24">
      <div className="flex flex-col items-center space-y-6 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Upload Your Image</h1>
        <p className="max-w-[600px] text-muted-foreground md:text-xl">
          Upload an image to get AI-powered caption recommendations.
        </p>
      </div>

      <Card className="mt-8 border-border/40 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit}>
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center ${preview ? "border-primary" : "border-muted-foreground/40"}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {!preview ? (
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    <ImageIcon className="h-10 w-10 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-medium">Drag and drop your image here</p>
                    <p className="text-sm text-muted-foreground">
                      Supports JPG, PNG and GIF files. Max file size 10MB.
                    </p>
                  </div>
                  <Button type="button" variant="outline" onClick={triggerFileInput}>
                    <Upload className="mr-2 h-4 w-4" />
                    Select File
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              ) : (
                <div className="relative">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="absolute top-0 right-0 z-10 rounded-full bg-background"
                    onClick={clearFile}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="relative mx-auto h-[300px] w-full max-w-[500px]">
                    <Image src={preview || "/placeholder.svg"} alt="Preview" fill className="object-contain" />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-center">
              <Button type="submit" size="lg" disabled={!file || isUploading} className="w-full max-w-xs">
                {isUploading ? "Processing..." : "Generate Captions"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

