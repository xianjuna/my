$(function(){
    htmlFontSize();
    createArchives('u22-1','49762')
    createArchives('u22-2','15')
    setTime()
    appRank(appdata)
    pulse(pulsedata,'pulse-box')
    pulse(accessdata,'access-box')
    pulse(networkdata,'netword-box')

    setInterval(setTime(),1000)
    setInterval(()=>{
        roll('pulse-box')
        roll('access-box')
        roll('netword-box')
    },3000)

    let CWH = $(window).height()
    $('#weather').css({
        "height":getH(CWH,167)+'px',
    })
})
//脉冲
function pulse(data,id){
    let el = ''
    for(let i in data){
        el += `
        <li class="flex h-100">
            <ul class="flex-1 flex flex-column border-right-main px2">
                <li class="flex-1">${data[i].list[0].name}</li>
                <li class="flex-1">${data[i].list[1].name}</li>
                <li class="flex-1">${data[i].list[2].name}</li>
                <li class="flex-1">${data[i].list[3].name}</li>
                <li class="flex-1">${data[i].list[4].name}</li>
            </ul>
            <ul class="flex-1 flex flex-column border-right-main px2">
                <li class="flex-1">${data[i].list[0].switch == '0'?'<span class="red">关闭</span>':'开启'}</li>
                <li class="flex-1">${data[i].list[1].switch == '0'?'<span class="red">关闭</span>':'开启'}</li>
                <li class="flex-1">${data[i].list[2].switch == '0'?'<span class="red">关闭</span>':'开启'}</li>
                <li class="flex-1">${data[i].list[3].switch == '0'?'<span class="red">关闭</span>':'开启'}</li>
                <li class="flex-1">${data[i].list[4].switch == '0'?'<span class="red">关闭</span>':'开启'}</li>
            </ul>
            <ul class="flex-1 flex flex-column px2">
                <li class="flex-1">${data[i].list[0].state=='0'?'<span class="red">不在线</span>':'在线'}</li>
                <li class="flex-1">${data[i].list[1].state=='0'?'<span class="red">不在线</span>':'在线'}</li>
                <li class="flex-1">${data[i].list[2].state=='0'?'<span class="red">不在线</span>':'在线'}</li>
                <li class="flex-1">${data[i].list[3].state=='0'?'<span class="red">不在线</span>':'在线'}</li>
                <li class="flex-1">${data[i].list[4].state=='0'?'<span class="red">不在线</span>':'在线'}</li>
            </ul>
        </li>`
    }
    $('#'+id).append(el)
}

