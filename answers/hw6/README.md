
# HW6 - 返璞歸真：vanilla js

## Properties
* `main.js`改名為`index.js`
* 移除`jquery-3.2.1.min.js`
* 改寫.ajax

```
let xhr = new XMLHttpRequest();
xhr.open(method, twitchAPI, true);
xhr.onload = (data) => {
	if (xhr.status >= 200 && xhr.status < 400) {
		data = JSON.parse(xhr.responseText);
		callback(null, data);
	} else {
		console.log(err);
	}
};
xhr.onerror = (err) => {
	console.log(err);
};
xhr.send(null);
```

* 改寫appendData

```
-      const $container = $('.container');
+      const container = document.querySelector('.container');
       for(const stream of streams) {
-        $container.append(templateData(stream));
+        container.insertAdjacentHTML('beforeend', templateData(stream));
```

* 改寫scroll

```
-  $(window).scroll(function() {
+  window.addEventListener('scroll', function() {
```

* 改寫infinite scroll高度判斷

```
-      if($(window).scrollTop() + $(window).height() > $(document).height() - reservedHeight) {
+      if(document.body.scrollTop + window.innerHeight > document.body.scrollHeight - reservedHeight) {
```

* 修正hw5時，avatar佔位圖無法正確顯示的issue，加上`background-size: 100% 100%`

---

## Question Set

### 用 vanilla js 有哪些優缺點？
Pure Javascript to access the DOM can be faster as you can cut the overhead that jQuery has on this. However it doesn’t always have to be faster as you could write some major mistakes that slow things down again.

![jQuery vs Vanilla](http://i.imgur.com/3nDAgQ8.png "jQuery vs Vanilla")


---

## References
* [YOU MIGHT NOT NEED JQUERY](http://youmightnotneedjquery.com/)
* [You Don't Need jQuery](https://github.com/oneuijs/You-Dont-Need-jQuery/blob/master/README.zh-CN.md)
* [使用XMLHttpRequest](https://developer.mozilla.org/zh-TW/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)
* [document.querySelector](https://developer.mozilla.org/zh-TW/docs/Web/API/Document/querySelector)
* [Element.insertAdjacentHTML()](https://developer.mozilla.org/zh-TW/docs/Web/API/Element/insertAdjacentHTML)
* [10.3 How do I find the size of the window?](http://jibbering.com/faq/#getWindowSize)
* [What is offsetHeight, clientHeight, scrollHeight?](http://stackoverflow.com/questions/22675126/what-is-offsetheight-clientheight-scrollheight)
* [Get the browser viewport dimensions with JavaScript](http://stackoverflow.com/questions/1248081/get-the-browser-viewport-dimensions-with-javascript)
* [JavaScript 獲取頁面高度（多種瀏覽器)](https://dotblogs.com.tw/aquarius6913/2011/01/03/20538)
* [Which is faster (execution-wise): JavaScript or jQuery?](https://www.quora.com/Which-is-faster-execution-wise-JavaScript-or-jQuery)
* [jQuery vs JavaScript Performance Comparison](https://jsperf.com/jquery-vs-javascript-performance-comparison/14)

---

## Troubleshooting
* Chrome, Safari, Edge pass. IE fail.

---

## 直播筆記

---

## 後記
自己實作原生JS，初步做完改寫看起來不太困難，因為基本的程式邏輯在hw5大致上架構都完成了，只是將jQuery的部分依序改成vanilla，不過若是考慮跨瀏覽器的問題的話，目前測試使用Chrome、Safari、Edge都可以正常工作，IE 11完全是空白的XD，看來真正的挑戰好像是跨瀏覽器的判斷嗎?

---

## Demo
[https://dezchuang.github.io/frontend-intermediate-course/answers/hw6/index.html](https://dezchuang.github.io/frontend-intermediate-course/answers/hw6/index.html)
