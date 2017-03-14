
export module Post {

    export interface ISubmitData
    {
        SubmitSign: string;
        DataValue: string;
    }

    export interface IDict<T> {
        [index: string]: T;
    } 

    //-----------------IData-----------------
    export interface IDataRow extends IDict<string | number> {
        [index: string]: string | number;
    }

    //export interface IDataTable extends IDict<IDataRow> {
    //    [index: string]: IDataRow;
    //}

    export interface IDataSet extends IDict<Array<IDataRow>> {
        [index: string]: Array<IDataRow>;
    }

    export class Util {
        public static Post($dom:JQuery)
        {

        }


    public static IsEmpty (obj) {
            if (typeof (obj) == "undefined" || obj === null || obj === "" || obj === undefined || Util.IsNull(obj)) {

                return true;
            }
            else {
                for (var _pro in obj) {
                    return false;
                }
                if (typeof (obj) == "object")
                    return true;
            }
            return false;
        }


        public static IsNull  (obj): boolean  {
            var i = obj.toString();
            if (i == "{}" || i == "") {
                return true;
            } else {
                return false;
            }
        }



        public static CheckDataSet(ds: IDataSet) :IDataSet{
            for (var _dtName in ds) {
                var _dt = ds[_dtName];
                if (_dt.length > 0) {
                    for (var i = 0; i < _dt.length; i++) {
                        if ( Util.IsEmpty( _dt[i])) {
                            _dt.splice(i, 1);
                            i--;
                        }
                    }
                }
            }
            return ds;
        }

        public static createDataSet(jDomList: Array<ISubmitData>): IDataSet
        {
            var ds: IDataSet = {};
            jDomList.forEach((a) => {
                var _sign = a.SubmitSign;
                var cos = _sign.split(".");
                var _tb = cos[0];
                var _row = cos[1];
                var _col = cos[2];

               ds =  Util.joinDataSet(ds,_tb,parseInt(_row),_col,a.DataValue);

            });
            ds = Util.CheckDataSet(ds);
            return ds;
        }
        public static joinDataSet(ds:IDataSet, tableName:string, rowNumber:number, colName:string, val:string): IDataSet
        {
            var f = ds[tableName];
            if (typeof (f) == "undefined") {
                ds[tableName] = [];
            }
            var rowCount = ds[tableName].length;
            if (rowNumber + 1 > rowCount) {
                for (var i = 0; i < rowNumber - rowCount + 1; i++) {
                    var _row: IDataRow = {};
                    ds[tableName].push(_row);
                }
            }
            ds[tableName][rowNumber][colName] = val;
            return ds;
        }

    }
}