// config/i18n.ts
import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  // Get cookie store
  const cookieStore = cookies();

  // Get locale from cookie or fallback to default
  const locale = cookieStore.get('language')?.value || 'ar';

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});