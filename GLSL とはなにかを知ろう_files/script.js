
(function(global){
    var pages = [];
    var pagesCount = 0;
    var activePage = 0;
    var question = 10;

    window.onload = function(){
        var a, e, f;
        var i, j;
        a = document.getElementById('content').childNodes;
        for(var i = 0, len = a.length; i < len; i++){
            if(a[i].nodeName !== '#text'){
                pages.push(a[i]);
            }
        }
        pagesCount = pages.length;
        window.addEventListener('keydown', keyDown, false);
        e = document.getElementById('prev');
        e.addEventListener('click', function(){pageChange(true);}, false);
        e = document.getElementById('next');
        e.addEventListener('click', function(){pageChange(false);}, false);
        pageChange(true, 0);
        e = document.getElementById('total');
        e.textContent = pagesCount;
        f = function(){
            var e = document.getElementById('layer');
            e.className = e.className === '' ? 'visible' : '';
        };
        e = document.getElementById('icon');
        e.addEventListener('click', f, false);
        e = document.getElementById('layer');
        e.addEventListener('click', f, false);

        // agenda setting
        if(window.contentList != null && window.contentList !== ''){
            i = JSON.parse(window.contentList);
            if(i != null && i.length > 0){
                e = document.getElementById('menu');
                e.appendChild(genAgenda('home', -1));
                for(j = 0; j < i.length; ++j){
                    e.appendChild(genAgenda(i[j].content, i[j].count));
                }
            }
        }
        function genAgenda(content, count){
            var k, l;
            k = document.createElement('div');
            k.className = 'line';
            l = document.createElement('div');
            l.textContent = content;
            k.appendChild(l);
            l = document.createElement('div');
            l.className = 'arrow';
            l.textContent = '▷';
            k.appendChild(l);
            k.addEventListener('click', (function(index){return function(){
                pageChange(false, index + 1);
            };})(count), false);
            return k;
        }

        // input label setting
        e = document.getElementById('ansButton');
        if(!e){return;}
        e.addEventListener('click', function(){answer();}, true);
        var questionCount = 4;
        for(var i = 0; i < question; i++){
            var j = paddingZero(i + 1);
            for(var k = 0; k < questionCount; k++){
                var l = paddingZero(k + 1);
                e = document.getElementById('radio' + j + '_' + l);
                if(e){e.addEventListener('change', function(eve){eve.currentTarget.blur();}, true);}
            }
        }
    };

    function keyDown(eve){
        switch(eve.keyCode){
            case 37:
            case 38:
            case 72:
            case 75:
                pageChange(true);
                break;
            case 39:
            case 40:
            case 74:
            case 76:
                pageChange(false);
                break;
        }
    }

    function pageChange(prev, num){
        var e;
        pages[activePage].className = 'page';
        if(num != null){
            activePage = num;
        }else{
            if(prev){
                if(activePage > 0){
                    activePage--;
                }else{
                    activePage = pagesCount - 1;
                }
            }else{
                if(activePage < pagesCount - 1){
                    activePage++;
                }else{
                    activePage = 0;
                }
            }
        }
        pages[activePage].className = 'active';
        e = document.getElementById('progress');
        e.style.width = parseInt((activePage + 1) / pagesCount * 100) + '%';
        e = document.getElementById('count');
        e.textContent = activePage + 1;
    }

    // input label setting
    function answer(){
        var e, s;
        var ans = [
            3, 1, 1, 4, 3,
            4, 3, 1, 1, 2
        ];
        var ansCount = 0;
        for(var i = 0; i < question; i++){
            var j = paddingZero(i + 1);
            var k = paddingZero(ans[i]);
            e = document.getElementById('radio' + j + '_' + k);
            if(e.checked){
                ansCount++;
                console.log('question ' + (i + 1) + ' => ○');
            }else{
                console.log('question ' + (i + 1) + ' => ×');
            }
        }
        s = ansCount + ' / ' + question;
        switch(true){
            case ansCount <= 2:
                alert(s + '\n' + 'かなり頑張って復習しないとヤバいかも！？');
                break;
            case ansCount <= 4:
                alert(s + '\n' + '若干あいまいな部分が多いのかも……復習しておきましょう！');
                break;
            case ansCount <= 6:
                alert(s + '\n' + 'まずまず理解できているみたい。ポイントを絞って再復習！');
                break;
            case ansCount < 10:
                alert(s + '\n' + 'かなり高い理解度です！　不安なところは復習しておきましょう！');
                break;
            default :
                alert(s + '\n' + 'perfect !!!');
                break;
        }
        console.log(s);
    }

    function paddingZero(num){
        return ('0' + num).slice(-2);
    }
})(this);

