import { type Component } from "vue";

export const InjectionKey = Symbol('DialogToken')

export interface DialogConfig {
     // 是否显示遮罩层
     mask?: boolean;
     // 标题
     title?: string;
     // 宽度
     width?: number;
     // 输入属性
     props: {
         [key: string]: any
     }
}

export interface Dialogs {
    [key: string]: {
        component: Component;
        config: DialogConfig,
        visible: boolean,
        zIndex: number,
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
  
  
//   export const modalContext = () =>
//     inject<Partial<ModalState>>(ModalStateToken, {});

  