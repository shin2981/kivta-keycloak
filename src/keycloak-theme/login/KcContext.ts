/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { ExtendKcContext } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

export type KcContextExtension = {
  themeName: ThemeName;
  properties: Record<string, string> & {};
};

export type KcContextExtensionPerPage = Record<string, Record<string, unknown>>;

export type KcContext = ExtendKcContext<KcContextExtension, KcContextExtensionPerPage>;
