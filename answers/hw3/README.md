
# HW3 - 寫 CSS 必備神器：CSS 預處理器

## Properties
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


## Question Set

### 1.為什麼我們需要 CSS 預處理器？沒有 CSS 預處理器的話會怎樣嗎？
### 2.在那三套裡面，你為什麼選擇了現在這一套？理由是什麼？

<br>

## References

<br>

## Troubleshooting
* `.container`無法用`margin: 0 auto`置中

```
.container {
  position: absolute;
  left: 12.5%;
  box-sizing: border-box;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 72%;
}
```


<br>

## Demo
https://dezchuang.github.io/frontend-intermediate-course/answers/hw3/index.html
