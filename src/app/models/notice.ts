export interface Notice {
    id: number;
    title: string;
    description: string;
    date: Date;
    image?: string; // puede almacenarse en base64 o como URL
  }  