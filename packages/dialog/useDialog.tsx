import { inject, type Component, computed } from 'vue';
import { useMouse } from '@vueuse/core';
import { DialogConfig, InjectionKey } from "./types";

export function useDialog() {

    const { x, y } = useMouse()

    const { dialogs, createDialog, disposeDialog, getDialogId, } = inject<any>(InjectionKey)

    const modalRef = computed(() => {
        return (dialogs && getDialogId) ? dialogs[getDialogId()] : null;
    })

    /**
     * 显示一个弹窗
     * @param dialog 弹窗内容组件
     * @param config 弹窗配置
     * @returns  Promise
     */
    function open(dialog: Component, config: DialogConfig): Promise<any> {
        // console.log(x.value, y.value);
        createDialog(dialog, { ...config, pointerX: x.value, pointerY: y.value })
        return modalRef?.value?.promise;
    }

    /**
     * 隐藏弹窗
     * @param data 向外层传递的数据
     */
    function close(data?: any): void {
        if (data) {
            modalRef?.value?.resolve(data)
        } else {
            modalRef?.value?.reject('取消')
        }
        disposeDialog();
    }

    return { open, close };
}