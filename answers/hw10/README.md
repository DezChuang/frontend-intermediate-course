
# HW10 - 改掉你的壞習慣：ESLint 與 standard

## Properties
* `npm install -g eslint`，global安裝eslint。

* 在hw10根目錄下指令：`eslint --init`，可以根據自己的coding rule設定，完成後會產生`.eslintrc.json`。
<img class="center" src="http://i.imgur.com/lWgDkKh.png">

* rule設定
	* 空格每2格一個單位
	* 使用單引號刮著字串
	* 有分號

* 下指令`eslint .`即可掃描當前目錄底下所有檔案的coding style是否符合rule，可以看到大部分是空白或引號沒統一，也有一些分號問題：
<img class="center" src="http://i.imgur.com/4Ya7cum.png">

* 遇到bundle.js或設定檔也被報錯的問題，在eslint中是透過增加一個`.eslintignore`的檔案來忽略要掃描的檔案，類似`.gitignore`的使用方法。

* 最後有遇到如下的問題：

	```
	assets/js/index.js
	41:7  error  Unexpected console statement  no-console
	45:5  error  Unexpected console statement  no-console
	77:7  error  Unexpected console statement  no-console
	```
透過在rules裡新增`"no-console": "off"`解決([參考](https://stackoverflow.com/questions/34215526/eslint-how-to-disable-unexpected-console-statement-in-node-js))

* 看Slack上各位大大建議也把設定檔檢查，所以把原本ignore掉的`webpack.config.js`與`gulpfile.js`也檢查一遍。

* webpack.config.js裡可以將沒使用到的`var webpack = require(‘webpack’)`移除，而針對`3:11  error  '__dirname' is not defined  no-undef`這一段，則是在`.eslintrc.json`內再加上如下設定：

	```
		"env": {
			"node": true
		}
	```

	因為__dirname是在node裡定義的變數，指當前目錄的絕對路徑。

---

## 筆記
進階可讀[這篇](https://denny.qollie.com/2016/07/11/eslint-fxcking-setup/)來更理解ESLint的運作原理。

---

## 直播筆記


---

## 後記
原本看了一下yuanyu90221大大跟pychiang大大的做法也想套用semistandard，但想想既然都看到做法了，那就來試一下ESLint好了，瀏覽了學習資源的[這篇](https://denny.qollie.com/2016/07/11/eslint-fxcking-setup/)後，不愧是天眼通作者，可以研究的這麼深入，了解到Linter的制定對於團隊程式碼的品質有很大的幫助。

關於團隊程式碼的管理，前幾天面試被震撼教育了一番。對方考了一題「寫一個function能將傳入的數字加逗號回傳」，面試官頻繁地提示到要寫出「對團隊有貢獻的程式碼」，天真如我以為只是加@params或註解這樣，寫法就參考[網路解法](https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript)，`/\B(?=(\d{3})+(?!\d))/g`這串正規表達式有看沒有懂，果然提交之後就變炮灰了，別說`\B`網路上的解釋很難理解，連後面的`?=`或`?!`其實也不懂，就被示以一個很簡單的道理：「一段連你也無法解釋的程式碼，對團隊而言品質是不夠的。」就是有發現自己盲點的感覺。

Anyway扯遠了，所以了解ESLint或Standard這類的標準之後，又更能知道提高程式碼品質的方法。終於也完成十份作業，太感人，也非常謝謝Huli老師的免費教學，之後另外寫一篇[心得文](http://dez.logdown.com/posts/2017/06/19/huli-frontend-intermediate-course)吧。

---

## References
* [http://eslint.org/](http://eslint.org/)

---

## Demo
[https://dezchuang.github.io/frontend-intermediate-course/answers/hw10/index.html](https://dezchuang.github.io/frontend-intermediate-course/answers/hw10/index.html)
