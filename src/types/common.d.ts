export interface StringLang {
  EN: string;
  AR: string;
}
export interface StringLangs {
  EN: string[];
  AR: string[];
}

export interface SimpleCourse {
  name: StringLang;
  description: StringLang;
  overview: StringLangs;
  main_img: string;
  other_src: String;
  what_you_will_learn: StringLangs;
  fqa: {
    q: StringLang;
    a: StringLang;
  }[];
}
