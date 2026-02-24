import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import JsonLd from '@/components/JsonLd';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// 构建时预生成所有 locale 版本
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Klauden',
        url: 'https://klauden.xyz',
        description: 'Klauden 的个人网站',
        author: {
          '@type': 'Person',
          name: 'Klauden',
          url: 'https://klauden.xyz',
          jobTitle: 'Full-Stack Designer',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Shanghai',
            addressCountry: 'CN',
          },
        },
      }} />
      {children}
    </NextIntlClientProvider>
  );
}
