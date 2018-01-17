var data =
[
  {
    productCode:'333824-021',
    imageInfo:'333824-021.png',
    productCateName:'鞋',
    productSeriesName:'儿童',
    productGenderName:'儿童'
  },{
      productCode:'898466-011',
      imageInfo:'898466-011.png',
      productCateName:'鞋',
      productSeriesName:'儿童',
      productGenderName:'儿童'
  },{
      productCode:'903896-001',
      imageInfo:'903896-001.png',
      productCateName:'鞋',
      productSeriesName:'儿童',
      productGenderName:'儿童'
  },{
      productCode:'904695-003',
      imageInfo:'904695-003.png',
      productCateName:'鞋',
      productSeriesName:'儿童',
      productGenderName:'儿童'
  },{
      productCode:'904695-005',
      imageInfo:'904695-005.png',
      productCateName:'鞋',
      productSeriesName:'儿童',
      productGenderName:'儿童'
  },{
      productCode:'904695-406',
      imageInfo:'904695-406.png',
      productCateName:'鞋',
      productSeriesName:'儿童',
      productGenderName:'儿童'
  },{
      productCode:'904696-007',
      imageInfo:'904696-007.png',
      productCateName:'鞋',
      productSeriesName:'儿童',
      productGenderName:'儿童'
  },{
      productCode:'904701-004',
      imageInfo:'904701-004.png',
      productCateName:'鞋',
      productSeriesName:'儿童',
      productGenderName:'儿童'
  },{
      productCode:'904701-004',
      imageInfo:'904701-004.png',
      productCateName:'鞋',
      productSeriesName:'儿童',
      productGenderName:'儿童'
  },{
      productCode:'908994-400',
      imageInfo:'908994-400.png',
      productCateName:'鞋',
      productSeriesName:'儿童',
      productGenderName:'儿童'
  },{
      productCode:'908994-600',
      imageInfo:'908994-600.png',
      productCateName:'鞋',
      productSeriesName:'儿童',
      productGenderName:'儿童'
  },{
      productCode:'908996-600',
      imageInfo:'908996-600.png',
      productCateName:'鞋',
      productSeriesName:'儿童',
      productGenderName:'儿童'
  },{
      productCode:'922908-002',
      imageInfo:'922908-002.png',
      productCateName:'鞋',
      productSeriesName:'儿童',
      productGenderName:'儿童'
  },{
      productCode:'AH6799-100',
      imageInfo:'AH6799-100.png',
      productCateName:'鞋',
      productSeriesName:'儿童',
      productGenderName:'儿童'
  },{
      productCode:'AH6799-101',
      imageInfo:'AH6799-101.png',
      productCateName:'鞋',
      productSeriesName:'儿童',
      productGenderName:'儿童'
  }
];

function Image(imageName) {
  var top = 0;
  var left = 0;
  var domImage = "";
  var imgSrc = `./img/${imageName}`;
}

Image.prototype.draw = function() {
  var str = `<img src="${this.imgSrc}" style="width: 150px; height: 75px;left: 0px" class="cdft"/>`;
  $('.right-rec').append(str);
}

function drawImage(imageTmpArr){
    var str='';
    for(var i in imageTmpArr){
        var leftTmp = 20*i;
        str += '<img src=\"./img/'+imageTmpArr[i]+'\" name=\"'+imageTmpArr[i].substring(0,imageTmpArr[i].indexOf(".png"))+'\" id=\"'+imageTmpArr[i].substring(0,imageTmpArr[i].indexOf(".png"))+'\" style=\"width: 150px;height: 75px;left:'+leftTmp+'px\" class=\"cdft\"/>';
    }

    $('.right-rec').append(str);
}

