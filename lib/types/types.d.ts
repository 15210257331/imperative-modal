import { type Component } from "vue";
export declare const InjectionKey: unique symbol;
export interface DialogConfig {
    mask?: boolean;
    title?: string;
    width?: number;
    props: {
        [key: string]: any;
    };
}
export interface Dialogs {
    [key: string]: {
        component: Component;
        config: DialogConfig;
        visible: boolean;
        promise: Promise<any>;
        resolve: (args?: any) => void;
        reject: (args?: any) => void;
    };
}
export interface ProvideContext {
    dialogs: Dialogs;
    createDialog: (...args: any) => void;
    disposeDialog: (...args: any) => void;
    getDialogId: (...args: any) => string;
}
