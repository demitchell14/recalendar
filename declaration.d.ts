// declaration.d.ts
declare module '*.scss' {
    const content: {[className: string]: string};
    export default content;
}

declare module "*.svg" {
    const value: any;
    export = value;
}