$(function () {
    WINDOW_WIDTH = document.documentElement.clientWidth;
    WINDOW_HEIGHT = document.documentElement.clientHeight;
//    console.log(WINDOW_WIDTH);
//    console.log(WINDOW_HEIGHT);
    $('#table').bootstrapTable({
        toggle:"table",
        pagination:true,
        pageSize: 5,      //每页的记录行数（*）
        sidePagination:"client",
        singleSelect:false,
        clickToSelect:true,
        toolbar:'#toolbar',
        columns: [
            {field: 'id',checkbox:true},
            {field: 'productCode',valign:'center',align:'center',title: '货号',width:99},
            {field: 'ordermeetingCode',valign:'center',align:'center',title: '订货会',hidden:true},
            {field: 'imageInfo',width:70,valign:'left',title: '图片',formatter:function (value,row,index) {if(value==null||value=='') return '-';return "<img width=\'50px\' height=\'40px\' src=\'./img/"+value+"\' >";}},
            {field: 'productCateName',valign:'center',align:'center',title: '大类'},
            {field: 'productSeriesName',valign:'center',align:'center',title: '系列'},
            {field: 'productGenderName',valign:'center',align:'center',title: '性别'}
        ]
    }).bootstrapTable('load',data);;
    $('#form1').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            ordermeetingCode: {
                message: '订货会编号验证失败',
                validators: {
                    notEmpty: {
                        message: '订货会编号不能为空'
                    }
                }
            }
        },
        submitHandler: function (validator, form, submitButton) {
            var ordermeetingCode = $('#ordermeetingCode').val();
            var productCode = $('#productCode').val();
            var productCateCode = $('#productCateCode').val();
            var productSeriesCode = $('#productSeriesCode').val();
            var productGenderCode = $('#productGenderCode').val();
            if(ordermeetingCode==''||ordermeetingCode==null||ordermeetingCode=='undefined'){
                $('#alert1').modal('show');
            }
            // $.ajax({
            //     data:{"ordermeetingCode":ordermeetingCode,"productCode":productCode,"productCateCode":productCateCode,"productSeriesCode":productSeriesCode,
            //         "productGenderCode":productGenderCode},
            //     type:"POST",
            //     url:'http://192.168.11.147:8981/ordermeeting/baseProImgs/data.json',
            //     dataType:"json",
            //     success:function(result){
            //         $('#table').bootstrapTable('load',result);
            //     }
            // })
        }
    });

    $('#btn_move').on("click", onClickBtnMove);
    $('#confirmCut').on("click",onClickBtnConfirmCut);
    $('#blockBefore').on("click",onClickBtnBlockBefore);
    $('#confirmShowBefore').on("click",onClickConfirmShowBefore);
    $('#newBlock').on("click",newBlock);

    var supportTouches = ("createTouch" in document);
    var startEvent = supportTouches?"touchstart":"mousedown";
    var moveEvent = supportTouches?"touchmove":"mousemove";
    var endEvent = supportTouches?"touchend":"";

    $('.right-rec').on(startEvent, 'img', touch);
    $('.right-rec').on(moveEvent, 'img', touch);
    $('.right-rec').on(endEvent, 'img', touch);

    lastSelected = null;//选中的图片
    dPoint = null;//鼠标
    dImage = null;//选中的图片
    isDrag = null;//移动图片动作
    chrPosX = false;
    chrPosY = false;
    ow = null;//图片width
    oh = null;//图片height
    ox = null;//图片left
    oy = null;//图片top
    span = 10;
    state = null;
    function touch(event){
        var event = event||window.event;
        switch (event.type){
            case "touchstart":
                preventDefault(event);
                if(lastSelected!=null){
                    lastSelected.style.border = "hidden";
                }
                event.target.style.border = "solid 1px lightskyblue";
                lastSelected = event.originalEvent.changedTouches[0].target;
                //相对于图片的位置
                dPoint = event.originalEvent.changedTouches[0];
                dImage = event.originalEvent.changedTouches[0].target;
                break;
            case "mousedown":
                state = "mousedown";
                console.log("mousedown");
                preventDefault(event);
                if(lastSelected!=null){
                    lastSelected.style.border = "hidden";
                }
                event.target.style.border = "solid 1px lightskyblue";
                lastSelected = event.target;
                //相对于图片的位置
                dPoint = event;
                dImage = event.target;
                ox=dImage.style.left;
                oy=dImage.style.top;
                oh=dImage.offsetHeight;//获取对象相对于版面或由父坐标 offsetParent 属性指定的父坐标的高度
                ow=dImage.offsetWidth;

                if(dImage.className=='cdft'){
                    isDrag=true;
                }else{
                    isDrag=false;
                }
                document.onmousemove=mouseDownAndMove;
                break;
            case "mousemove":
                if(lastSelected!=null&&isDrag==null){
                    console.log("mousemove");

                    var x=event.offsetX||event.layerX,y=event.offsetY||event.layerY,imgW=lastSelected.offsetWidth,imgH=lastSelected.offsetHeight;
                    if((x<=span&&y<=span)||(x>=imgW-span&&y>=imgH-span))lastSelected.className='cnwr';
                    else if((x<=span&&y>=imgH-span)||(y<=span&&x>=imgW-span))lastSelected.className='cner';
                    else if(x<=span||x>=imgW-span)lastSelected.className='chr';
                    else if(y<=span||y>=imgH-span)lastSelected.className='cvr';
                    else lastSelected.className='cdft';
                }
                break;
            case "touchmove":
                if(dPoint==null){
                    break;
                }
                //不能超出右侧div和下侧div
                if(parseFloat(dImage.style.width)+parseFloat(getPositionRelyBrowser($('#'+dImage.id+'')[0]).left)>=WINDOW_WIDTH+20){
                    break;
                }
                if(parseFloat(dImage.style.height)+parseFloat(getPositionRelyBrowser($('#'+dImage.id+'')[0]).top)>=WINDOW_HEIGHT+20){
                    break;
                }
                var balancex = event.originalEvent.changedTouches[0].clientX-dPoint.clientX;
                var balancey = event.originalEvent.changedTouches[0].clientY-dPoint.clientY;
                var tmpy = 0;
                var tmpx = 0;
                if($('#'+dImage.id+'')[0].style.top==''||typeof($('#'+dImage.id+'')[0].style.top)=="undefined"){
                    tmpy = Number(balancey)+parseFloat(eval($('#'+dImage.id+'')).position().top);
                    tmpx = Number(balancex)+parseFloat(eval($('#'+dImage.id+'')).position().left);
                }else{
                    tmpy = Number(balancey)+parseFloat($('#'+dImage.id+'')[0].style.top);
                    tmpx = Number(balancex)+parseFloat($('#'+dImage.id+'')[0].style.left);
                }
                $('#'+dImage.id+'')[0].style.top = tmpy+"px";
                $('#'+dImage.id+'')[0].style.left = tmpx+"px";
                dPoint = event.originalEvent.changedTouches[0];
                break;
            case "touchend":
                if(deleteTest(event.target)){
                    $('#'+dImage.id+'')[0].remove();
                }
                if($('#'+dImage.id+'').length>0){
                    var rightRecWidth = $('.right-rec')[0].style.width|| $('.right-rec')[0].clientWidth || $('.right-rec')[0].offsetWidth || $('.right-rec')[0].scrollWidth;
                    var rightRecHeight = $('.right-rec')[0].style.height|| $('.right-rec')[0].clientHeight || $('.right-rec')[0].offsetHeight || $('.right-rec')[0].screenTop;
                    if(parseFloat(dImage.style.width)+parseFloat(getPositionRelyBrowser($('#'+dImage.id+'')[0]).left)>=WINDOW_WIDTH+20){
                        dImage.style.left = rightRecWidth-parseFloat(dImage.style.width)+$('.right-rec')[0].offsetLeft+'px';
                    }
                    if(parseFloat(dImage.style.height)+parseFloat(getPositionRelyBrowser($('#'+dImage.id+'')[0]).top)>=WINDOW_HEIGHT+20){
                        dImage.style.top = rightRecHeight-parseFloat(dImage.style.height)+'px';
                    }
                    if(parseFloat(getPositionRelyBrowser($('.right-rec')[0]).left)>parseFloat(getPositionRelyBrowser($('#'+dImage.id+'')[0]).left)){
                        dImage.style.left = 0+'px';
                    }
                    if(parseFloat(getPositionRelyBrowser($('#'+dImage.id+'')[0]).top)<0){
                        dImage.style.top = 0+'px';
                    }
                }
                dPoint = null;
                dImage = null;
                break;
        }
    }
    preventDefault=function(ev){
        if(ev){
            ev.preventDefault();
        }else {
            window.event.returnValue = false;
        }
    }

    $('.right-rec').mouseup(function () {
        state=null;
        console.log("mouseup");
        if(dImage==null){
            return;
        }
        if(deleteTest(dImage)){
            $('#'+dImage.id+'')[0].remove();
        }
        if($('#'+dImage.id+'').length>0){
            var rightRecWidth = $('.right-rec')[0].style.width|| $('.right-rec')[0].clientWidth || $('.right-rec')[0].offsetWidth || $('.right-rec')[0].scrollWidth;
            var rightRecHeight = $('.right-rec')[0].style.height|| $('.right-rec')[0].clientHeight || $('.right-rec')[0].offsetHeight || $('.right-rec')[0].screenTop;
            if(parseFloat(dImage.style.width)+parseFloat(getPositionRelyBrowser($('#'+dImage.id+'')[0]).left)>=WINDOW_WIDTH+20){
                dImage.style.left = rightRecWidth-parseFloat(dImage.style.width)+$('.right-rec')[0].offsetLeft+'px';
            }
            if(parseFloat(dImage.style.height)+parseFloat(getPositionRelyBrowser($('#'+dImage.id+'')[0]).top)>=WINDOW_HEIGHT+20){
                dImage.style.top = rightRecHeight-parseFloat(dImage.style.height)+'px';
            }
            if(parseFloat(getPositionRelyBrowser($('.right-rec')[0]).left)>parseFloat(getPositionRelyBrowser($('#'+dImage.id+'')[0]).left)){
                dImage.style.left = 0+'px';
            }
            if(parseFloat(getPositionRelyBrowser($('#'+dImage.id+'')[0]).top)<0){
                dImage.style.top = 0+'px';
            }
        }

        dImage.className='cdft';
        document.onmousemove=null;
        dPoint = null;
        dImage = null;

        isDrag=null;
    });
});