//新闻滚动
function roll(id){
    let element = $('#'+id)
    let H = element.height()
    element.stop().animate({top:-H},500,function(){
        $(this).css('top','0')
        $(this).append($(this).children('li').eq(0))
    })  
}
//应用系统资源使用情况排行
function appRank(data){
    let el = ''
    for(let i=0; i<data.length;){
        el += `
        <div class="flex py08">
            <div class="w-10 text-center">${data[i].sort}</div>
            <div class="flex-1 text-center">${data[i].name}</div>
            <div class="w-15 text-center">${data[i].cpu}</div>
            <div class="w-15 text-center">${data[i].storage}</div>
            <div class="w-15 text-center">${data[i].task}</div>
            <div class="w-20 text-center">${data[i].time}</div>
        </div>
        `
        i++
    }
    $('#app-rank-tbody').append(el)
}
//天气设定日期
function setTime(){
    let date = getTime('date')
    let time = getTime('time')
    $('#date').text(date)
    $('#time').text(time)
}
//设定比例高度
function getH(CWH,H,FDH="1080"){
    return (CWH*H)/FDH
}
//窗口发生改变时触发
$(window).resize(function(){
    htmlFontSize();
    location.reload();
})
//rem 配置
function htmlFontSize(){
    let htmlSize = $('body').width()/120;
    $('html').css('fontSize',htmlSize);
}
//档案统计
function createArchives(id,number,quantity=8){
    let arr = [...number], el1 = "", el2 = "", element = "";
    for(let i=0; i<quantity; i++){
        if(arr[i]){
            el1 += '<li>'+arr[i]+'</li>'
        }else{
            el2 += '<li></li>'
        }
    }
    element = el2 + el1
    $('#'+id).empty().append(element)
}
//获取时间
function getTime(type){
    let date = new Date();
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let minute = date.getMinutes();
    let second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    if(type == 'date'){
        return y + '-' + m + '-' + d ;
    }else if(type == 'time'){
        return  h + ':' + minute ;
    }
    //return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}
//echart 配置
const option1 = {
    tooltip: {},
    grid: {
        top:'10%',
        left: '3%',
        right: '4%',
        bottom: '0%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            splitLine:{show: false},
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#fff',
                    fontSize : 14 
                }
            },
            axisLine:{
                show:false,
            },
            axisTick:{
                show:false,
            },
            splitLine:{
                show:false,
            }
        }
    ],
    yAxis: [
        {   
            //splitLine:{show: false},
            type: 'value',
            splitNumber : 2,
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#fff',
                    fontSize : 14 
                }
            },
            axisLine:{
                show:false,
            },
            axisTick:{
                show:false,
            },
            splitLine:{
                lineStyle:{
                    type:'dashed',
                    color:'rgba(255,255,255,.2)'
                }
            }
        }
    ],
    series: [
        {
            type: 'bar',
            barWidth: '50%',
            data: [11, 10, 27, 24, 25, 3, 2]
        }
    ]
};
const option2 = {
    tooltip: {},
    grid: {
        top:'10%',
        left: '5%',
        right: '8%',
        bottom: '8%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        splitLine:{show: false},
        axisLabel: {
        show: true,
        textStyle: {
            color: '#fff',
            fontSize : 14 
        },
    }
    },
    yAxis: {
        type: 'category',
        splitLine:{show: false},
        data: ['3库房B区', '3库房A区', '2库房A区', '1库房B区', '1库房A区'],
        axisLabel: {
            show: true,
            textStyle: {
                color: '#fff',
                fontSize : 14 
            }
        }
    },
    series: [
        {
            type: 'bar',
            barWidth: '50%',
            data: [25, 24, 9, 25, 24],
            label: {
                show: true,
                position: 'right',
                color:'#fff'
            },
        }
    ]
};
const option3 = {
    tooltip: {},
    grid: {
        top:'10%',
        left: '5%',
        right: '15%',
        bottom: '0%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        splitLine:{show: false},
        axisLabel: {
        show: true,
        textStyle: {
                color: '#fff',
                fontSize : 0 
            }
        },
        axisLine:{
            show:false,
        },
        axisTick:{
            show:false,
        },
        splitLine:{
            show:false,
        }
    },
    yAxis: {
        type: 'category',
        splitLine:{show: false},
        data: ['已归档档案', '在架档案', '未归还档案', '已借出档案'],
        axisLabel: {
            show: true,
            textStyle: {
                color: '#fff',
                fontSize : 14 
            }
        },
        axisLine:{
            show:false,
        },
        axisTick:{
            show:false,
        },
        splitLine:{
            show:false,
        }
       
    },
    series: [
        {
            type: 'bar',
            barWidth: '50%',
            data: [592, 49762, 56, 102],
            label: {
                show: true,
                position: 'right',
                textBorderColor:'none',
                color:'#fff'
            },
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
            }
        }
    ]
};
const option4 = {
    tooltip: {},
    title: {
        text: '一号库房',
        x:'center',
        y: 'bottom',
        textStyle: {           
            color: '#fff',
            fontWeight:'400',
            fontSize:'14'
        },
    },
    series: [
      {
        name: '一号库房',
        type: 'pie',
        center: ["55%", "40%"],
        radius: ['70%', '55%'],
        avoidLabelOverlap: false,
        hoverAnimation: false,
        label: {
          show: false,
          normal: {
            position: 'center',
            fontSize:'15',
            color:"#fff" 
            },
            
        },
        data: [
            {
                value: 330, 
                name: '15%', 

            },
            {
                value: 330, 
                name: '', 

            },
        ]
    
      }
    ]
};
const option5 = {
    tooltip: {},
    title: {
        text: '一号库房',
        x:'center',
        y: 'bottom',
        textStyle: {           
            color: '#fff',
            fontWeight:'400',
            fontSize:'14'
        },
    },
    series: [
      {
        name: '一号库房',
        type: 'pie',
        center: ["55%", "40%"],
        radius: ['70%', '55%'],
        avoidLabelOverlap: false,
        hoverAnimation: false,
        label: {
          show: false,
          normal: {
            position: 'center',
            fontSize:'15',
            color:"#fff" 
            },
        },
        data: [
            {
                value: 330, 
                name: '15%', 
            },
            {
                value: 330, 
                name: '', 
            },
        ]
      }
    ]
};
const option6 = {
    grid: {
        top:'10%',
        left: '5%',
        right: '15%',
        bottom: '0%',
        containLabel: true
    },
    animation: true, 
    title: {
      text: '流动人员统计',
      textStyle: {           
        color: '#fff',
        fontWeight:'400',
        fontSize:'16'
    },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#203E84',
          fontSize:'16'
        }
      }
    },
    toolbox: {
      feature: {
        saveAsImage: {
            backgroundColor:'#1D3F87'
        }
      },
      iconStyle:{
        normal:{
            //color:'#fff',
        }
    }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '0%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisLabel: {
            show: true,
            textStyle: {
                color: '#fff',
                fontSize : 16 
            }
        },
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
            show: true,
            textStyle: {
                color: '#fff',
                fontSize : 14 
            }
        },
      }
    ],
    series: [
      {
        name: '人员',
        type: 'line',
        smooth:false,
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ]
};
//应用系统资源
const appdata = [
    {sort:1,name:'数字档案馆管理系统',cpu:1,storage:800,task:35,time:100},
    {sort:2,name:'数字档案馆管理系统',cpu:1,storage:800,task:35,time:100},
    {sort:3,name:'数字档案馆管理系统',cpu:1,storage:800,task:35,time:100},
    {sort:4,name:'数字档案馆管理系统',cpu:1,storage:800,task:35,time:100},
    {sort:5,name:'数字档案馆管理系统',cpu:1,storage:800,task:35,time:100},
    {sort:6,name:'数字档案馆管理系统',cpu:1,storage:800,task:35,time:100},
    {sort:7,name:'数字档案馆管理系统',cpu:1,storage:800,task:35,time:100},
    {sort:8,name:'数字档案馆管理系统',cpu:1,storage:800,task:35,time:100},
    {sort:9,name:'数字档案馆管理系统',cpu:1,storage:800,task:35,time:100},
]
//脉冲数据
const pulsedata = [
    {
        id:1,
        list:[
            {name:'1号库房A区',switch:0,state:0},
            {name:'1号库房B区',switch:1,state:1},
            {name:'2号库房A区',switch:1,state:1},
            {name:'3号库房A区',switch:1,state:1},
            {name:'3号库房B区',switch:1,state:1},
        ]
    },
    {
        id:2,
        list:[
            {name:'1号库房A区',switch:0,state:0},
            {name:'1号库房B区',switch:1,state:1},
            {name:'2号库房A区',switch:1,state:1},
            {name:'3号库房A区',switch:1,state:1},
            {name:'3号库房B区',switch:1,state:1},
        ]
    },
]
//门禁状态
const accessdata = [
    {
        id:1,
        list:[
            {name:'1号库房A区',switch:0,state:0},
            {name:'1号库房B区',switch:1,state:1},
            {name:'2号库房A区',switch:1,state:1},
            {name:'3号库房A区',switch:1,state:1},
            {name:'3号库房B区',switch:1,state:1},
        ]
    },
    {
        id:2,
        list:[
            {name:'1号库房A区',switch:0,state:0},
            {name:'1号库房B区',switch:1,state:1},
            {name:'2号库房A区',switch:1,state:1},
            {name:'3号库房A区',switch:1,state:1},
            {name:'3号库房B区',switch:1,state:1},
        ]
    },
]
//网络服务情况
const networkdata = [
    {
        id:1,
        list:[
            {name:'1号库房A区',switch:0,state:0},
            {name:'1号库房B区',switch:1,state:1},
            {name:'2号库房A区',switch:1,state:1},
            {name:'3号库房A区',switch:1,state:1},
            {name:'3号库房B区',switch:1,state:1},
        ]
    },
    {
        id:2,
        list:[
            {name:'1号库房A区',switch:0,state:0},
            {name:'1号库房B区',switch:1,state:1},
            {name:'2号库房A区',switch:1,state:1},
            {name:'3号库房A区',switch:1,state:1},
            {name:'3号库房B区',switch:1,state:1},
        ]
    },
]