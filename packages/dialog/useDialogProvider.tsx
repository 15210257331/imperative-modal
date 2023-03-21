import { Component, computed, defineComponent, provide, reactive, toRaw } from "vue";
import { type Dialogs, type DialogConfig, InjectionKey, ProvideContext } from './types';
import DialogContainer from "./DialogContainer.vue";


export function useDialogProvider() {
    let uuid = 0;
    const getUuid = () => `__modal__${uuid++}`;
    const dialogs = reactive<Dialogs>({})

    // 创建弹窗
    function createDialog(dialog: Component, config: DialogConfig) {
        let modalResolve!: (args?: unknown) => void;
        let modalReject!: (args?: unknown) => void;
        const dialogId = getUuid();
        const promise = new Promise((resolve, reject) => {
            modalResolve = resolve;
            modalReject = reject;
        });
        const { props, ...containerConfig } = config;
        const newModal = create(dialog, containerConfig, props)
        dialogs[dialogId] = {
            component: newModal,
            config,
            visible: false,
            promise,
            reject: modalReject,
            resolve: modalResolve,
        }
        setTimeout(() => {
            dialogs[dialogId].visible = true;
        }, 100)

    }
    // 销毁弹窗
    function disposeDialog() {
        const currentModalId = getDialogId();
        const willHideDialog = dialogs[currentModalId as string];
        if (willHideDialog) {
            willHideDialog.visible = false;
            setTimeout(() => {
                delete dialogs[currentModalId as string]
            }, 300)
        }
        // const activeModals = Object.keys(modals).filter(id => modals[id].visible)
        // if (activeModals.length > 1 ) {
        //     currentModalId
        // }

    }

    // 获取当前显示弹窗的ID
    function getDialogId() {
        const currentModalIds = Object.keys(dialogs).filter(id => !!dialogs[id])
        return currentModalIds.length > 0 ? currentModalIds[0] : ''
    }

    /** 创建弹窗容器 */
    function create(Modal: any, containerConfig: any, props: any) {
        return defineComponent({
            render() {
                return (
                    <DialogContainer {...containerConfig}>
                        <Modal {...props} />
                    </DialogContainer>
                );
            },
        });
    };

    provide<ProvideContext>(InjectionKey, { dialogs, createDialog, disposeDialog, getDialogId });

    const dialogList = computed(() => {
        const visibleModalIds = Object.keys(dialogs).filter((id) => !!dialogs[id]);
        return visibleModalIds
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