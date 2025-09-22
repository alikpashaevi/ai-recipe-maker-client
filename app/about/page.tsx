
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConditionalNav } from "@/components/conditional-nav";

export default function AboutPage() {
  return (
    <>
      <ConditionalNav />
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">About Us</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Welcome to AI Recipe Maker, your personal kitchen assistant powered by artificial intelligence. Our mission is to revolutionize home cooking by making it easier, more creative, and more personalized for everyone.
            </p>
            <p>
              Founded in 2025, our team of food lovers, designers, and AI experts set out to solve a common problem: what to make with the ingredients you already have. We were tired of wasting food and spending hours searching for recipes online, only to find they required a trip to the grocery store.
            </p>
            <p>
              Our platform uses advanced AI algorithms to generate unique and delicious recipes based on the ingredients you provide. Whether you&apos;re a seasoned chef looking for inspiration or a novice cook just starting out, AI Recipe Maker is here to help you create amazing meals with confidence.
            </p>
            <p>
              We believe that cooking should be a joyful and stress-free experience. Join our community and discover a new world of culinary possibilities.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
