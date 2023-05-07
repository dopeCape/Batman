import { PlatformType } from "@/components/HOC/generateContentDetail";
import { Session } from "next-auth";

export interface ISelection {
  name: string;
  text: string;
  promptText: string;
  options: Array<string>;
}
export interface IPlatform {
  name: PlatformType;
  title: string;
  generatedText: string;
  initialPrompt: string;
  keywordsPrompt: string;
  endPrompt: string;
  selection: Array<ISelection>;
  session: Session;
}

export interface IOutline {
  lengthText: string;
  topicsText: string;
  scriptText: string;
}

export interface IContent {
  title: string;
  outline: IOutline;
  seoDescription: string;
  tags: string[];
  thumbnailIdeas: string[];
}
