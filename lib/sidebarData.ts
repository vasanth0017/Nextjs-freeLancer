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
  SquareTerminal,
} from "lucide-react";
import { title } from "process";


export const sidebarData = {
    user: {
      name: "Morgan",
      email: "m@example.com",
      avatar: "#",
    },
    teams: [
      {
        title:"Document",
        subName:"v1.0.0"
      },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "dashboard",
        icon: SquareTerminal,
        isActive: true,
        // items: [
        //   {
        //     title: "History",
        //     url: "#",
        //   },
        //   {
        //     title: "Starred",
        //     url: "#",
        //   },
        //   {
        //     title: "Settings",
        //     url: "#",
        //   },
        // ],
      },
      {
        title: "Jobs",
        url: "#",
        icon: Bot,
        // items: [
        //   {
        //     title: "Genesis",
        //     url: "#",
        //   },
        //   {
        //     title: "Explorer",
        //     url: "#",
        //   },
        //   {
        //     title: "Quantum",
        //     url: "#",
        //   },
        // ],
      },
      {
        title: "Service Listing",
        url: "/service-listing",
        icon: BookOpen,
        items: [
          {
            title: "Your Service",
            url: "/my-services",
          },
        ]
      },
      {
        title: "Documentation",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "Introduction",
            url: "#",
          },
          {
            title: "Get Started",
            url: "#",
          },
          {
            title: "Tutorials",
            url: "#",
          },
          {
            title: "Changelog",
            url: "#",
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
  }
