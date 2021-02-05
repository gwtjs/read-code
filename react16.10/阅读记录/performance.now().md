## `performance.now()`

`performance.now()`方法返回一个精确到毫秒的  [`DOMHighResTimeStamp`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMHighResTimeStamp) 。

返回值表示为从[time origin](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp#The_time_origin)之后到当前调用时经过的时间。

`DOMHighResTimeStamp` 是一个double类型，用于存储毫秒级的时间值。这种类型可以用来描述离散的时间点或者一段时间（两个离散时间点之间的时间差）。

这种基于毫秒精度的时间，应该精确到5微秒级别，其数值的小数部分代表了一个毫秒的小数（也就是微秒）。但是，如果浏览器不能提供精确到5微秒的时间值(例如,由于硬件或软件的限制)，浏览器可以在表示一个以毫秒为单位的时间值时，精确到毫秒级别。同时要注意，在下一节中提到，由浏览器首选项控制的**降低时间精度，**是为了防止时序攻击和记录指纹。

此外，如果用户代理运行所在的设备或操作系统不具备精确到微秒级别的时钟，那么他们只能精确到毫秒。

开始时间可以是由网站或`app`中的脚本定义的一个特定时间T，也可以是**时间源**。

## 时间源

**时间源**是一个可以被认定为当前文档生命周期的开始节点的标准时间，计算方法如下:

- 如果脚本的`global object`是`Window`, 则时间源的确定方式如下:
  - 如果当前 [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 是中加载的第一个 `Window`, 则**时间源**是创建浏览器上下文的时间。
  - 如果处于卸载窗口中已加载的先前文档的过程中，一个确认对话框会显示出来，让用户确认是否离开前一页，则**时间源**是用户确认导航到新页面的这个时间，这一点是被认同的。
  - 如果以上方式都不能确定**时间源**, 那么**时间源**是创建窗口中当前 `Document` 的导航发生的时机。
- 如果脚本中的全局对象是 [`WorkerGlobalScope`](https://developer.mozilla.org/zh-CN/docs/Web/API/WorkerGlobalScope) (意味着, 该脚本以web worker的形式运行), 则**时间源**是这个worker被创建的时刻。 
- 在所有其他情况下, **时间源**的值是undefined。

