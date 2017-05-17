
# HW5 - 讓網頁變得更完整：加上 placeholder 與 infinite scroll

## Properties
* 重新編排sass，並使用minify css提升效能
* 參考Huli大大的placeholder寫法，並採用偽元素`:before`來做佔位圖
* Refactor `main.js`，使用Huli作業四架構，將從twitch載入資料的每一步驟function化
* 參考miau715的timer寫法來控制infinite scroll的request發送

---

## Question Set

### 1.佔位圖也是圖片，也需要下載時間，有沒有什麼方法可以優化這點？
* 使用[base64編碼](https://sofree.cc/base64-images/)，降低連線請求

---

## References
* [[優化]圖片轉成 Base64 編碼字串，降低連線請求](https://sofree.cc/base64-images/)
* [How Medium does progressive image loading (provided by yuki大大)](https://jmperezperez.com/medium-image-progressive-loading-placeholder/)
* [5. 讓網頁變得更完整：加上 placeholder 與 infinite scroll](https://codepen.io/aszx87410/pen/MmBorO)
* [[作業][值得參考]繳交 hw5 #81 by yuanyu90221](https://github.com/aszx87410/frontend-intermediate-course/issues/81)
* [[作業][值得參考]繳交 hw5 #83 by miau715](https://github.com/aszx87410/frontend-intermediate-course/issues/83)
* [CSS3 transform Property](https://www.w3schools.com/cssref/css3_pr_transform.asp)

---

## Troubleshooting
* avatar的placeholder會跑圖，設成`no-repeat center`或調整寬高都無法解

---

## 直播筆記
1. 模擬網路速度：可以透過dev-tool的network的no throttling，調整下拉選單來模擬各種網路速度
2. placeholder
	* 方法一	
		* 放兩張圖片(佔位圖、真圖)在同一個div，同一個位置(使用absolute、relative調整)
		* 讓真圖蓋掉placeholder，使用relative的position
		* 將真圖設置透明屬性：opacity=0
		* 等真圖載入完成使用onload="this.style.opacity=1;(利用過場來達到載入效果)
	* 方法二
		* 使用.preview:before將placeholder作為偽元素(記得加content)

3. 使用base64來優化載入圖片的速度，但缺點是圖片會變大約1.5倍，且最大只能到32k，適合拿來優化一些小圖
4. Infinite scroll
	* scroll event
	* 偵測是否捲到底部
		
		```
		if($(window).scrollTop() + $(window).height() > $(document).height() - reservedHeight)
		```
		* $(document).height() 整個網頁高度
		* $(window).height() 目前視窗高度
		* $(window).scrollTop() 捲軸捲到哪邊的上緣
		
	* 如果是，載入新channel
		* 設一個isLoading的flag，避免重複發出多次request
		* 管理offset這個參數，每次都抓新的channel

---

## 後記
從進入了js的作業後，難度開始提高了一些，也幫助我更理解了以前自學沒學到或是沒深入研究的地方，看到高手如雲的同學們寫的js，才發現自己有一點還不會走(js/jQuery)就去飛(React)的感覺，難怪我Redux看了好幾遍沒看懂。看了幾位同學們hw5的寫法都寫得好漂亮，像是miau715大大利用`timer = window.setTimeout(function()`的方法來控制infinite scroll的想法就很值得學習，便把code的邏輯弄懂後，整合到我的code裡，並參考Huli大大hw4解答的架構把我的一些function切的更細一點。

也發現跟了幾次課程後，與以往自學看線上課程不一樣的收穫是，Huli讓我們先去蒐集資料並實作，其中會卡關會有無法解決的bug，最後才聽完直播講解後，發現是自己想太難了，真正的解法原來就是這麼簡單的道理等等，這樣有仔細思考後才豁然開朗的學習方式，是真的可以學到蠻多的。

---

## Demo
[https://dezchuang.github.io/frontend-intermediate-course/answers/hw5/index.html](https://dezchuang.github.io/frontend-intermediate-course/answers/hw5/index.html)
