/**
 * PdfCover — server component, rendered only during PDF generation.
 * Puppeteer navigates to /{locale}/docs/_pdf/cover to capture this page.
 */

interface PdfCoverProps {
  locale: 'es' | 'en';
  version: string;
  date: string;
}

export function PdfCover({ locale, version, date }: PdfCoverProps) {
  const isEs = locale === 'es';

  const title = isEs ? 'Documentación de Mis Gastos' : 'Mis Gastos Documentation';
  const subtitle = isEs
    ? 'Guía completa de uso — Finanzas personales offline'
    : 'Complete usage guide — Offline personal finance';
  const versionLabel = isEs ? `Versión ${version}` : `Version ${version}`;
  const dateLabel = isEs ? `Generado el ${date}` : `Generated on ${date}`;
  const offlineNote = isEs
    ? '100% offline · Sin nube · Sin cuenta'
    : '100% offline · No cloud · No account required';

  return (
    <div
      style={{
        fontFamily: 'Inter, system-ui, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '48px 64px',
        background: 'linear-gradient(135deg, #f0fdfa 0%, #e0f2f1 50%, #f7fffe 100%)',
        color: '#1a2c2b',
        textAlign: 'center',
      }}
    >
      {/* Logo mark */}
      <div
        style={{
          width: 88,
          height: 88,
          borderRadius: 22,
          background: 'linear-gradient(135deg, #00897B 0%, #4DB6AC 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 32,
          boxShadow: '0 8px 32px rgba(0,137,123,0.25)',
        }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Wallet icon */}
          <rect x="6" y="14" width="36" height="24" rx="4" fill="white" fillOpacity="0.9" />
          <rect x="6" y="14" width="36" height="8" rx="2" fill="white" fillOpacity="0.5" />
          <circle cx="34" cy="26" r="3" fill="white" />
          {/* Dollar sign */}
          <text x="16" y="30" fontSize="11" fontWeight="700" fill="white" fontFamily="Inter, sans-serif">$</text>
        </svg>
      </div>

      {/* Title */}
      <h1
        style={{
          fontSize: 36,
          fontWeight: 800,
          color: '#005f56',
          margin: '0 0 12px',
          lineHeight: 1.15,
          letterSpacing: '-0.5px',
        }}
      >
        {title}
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: 16,
          color: '#546e7a',
          margin: '0 0 48px',
          fontWeight: 400,
          maxWidth: 440,
          lineHeight: 1.5,
        }}
      >
        {subtitle}
      </p>

      {/* Divider */}
      <div
        style={{
          width: 64,
          height: 3,
          borderRadius: 2,
          background: 'linear-gradient(90deg, #00897B, #4DB6AC)',
          marginBottom: 40,
        }}
      />

      {/* Meta */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          color: '#546e7a',
          fontSize: 13,
        }}
      >
        <span style={{ fontWeight: 600, color: '#00897B' }}>{versionLabel}</span>
        <span>{dateLabel}</span>
        <span
          style={{
            marginTop: 8,
            padding: '6px 16px',
            borderRadius: 20,
            background: 'rgba(0,137,123,0.08)',
            color: '#005f56',
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          {offlineNote}
        </span>
      </div>
    </div>
  );
}
