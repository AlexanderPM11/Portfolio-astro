declare global {
  interface Window {
    __BLOG_CATEGORIES__: any;
    __BLOG_INITIAL_DATA__: any;
    __BLOG_TOTAL_POSTS__: any;
  }
}

// Esto es necesario para que TypeScript trate el archivo como módulo
export {};
