const MailConfigList = [    
{
    group : 'admin-all',
     list : [
       { name  : 'VV', mail  : 'oxffffgt@gmail.com' },
        { mail : 'olga=oxfffflg@gmail.com', name : 'Оля'}
        ]
},
{
     group : 'admin-vv',
       list: [
        { name  : 'VV',  mail  : 'oxffffgt@gmail.com' }
       ]
},
{
    group : 'personal',
      list: [
          {mail:'samsung217642@gmail.com', name: 'Потапенко Оля'},
           {mail:'bosachanna@gmail.com',    name: 'Босач Аня'},
           {mail:'verachirik1979@gmail.com', name: 'Чирик Вера'},
           {name:  'SilentBase', mail :'oxffffsb@gmail.com'}
        ]
},
{
    group : 'SilentBase',
      list: [
          {name:  'SilentBase', mail :'oxffffsb@gmail.com'}
        ]
},
{
    group : 'Гала',
      list: [
             { mail : 'bod9ih89@gmail.com',  name: 'Бачинский Богдан'},
             { mail:  'oxffffsb@gmail.com' , name : 'SilentBase'      }
            ]
},
{
    group : 'Обоий',
      list: [
                
                 {name : 'Lipoveckaya', mail : 'lipovetskayan@ukr.net'},
                 {name : 'gricayanna' , mail :  'gricayanya@ukr.net'},
                 {name:  'SilentBase', mail :'oxffffsb@gmail.com'}
                
      ]
},
{
    group : 'ПП Чижевська',
      list: [      
       { name:  'Golgorovaya',  mail : 'olgorovaya969@gmail.com'},
             {name : 'Petrik' , mail : 'petrika058@gmail.com'},       
        {name : 'IgorYakubec' , mail : 'yakubec@meta.ua'},
        {name:  'SilentBase', mail :'oxffffsb@gmail.com'}           
      ]
},
{
    group : 'МЕГА-СЕРВИС',
      list: [
       { name : 'artem'  , mail  : 'temaobr401@gmail.com'},
        {name : 'sasha'  ,    mail  : 'kostenko765@gmail.com'},
        {name : 'valera'  ,   mail  : 'valera_81@ukr.net'},
        {name : 'Sergey'  ,   mail  : 's.v.buev@gmail.com'},
        {name : 'Tatiana' ,   mail  : 'free13.01@meta.ua'},
        {name : 'Roma'   ,    mail  : 'romanaleksandrovich5@gmail.com'},
        {name:  'SilentBase', mail :'oxffffsb@gmail.com'}       
      ]
},
{
    group : 'Мега-Серж',
      list: [
        {name : 'Sergey' , mail : 's.v.buev@gmail.com'},
        {name:  'SilentBase', mail :'oxffffsb@gmail.com'}
      ]
},
{
    group : 'Прайм-трейдм',
      list: [
        {name : 'Leonid' , mail     : 'usercomfy220424@gmail.com'},
        {name:  'SilentBase', mail :'oxffffsb@gmail.com'}
      ]
},
{
    group : 'Стадник',
      list: [
        {name : 'Dragan' , mail : 'nikolay.dragan123@gmail.com'},
        {name : 'Mariyko' , mail : 'yulia.mariiko@gmail.com'},
       { name : 'Tnya'  , mail : 'tanusha.viki@ukr.net'},                
            ]
},
{
    group : 'Капри-бета',
      list: [                
        {name :  'Kterina', mail  : 'ktlevhenko@gmail.com'},
        {name :  'Geras' , mail : 'gersyulia@gmail.com'},
        {name:  'SilentBase', mail :'oxffffsb@gmail.com'}            
            ]
},
{
    group : 'Зефир',
      list: [        
        {name :  'Valentina' , mail : 'valechka.yakushina@ukr.net'},
        {name:  'SilentBase', mail : 'oxffffsb@gmail.com'}        
            ]
},
{
    group : 'Ваня',
      list: [        
        {name : 'Ivan', mail  : 'videx-7km@ukr.net'},
        {name:  'SilentBase', mail :'oxffffsb@gmail.com'}        
      ]
}
]

function getRecipByGroupName (groupName) {
  var arr = []
    MailConfigList.forEach(el =>{ 
      if (el.group==groupName){
            el.list.forEach(itm=>{
              arr.push(itm.mail);
            })                         
        }
    })
    return arr;
}

function getMailList(){
  var arr = []
    MailConfigList.forEach(el =>{             
              arr.push(`<option>${el.group}</option>`);      
    })
    return arr.join('\n');
}

//module.exports.MailConfigList = MailConfigList
module.exports.getRecipByGroupName = getRecipByGroupName
module.exports.getMailList = getMailList