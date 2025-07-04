import Image from "next/image";
import InteractiveText from '@/components/InteractiveText';
import introData from '@/data/introtext.json';
import { ParagraphItem, ContentItem } from '@/components/InteractiveText';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="p-16 text-black/87 max-w-6xl">
        <InteractiveText data={introData as ContentItem} />
      </div>
      <div className="p-16 text-base text-black/87"> "clicknum" CLICKES</div>
      {/* <div className="mt-8 flex text-sm text-center text-black/32">
      <Image
          src="/logo.png"
          alt="Logo"
          width={16}
          height={16}
          priority
          className="mb-4"
        />
        © 2025 Klauden · 基于 Next.js & TailwindCSS 构建
      </div> */}
    </main>
  );
}
