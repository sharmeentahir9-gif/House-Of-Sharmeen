import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import AddToCartButton from '@/components/AddToCartButton';

type IndexPageProps = {
  params: Promise<{ locale: string }>;
};

type ProductKey = 'him50' | 'her50premium' | 'him30' | 'her50' | 'attarClear' | 'attarGold';

const products: ReadonlyArray<{ key: ProductKey; anchor?: string; image: string; hoverImage: string }> = [
  {
    key: 'him50',
    anchor: 'for-him',
    image: '/brand/products/him-50/04.jpg',
    hoverImage: '/brand/products/him-50/02.jpg',
  },
  {
    key: 'her50premium',
    anchor: 'for-her',
    image: '/brand/products/her-50-premium/03.jpg',
    hoverImage: '/brand/products/her-50-premium/02.jpg',
  },
  {
    key: 'him30',
    image: '/brand/products/him-30/02.jpg',
    hoverImage: '/brand/products/him-30/01.jpg',
  },
  {
    key: 'her50',
    image: '/brand/products/her-50/02.jpg',
    hoverImage: '/brand/products/her-50/04.jpg',
  },
  {
    key: 'attarClear',
    anchor: 'attars',
    image: '/brand/products/attar-clear/03.jpg',
    hoverImage: '/brand/products/attar-clear/02.jpg',
  },
  {
    key: 'attarGold',
    image: '/brand/products/attar-gold/01.jpg',
    hoverImage: '/brand/products/attar-gold/01.jpg',
  },
];

const editorialImages = [
  { src: '/brand/editorial/01.jpg', className: 'row-span-2' },
  { src: '/brand/editorial/02.jpg', className: '' },
  { src: '/brand/editorial/03.jpg', className: '' },
  { src: '/brand/editorial/04.jpg', className: 'col-span-2' },
  { src: '/brand/editorial/05.jpg', className: 'row-span-2' },
  { src: '/brand/editorial/06.jpg', className: '' },
  { src: '/brand/editorial/07.jpg', className: '' },
  { src: '/brand/editorial/08.jpg', className: 'col-span-2' },
  { src: '/brand/editorial/09.jpg', className: 'col-span-2' },
  { src: '/brand/editorial/10.jpg', className: '' },
] as const;

