import type { Header, Route } from "@/store/page/interface/page.interface";
import type { IPageState } from "@/store/page/interface/state.interface";

export const getters = {
    header: (state: IPageState): Header => state.page.header
};