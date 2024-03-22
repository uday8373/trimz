import {FiInstagram} from "react-icons/fi";

import {TfiEmail} from "react-icons/tfi";
import {BsThreads} from "react-icons/bs";
import {FaSquareFacebook} from "react-icons/fa6";

import {
  RiYoutubeLine,
  RiTiktokFill,
  RiSnapchatLine,
  RiDiscordLine,
  RiGithubLine,
  RiLinkedinLine,
  RiTelegramLine,
  RiTwitchLine,
  RiTwitterXLine,
} from "react-icons/ri";

export const navLinks = [
  {
    id: "/#home",
    title: "Home",
  },

  {
    id: "/#myurls",
    title: "Shortlinks",
  },
  {
    id: "/#feature",
    title: "Feature",
  },
  // {
  //   id: "/trimzlink#home",
  //   title: "Trimzlink",
  // },
];

export const linkButton = [
  {
    id: "instagram",
    title: "Instagram",
    icon: FiInstagram,
    validationPattern: "^https?://(?:www\\.)?instagram\\.com/[a-zA-Z0-9_\\-]+/?$",
    validationMessage: "Please enter a valid Instagram link.",
  },
  {
    id: "threads",
    title: "Threads",
    icon: BsThreads,
    validationPattern: "^https?://(?:www\\.)?example\\.com/threads/[a-zA-Z0-9_\\-]+/?$",
    validationMessage: "Please enter a valid Threads link.",
  },
  {
    id: "youtube",
    title: "Youtube",
    icon: RiYoutubeLine,
    validationPattern: "^https?://(?:www\\.)?youtube\\.com/[a-zA-Z0-9_\\-]+/?$",
    validationMessage: "Please enter a valid Youtube link.",
  },
  {
    id: "twitter",
    title: "X",
    icon: RiTwitterXLine,
    validationPattern: "^https?://(?:www\\.)?twitter\\.com/[a-zA-Z0-9_\\-]+/?$",
    validationMessage: "Please enter a valid Twitter link.",
  },
  {
    id: "tiktok",
    title: "Tiktok",
    icon: RiTiktokFill,
    validationPattern: "^https?://(?:www\\.)?tiktok\\.com/@[a-zA-Z0-9_\\-]+/?$",
    validationMessage: "Please enter a valid Tiktok link.",
  },
  {
    id: "snapchat",
    title: "Snapchat",
    icon: RiSnapchatLine,
    validationPattern: "^https?://(?:www\\.)?snapchat\\.com/add/[a-zA-Z0-9_\\-]+/?$",
    validationMessage: "Please enter a valid Snapchat link.",
  },
  {
    id: "discord",
    title: "Discord",
    icon: RiDiscordLine,
    validationPattern: "^https?://discord\\.com/validate/[a-zA-Z0-9_\\-]+/?$",
    validationMessage: "Please enter a valid Discord link.",
  },
  {
    id: "github",
    title: "Github",
    icon: RiGithubLine,
    validationPattern: "^https?://(?:www\\.)?github\\.com/[a-zA-Z0-9_\\-]+/?$",
    validationMessage: "Please enter a valid Github link.",
  },
  {
    id: "linkedin",
    title: "Linkedin",
    icon: RiLinkedinLine,
    validationPattern: "^https?://(?:www\\.)?linkedin\\.com/in/[a-zA-Z0-9_\\-]+/?$",
    validationMessage: "Please enter a valid LinkedIn link.",
  },
  {
    id: "telegram",
    title: "Telegram",
    icon: RiTelegramLine,
    validationPattern: "^https?://(?:www\\.)?telegram\\.me/[a-zA-Z0-9_\\-]+/?$",
    validationMessage: "Please enter a valid Telegram link.",
  },
  {
    id: "twitch",
    title: "Twitch",
    icon: RiTwitchLine,
    validationPattern: "^https?://(?:www\\.)?twitch\\.tv/[a-zA-Z0-9_\\-]+/?$",
    validationMessage: "Please enter a valid Twitch link.",
  },
  {
    id: "email",
    title: "Email",
    icon: TfiEmail,
    validationPattern: "^mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    validationMessage: "Please enter a valid email address.",
  },
  {
    id: "facebook",
    title: "Facebook",
    icon: FaSquareFacebook,
    validationPattern: "^https?://(?:www\\.)?facebook\\.com/[a-zA-Z0-9_\\-]+/?$",
    validationMessage: "Please enter a valid Facebook link.",
  },
];
