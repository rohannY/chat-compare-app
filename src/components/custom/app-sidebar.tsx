import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
} from "lucide-react";

import { NavMain } from "@/components/custom/nav-main";
import { NavUser } from "@/components/custom/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Documentation",
      isActive: true,
      url: "/docs",
      icon: BookOpen,
      items: [
        {
          title: "Chat",
          method: "Post",
          url: "/docs/chat",
        },
      ],
    },
    {
      title: "Supported Models",
      isActive: true,
      url: "/models",
      icon: Bot,
      items: [
        {
          title: "OpenAI",
          url: "/docs/models/openai",
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
          url: "/docs/models/deepseek",
          subitems: [
            { title: "DeepSeek-Chat", url: "#" },
            { title: "DeepSeek-Reasoner", url: "#" },
          ],
        },
        {
          title: "Anthropic",
          url: "/docs/models/anthropic",
          subitems: [
            { title: "Claude-3 Opus", url: "#" },
            { title: "Claude-3 Sonnet", url: "#" },
            { title: "Claude-3 Haiku", url: "#" },
          ],
        },
        {
          title: "QwenAI",
          url: "/docs/models/qwenai",
          subitems: [
            { title: "Qwen-Turbo", url: "#" },
            { title: "Qwen-Plus", url: "#" },
            { title: "Qwen-Max", url: "#" },
          ],
        },
        {
          title: "Google",
          url: "/docs/models/google",
          subitems: [
            { title: "Gemini-1.5-Pro", url: "#" },
            { title: "Gemini-2.0-Flash", url: "#" },
            { title: "Gemini-2.0-Pro-Exp-02-05", url: "#" },
          ],
        },
        {
          title: "MistralAI",
          url: "/docs/models/mistralai",
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
          url: "/docs/models/xai",
          subitems: [
            { title: "Grok-2-1212", url: "#" },
            { title: "Grok-2-Vision-1212", url: "#" },
          ],
        },
        {
          title: "Perplexity",
          url: "/docs/models/perplexity",
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
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="dark">
      <SidebarHeader>
        <div className="flex gap-2 text-sm font-medium">
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
          >
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <AudioWaveform className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Chat Comparer</span>
              <span className="truncate text-xs">Documentation</span>
            </div>
          </SidebarMenuButton>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
