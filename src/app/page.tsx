import Image from "next/image";
import InteractiveText from '@/components/InteractiveText';
import NavButton from '@/components/NavButton';
import introData from '@/data/introtext.json';
import { ParagraphItem, ContentItem } from '@/components/InteractiveText';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="p-4 md:p-16 text-black/87 max-w-6xl font-noto-sans">
        <InteractiveText data={introData as ContentItem} />
      </div>
      <NavButton />
     
    </main>
  );
}
