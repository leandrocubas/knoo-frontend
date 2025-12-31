import type { Header, IPage } from "@/store/page/interface/page.interface";
import type { IPageState } from "@/store/page/interface/state.interface";

export const mutations = {
    SET_HEADER(state: IPageState, header: Header){
        state.page.header = header
    },
};