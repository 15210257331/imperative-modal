import { Component } from "vue";
import { type DialogConfig } from './types';
export declare function useDialogProvider(): {
    dialogList: import("vue").ComputedRef<{
        component: Component<any, any, any, import("vue").ComputedOptions, import("vue").MethodOptions>;
        config: DialogConfig;
        visible: boolean;
        promise: Promise<any>;
        resolve: (args?: any) => void;
        reject: (args?: any) => void;
        id: string;
    }[]>;
};
