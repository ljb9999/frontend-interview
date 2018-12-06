/**
 * 身份证15位编码规则：dddddd yymmdd xx p
 * dddddd：地区码
 * yymmdd: 出生年月日
 * xx: 顺序类编码，无法确定
 * p: 性别，奇数为男，偶数为女
 * <p />
 * 身份证18位编码规则：dddddd yyyymmdd xxx y
 * dddddd：地区码
 * yyyymmdd: 出生年月日
 * xxx:顺序类编码，无法确定，奇数为男，偶数为女
 * y: 校验码，该位数值可通过前17位计算获得
 * <p />
 * 18位号码加权因子为(从右到左) Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2,1 ]
 * 验证位 Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ]
 * 校验位计算公式：Y_P = mod( ∑(Ai×Wi),11 )
 * i为身份证号码从右往左数的 2...18 位 Y_P为脚丫校验码所在校验码数组位置
 *
 */

var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]// 加权因子
var ValideCode = ['1', '0', '10', '9', '8', '7', '6', '5', '4', '3', '2']// 身份证验证位值.10代表X
function IdCardValidate (idCard) {
  idCard = trim(idCard.replace(/ /g, ''))
  if (idCard.length === 15) {
    return isValidityBrithBy15IdCard(idCard)
  } else if (idCard.length === 18) {
    var aIdCard = idCard.split('')// 得到身份证数组
    if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(aIdCard)) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

/**
 * 判断身份证号码为18位时最后的验证位是否正确
 * @param aIdCard 身份证号码数组
 * @return
 */
function isTrueValidateCodeBy18IdCard (aIdCard) {
  var sum = 0 // 声明加权求和变量
  if (aIdCard[17].toLowerCase() === 'x') {
    aIdCard[17] = '10'// 将最后位为x的验证码替换为10方便后续操作
  }
  for (var i = 0; i < 17; i++) {
    sum += Wi[i] * aIdCard[i]// 加权求和
  }
  var valCodePosition = sum % 11// 得到验证码所位置
  if (aIdCard[17] === ValideCode[valCodePosition]) {
    return true
  } else {
    return false
  }
}

/**
 * 通过身份证判断是男是女
 * @param idCard 15/18位身份证号码
 * @return 'female'-女、'male'-男
 */
// function maleOrFemalByIdCard (idCard) {
//   idCard = trim(idCard.replace(/ /g, ''))// 对身份证号码做处理。包括字符间有空格。
//   if (idCard.length === 15) {
//     if (idCard.substring(14, 15) % 2 === 0) {
//       return '1'
//     } else {
//       return '2'
//     }
//   } else if (idCard.length === 18) {
//     if (idCard.substring(14, 17) % 2 === 0) {
//       return '1'
//     } else {
//       return '2'
//     }
//   } else {
//     return '3'
//   }
// }

/**
 * 验证18位数身份证号码中的生日是否是有效生日
 * @param idCard 18位书身份证字符串
 * @return
 */
function isValidityBrithBy18IdCard (idCard18) {
  var year = idCard18.substring(6, 10)
  var month = idCard18.substring(10, 12)
  var day = idCard18.substring(12, 14)
  var tempDate = new Date(year, parseFloat(month) - 1, parseFloat(day))
// 这里用getFullYear()获取年份，避免千年虫问题
  if (tempDate.getFullYear() !== parseFloat(year) || tempDate.getMonth() !== parseFloat(month) - 1 || tempDate.getDate() !== parseFloat(day)) {
    return false
  } else {
    return true
  }
}

/**
 * 验证15位数身份证号码中的生日是否是有效生日
 * @param idCard15 15位书身份证字符串
 * @return
 */
function isValidityBrithBy15IdCard (idCard15) {
  var year = idCard15.substring(6, 8)
  var month = idCard15.substring(8, 10)
  var day = idCard15.substring(10, 12)
  var tempDate = new Date(year, parseFloat(month) - 1, parseFloat(day))
// 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
  if (tempDate.getYear() !== parseFloat(year) || tempDate.getMonth() !== parseFloat(month) - 1 || tempDate.getDate() !== parseFloat(day)) {
    return false
  } else {
    return true
  }
}

// 去掉字符串头尾空格
function trim (str) {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

const verify = {
  // isWechat: function () {
  //   return (ua.match(/MicroMessenger/i) === 'micromessenger')
  // },
  isPhone: function (target) {
    var telReg = /^1\d{10}$/.test(target)
    return telReg
  },
  isHuixiangcard: function (target) {
    var telReg = !!target.match(/^[a-zA-Z]\d{9,10}$/)
    return telReg
  },
  isTaibaocard: function (target) {
    var telReg = !!target.match(/^\d{8}$/)
    return telReg
  },
  isEmail: function (target) {
    var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/
    return reg.test(target)
  },
  isIdcard: function (target) {
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    return reg.test(target) && IdCardValidate(target)
  },
  isChineseChar: function (str) {
    var reg = /^[\u2E80-\u9FFF]+$/
    return reg.test(str)
  },
  isEnglishChar: function (str) {
    var reg = /^[a-z\s]*$/i
    return reg.test(str)
  },
  isNumber: function (target) {
    return /^-?\d+$/.test(target)
  },
  isW: function (target) {
    return /^\w*$/i.test(target)
  },
  // 临时添加
  isUsername: function(target){
    var telReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,12}$/.test(target)
    console.log(telReg);
    return telReg
  },
  isPassword: function(target){
    var telReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(target)
    return telReg
  }

}

export default verify
