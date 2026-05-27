export interface SkillPost {
  id: number;
  title: {
    rendered: string;
  };
  acf?: {
    skill_icon: string;
    skill_category: string;
    skill_order: number;
  };
}

export interface Skill {
  id: number;
  name: string;
  iconName: string;
  category: string;
  order: number;
}
