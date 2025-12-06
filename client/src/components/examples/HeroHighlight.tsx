import { HeroHighlight, Highlight } from "../HeroHighlight";

export default function HeroHighlightExample() {
  return (
    <HeroHighlight containerClassName="bg-background">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
          Building digital products,
          <br />
          <Highlight>brands, and experiences.</Highlight>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Design engineer crafting thoughtful interfaces and scalable systems.
          Currently building tools that help developers ship faster.
        </p>
      </div>
    </HeroHighlight>
  );
}
