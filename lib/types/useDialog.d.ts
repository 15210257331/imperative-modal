import { type Component } from 'vue';
import { DialogConfig } from "./types";
export declare function useDialog(): {
    open: (dialog: Component, config: DialogConfig) => Promise<any>;
    close: (data?: any) => void;
};
