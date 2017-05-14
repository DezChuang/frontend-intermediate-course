
# HW4 - 從假資料到真資料：Ajax 與 API 串接

## Properties
* 移除`.container`的`justify-content: space-around`使最下方對齊
* 串接 [Twitch API](https://dev.twitch.tv/docs/v5/reference/streams/#get-live-streams)
* 使用jQuery的	`$.ajax()`來做asynchronous HTTP (Ajax) request
* 從影片中學到ES6語法[template strings](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Template_literals)可讓jQuery包住的HTML內容，更容易維護

## Question Set

### 1.HTTP method 有哪幾個？有什麼不一樣？
* GET: 讀取資源 (safe & idempotent)
* PUT: 替換資源 (idempotent)
* DELETE: 刪除資源 (idempotent)
* POST: 新增資源；也作為萬用動詞，處理其它要求
* PATCH: 更新資源部份內容
* HEAD: 類似GET，但只回傳HTTP header (safe & idempotent)
* 其它還有一些較少用到的，可參考[Wikipedia: Hypertext Transfer Protocol](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods)

### 2.GET 跟 POST 有哪些區別，可以試著舉幾個例子嗎？
#### GET
傳送的值藉由GET請求URL發送，簡單來說GET是把資料放在header進行傳送，而在網址列會看到"http://www.xxx.com/test/index.php?test1=value1&test2=value2"。
同時，使用GET方式傳遞的話，並不適合傳送些隱密性較高的資料(例如：Password)，因為在傳送的過程中就會顯示在網址列上
而GET的請求會被Cache紀錄、GET的請求受限於 QueryString 長度限制(依瀏覽器規定)，因此GET的使用時機應為檢視資料時使用。

#### POST
傳送的值藉由POST請求HTTP發送，簡單來說POST是把資料放在訊息主體內進行傳送。
而POST的請求不會被Cache紀錄、POST的請求對資料長度沒有限制，因此POST比GET更安全，所以較適合用來傳送隱密性較高的資料。

範例 - 以Node.js做blog登入為例：

* GET

```
//handling user log in
router.get("/login", passport.authenticate("local",{
    ...
}), function(req, res){});
```

```
<form action="/login" method="get">
	...
</form>
```
登入後網址列回傳：

```
http://localhost:5000/login?username=dez&password=dez
```

* POST

```
//handling user log in
router.post("/login", passport.authenticate("local",{
    ...
}), function(req, res){});
```

```
<form action="/login" method="post">
	...
</form>
```
登入後網址列回傳：

```
http://localhost:5000/posts
```

### 3.什麼是 RESTful API？
RESTful API是一種設計風格，這種風格使API設計具有整體一致性，易於維護、擴展，並且充份利用HTTP協定的特點。

嚴格來說REST符合以下幾個條件:

* 應用程式的狀態跟功能拆成 resources
* 每個 resource 使用獨一無二用來當作超連結的通用定位語法(在WWW中即URI)
* 所有 resources 共用一致的介面在 client 跟 resource 之間轉換狀態，包括:
	* 一組有限的良好定義操作 well-defined operations (在HTTP中即 GET/POST/PUT/DELETE)
	* 一組有限的內容格式 content types,也許包括 可執行的程式碼 code-on-demand (在WWW中即Javascript)
* 這種通訊協定 protocol (在WWW中即用HTTP) 包含以下特色:
	* 使用者端/伺服器端 Client/Server
	* 狀態無關 Stateless
	* 可以快取 Cacheable
	* 分層的 Layered

符合 REST principles 的系統稱做 RESTful。 

每個 resource 擁有自己的識別名詞，而 Clients 從單一 resource 開始瀏覽，透過標準操作走訪 resource ，如 GET 下載，PUT更新，DELETE刪除，POST新增，注意到每個物件有自己的URL，而且可以容易被快取，複製跟書籤化(bookmarked)。


### 4.JSON 是什麼？
JSON（JavaScript Object Notation）是個以純文字為基底去儲存和傳送簡單結構資料，你可以透過特定的格式去儲存任何資料(字串,數字,陣列,物件)，也可以透過物件或陣列來傳送較複雜的資料。最常被用在 Web 網頁程式從 Server 端傳送資料給 browser，典型範例就是透過 AJAX 方式交換 JSON 資料

範例：

```
{
    "firstName": "Dez",
    "lastName": "Chuang",
    "sex": "male",
    "age": 25,
    "address": 
    {
        "streetAddress": "21 2nd Street",
        "city": "New York",
        "state": "NY",
        "postalCode": "10021"
    },
    "phoneNumber": 
    [
        {
          "type": "home",
          "number": "212 555-1234"
        },
        {
          "type": "fax",
          "number": "646 555-4567"
        }
    ]
}
```

### 5.JSONP 是什麼？
JSONP (JSON with Padding)，原理是 `script` 標籤可以跨網域，在 HTML 裡面有幾個標籤不受到跨網域的限制，`script` 是其中一個。

可以在 HTML 裡引入 API URL 到 `script` 裡，然後定義 callback function 的參數，在 JavaScript 檔案裡用 callback function 呼叫出 JSONP 的資料。或是直接在 JavaScript 檔案裡引入 API URL 再利用 callback function 也可以。但是一般不建議使用 JSONP，因為如果引入 `script` 的網站遭駭客入侵，自身的網站也會受到影響。


### 6.要如何存取跨網域的 API？
1. JSONP
2. CORS (cross-origin resource sharing)

	在 Response Header 中 Access-Control-Allow-Origin 可以看到 API 資料是否有開放跨網域存取。
	
	跨網域存取分成：
	a. 簡單請求：只允許 `GET`、`HEAD`、`POST` 這三個方法。
	
	b. 先導請求 (Preflight Request)：先以 HTTP 的 OPTIONS 方法送出 request 到另一個網域，確定 Access-Control-Allow-Origin 沒問題後，才送出真正的 response 到此網域中。所以會發生送出一個 request 但有兩個 response，先導請求是瀏覽器驗證是否有開放跨網域存取的方法。如果想要避免先導請求多產生出來的 response，可以取消字定義的標頭（例如 `setRequestHeader`）就可以解決了。

不過，要是遠端伺服器沒有開放跨網域存取，不管用什麼方法瀏覽器都沒辦法存取資料的。
<br>

## References
* [jQuery.ajax()](http://api.jquery.com/jquery.ajax/)
* [簡明RESTful API設計要點](https://tw.twincl.com/programming/*641y)
* [什麼是REST跟RESTful?](https://ihower.tw/blog/archives/1542)
* [Wikipedia: Hypertext Transfer Protocol](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods)
* [[鐵人賽Day2] GET/POST 的差異與配合PHP用法](http://ithelp.ithome.com.tw/articles/10155801)
* [瞭解JSON格式](http://j796160836.pixnet.net/blog/post/30530326-%E7%9E%AD%E8%A7%A3json%E6%A0%BC%E5%BC%8F)
* [你不可不知的 JSON 基本介紹](https://blog.wu-boy.com/2011/04/%E4%BD%A0%E4%B8%8D%E5%8F%AF%E4%B8%8D%E7%9F%A5%E7%9A%84-json-%E5%9F%BA%E6%9C%AC%E4%BB%8B%E7%B4%B9/)
* pychiang大大的筆記 on Slack


<br>

## Troubleshooting
* `preview`與`content`間空白需修復

```
<img class='preview' src="${data.streams[x].preview.medium}">
解法1: vertiical-align:bottom;
解法2: display:block;
```
參考[【CSS】圖像產生間隙，空一行，如何解決？](https://www.pkstep.com/archives/2323)


<br>

## 後記
* 對於API存取尚不熟悉，對於twitch的client-id花了不少時間才搞定
* 終於可以把HTML裡一大串的stream item交給js去render了，方便維護
* 對於非同步概念需加強，Slack各位大大們討論的都增加許多見識，還有很多文件要survey

<br>

## Demo
[https://dezchuang.github.io/frontend-intermediate-course/answers/hw4/index.html](https://dezchuang.github.io/frontend-intermediate-course/answers/hw4/index.html)
