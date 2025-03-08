import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Upload, Sparkles, ImageIcon, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-background/80">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    AI-Powered Image Caption Recommendations
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Upload your images and get intelligent, contextually relevant caption suggestions powered by
                    advanced AI.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/upload">
                    <Button className="gap-1">
                      <Upload className="h-4 w-4" />
                      Upload Image
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button variant="outline" className="gap-1">
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto flex items-center justify-center">
                <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20 blur-3xl"></div>
                  <Image
                    src="https://images.unsplash.com/photo-1633409361618-c73427e4e206?auto=format&fit=crop&q=80&w=800&h=800"
                    alt="AI analyzing multiple images"
                    fill
                    className="object-cover rounded-lg shadow-xl relative z-10"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Our AI-powered system analyzes your images and generates contextually relevant caption suggestions in
                  seconds.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3 md:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <Upload className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Upload</h3>
                <p className="text-muted-foreground">Upload your image through our simple and intuitive interface.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Process</h3>
                <p className="text-muted-foreground">
                  Our AI analyzes your image, identifying objects, scenes, emotions, and context.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <ImageIcon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Recommend</h3>
                <p className="text-muted-foreground">
                  Receive multiple caption suggestions tailored to your image and its context.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background/80 to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Upload your first image and experience the power of AI-generated caption recommendations.
                </p>
              </div>
              <Link href="/upload">
                <Button size="lg" className="mt-4 gap-1">
                  <Upload className="h-4 w-4" />
                  Upload Your Image
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

