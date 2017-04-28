
# HW2 - 讓畫面變得更動態：神奇的 CSS transition

## Properties
* hover至每一個項目時會有以下的transition
* 在整個`stream-item`加上`filter: contrast(125%) brightness(150%);`做對比與亮度的增強
* 在整個`stream-item`加上`box-shadow: 5px 5px 20px 2.5px #323232;`做邊框深灰陰影
* 在`content`加上hover時背景為全黑無透明
* 第一項目加入`id="special"`demo移過去一秒後發生hover效果
* `transition` 這個屬性加在 `.class` 上跟加在 `.class:hover` 上面是不一樣，欲使移入移出皆有效果，就需要加在`.class`上
* 加入一些sass語法

## Question Set

### 1.你能不能試著做出另外一種 hover 的形式？例如說 hover 的時候背景顏色改變之類的
試著在`preview`下的`content`處加入如下程式，使`content`在hover時背景為全黑無透明

```
.content:hover {
    background-color: rgba(0, 0, 0, 1)
    transition: background-color .25s
}
```

### 2.我希望我滑鼠移上去之後過一秒才發生 hover 的效果，應該怎麼辦？
在`:hover`處加上`transition-delay: 1s;`

 ```
.stream-item:hover {
  box-shadow: 5px 5px 20px 2.5px #323232;
  filter: contrast(125%) brightness(150%);
  transition: box-shadow .25s, filter .5s;
}

#special:hover {
  transition-delay: 1s;
 }
 ```


### 3.為什麼我們應該在使用 transition 的時候避免 transition: all？
I. performance不佳

II. 使用`transition: all`意義為「所有transition效果共享同樣的延續時間以及速率變換方式」，有時候會因為載入速度不一致而造成UX不佳

>Yes, using `transition: all` could cause major drawbacks in performance. There can be a lot of cases where the browser would look if it needs to make a transition, even if user won't see it, like the color changes, dimension changes etc.
>
>The simplest example I can think of is this: http://dabblet.com/gist/1657661 — try to change the zoom level or the font's size and you'll see that everything become animated.Of course there couldn't be a lot of such user interactions, but there could be some interface changes that can cause the reflow and repaints in some blocks, that could tell the browser to try and animate those changes.
>
>So, in general, it's recommended that you won't use the transition: all and would use the direct transitions instead.
>
>There are some other things that can go wrong with the all transitions, like the splash of animation on page load, where it would at first render the initial styles for blocks and then apply the style with an animation. In a lot of cases it wouldn't be the thing that you want :)


<br>

## References
[Delay :Hover in CSS3?](http://stackoverflow.com/questions/8566090/delay-hover-in-css3)

[CSS3 Transition](https://www.w3cplus.com/content/css3-transition)

[CSS3 Transitions: Is “transition: all” slower than “transition: x”?
](http://stackoverflow.com/questions/8947441/css3-transitions-is-transition-all-slower-than-transition-x)

<br>

## Troubleshooting
* 目前只使用Chrome開發，在使用Safari檢視時transition稍微有些頓
* 改為`flexbox`的關係，在寬度小於1400的display上會有排版上的bug

<br>

## Demo
[https://dezchuang.github.io/frontend-intermediate-course/answers/hw2/index.html](https://dezchuang.github.io/frontend-intermediate-course/answers/hw2/index.html)
