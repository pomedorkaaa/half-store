export type Language = 'ru' | 'en' | 'ro';

const translations: Record<string, Record<Language, string>> = {
  // Header nav
  'nav.catalog': { ru: 'Каталог', en: 'Catalog', ro: 'Catalog' },
  'nav.about': { ru: 'О нас', en: 'About Us', ro: 'Despre noi' },

  // Hero
  'hero.welcome': { ru: 'Добро пожаловать в', en: 'Welcome to', ro: 'Bine ați venit la' },
  'hero.storeName': { ru: '«Вторую половинку»', en: '"The Better Half"', ro: '«A Doua Jumătate»' },
  'hero.subtitle1': {
    ru: 'Мы продаем абсолютно всё, но ровно наполовину! Зачем платить за всё, если вам нужна только часть?',
    en: 'We sell absolutely everything, but exactly half! Why pay for it all when you only need a part?',
    ro: 'Vindem absolut totul, dar exact jumătate! De ce să plătești pentru tot când ai nevoie doar de o parte?',
  },
  'hero.subtitle2': {
    ru: 'Скидка 50% на весь ассортимент (буквально).',
    en: '50% off everything (literally).',
    ro: 'Reducere de 50% la tot (la propriu).',
  },
  'hero.catalogBtn': { ru: 'Перейти к каталогу', en: 'Go to Catalog', ro: 'Mergi la Catalog' },
  'hero.learnMore': { ru: 'Узнать больше', en: 'Learn More', ro: 'Află mai mult' },

  // Product list
  'catalog.search': { ru: 'Искать половинку...', en: 'Search for a half...', ro: 'Caută o jumătate...' },
  'catalog.all': { ru: 'Все', en: 'All', ro: 'Toate' },
  'catalog.showMore': { ru: 'Показать ещё', en: 'Show More', ro: 'Arată mai mult' },
  'catalog.nothingFound': { ru: 'Ничего не найдено', en: 'Nothing found', ro: 'Nimic găsit' },
  'catalog.nothingHint': {
    ru: 'Попробуйте изменить параметры поиска или выбрать другую категорию.',
    en: 'Try changing search parameters or selecting a different category.',
    ro: 'Încercați să schimbați parametrii de căutare sau să selectați o altă categorie.',
  },
  'catalog.resetFilters': { ru: 'Сбросить фильтры', en: 'Reset Filters', ro: 'Resetare filtre' },
  'catalog.loading': {
    ru: 'Загружаем вторую половину данных...',
    en: 'Loading the second half of data...',
    ro: 'Se încarcă a doua jumătate a datelor...',
  },
  'catalog.errorTitle': { ru: 'Упс! Что-то пошло не так', en: 'Oops! Something went wrong', ro: 'Hopa! Ceva nu a mers bine' },
  'catalog.counter': { ru: 'Найдено товаров', en: 'Products found', ro: 'Produse găsite' },
  'catalog.addToCart': { ru: 'Добавить в корзину', en: 'Add to Cart', ro: 'Adaugă în coș' },

  // Cart modal
  'cart.title': { ru: 'Ваша половина корзины', en: 'Your Half Cart', ro: 'Jumătatea coșului tău' },
  'cart.itemsCount': { ru: 'В корзине товаров (половинок)', en: 'Items in cart (halves)', ro: 'Produse în coș (jumătăți)' },
  'cart.empty': {
    ru: 'Сначала добавьте хотя бы одну половинку чего-нибудь!',
    en: 'Add at least one half of something first!',
    ro: 'Adaugă cel puțin o jumătate de ceva mai întâi!',
  },
  'cart.remove': { ru: 'Удалить', en: 'Remove', ro: 'Elimină' },
  'cart.total': { ru: 'Итого', en: 'Total', ro: 'Total' },
  'cart.reminder': {
    ru: 'Напоминаем: чтобы собрать целый предмет, вам нужно заказать его дважды!',
    en: 'Reminder: to get a whole item, you need to order it twice!',
    ro: 'Reamintire: pentru un articol întreg, trebuie să-l comandați de două ori!',
  },
  'cart.checkout': { ru: 'Перейти к оформлению половины заказа', en: 'Proceed to Half Checkout', ro: 'Continuă cu jumătate de comandă' },
  'cart.close': { ru: 'Закрыть', en: 'Close', ro: 'Închide' },

  // Favorites modal
  'fav.title': { ru: 'Избранные половинки', en: 'Favorite Halves', ro: 'Jumătăți favorite' },
  'fav.empty': {
    ru: 'Пока здесь пусто. В этом мире так трудно найти свою вторую половинку...',
    en: 'Empty for now. It\'s so hard to find your better half in this world...',
    ro: 'Deocamdată gol. E atât de greu să-ți găsești jumătatea...',
  },
  'fav.remove': { ru: 'Убрать', en: 'Remove', ro: 'Elimină' },

  // Footer
  'footer.slogan': {
    ru: 'Идеальный магазин для тех, кому не нужно целое.',
    en: 'The perfect store for those who don\'t need the whole thing.',
    ro: 'Magazinul perfect pentru cei care nu au nevoie de tot.',
  },
  'footer.delivery': { ru: 'Доставка половинками', en: 'Half Delivery', ro: 'Livrare pe jumătăți' },
  'footer.contacts': { ru: 'Контакты', en: 'Contacts', ro: 'Contacte' },
  'footer.copyright': {
    ru: 'Вторая половинка. Все права защищены (наполовину).',
    en: 'The Better Half. All rights reserved (half of them).',
    ro: 'A Doua Jumătate. Toate drepturile rezervate (jumătate).',
  },

  // Support
  'support.title': { ru: 'Поддержка', en: 'Support', ro: 'Suport' },
  'support.name': { ru: 'Ваше имя', en: 'Your Name', ro: 'Numele dvs.' },
  'support.email': { ru: 'Email', en: 'Email', ro: 'Email' },
  'support.message': { ru: 'Сообщение', en: 'Message', ro: 'Mesaj' },
  'support.send': { ru: 'Отправить', en: 'Send', ro: 'Trimite' },
  'support.success': {
    ru: 'Спасибо! Ваше сообщение отправлено. Мы ответим вам в ближайшую половину рабочего дня!',
    en: 'Thanks! Your message has been sent. We\'ll reply within the nearest half working day!',
    ro: 'Mulțumim! Mesajul dvs. a fost trimis. Vom răspunde în cea mai apropiată jumătate de zi lucrătoare!',
  },
  'support.namePlaceholder': { ru: 'Введите имя', en: 'Enter your name', ro: 'Introduceți numele' },
  'support.emailPlaceholder': { ru: 'you@example.com', en: 'you@example.com', ro: 'dvs@exemplu.com' },
  'support.messagePlaceholder': {
    ru: 'Опишите вашу проблему или вопрос...',
    en: 'Describe your problem or question...',
    ro: 'Descrieți problema sau întrebarea dvs...',
  },

  // Theme
  'theme.dark': { ru: 'Тёмная тема', en: 'Dark Mode', ro: 'Mod întunecat' },
  'theme.light': { ru: 'Светлая тема', en: 'Light Mode', ro: 'Mod luminos' },
};

export function t(key: string, lang: Language): string {
  return translations[key]?.[lang] ?? key;
}
