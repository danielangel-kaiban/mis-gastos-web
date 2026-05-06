import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Mis Gastos — Tu dinero, bajo control';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0D1F1E 0%, #1A3330 50%, #00897B 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Decorative circle */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -120,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'rgba(0,137,123,0.25)',
            filter: 'blur(80px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 350,
            height: 350,
            borderRadius: '50%',
            background: 'rgba(77,182,172,0.2)',
            filter: 'blur(60px)',
          }}
        />

        {/* App icon circle */}
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 28,
            background: '#00897B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 28,
            fontSize: 48,
          }}
        >
          💰
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 68,
            fontWeight: 800,
            color: '#E0F2F1',
            letterSpacing: '-2px',
            lineHeight: 1.1,
            textAlign: 'center',
            maxWidth: 900,
          }}
        >
          Mis Gastos
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: '#80CBC4',
            marginTop: 16,
            textAlign: 'center',
            maxWidth: 700,
          }}
        >
          Tu dinero, bajo control
        </div>

        {/* Tag */}
        <div
          style={{
            marginTop: 32,
            background: 'rgba(0,137,123,0.35)',
            border: '1.5px solid rgba(77,182,172,0.5)',
            borderRadius: 100,
            padding: '10px 28px',
            fontSize: 18,
            color: '#4DB6AC',
            fontWeight: 600,
          }}
        >
          100% offline · Sin nube · Android APK gratis
        </div>
      </div>
    ),
    { ...size },
  );
}
