
# HW8 - 當我們包在一起：Webpack

## Properties
* 本作業最重要的主題，避免使用window變數，參考Huli的[這篇](http://ithelp.ithome.com.tw/articles/10188007)文章來改寫i18n：

```
// en.js
module.exports = {
  "TITLE": "The Streams in English"
}

// zh-tw.js
module.exports = {
  "TITLE": "用中文直播的頻道"
}

// i18n.js
module.exports = {
  "zh-tw": require('./i18n/zh-tw.js'),
  "en": require('./i18n/en.js')
}

// index.js
const I18N = require("./i18n");
```

* 由於hw7中的onclick function打包後會有`Uncaught ReferenceError: function is not defined with onclick`的error而讓按鈕功能失效，因次改用以下方法監聽button：

```
$('#zhBtn').on('click', function(){
	changeLang('zh-tw');
});
```

* jQuery部分使用`npm install --save jquery`方式安裝，並於index.js中使用`const $ = require("jquery");`引入。

* 參考[這篇](http://www.jianshu.com/p/42e11515c10f)所配置的devtool為`eval-source-map`，優點是增加打包速度與bundle.js的可讀性，缺點是bundle.js從275k增大為787k，是一個適合開發用但產品階段一定不要用的選項。

* 將index.sass也import到index.js裡，html裡只剩下bundle.js

```
module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.sass$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader?name=assets/img/[name].[ext]'
      }
    ]
}
```


---

## 可嘗試的修改
* base64
* sass
* webpack 可以把 CSS 也當作 library 那樣引入，你可以試試看
* webpack 提供了很猛的 Hot Module Replacement (HMR)，試試看吧！
* react

---

## References
* [我也想要模組化開發：Webpack](http://ithelp.ithome.com.tw/articles/10188007)
* [入门Webpack，看这篇就够了](http://www.jianshu.com/p/42e11515c10f)
* [jQuery.click() vs onClick](https://stackoverflow.com/questions/12627443/jquery-click-vs-onclick/12627478#12627478)
* [Uncaught ReferenceError: function is not defined with onclick](https://stackoverflow.com/questions/17378199/uncaught-referenceerror-function-is-not-defined-with-onclick)
* [CSS与SASS在webpack中的使用](http://www.jianshu.com/p/a552aef2d1a1)


---

## 直播筆記



---

## 後記
跟著[這篇](http://www.jianshu.com/p/42e11515c10f)從頭練起webpack，有一種豁然開朗的感覺，還真的看完這一篇基本的就學的差不多了。

真正開始著手應用webpack打包程式碼時，發現自己原本的js檔將核心功能全部集中在同一隻檔案，重構跑馬燈瞬間閃過，從HW4到HW7的每一個功能要把它們分別重新安排架構，「哇！好像是個大工程啊」內心OS如是道。這時又有一個念頭閃過：「不如趁這機會直接重構成react好了，好像很潮。」稍微權衡了一下effort，還是先摸摸鼻子從基本的原始方法開始改起。

這次只有先針對i18n分出i18n.js並把全部的js檔包成bundle.js，index.js目前擠了很多功能，看起來還是很亂，有嘗試將一些function也切出去，但很容易弄到最後一團亂，有點感覺到一開始架構沒寫好(汗)，也很想既然都用了webpack了，有機會把他改成react也是很不錯的選擇。

之前初學react時，為了deploy也碰了一下webpack，並沒有找到比較好的文件參考，讓我一直對webpack有一種「好像沒那麼熟」的障礙，每次都會下意識避免使用webpack，直到寫完這次作業，終於能看懂`webpack.config.js`的基本設定，有一種又邁進一步的愉悅，才真正從排斥到讚歎這項發明，很多文件都說明react生態圈的產生，是為了應付現代越來越複雜的web app，做小型專案時都因殺雞用牛刀而覺得的刀很笨重很難使，真的要打BOSS時才發現原來是一把「+8神器」啊！

---

## Demo
[https://dezchuang.github.io/frontend-intermediate-course/answers/hw8/index.html](https://dezchuang.github.io/frontend-intermediate-course/answers/hw8/index.html)
