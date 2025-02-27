import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Documentation",
      isActive: true,
      url: "",
      icon: BookOpen,
      items: [
        {
          title: "Chat",
          method: "Post",
          url: "chat",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "OpenAI",
          url: "#",
          subitems: [
            { title: "GPT-4", url: "#" },
            { title: "GPT-3.5-Turbo", url: "#" },
            { title: "GPT-4o", url: "#" },
            { title: "GPT-4o-Mini", url: "#" },
            { title: "O1", url: "#" },
          ],
        },
        {
          title: "DeepSeek",
          url: "#",
          subitems: [
            { title: "DeepSeek-Chat", url: "#" },
            { title: "DeepSeek-Reasoner", url: "#" },
          ],
        },
        {
          title: "Anthropic",
          url: "#",
          subitems: [
            { title: "Claude-3 Opus", url: "#" },
            { title: "Claude-3 Sonnet", url: "#" },
            { title: "Claude-3 Haiku", url: "#" },
          ],
        },
        {
          title: "QwenAI",
          url: "#",
          subitems: [
            { title: "Qwen-Turbo", url: "#" },
            { title: "Qwen-Plus", url: "#" },
            { title: "Qwen-Max", url: "#" },
          ],
        },
        {
          title: "Google",
          url: "#",
          subitems: [
            { title: "Gemini-1.5-Pro", url: "#" },
            { title: "Gemini-2.0-Flash", url: "#" },
            { title: "Gemini-2.0-Pro-Exp-02-05", url: "#" },
          ],
        },
        {
          title: "MistralAI",
          url: "#",
          subitems: [
            { title: "Mistral-Small-Latest", url: "#" },
            { title: "Pixtral-12B-2409", url: "#" },
            { title: "Mistral-Large-Latest", url: "#" },
            { title: "Codestral-Latest", url: "#" },
            { title: "Pixtral-Large-Latest", url: "#" },
          ],
        },
        {
          title: "XAI",
          url: "#",
          subitems: [
            { title: "Grok-2-1212", url: "#" },
            { title: "Grok-2-Vision-1212", url: "#" },
          ],
        },
        {
          title: "Perplexity",
          url: "#",
          subitems: [
            { title: "Sonar", url: "#" },
            { title: "Sonar-Pro", url: "#" },
            { title: "Sonar-Reasoning", url: "#" },
            { title: "Sonar-Reasoning-Pro", url: "#" },
            { title: "R1-1776", url: "#" },
          ],
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="dark">
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
