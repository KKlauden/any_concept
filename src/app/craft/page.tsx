import Image from "next/image";
import Link from "next/link";

export default function CraftPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="p-16 text-black/87 max-w-6xl">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:underline flex items-center">
            <span className="mr-2">←</span> 返回首页
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold mb-8">创作空间</h1>
        
        {/* 页面内容留空 */}
        <div className="h-96 flex items-center justify-center text-gray-400 border border-dashed border-gray-300 rounded-lg">
          内容开发中...
        </div>
      </div>
    </main>
  );
} 