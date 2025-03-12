import Hero from "../components/hero/Hero";
import { ContentLimit, FadeIn } from "@/shared/components/containers";

function Landing(): React.ReactElement {
  return (
    <ContentLimit>
      <FadeIn>
        <Hero />
      </FadeIn>
    </ContentLimit>
  );
}

export default Landing;