function mouseDownAndMove(event) {
    if(state==null){
        return;
    }
    console.log("mouseDownAndMove");
    if(dPoint==null){
        return;
    }
    //不能超出右侧div和下侧div
    if(parseFloat(dImage.style.width)+parseFloat(getPositionRelyBrowser($('#'+dImage.id+'')[0]).left)>=WINDOW_WIDTH+20){
        return;
    }
    if(parseFloat(dImage.style.height)+parseFloat(getPositionRelyBrowser($('#'+dImage.id+'')[0]).top)>=WINDOW_HEIGHT+20){
        return;
    }

    var balancex = event.clientX-dPoint.clientX;
    var balancey = event.clientY-dPoint.clientY;
    if(isDrag===true){
        var tmpy = 0;
        var tmpx = 0;
        if($('#'+dImage.id+'')[0].style.top==''||typeof($('#'+dImage.id+'')[0].style.top)=="undefined"){
            tmpy = Number(balancey)+parseFloat(eval($('#'+dImage.id+'')).position().top);
            tmpx = Number(balancex)+parseFloat(eval($('#'+dImage.id+'')).position().left);
        }else{
            tmpy = Number(balancey)+parseFloat($('#'+dImage.id+'')[0].style.top);
            tmpx = Number(balancex)+parseFloat($('#'+dImage.id+'')[0].style.left);
        }
        dImage.style.top = tmpy+"px";
        dImage.style.left = tmpx+"px";
    }else if(isDrag===false){
        var mousx=event.offsetX||event.layerX,mousey=event.offsetY||event.layerY;//相对容器的水平坐标,相对容器的垂直坐标
        chrPosX=mousx<=span;
        chrPosY=mousey<=span;

        var x=balancex,y=balancey;

        switch(dImage.className){
            case 'chr':
                x=chrPosX?-x:x;
                y=oh;
                dImage.style.width=ow+x+'px';
                dImage.style.height=y+'px';

                oh=dImage.offsetHeight;//获取对象相对于版面或由父坐标 offsetParent 属性指定的父坐标的高度
                ow=dImage.offsetWidth;

                if(chrPosX){
                    dImage.style.left=parseFloat(ox)-x+'px';
                    ox=dImage.style.left;
                }
                break;
            case 'cvr':
                y=chrPosY?-y:y;
                x=ow;
                dImage.style.width=x+'px';
                dImage.style.height=oh+y+'px';
                oh=dImage.offsetHeight;//获取对象相对于版面或由父坐标 offsetParent 属性指定的父坐标的高度
                ow=dImage.offsetWidth;

                if(chrPosY){
                    dImage.style.top=parseFloat(oy)-y+'px';
                    oy=dImage.style.top;
                }
                break;
            case 'cnwr':
            case 'cner':
                x=chrPosX?-x:x;
                y=chrPosY?-y:y;
                dImage.style.width=ow+x+'px';
                dImage.style.height=oh+y+'px';
                oh=dImage.offsetHeight;//获取对象相对于版面或由父坐标 offsetParent 属性指定的父坐标的高度
                ow=dImage.offsetWidth;

                if(chrPosX){
                    // console.log(parseFloat(ox)-x+'px');
                    dImage.style.left=parseFloat(ox)-x+'px';
                    ox=dImage.style.left;
                }
                if(chrPosY){
                    // console.log(parseFloat(oy)-y+'px');
                    dImage.style.top=parseFloat(oy)-y+'px';
                    oy=dImage.style.top;
                }
                break;
        }
    }
    chrPosX = false;
    chrPosY = false;
    dPoint = event;
}


