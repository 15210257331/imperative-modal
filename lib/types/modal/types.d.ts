import { Ref, type Component } from 'vue';
export declare const InjectionKey: unique symbol;
export interface ModalOptions {
    component?: Component;
    content?: string;
    mask?: boolean;
    title?: string;
    width?: number;
    props?: {
        [key: string]: any;
    };
}
export interface FullModalOptions extends ModalOptions {
    type?: ModalType;
    pointerX: number;
    pointerY: number;
}
export type ModalType = 'success' | 'warning' | 'error' | 'info' | 'default';
export type ModalReactive = {
    readonly id: string;
    pointerX: number;
    pointerY: number;
} & any;
export interface ProvideContext {
    modalReactiveList: Ref<ModalReactive[]>;
    createModal: (options: FullModalOptions) => void;
    destroyModal: () => void;
}
