"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Copy, Check, ThumbsUp, ThumbsDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock data for demonstration
const mockCaptions = [
  "A serene mountain landscape with a crystal clear lake reflecting the snow-capped peaks",
  "Majestic mountains rising above a tranquil alpine lake at sunset",
  "Nature's mirror: perfect mountain reflections in a pristine lake",
  "Breathtaking view of mountain ranges surrounding a peaceful lake",
  "The calm waters of a mountain lake perfectly mirroring the surrounding peaks",
]

export default function ResultsPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<Record<number, "up" | "down" | null>>({})
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  useEffect(() => {
    const image = localStorage.getItem("uploadedImage")
    if (image) {
      setUploadedImage(image)
    }
  }, [])

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const giveFeedback = (index: number, type: "up" | "down") => {
    setFeedback((prev) => ({
      ...prev,
      [index]: type,
    }))
  }

  return (
    <div className="container max-w-4xl py-12 md:py-24">
      <div className="flex flex-col items-center space-y-6 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Caption Recommendations</h1>
        <p className="max-w-[600px] text-muted-foreground md:text-xl">
          Here are AI-generated caption suggestions for your image.
        </p>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_1.5fr]">
        <Card>
          <CardContent className="p-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
              <Image src={uploadedImage || "/placeholder.svg"} alt="Uploaded image" fill className="object-cover" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Suggested Captions</h2>
            <div className="space-y-4">
              {mockCaptions.map((caption, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <p className="text-sm">{caption}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className={feedback[index] === "up" ? "bg-green-900/30 border-green-700" : ""}
                        onClick={() => giveFeedback(index, "up")}
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className={feedback[index] === "down" ? "bg-red-900/30 border-red-700" : ""}
                        onClick={() => giveFeedback(index, "down")}
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(caption, index)}>
                      {copiedIndex === index ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex justify-center space-x-4">
        <Link href="/upload">
          <Button variant="outline">Upload Another Image</Button>
        </Link>
        <Button>Save All Captions</Button>
      </div>
    </div>
  )
}

