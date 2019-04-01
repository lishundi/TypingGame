
## 第一步：页面的排版和布局
* 1.1实现开始游戏的界面
  * 1.1.1开始游戏
  * 1.1.2游戏说明
* 1.2进入游戏的界面
  * 1.2.1开始按钮;游戏的暂停
  * 1.2.2结束游戏
  * 1.2.3退出游戏;退出到游戏开始的界面
  * 1.2.4设置;设置当前游戏的难度
  * 1.2.5打字得分;每打对一字，得一分
  * 1.2.6打字正确率
  * 1.2.7打字速度
## 第二步：实现开始游戏
* 2.1说明提示
* 2.2进入游戏界面
* 2.3游戏退出
* 2.4设置:显示选择游戏难度
## 第三步：进入游戏界面之后的开始游戏
* 3.1点击进入游戏,实现字母的掉落
* 3.2游戏开始之后,实现游戏的暂停
## 第四步：实现游戏的暂停
* 4.1清除定时器，清除单位时间内掉落多少个字母的定时器
* 4.2清除字母掉落速度的定时器,每个字母元素都存在定时器
* 4.3结束游戏,清除4.1的定时器和删除4.2所有字母所在的元素
* 4.4退出游戏,结束游戏,显示游戏开始界面,隐藏进入游戏界面
## 第五步：实现游戏难度的设置
* 5.1游戏的默认难度是慢
* 5.2游戏在进行过程中是不允许设置游戏难度的
* 5.3在游戏暂停和开始之前是允许设置游戏难度的
* 5.4游戏难度设置之后，在关闭游戏难度设置之后生效
## 第六步：实现键盘打字，字母消失
*  6.1全局变量：把当前游戏界面里所有字符存放在该变量里
*  6.2根据键盘输入的字符，在全局变量字符串里找到该字符的位置
*  6.3删除该字符所在的元素
