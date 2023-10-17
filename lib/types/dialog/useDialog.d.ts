import { DialogOptions } from './types';
export declare function useDialog(): {
    create: (options: DialogOptions) => Promise<any>;
    info: (options: DialogOptions) => Promise<any>;
    success: (options: DialogOptions) => Promise<any>;
    warning: (options: DialogOptions) => Promise<any>;
    error: (options: DialogOptions) => Promise<any>;
    close: (data?: any) => void;
};
