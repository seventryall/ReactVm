export module data {

    export interface KV {
        Value: string;
        Text: string;
    }

    export interface KVS {
        Value: string;
        Text: string;
        Select: boolean;
    }
    //星星控件
    export interface PV
    {
        Value: string;
        isSelect: boolean;

    }
}