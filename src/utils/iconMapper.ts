import { 
  Code, Server, Smartphone, Figma, Layout, Cpu, Globe, Zap, Search, Shield, 
  Database, MessageSquare, Monitor, Layers, Cloud, Settings, Bot, Mail, 
  Terminal, GitBranch, HardDrive, Repeat, Share2, Workflow, Infinity, 
  FileCode, Rocket, Key, Lock, Bell, BarChart, PieChart, Activity
} from "lucide-astro";

export const iconMap: Record<string, any> = {
  Code,
  Server,
  Smartphone,
  Figma,
  Layout,
  Cpu,
  Globe,
  Zap,
  Search,
  Shield,
  Database,
  MessageSquare,
  Monitor,
  Layers,
  Cloud,
  Settings,
  Bot,
  Mail,
  Terminal,
  GitBranch,
  HardDrive,
  Repeat,
  Share2,
  Workflow,
  Infinity,
  FileCode,
  Rocket,
  Key,
  Lock,
  Bell,
  BarChart,
  PieChart,
  Activity,
};

export function getIconComponent(iconName: string) {
  return iconMap[iconName] || Code; // Code as default
}
