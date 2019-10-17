# Project
<h3>Shorten URL</h3>


# Getting Start
<pre><code>
[~/] $ git clone https://github.com/judy1230/expense_recorder.git
[~/] $ npm i express
[~/] $ npm run dev
</pre></code>
open browser with http://localhost:2550/
# Display
![Minion](https://upload.cc/i1/2019/10/16/nyAgEp.gif)

# Features
|       Option       |                                           Description                               |
| ------------------ |------------------------------------------------------------------------------------ |
| 使用者可以新增消費紀錄   |  首頁按下加入新增按鈕, redirect到 'http://localhost:2550/records/new'新增資料                  |
|                    |    相關資料: new.handlebars                                                         |
| 使用者可以瀏覽紀錄  |  單筆紀錄欄位按下detail, redirect到 'http://localhost:2550/records/:id'瀏覽該筆資料                 |
|                    |    相關資料: new.handlebars                                                          |
| 使用者可以修改紀錄   |  單筆紀錄欄位與detail頁面按下edit, redirect到 'http://localhost:2550/records/:id/edit?_method=PUT'修改該筆資料    |
|                     |    相關資料: index.handlebars, show.handlebars                                        |
| 使用者可以刪除紀錄  |  單筆紀錄欄位與detail頁面按下delete, redirect到 'http://localhost:2550/records/:id/delete'刪除該筆資料 |
|                    |     相關資料: index.handlebars                                |
| 使用者可以從首頁看到各項類別消費比例      | 首頁可從選單中選出特定月份與類別的消費比例 |
|                    |     相關資料: index.handlebars,  routers/records.js                                  |  
                        

# Authors
  <li>Judy</li> <p>first edited on 10/07/2019</p>
