import { ModalOptions } from './types';
export declare function useModal(): {
    create: (options: ModalOptions) => any;
    info: (options: ModalOptions) => any;
    success: (options: ModalOptions) => any;
    warning: (options: ModalOptions) => any;
    error: (options: ModalOptions) => any;
    destroy: (data?: any) => void;
};
