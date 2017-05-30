
# HW7 - 走向國際：i18n

## Properties
* 將實況連結加上去，寫作業時看到喜歡的台還可直接連過去看實況XD

```
<a href="${data.channel.url}" target="_blank" class="stream-item">
```

* 暫時使用以下代碼來做i18n的直播轉換
	* `changeLang`: button的onclick function

		```
		function changeLang(lang){
		  // 1. title reload
		  title.textContent = window.I18N[lang].TITLE;
		  // 2. button reload
		  removeBtnSelected(lang);
		  // 3. stream reload
		  language = lang;
		  offset = 0;
		  refreshTable();
		}
		```

		* title reload: 參考Huli大大hw6講解的`window.I18N[lang].TITLE`
		* button reload: 新增button的背景色，來標示selected button
		* stream reload: 使用`refreshTable` function實作

	* `refreshTable`: 將container內容重新渲染，目前使用`$( ".container" ).empty();`做清空，並重新向api做ajax request。

		```
		function refreshTable() {
		  //Walkaround way for refreshing container to implement i18n
		  $( ".container" ).empty();
		  mainLoad();
		}
		```

	* `mainLoad`: 為先前的init main function

		```
		function mainLoad(){
		  $(document).ready(() => {
		    // Init 20 items from twitch API
		    appendData();
		    // Infinite scroll
		    infiniteScroll();
		  });
		}
		```



---

## Question Set

### 我們在這範例中用了 window 儲存 I18N 這個全域變數，這樣有什麼壞處嗎？

使用全域變數儲存I18N可能會和其他library有同名衝突。可使用Webpack來幫忙解決。

---

## References
* [Huli - 講解hw7](https://www.youtube.com/watch?v=2avbfs4xESw#t=29m48s)
* [The Window Object](https://www.w3schools.com/jsref/obj_window.asp)

---

## Troubleshooting
* 有時候會有重複的stream item出現，不知道是不是offset的地方有bug，還是API的問題
>修正Huli大大抓到的bug，將infiniteScroll函式的timer宣告為global後可解決「切換語言後，infinite scroll重複發出request」的issue

* 多次選取另外一種語言後transition會消失


---

## 直播筆記
* 可透過語言檔的key/value來達到i18n的功能
* 不同檔案可以透過window來傳遞變數
* 將程式架構切得越好，增加新功能時所需要的effort越小
* 下週作業有點難，可能要提早開始做


---

## 後記
此作業一開始嘗試時，自己找了個`jquery-i18n-properties`來使用，做一個title的callback，但UX的效果不好，點擊後會頓一兩秒才改標題，也可能是我有使用上錯誤，在看完Huli大大hw6的直播後，才發現只要用`window.I18N[lang].TITLE`就可以了，自己沒方向的搜尋常常會想的太難。最難的部分應該是重新渲染的部分，暫時只想到使用清空的方法來做重新渲染，找找有沒有更好的做法。

上次做六角學院百題斬時，最後一部分有很多BOM相關的觀念都不太熟，趁這次也稍微做了些study。隨著功能的增加，模組化的必要性也就顯得越來越重要，看見Huli大大在進階閱讀地方給了許多這方面的連結，之後也試著將index.js切成多隻檔案。原本以為`window 儲存 I18N 這個全域變數`這一題是BOM的問題，但在研究模塊化時突然想到hw8是webpack，然後就發現原來作業簡介早已解答了疑惑，原來這一切都是安排好的呀！

---

## Demo
[https://dezchuang.github.io/frontend-intermediate-course/answers/hw7/index.html](https://dezchuang.github.io/frontend-intermediate-course/answers/hw7/index.html)
