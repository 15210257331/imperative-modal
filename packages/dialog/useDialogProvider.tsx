import { Component, computed, defineComponent, nextTick, provide, reactive, toRaw } from "vue";
import { type Dialogs, type DialogConfig, InjectionKey, ProvideContext } from './types';
import DialogContainer from "./DialogContainer.vue";


export function useDialogProvider() {
    let uuid = 0;
    let zIndex = 9999;
    let timeout: any = null;
    const getUuid = () => `__dialog__${uuid++}`;
    const dialogs = reactive<Dialogs>({})

    // 创建弹窗
    function createDialog(dialog: Component, config: DialogConfig) {
        if (timeout) {
            clearTimeout(timeout);
        }
        let dialogResolve!: (args?: unknown) => void;
        let dialogReject!: (args?: unknown) => void;
        const dialogId = getUuid();
        const promise = new Promise((resolve, reject) => {
            dialogResolve = resolve;
            dialogReject = reject;
        });
        const { props, ...containerConfig } = config;
        const newDialog = create(dialog, containerConfig, props)
        dialogs[dialogId] = {
            component: newDialog,
            config,
            visible: false,
            zIndex: zIndex++,
            promise,
            resolve: dialogResolve,
            reject: dialogReject,
        }
        nextTick(() => {
            dialogs[dialogId].visible = true;
        })
    }
    // 销毁弹窗
    function disposeDialog() {
        const currentDialogId = getDialogId();
        const willHideDialog = dialogs[currentDialogId as string];
        if (willHideDialog) {
            willHideDialog.visible = false;
            timeout = setTimeout(() => {
                delete dialogs[currentDialogId as string]
            }, 300)
        }
    }

    // 获取显示的最上层的弹窗的ID
    function getDialogId() {
        const currentDialogIds = Object.keys(dialogs).filter(id => !!dialogs[id])
        return currentDialogIds.length > 0 ? currentDialogIds[currentDialogIds.length - 1] : ''
    }

    /** 创建弹窗容器 */
    function create(Dialog: any, containerConfig: any, props: any) {
        console.log(containerConfig);
        return defineComponent({
            render() {
                return (
                    <DialogContainer {...containerConfig}>
                        <Dialog {...props} />
                    </DialogContainer>
                );
            },
        });
    };

    provide<ProvideContext>(InjectionKey, { dialogs, createDialog, disposeDialog, getDialogId });

    const dialogList = computed(() => {
        const visibleDialogIds = Object.keys(dialogs).filter((id) => !!dialogs[id]);
        return visibleDialogIds
            .map((id) => {
                return {
                    id,
                    ...dialogs[id],
                    component: toRaw(dialogs[id].component),
                };
            });
    });

    return { dialogList }
}