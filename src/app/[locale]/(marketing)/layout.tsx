import Image from 'next/image';
import { CartProvider } from '@/components/CartProvider';
import CartLink from '@/components/CartLink';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function MarketingLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Storefront' });

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#fbf8f2] text-[#17130d]">
      <div className="bg-[#0d0c0a] px-4 py-2 text-center text-[10px] font-bold tracking-[0.18em] text-[#e8c86d] uppercase sm:text-xs">
        {t('announcement')}
      </div>

      <header className="sticky top-0 z-50 border-b border-[#c79a3a]/20 bg-[#100f0d]/95 text-white shadow-[0_10px_35px_rgba(0,0,0,0.16)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a href="#top" aria-label={t('nav_home')} className="shrink-0">
            <Image
              src="/brand/logo/hos-premium-logo-gold.png"
              alt="House of Sharmeen"
              width={260}
              height={80}
              priority
              className="h-11 w-auto object-contain sm:h-14"
            />
          </a>

          <nav aria-label={t('main_navigation_label')} className="flex items-center gap-1 overflow-x-auto text-xs font-bold whitespace-nowrap sm:gap-2 sm:text-sm">
            <a href="#top" className="rounded-full px-3 py-2 text-white/75 transition hover:bg-white/8 hover:text-[#efd47c] sm:px-4">{t('nav_home')}</a>
            <a href="#collection" className="rounded-full px-3 py-2 text-white/75 transition hover:bg-white/8 hover:text-[#efd47c] sm:px-4">{t('nav_shop')}</a>
            <a href="#story" className="hidden rounded-full px-3 py-2 text-white/75 transition hover:bg-white/8 hover:text-[#efd47c] md:inline-flex sm:px-4">{t('nav_story')}</a>
            <a href="#campaign" className="hidden rounded-full px-3 py-2 text-white/75 transition hover:bg-white/8 hover:text-[#efd47c] lg:inline-flex sm:px-4">{t('nav_campaign')}</a>
            <a href="#contact" className="rounded-full border border-[#c79a3a]/45 bg-[#c79a3a]/12 px-3 py-2 text-[#f0d47b] transition hover:bg-[#c79a3a]/22 sm:px-4">{t('nav_contact')}</a>
            <CartLink label={t('cart')} />
          </nav>
        </div>
      </header>

      <main>{props.children}</main>

      <footer id="contact" className="border-t border-[#d5b35d]/20 bg-[#0d0c0a] px-5 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <Image
              src="/brand/logo/hos-premium-logo-gold.png"
              alt="House of Sharmeen"
              width={330}
              height={100}
              className="h-16 w-auto object-contain sm:h-20"
            />
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/56 sm:text-base">{t('footer_description')}</p>
          </div>
          <div className="md:text-right">
            <p className="text-xs font-bold tracking-[0.22em] text-[#dfbd67] uppercase">{t('footer_orders_label')}</p>
            <p className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">{t('footer_orders_title')}</p>
            <a href="https://www.houseofsharmeen.cc" className="mt-4 inline-flex rounded-full border border-[#d1a94b]/50 px-5 py-2.5 text-sm font-bold text-[#eed277] transition hover:bg-[#d1a94b]/12">
              www.houseofsharmeen.cc
            </a>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-[1440px] flex-col gap-2 border-t border-white/8 pt-6 text-xs text-white/38 sm:flex-row sm:items-center sm:justify-between">
          <p>{t('footer_copyright')}</p>
          <p>{t('footer_signature')}</p>
        </div>
      </footer>
      </div>
    </CartProvider>
  );
}