function onClickBtnMove() {
    //判断是否有id相同的图片，并剔除
    var allSelections = $('#table').bootstrapTable('getAllSelections');
    var imageTmpArr = [];
    for(var i=0;i<allSelections.length;i++){
        var tmpImgId = (allSelections[i].imageInfo).substring(0,allSelections[i].imageInfo.indexOf(".png"));
        if($(".right-rec img[id="+tmpImgId+"]").length){
            continue;
        }
        imageTmpArr.push(allSelections[i].imageInfo);
    }
    if(imageTmpArr.length>0){
        drawImage(imageTmpArr);
    }
}
function onClickBtnConfirmCut(){
    var ordermeetingCode = $('#ordermeetingCode').val();
    if(ordermeetingCode==null||ordermeetingCode==''){
        return;
    }
    $('#myModal').modal('hide');
    var blockName = $('#blockName').val();
    var blockNameBefore = $('#display_block').val();
    console.log(blockName);
    if($('.right-rec').find('img').length>0&&blockName!=''&&blockName!=null){
        var imgs = [];
        for(var i=0;i<$('.right-rec').find('img').length;i++){
//        	console.log($('.right-rec').find('img')[i]);
            var imageWidth = $('.right-rec').find('img')[i].style.width;
            var imageHeight = $('.right-rec').find('img')[i].style.height;
            var imageLeft = $('.right-rec').find('img')[i].style.left||$('.right-rec').find('img')[i].offsetLeft;
            var imageTop = $('.right-rec').find('img')[i].style.top||$('.right-rec').find('img')[i].offsetTop;
            var imageName = $('.right-rec').find('img')[i].id;
            var imgTmpInfo = {"imageWidth":imageWidth,"imageHeight":imageHeight,
                "posLeft":imageLeft,"posTop":imageTop,"imageName":imageName,
                "blockName":blockName,"ordermeetingCode":ordermeetingCode,
                "blockNameBefore":blockNameBefore
            };
            imgs.push(imgTmpInfo);
//        	imgs.push($('.right-rec').find('img')[i].outerHTML);
        }
        //ajax
        $.ajax({
            type:"POST",
            url:'http://192.168.11.147:8981/ordermeeting/baseProImgs/saveBlockInfos',
            contentType:'application/json; charset=UTF-8',
            data:JSON.stringify(imgs),
            dataType:"text",
            success:function(msg){
//    			console.log(msg);
                $('#mySmallModalLabelSuccess').modal('show');
            }
        })
    }else{
        $('#mySmallModalLabelFail').modal('show');
    }
}
function onClickBtnBlockBefore() {
    var ordermeetingCode = $('#ordermeetingCode').val();
    if(ordermeetingCode==null||ordermeetingCode==''){
        return;
    }
    $('#blockNameBefore').empty();
    $('#blockBeforeModal').modal('show');
    //ajax加载数据库中已有的板块
    $.ajax({
        data:{"ordermeetingCode":ordermeetingCode},
        type:"POST",
        url:'http://192.168.11.147:8981/ordermeeting/baseProImgs/blockBefore.json',
        dataType:"json",
        success:function(result){
            var str = '';
//			console.log(result);
            for(var i=0;i<result.length;i++){
                str+='<label class="btn btn-info">\n' +
                    '<input type="radio" name="optionsRadios" autocomplete="off" id="optionsRadios'+i+'"\n' +
                    'value='+result[i].blockName+'>' +result[i].blockName+
                    '</label>'
            }
            $('#blockNameBefore').append(str);
            if(result[0].blockName!=null&&result[0].blockName!=''){
                $('#blockName').val(result[0].blockName);
            }
        }
    });
}
function newBlock(){
    $('.right-rec').empty();
    $('#display_block').val("");
    $('#blockName').val("");
}
function onClickConfirmShowBefore() {
    var blockName = $('#blockNameBefore input[name="optionsRadios"]:checked').val();
    var ordermeetingCode = $('#ordermeetingCode').val();
    if(ordermeetingCode==null||ordermeetingCode==''){
        return;
    }
    if(blockName==''&&blockName==null){
        return;
    }
    $.ajax({
        data:{"ordermeetingCode":ordermeetingCode,"blockName":blockName},
        type:"POST",
        url:'http://192.168.11.147:8981/ordermeeting/baseProImgs/imgOfBlock.json',
        dataType:"json",
        success:function(result){
            var str = '';
//		    console.log(result);
            for(var i=0;i<result.length;i++){
                var info = result[i];
                str += '<img src=\"/pic/'+info.ordermeetingCode+'/'+info.imageName+'.png\" name=\"'+info.imageName+'\" id=\"'+info.imageName+'\" style="width:'+info.imageWidth+';height: '+info.imageHeight+';left:'+info.posLeft+';top:'+info.posTop+'" class="cdft"/>'
            }
            $('#blockBeforeModal').modal('hide');
            $('.right-rec').empty();
            $('#display_block').val("");
            $('#blockName').val("");
            $('.right-rec').append(str);
            $('#display_block').val(blockName);
            $('#blockName').val(blockName);
        }
    });
}
function deleteTest(img) {
    if(Math.min((parseFloat(img.style.left)+parseFloat(img.style.width)),parseFloat(img.style.width))*Math.min((parseFloat(img.style.top)+parseFloat(img.style.height)),parseFloat(img.style.height))<(parseFloat(img.style.height)*parseFloat(img.style.width)*0.4)){
        return true;
    }
    return false;
}
//获取dom元素相对浏览器的left和top
function getPositionRelyBrowser(obj) {
    var pos = {'top':0,'left':0};
    if(obj.offsetParent){
        while(obj.offsetParent){
            pos.top+=obj.offsetTop;
            pos.left+=obj.offsetLeft;
            obj=obj.offsetParent;
        }
    }else if(obj.x){
        pos.left+=obj.x;
        pos.top+=obj.y;
    }
    return pos;
}
