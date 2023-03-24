declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    modalId: {
        type: StringConstructor;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    width: {
        type: NumberConstructor;
        default: number;
    };
    pointerX: {
        type: NumberConstructor;
    };
    pointerY: {
        type: NumberConstructor;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modalId: {
        type: StringConstructor;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    width: {
        type: NumberConstructor;
        default: number;
    };
    pointerX: {
        type: NumberConstructor;
    };
    pointerY: {
        type: NumberConstructor;
    };
}>>, {
    title: string;
    width: number;
}>, {
    default: (_: {}) => any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
