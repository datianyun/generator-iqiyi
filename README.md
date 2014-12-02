
H5开发环境重构--拆分前后端


# 一、背景介绍


<pre>

  目前的活动项目，由于前后端资源全在一个工程目录下，随着活动的逐渐增多，项目目录越来越大，导致发布过程越来越慢，但是同时，从资源积累的角度来说，以往的资源我们还是应该保存，而不是简单的下线的删除；从项目工程化开发的角度来说，

前后端分离更加有必要。由于目前我们无法打通跟CDN，即无法直接把前端资源部署到CDN上，必须手动上传，根据目前的活动项目进行拆分，如下：

1. 活动项目的后端继续使用mobact2rd.

2. 活动的前端资源不放在原来项目下，新建一个lib工程，根据项目名称建立目录，保存项目资源。

3. 活动页面的引用都引用lib下的资源，即发布的时候同时发布后端和前端。

</pre>

# 二、lib下目录

!QQ截图20141008104114.png!

<pre>
  根据项目的不同，进行目录的区分
</pre>

# 三、前端环境搭建

*  安装nodejs, 参考官网 http://www.nodejs.org/
*  安装git ,参考 http://git-scm.com/download/
*  构建yeoman环境，第一步，安装yo
<pre>
   npm install -g yo
</pre>
*  第二步，安装grunt bower
<pre>
   npm install -g grunt-cli bower
</pre>
*  第三步，搭建一个web应用脚手架
<pre>
   npm install -g generator-webapp
</pre>

# 四、构建webapp

* 环境创建好后，开始构建我们的webapp
<pre>
   为你的项目创建一个新的目录，以创建移动MM项目为例， mkdir mobieMM cd mobieMM
</pre>
* 运行
<pre>
   yo webapp
</pre>
* 完成后目录应该如下图
  !QQ截图20141008104827.png !
* 修改Grunt.js,
<pre>
   将.tmp替换为tmp,linux上传不支持文件名以.开头
</pre> 
* bower.json用来描述前端的依赖库 可以根据文档选择自己项目依赖的库 ，然后运行
<pre>
   运行 bower install
</pre>
* package.json 是node的依赖描述包
<pre>
   运行 npm install
</pre>
* grunt.js是前端集成环境的核心，用来执行一些CSS,JS代码校验、打包的工作，可自定义

# 四、项目调试

* 在mobact2rd中,public文件夹下不在新增，只添加活动的后台php文件以及对应的view
* 开发过程首先依据步骤三完成静态文件的开发，然后做套页面以及后台开发
* 在webapp中做开发后，可以运行
<pre>
  grunt server 本地预览
</pre>
* 在静态页面完成，在后端yaf框架中套页面时，为了本地测试方便，引用的CSS地址为
<pre>
   http://localhost:9000/styles/main.css
</pre>
* 引用的JS地址为
<pre>
  http://localhost:9000/scripts/main.js
</pre>
* 如果页面中存在本地开发webapp中的其他地址，则在其前面全部添加
<pre>
   http://localhost:9000
</pre>
比如在本地调试中，图片地址为
<pre>
   <img class="header-logo" src="/images/logo.png">
</pre>
在后端套页面后替换为，即可
<pre>
   <img class="header-logo" src="http://localhost:9000/images/logo.png">
</pre>
* 这样做的好处是方便的随时进行调试
* 在手机端进行测试的话需要将webapp上传到测试环境，将webapp更新到lib项目中，上传的时候忽略node_modules文件夹，然后引用view中页面引用地址变更为
<pre>
   http://partner.vip.qiyi.com/lib/xx项目名/tmp/styles/main.css
   http://partner.vip.qiyi.com/lib/xx项目名/app/script/main.js
</pre>
* 以移动MM项目为例，切换地址如下所示
!QQ截图20141010102006.png!


# 五、项目上线规范

*  由于活动页面的规则限定比较简单，css js文件都限定为一个引用地址，并且必须为压缩好的CDN地址
*  图片地址尽量上传到CDN，由于我们没有CDN的权限，无法统一上传，目前也可以直接引用lib下的images文件夹，如果图片不多的话，尽量还是上传到CDN，然后引用图片地址改为CDN地址
*  在lib中的项目上传之前，先运行
<pre>
  grunt clean 清除测试产生的临时文件夹 
  grunt build 生成最终css js 
  然后将dest文件夹下的CSS，JS上传到CDN
</pre>
* 最终JS引用地址为上传到CDN后的地址如：
<pre>
    http://static.qiyi.com/js/common/XX.JS
</pre>
* 最终CSS引用地址为上传到CDN后的地址如：
<pre>
    http://static.qiyi.com/css/common/XX.css
</pre>
!QQ截图20141008104852.png !
上传文件时候忽略bower-components npm-modules文件夹
 
