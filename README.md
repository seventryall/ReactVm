ReactVm
===
## 理念
本实例是基于typescript+react，利用面向对象编程思想，通过类似mvvm的架构方式实现组件开发的，这里的vm是主要的逻辑层，也是整个框架的核心，vm对象通过props传递给react组件，实现数据的绑定与组件的更新。为了降低组件间的耦合性，组件间的通信采用的是消息总线的方式，把事件当成消息处理，vm负责发出触发和监听消息，并处理相应的业务逻辑，vm也可以自由的操作其他组件。框架这么实现的目的是为了组件开发的复用性、灵活性和扩展性。
## 功能
这是该框架的一个简单应用，一个按钮，一个列表，点击按钮，弹出一个选择框，选择好数据之后，反映到列表中，基本的功能点也都涵盖了，包括组件的创建，数据绑定，更新及组件间的通信等。
## 运行
采用的是webpack的打包方式，在当前目录下，依次执行命令<br>
npm install<br>
npm run build<br>
npm start<br>
浏览器就会自动打开页面
