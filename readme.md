# 简介

本模块的作用是作为微服务的服务网关。

下面是服务网关在整个微服务架构系统中的位置。

![](http://otn252ndm.bkt.clouddn.com/17-11-29/19184960.jpg)

从图中可知，所有微服务都是通过网关与其他微服务或者外部请求相关联，微服务之间不直接通信。

网关设计的要求是能够方便地进行横向扩展，网关和服务注册发现服务之间保持长连接，以提高通信效率。网关与微服务之前是代理的关系，所有的请求在网关处获得目的服务地址之后，直接通过http-proxy的方式转发到目的服务地址。

为了提高网关的处理效率，网关只做基本的权限校验：

1. 业务线中的服务可以调用同业务线的服务
2. 业务线可以调用基础服务层的服务
3. 基础服务层的服务只允许调用基础服务层的服务
4. 业务线之间的服务不允许互相调用
5. 客户发起的请求不允许调用基础服务

# 请求约定

为了实现基本的权限控制，提高网关转发效率，做如下的约定

## 请求头部需要包含关键的转发判断条件
    
下面是请求头部明细

字段|描述
---|---
ms-a|请求微服务的业务线（应用）名称
ms-av|请求微服务的业务线（应用）版本号
ms-s|请求的微服务的名称
ms-sv|请求的微服务的版本

## 请求头部需要包含发起调用的服务所属的业务线名称

字段|描述
---|---
ms-ca|请求的当前应用名称

