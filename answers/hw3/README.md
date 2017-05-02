
# HW3 - 寫 CSS 必備神器：CSS 預處理器

## 本章Properties
* 使用sass重構css，並使用Prepros編譯成css

## 其他Properties
* 遮罩重構:

```
background-image: linear-gradient( rgba(0, 0, 0, .5), rgba(0, 0, 0, .5) ), url(../img/bg-default.jpg);
```

* class 名稱重構:

```
<div class="stream-item">
  <div class="preview"></div>
  <div class="content">
      <div class="avatar"></div>
      <div class="stream-text">
        <p class="title">頻道名稱</p>
        <p class="streamer">實況主名字</p>
      </div>
  </div>
</div>
```

* 利用HW1教的flex重構排版
* 增加空白`stream-item`使每個元素在視窗縮放時對齊
* 引入「思源黑體」中文網頁字型
* 修復使用flex排版每一個item間距跑掉的問題，但暫時無法RWD


## Question Set

### 1.為什麼我們需要 CSS 預處理器？沒有 CSS 預處理器的話會怎樣嗎？
使用CSS預處理器能夠在往後處理更複雜的大型專案時，能有效率地偵錯與開發。
### 2.在那三套裡面，你為什麼選擇了現在這一套？理由是什麼？
選擇使用sass，雖然有點想偷懶學看起來比較平易近人的Stylus，但因為[這篇](https://github.com/kamranahmedse/developer-roadmap)Roadmap推薦學習sass，實際上為什麼還需要慢慢摸索。

<br>

## References
* [Sass & Susy教學手冊](https://github.com/gonsakon/Learn-Sass-in-90-days)
* [Sass教學 (25) - 如何透過Sublime text 3 plugin打造Sass開發環境](http://ithelp.ithome.com.tw/articles/10159247)
* [Google Fonts 推出「思源黑體」中文網頁字型，改善網頁文字顯示效果](https://free.com.tw/google-fonts-noto-sans-cjk-webfont/)
* [[作業][值得參考]繳交 hw1 #12 by miau715 ](https://github.com/aszx87410/frontend-intermediate-course/issues/12)
* [[作業][值得參考]繳交 hw3 #53 by pychiang ](https://github.com/aszx87410/frontend-intermediate-course/issues/53)
* [CSS中设置margin:0 auto; 水平居中无效的原因分析](http://www.phpxs.com/post/2862/)

<br>

## Troubleshooting
* `.container`無法用`margin: 0 auto`置中 [Fixed]

>原因: `.container`需指定`width`為`1000px`，若指定為`72%`會有內容元素無法對齊的問題，要做RWD可能還是需使用media query

* 目前使用Prepros來編譯sass，但似乎有更多有效率地方法如`Compass`或`gulp`等等，還需要再學習摸索。

<br>

## Demo
[https://dezchuang.github.io/frontend-intermediate-course/answers/hw3/index.html](https://dezchuang.github.io/frontend-intermediate-course/answers/hw3/index.html)
