import React = require("react");
import ReactDOM = require("react-dom");

export class DomReact<P extends IDomProps<IDomVm>, S extends any> extends React.Component<P, S>{
    public render(): React.ReactElement<any> {
        return this.pRender();
    }
    protected pRender(): React.ReactElement<any> {
        return null;
    }
}



export interface IDomVm
{
    domVm: any;
}

export interface IA
{
}


export interface IDomProps<T extends IDomVm> 
{
    Vm: T;   
    children(); 
}



export interface ITestDomVm extends DomVm 
{
    TestDomVm: string;
}

export class DomVm implements IDomVm
{
    public domVm: any;
    private vv: string;
}

export interface ITestDomProps extends IDomProps<ITestDomVm>
{
}


export class TestDomReact extends DomReact<ITestDomProps,any>{
    protected pRender(): React.ReactElement<any> {
        return <div>{this.props.Vm.TestDomVm}</div>;
    };
}


export class TestDomVm extends DomVm  implements ITestDomVm{
    TestDomVm: string = "hahahaha";

}