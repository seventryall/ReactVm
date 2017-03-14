export namespace Right
{
    export interface PagerData {
        TableName: string;
        PageNo: number;
        PageSize: number;
        TotalCount: number;
        SortName?: string;      
        IsASC?: boolean;
        DataTime?: Date;
    
    }

    export interface PagerListData<T> {
        Pager: PagerData;
        List: Array<T>;
    }

}