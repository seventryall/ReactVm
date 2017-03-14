
declare  class  CodeDataModel
{
    public   CODE_VALUE: string;
    public    CODE_TEXT: string;
    public    IsSelect: boolean;
} 

declare class SelectorModel
{
    public List: Array<CodeDataModel>;
    public Total: number;
    public Index: number;
    public Size: number;
}


