import { Hero } from "@/components/home/Hero";
import { Heritage } from "@/components/home/Heritage";
import { CollectionShowcase } from "@/components/home/CollectionShowcase";
import { CraftJourney } from "@/components/home/CraftJourney";
import { SignatureShowcase } from "@/components/home/SignatureShowcase";
import { InYourSpace } from "@/components/home/InYourSpace";
import { WhyChoose } from "@/components/home/WhyChoose";
import { Stories } from "@/components/home/Stories";
import { Gifting } from "@/components/home/Gifting";
import { Closing } from "@/components/home/Closing";

export default function Home() {
  return (
    <>
      <Hero />
      <Heritage />
      <CollectionShowcase />
      <CraftJourney />
      <SignatureShowcase />
      <InYourSpace />
      <WhyChoose />
      <Stories />
      <Gifting />
      <Closing />
    </>
  );
}
