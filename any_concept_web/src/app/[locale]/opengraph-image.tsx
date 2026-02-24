import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Klauden — Full-Stack Designer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const font = await fetch(
    new URL('../../../public/fonts/Syne-Bold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          position: 'relative',
        }}
      >
        {/* 顶部装饰线 */}
        <div
          style={{
            position: 'absolute',
            top: 60,
            left: 80,
            right: 80,
            height: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }}
        />

        {/* 主标题 */}
        <div
          style={{
            fontSize: 96,
            fontFamily: 'Syne',
            fontWeight: 700,
            color: '#E8E8E8',
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}
        >
          KLAUDEN
        </div>

        {/* 副标题 */}
        <div
          style={{
            fontSize: 24,
            color: '#FF6B00',
            marginTop: 20,
            fontFamily: 'Syne',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          Full-Stack Designer
        </div>

        {/* 底部装饰 */}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            color: 'rgba(255, 255, 255, 0.3)',
            fontSize: 14,
            fontFamily: 'Syne',
          }}
        >
          <span>klauden.xyz</span>
          <span style={{ color: 'rgba(255, 255, 255, 0.1)' }}>|</span>
          <span>Shanghai, China</span>
        </div>

        {/* 底部装饰线 */}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            left: 80,
            right: 80,
            height: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }}
        />
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
