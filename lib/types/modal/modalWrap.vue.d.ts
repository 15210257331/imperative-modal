declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    id: {
        type: StringConstructor;
        required: true;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    content: {
        type: StringConstructor;
        default: string;
    };
    mask: {
        type: BooleanConstructor;
        default: boolean;
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
}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    id: {
        type: StringConstructor;
        required: true;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    content: {
        type: StringConstructor;
        default: string;
    };
    mask: {
        type: BooleanConstructor;
        default: boolean;
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
}>> & Readonly<{}>, {
    type: string;
    title: string;
    content: string;
    mask: boolean;
    width: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>, {
    default?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
