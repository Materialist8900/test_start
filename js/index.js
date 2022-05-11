window.addEventListener('load', function () {
    // 面向对象的核心思路是模块化，通过不同的函数来完成目标
    var that;
    var flag = false;
    class Tab {
        constructor(id) {
            // 将this的值赋给that
            that = this;
            // 获取元素,用this
            this.main = document.querySelector(id);
            this.lis = this.main.querySelectorAll('li');
            this.sections = this.main.querySelectorAll('section');
            // 获取添加功能的元素
            this.btn = this.main.querySelector('.tabadd').querySelector('span');
            this.ul = this.main.querySelector('ul');
            this.tabscon = this.main.querySelector('.tabscon');
            this.init();
        }
        // 封装一个更新元素函数
        updateNode() {
            that.lis = that.main.querySelectorAll('li');
            that.sections = that.main.querySelectorAll('section');
            // 获取删除功能的元素
            that.remove = that.main.querySelectorAll('.icon-guanbi');
            // 获取li里的span
            that.spans = that.main.querySelectorAll('ul li span:first-child');
        }
        // 绑定事件
        init() {
            // 更新获取元素
            this.updateNode();
            // 绑定+按钮点击事件
            this.btn.addEventListener('click', this.addTab);
            // 绑定li的点击事件
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].index = i;
                this.lis[i].addEventListener('click', this.toggleTab);
                this.remove[i].addEventListener('click', this.removeTap);
                this.spans[i].addEventListener('dblclick', this.editTap);
                this.sections[i].addEventListener('dblclick', this.editTap);
            }
        }
        //1.切换功能
        toggleTab() {
            that.clearClass();
            this.className = 'liactive';
            that.sections[this.index].className = 'conactive';
        }
        clearClass() {
            for (var i = 0; i < that.lis.length; i++) {
                that.lis[i].className = '';
                that.sections[i].className = '';
            }
        }
        //2.添加功能
        addTab() {
            var litext = '<li><span>新的选项卡</span><span class="iconfont icon-guanbi"></span></li>';
            var sectiontext = '<section>点击修改内容</section>';
            that.ul.insertAdjacentHTML('beforeend', litext);
            that.tabscon.insertAdjacentHTML('beforeend', sectiontext);
            // 添加完元素再次重新绑定事件，因为li的个数发生了改变
            // 需要再获取一遍元素，再循环绑定一次。
            // 直接调用inin()即可
            that.init();
        }
        //3.删除功能
        removeTap(e) {
            // 因为icon-guanbi在li里面,点击icon-guanbi会触发li的点击事件,所以要阻止事件冒泡
            e.stopPropagation();
            var index = this.parentNode.index;
            // pink老师的方法 ***
            that.lis[index].remove();
            that.sections[index].remove();
            // 我的方法
            // that.ul.removeClid(that.ul.chlidren[index]);
            // that.tabscon.removeClid(that.tabscon.chlidren[index]);
            // 我的方法有个致命的错误
            // 在上方更新函数中，我只更新了li 和 seciton的数量
            // 而我索引号指向的是ul和tabscon的孩子，这个数值并没有得到更新
            // 所以会误删和undefined
            that.init();
            index--;
            // pink老师的方法，更简单
            // if(document.queryselector('liactive')) return;
            // 更简单 更清晰  更容易理解（还有这种操作？？？）
            // 我的方法，设定节流阀，遍历所有li，如果有一个li含有liactive类
            // 节流阀就关上，click不再出发
            for (var i = 0; i < that.lis.length; i++) {
                if (that.lis[i].className == 'liactive') {
                    flag = false;
                    return false;
                } else {
                    flag = true;
                }
            }
            if (flag == true && index >= 0) {
                that.lis[index].click();
            }
        }
        //4.修改功能
        editTap() {
            window.getSelection ? window.getSelection().removeAllRanges() : document.section.empty();
            // 先将原本的文本保存下来
            var localText = this.innerHTML;
            // 双击后将他变成<input>文本框
            this.innerHTML = '<input type="text" value=' + localText + '>';
            var input = this.querySelector('input');
            input.select();
            // 给input绑定失焦事件，失焦就变回文字
            input.addEventListener('blur', function () {
                this.parentNode.innerHTML = this.value;
            });
            // 按下回车也可以将文本框里的值给对应的元素
            input.addEventListener('keyup', function (e) {
                if (e.keyCode == 13) {
                    this.blur();
                }
            });
        }
    }

    // 实例化对象
    new Tab('#tab');
});
