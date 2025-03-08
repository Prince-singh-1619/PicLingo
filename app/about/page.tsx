import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Upload, Sparkles, ImageIcon, Brain, Zap, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="flex flex-col items-center space-y-6 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About PicLingo</h1>
        <p className="max-w-[800px] text-muted-foreground md:text-xl">
          Our AI-powered image caption recommendation system helps content creators, marketers, and social media
          enthusiasts create engaging captions for their images.
        </p>
      </div>

      <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground">
            We believe that every image tells a story, and the right caption can enhance that story. Our mission is to
            help you find the perfect words to complement your visual content, saving you time and boosting engagement.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">How It Works</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                <Upload className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Upload</h3>
                <p className="text-sm text-muted-foreground">
                  Upload your image through our simple and intuitive interface.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Analyze</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI analyzes your image, identifying objects, scenes, emotions, and context.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Generate</h3>
                <p className="text-sm text-muted-foreground">
                  The system generates multiple caption options based on the image analysis.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                <ImageIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">Choose</h3>
                <p className="text-sm text-muted-foreground">
                  You select the caption that best fits your needs or use our suggestions as inspiration.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-[400px] md:h-full">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/10 to-purple-500/10 blur-2xl"></div>
          <Image
            src="https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&q=80&w=600&h=700"
            alt="About PicLingo"
            fill
            className="object-cover rounded-lg relative z-10"
            priority
          />
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Key Features</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-border/40 bg-card/30 backdrop-blur p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Instant Results</h3>
            <p className="text-muted-foreground">
              Get caption suggestions in seconds, no matter how complex your image is.
            </p>
          </div>
          <div className="rounded-lg border border-border/40 bg-card/30 backdrop-blur p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Contextual Understanding</h3>
            <p className="text-muted-foreground">
              Our AI understands the context, mood, and elements in your image for relevant captions.
            </p>
          </div>
          <div className="rounded-lg border border-border/40 bg-card/30 backdrop-blur p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Audience-Focused</h3>
            <p className="text-muted-foreground">
              Captions are designed to engage your audience and increase social media interaction.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Try It?</h2>
        <p className="text-muted-foreground max-w-[600px] mx-auto mb-6">
          Upload your first image and experience the power of AI-generated caption recommendations.
        </p>
        <Link href="/upload">
          <Button size="lg" className="gap-1">
            <Upload className="h-4 w-4" />
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  )
}

