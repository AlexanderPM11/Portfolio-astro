export interface Highlight {
  id: number;
  title: string;
  icon: string;
  url: string;
  order: number;
}

export interface HighlightPost {
  id: number;
  title: {
    rendered: string;
  };
  acf: {
    highlight_icon: string;
    highlight_url: string;
    highlight_order: string | number;
  };
}
