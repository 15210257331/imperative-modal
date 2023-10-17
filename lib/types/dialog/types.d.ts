import { Ref, type Component } from 'vue';
export declare const InjectionKey: unique symbol;
export interface DialogOptions {
    component?: Component;
    type?: string;
    mask?: boolean;
    title?: string;
    width?: number;
    props: {
        [key: string]: any;
    };
}
export type DialogReactive = {
    readonly id: string;
    pointerX: number;
    pointerY: number;
} & any;
export interface ProvideContext {
    dialogReactiveList: Ref<DialogReactive[]>;
    createDialog: (options: DialogOptions) => void;
    disposeDialog: () => void;
}