export async function generateMetadata(props: IndexPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'Storefront' });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function StorefrontPage(props: IndexPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Storefront' });

  return (
    <>
      <section id="top" className="relative isolate min-h-[78vh] overflow-hidden bg-[#1a1712] sm:min-h-[88vh]">
        <Image
          src="/brand/editorial/09.jpg"
          alt={t('hero_image_alt')}
          fill
          sizes="100vw"
          className="object-cover object-[64%_center] sm:object-center"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,10,8,0.94)_0%,rgba(12,10,8,0.70)_42%,rgba(12,10,8,0.15)_72%,rgba(12,10,8,0.05)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#17130d]/55 to-transparent" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-[1440px] items-center px-5 py-20 sm:min-h-[88vh] sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#e2c06b]/35 bg-black/25 px-4 py-2 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f0d37e]" />
              <p className="text-[10px] font-bold tracking-[0.3em] text-[#f2d98c] uppercase sm:text-xs">{t('eyebrow')}</p>
            </div>
            <h1 className="max-w-xl font-serif text-5xl leading-[0.95] font-semibold tracking-[-0.03em] sm:text-6xl lg:text-7xl xl:text-8xl">
              {t('hero_title')}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/74 sm:text-lg">{t('hero_description')}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#collection" className="rounded-full bg-gradient-to-r from-[#efd17d] via-[#c99d43] to-[#a87823] px-7 py-3.5 text-sm font-black text-[#15110b] shadow-xl shadow-black/20 transition hover:brightness-110">
                {t('explore_collection')}
              </a>
              <a href="#campaign" className="rounded-full border border-white/34 bg-white/8 px-7 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15">
                {t('discover_brand')}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#caa454]/25 bg-[#15120e] text-white">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 divide-x divide-white/8 px-4 py-5 sm:grid-cols-4 sm:px-6 lg:px-8">
          {(['detail_1', 'detail_2', 'detail_3', 'detail_4'] as const).map((key) => (
            <div key={key} className="px-3 py-2 text-center sm:px-6">
              <p className="text-[10px] font-bold tracking-[0.18em] text-[#ddb95f] uppercase sm:text-xs">{t(`${key}_label`)}</p>
              <p className="mt-1 text-sm font-semibold text-white/86 sm:text-base">{t(`${key}_value`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="collection" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold tracking-[0.3em] text-[#a57b26] uppercase">{t('collection_eyebrow')}</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">{t('collection_title')}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-black/58">{t('collection_description')}</p>
        </div>

        <div className="mt-12 grid gap-x-5 gap-y-11 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article id={product.anchor} key={product.key} className="group scroll-mt-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.7rem] border border-black/5 bg-[#efe8db] shadow-[0_24px_70px_rgba(45,34,15,0.10)]">
                <Image
                  src={product.image}
                  alt={t(`products.${product.key}.image_alt`)}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.03] group-hover:opacity-0"
                />
                <Image
                  src={product.hoverImage}
                  alt={t(`products.${product.key}.image_alt`)}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover opacity-0 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
                />
                <div className="absolute top-4 left-4 rounded-full border border-white/20 bg-[#111]/88 px-3.5 py-1.5 text-[10px] font-bold tracking-[0.15em] text-[#efd37e] uppercase backdrop-blur">
                  {t(`products.${product.key}.badge`)}
                </div>
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent opacity-0 transition group-hover:opacity-100" />
              </div>
              <div className="px-1 pt-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-2xl font-semibold leading-tight">{t(`products.${product.key}.name`)}</h3>
                    <p className="mt-1 text-sm text-black/50">{t(`products.${product.key}.size`)}</p>
                  </div>
                  <p className="shrink-0 rounded-full bg-[#f2e8d4] px-3 py-1.5 text-sm font-black text-[#8d671d]">{t(`products.${product.key}.price`)}</p>
                </div>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-black/56">{t(`products.${product.key}.description`)}</p>
                <AddToCartButton
                  product={{
                    id: product.key,
                    name: t(`products.${product.key}.name`),
                    size: t(`products.${product.key}.size`),
                    price: Number(t(`products.${product.key}.price`).replace(/[^0-9]/g, '')),
                    image: product.image,
                  }}
                  label={t('add_to_cart')}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="story" className="overflow-hidden bg-[#11100e] text-white">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[580px] lg:min-h-[780px]">
            <Image src="/brand/editorial/06.jpg" alt={t('story_image_alt')} fill sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          </div>
          <div className="flex items-center px-6 py-16 sm:px-12 lg:px-16 xl:px-20">
            <div className="max-w-xl">
              <p className="text-xs font-bold tracking-[0.3em] text-[#dfbd67] uppercase">{t('story_eyebrow')}</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight font-semibold sm:text-5xl lg:text-6xl">{t('story_title')}</h2>
              <p className="mt-6 text-base leading-8 text-white/62">{t('story_description')}</p>
              <div className="mt-9 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-[#d8b45c]/18 bg-white/[0.035] p-5">
                  <p className="text-2xl font-black text-[#e4c46f]">50 ML</p>
                  <p className="mt-1 text-sm text-white/52">{t('story_card_1')}</p>
                </div>
                <div className="rounded-2xl border border-[#d8b45c]/18 bg-white/[0.035] p-5">
                  <p className="text-2xl font-black text-[#e4c46f]">30 ML</p>
                  <p className="mt-1 text-sm text-white/52">{t('story_card_2')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="campaign" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.3em] text-[#a57b26] uppercase">{t('editorial_eyebrow')}</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl lg:text-6xl">{t('editorial_title')}</h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-black/52">{t('editorial_description')}</p>
        </div>

        <div className="mt-10 grid auto-rows-[220px] grid-cols-2 gap-3 sm:auto-rows-[290px] md:grid-cols-3 lg:grid-cols-4 lg:auto-rows-[260px]">
          {editorialImages.map((image, index) => (
            <div key={image.src} className={`relative overflow-hidden rounded-[1.4rem] bg-[#eee6d9] ${image.className}`}>
              <Image
                src={image.src}
                alt={t('editorial_image_alt', { number: index + 1 })}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition duration-700 hover:scale-[1.025]"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#efe5d3] px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] shadow-[0_30px_80px_rgba(63,43,13,0.13)] sm:min-h-[650px]">
            <Image src="/brand/products/attar-clear/02.jpg" alt={t('attar_image_alt')} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className="lg:px-8">
            <p className="text-xs font-bold tracking-[0.3em] text-[#8c6825] uppercase">{t('attar_eyebrow')}</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight font-semibold sm:text-5xl lg:text-6xl">{t('attar_title')}</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-black/58">{t('attar_description')}</p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <div>
                <p className="text-3xl font-black text-[#896318]">Rs. 500</p>
                <p className="mt-1 text-xs font-semibold tracking-wide text-black/42 uppercase">{t('attar_price_caption')}</p>
              </div>
              <a href="#contact" className="rounded-full bg-[#15120e] px-6 py-3.5 text-sm font-bold text-[#efd37f] transition hover:bg-[#2d271c]">{t('shop_attars')}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#11100e] px-5 py-20 text-white sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold tracking-[0.3em] text-[#dfbd67] uppercase">{t('video_eyebrow')}</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">{t('video_title')}</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="overflow-hidden rounded-[1.7rem] border border-white/8 bg-black shadow-2xl shadow-black/25">
              <video className="aspect-video w-full object-cover" controls playsInline preload="metadata">
                <source src="/videos/attar-1.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="overflow-hidden rounded-[1.7rem] border border-white/8 bg-black shadow-2xl shadow-black/25">
              <video className="aspect-video w-full object-cover" controls playsInline preload="metadata">
                <source src="/videos/attar-2.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#17130d] px-5 py-24 text-white sm:px-6 lg:px-8 lg:py-32">
        <Image src="/brand/editorial/08.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover object-center opacity-35" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(12,10,8,0.92),rgba(12,10,8,0.68),rgba(12,10,8,0.78))]" />
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold tracking-[0.3em] text-[#e3c475] uppercase">{t('closing_eyebrow')}</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl lg:text-6xl">{t('closing_title')}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/66">{t('closing_description')}</p>
          <a href="#collection" className="mt-8 inline-flex rounded-full bg-gradient-to-r from-[#efd17d] via-[#c99d43] to-[#a87823] px-7 py-3.5 text-sm font-black text-[#15110b] transition hover:brightness-110">{t('explore_collection')}</a>
        </div>
      </section>
    </>
  );
}
