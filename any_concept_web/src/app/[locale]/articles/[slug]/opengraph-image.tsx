import { ImageResponse } from 'next/og';
import { articles } from '#site/content';

export const runtime = 'edge';
export const alt = 'Article';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug && !a.draft);

  const font = await fetch(
    new URL('../../../../../public/fonts/Syne-Bold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  const title = article?.title || 'Article';
  const tags = article?.tags?.slice(0, 3) || [];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#000000',
          padding: '60px 80px',
        }}
      >
        {/* 顶部：品牌 + 分类 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontFamily: 'Syne',
              fontWeight: 700,
              color: 'rgba(255, 255, 255, 0.4)',
              letterSpacing: '0.15em',
            }}
          >
            KLAUDEN
          </div>
          <div
            style={{
              display: 'flex',
              gap: 12,
            }}
          >
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 12,
                  color: 'rgba(255, 255, 255, 0.3)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '4px 12px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 分隔线 */}
        <div
          style={{
            width: '100%',
            height: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            marginTop: 24,
          }}
        />

        {/* 中间：文章标题 */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: title.length > 40 ? 48 : 64,
              fontFamily: 'Syne',
              fontWeight: 700,
              color: '#E8E8E8',
              letterSpacing: '-0.03em',
              lineHeight: 1.2,
              maxWidth: '90%',
            }}
          >
            {title}
          </div>
        </div>

        {/* 底部：日期 + 网址 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: 24,
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: 'rgba(255, 255, 255, 0.3)',
              fontFamily: 'Syne',
            }}
          >
            {article?.date
              ? new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : ''}
          </div>
          <div
            style={{
              fontSize: 14,
              color: '#FF6B00',
              fontFamily: 'Syne',
              fontWeight: 700,
            }}
          >
            klauden.xyz
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Syne',
          data: font,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}
