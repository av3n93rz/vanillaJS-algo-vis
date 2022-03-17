document.getElementById('addupto').addEventListener('click', ()=>{
  const value = Number(document.querySelector('.inputField').value)
  const result = value * (value + 1) / 2
  document.querySelector('.result').innerHTML = result
})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function charCount(str){
  let obj = {}
  for (let char of str.toLowerCase()){
    if(/[a-zöüóőúéáűí0-9]/.test(char)){
      obj[char] = ++obj[char] || 1
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function validAnagram(str1, str2){
  if(str1.length !== str2.length){
      return false
  }
  let strO1={};
  let strO2={};
  for(let char of str1){
      strO1[char] = (strO1[char] || 0)+1
  }
  for(let char of str2){
      strO2[char] = (strO2[char] || 0)+1
  }
  for(let key in strO1){
     if(strO1[key] !== strO2[key]){
         return false
     }
  }
  console.log(strO1, strO2)
  return true
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function countUniqueValues(arr){
  let frst = 0
  let scnd = 1
  while (scnd <= arr.length){
      if(arr[frst] == arr[scnd]){
          scnd +=1
      } else {
          frst += 1
          arr[frst] = arr[scnd]
          scnd += 1
      }
  }
  return frst
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function sameFrequency(num1, num2){
  num1 = num1.toString()
  num2 = num2.toString()
  if(num1.length !== num2.length){
    return false
  }
  let freq1 = {}
  let freq2 = {}
  function freqCount(num, freq){
    for(let char of num){
      freq[char] = (freq[char] || 0) + 1
    }
  }
  freqCount(num1, freq1)
  freqCount(num2, freq2)
  for(let key in freq1){
    if(freq1[key] !== freq2[key]){
      return false
    }
  }
  return true
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function areThereDuplicates() {
  let left = 0
  let right = arguments.length - 1
  let obj = {}
  while(left <= right){
    if(left == right){
      if(obj[arguments[left]]){
        return true
      }
      else{
        obj[arguments[left]] = 1
      }
    } else {
      if((arguments[left] === arguments[right]) || (obj[arguments[left]] || obj[arguments[right]])){
        return true
      } else{
        obj[arguments[left]] = 1
        obj[arguments[right]] = 1
      }
    }
    left++
    right--
  }
  return false
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function power(base, exp){
  if(exp === 0) return 1
  if(exp === 1) return base
  return base * power(base, exp-1)
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function factorial(num){
   if(num === 0) return 1
   return num * factorial(num-1)
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function productOfArray(arr){
  if(arr.length === 0) return 1
  return arr[0] * productOfArray(arr.slice(1))
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function recursiveRange(num){
  if(num === 1) return 1
  return num + recursiveRange(num-1)
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function fib(num){
  if(num <= 2) return 1
  return  fib(num-1) + fib(num-2)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function reverse(str){
  if(str.length === 0) return ''
  return str[str.length-1].concat('', reverse(str.slice(0,-1)))
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function isPalindrome(str){   
  let left = 0
  let right = str.length-1
  function helper(){
    if(left<=right){
      if(str[left] === str[right]){
        left++
        right--
        helper()
      } else {
        return false
      }
    }
    return true
  }
  return helper()
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function someRecursive(arr, func){
  if(arr.length === 0) return false
  if(!func(arr[0])){
    return someRecursive(arr.slice(1), func)
  } else {
    return true
  }
}
const isOdd = val => val % 2 !== 0;
//console.log(someRecursive([2,4,6], isOdd))
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function flatten(oldArr){
  let newArr =[]
  for(let i =0; i< oldArr.length; i++){
    if(Array.isArray(oldArr[i])){
      newArr = newArr.concat(flatten(oldArr[i]))
    }else{
      newArr.push(oldArr[i])
    }
  }
  return newArr
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function capitalizeFirst (arr) {
  if(arr.length === 0) return []
  return new Array(arr[0][0].toUpperCase().concat(arr[0].slice(1))).concat(capitalizeFirst(arr.slice(1)))
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function capitalizeWords(arr){
  if(arr.length === 0) return []
  return new Array(arr[0].toUpperCase()).concat(capitalizeWords(arr.slice(1)))
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function stringifyNumbers(obj){
  let newObj ={}
  function helper(){
    Object.keys(obj).map((i)=>{
      if(obj[i].toString() === '[object Object]'){
        newObj[i] = stringifyNumbers(obj[i])
      } else if(typeof obj[i] === 'number'){
        newObj[i] = obj[i].toString()
      } else{
        newObj[i] = obj[i]
      }
    })
  }
  helper()
  return newObj
}

let obj12 = {
  num: 1,
  test: [],
  data: {
      val: 4,
      info: {
          isRight: true,
          random: 66
      }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function collectStrings(obj){
  let arr =[]
  function helper(o){
    Object.keys(o).map((i)=>{
      if(typeof o[i] === 'string'){
        arr.push(o[i])
      }
      if(o[i].toString() === '[object Object]'){
        helper(o[i])
      }
    })
  }
  helper(obj)
  return arr
}

const obj = {
  stuff: "foo",
  data: {
      val: {
          thing: {
              info: "bar",
              moreInfo: {
                  evenMoreInfo: {
                      weMadeIt: "baz"
                  }
              }
          }
      }
  }
}

//console.log(collectStrings(obj)) // ["foo", "bar", "baz"])
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function linearSearch(arr, element){
  let i = 0;
  let res
  function helper(){
    if(arr[i] === element){
      res = i
    } else if(i === arr.length){
      res = -1
    } else {
      i++
      helper()
    }
  }
  helper()
  return res
}

//console.log(linearSearch(['asd','basds','aas','ass'], 'asasf'))

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const binarySearch = (arr, val) =>{
  let left = 0
  let right = arr.length-1
  let mid = Math.floor((right+left)/2)
  while(arr[mid] !== val && left <= right){
    if(val < arr[mid]) right = mid-1
    else left = mid + 1
    mid = Math.floor((right+left)/2)
  }
  return arr[mid] === val ? mid:-1
}

//console.log(binarySearch([1,2,3,4,5], 3))

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const searchNaiveString = (lstr, sstr)=>{
  let count = 0
  for(let i = 0; i<lstr.length; i++){
    for(let j = 0; j<sstr.length; j++){
      if(sstr[j] !== lstr[i+j])break
      if(j === sstr.length-1)count++
    }
  }
  return count
}

//console.log(searchNaiveString('asdahawivdsjahajdskjfahacsid', 'aha'))

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const kmpSearch = (str, ptrn) =>{

}

//console.log(kmpSearch('asdahawivdsjahajdskjfahacsid', 'aha'))

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const bubbleSort = (arr) =>{   
  const swap = (ndx)=>{
    [arr[ndx], arr[ndx+1]] = [arr[ndx+1], arr[ndx]]
  }
  let noswaps = false
  for(let i = arr.length-1; i > 0; i--){
    console.log(arr)
    noswaps = true
    for(let j = 0; j<i; j++){
      if(arr[j] > arr[j+1]){
        swap(j)
        noswaps = false
      }
    }
    if(noswaps) break
  }
  return arr
}

//console.log(bubbleSort([4,2,8,1,5,3,6,7,9]))

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const selectionSort = (arr) =>{
const swap = (ndx, min)=>{
  [arr[ndx], arr[min]]=[arr[min], arr[ndx]]
}
for(let j = 0; j < arr.length; j++){
  let min = j
  for(let i = j+1; i<arr.length; i++){
    if(arr[i] < arr[min]){
      min = i
    }
  }
  if(min !== j){
    swap(j, min)
  }
}
return arr
}

//console.log(selectionSort([4,2,8,1,5,3,6,7,9]))

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const insertionSort = (arr) => {
  for(let i = 1; i< arr.length; i++){
    for(let j =0; j<i; j++){
      if(arr[i]<arr[j]){
        arr.splice(j,0,arr.splice(i, 1)[0])
        break
      }
    }
  }
  return arr
}

//console.log(insertionSort([4,2,8,1,5,3,6,7,9]))

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mergeSort = (arr) =>{
  const mergeArr = (a, b) =>{
    let c = []
    let i = 0
    let j = 0
    while(i<a.length && j < b.length){
      if(a[i] <= b[j]){
        c.push(a[i])
        i++
      } else {
        c.push(b[j])
        j++
      }
    }
    while( i < a.length){
      c.push(a[i])
      i++
    }
    while( j < b.length){
      c.push(b[j])
      j++
    }
    return c
  }
  
  const splitArr = (arr) =>{
    if(arr.length <= 1) return arr
    let mid = Math.floor(arr.length/2)
    let left = splitArr(arr.slice(0, mid))
    let right = splitArr(arr.slice(mid))
    return mergeArr(left, right)
  }

  return splitArr(arr)
}

//console.log(mergeSort([-1,34,423,21,1,2,4,8,9,3,5,6,7]))

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const quickSort = (arr, left = 0, right = arr.length-1) =>{
  const pivot = (a, s, e) =>{
    let index = s
    for(let i = s +1; i< a.length; i++){
      if(a[s]> a[i]){
        index++
        [a[i],a[index]]=[a[index],a[i]]
      }
    }
    [a[s],a[index]]=[a[index],a[s]]
    return index
  }
  if(left < right){
    let pivotIndex = pivot(arr, left, right)
    quickSort(arr, left, pivotIndex-1)
    quickSort(arr, pivotIndex+1, right)
  }
  return arr
}

//console.log(quickSort([6,34,423,21,1,2,4,8,9,3,5,6,7]))

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function removeZeros(arr) {
  let i =arr.length-1
  let swaps=0
  while(i>=0){
    if(arr[i] === 0 || arr[i] === '0'){
      for(let j = 0; j < arr.length-1-swaps-i; j++){
        [arr[i+j], arr[i+1+j]] = [arr[i+j+1], arr[i+j]]
      }
      swaps++
    }
    i--
  }
  return arr;
}

//console.log(removeZeros([7, 2, 3, 0, 4, 6, 0, 0, 13, 0, 78, 0, 0, 19, 14]))

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const addBig = (a,b) =>{
  let t = 0
  let k =''
  for(let i = 0; i < Math.max(a.length, b.length); i++){
    const addNum = (l=0, j=0)=>{
      let x = (Number(l)+Number(j)+t).toString()
      if(x.length > 1){
        t = Number(x[0])
        return x[1]
      } else {
        t = 0
        return x
      }
    }
    k = addNum(a[a.length-1-i], b[b.length-1-i]).concat(k)
  }
  if(t > 0) k = t.toString().concat(k)
  return k
}

//console.log(addBig('1129', '234'))
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
https://www.codewars.com/kata/52cf02cd825aef67070008fa/train/javascript

console.log (device.encode('')) ;
device.decode = function (w) {
  let key = 'abdhpF,82QsLirJejtNmzZKgnB3SwTyXG ?.6YIcflxVC5WE94UA1OoD70MkvRuPqH'
  let t = ''
  for(let i = 0; i< w.length; i++){
    if('!@#$%^&*()_+-'.indexOf(w[i]) > -1){
      t = t.concat(w[i])
    } else {
      let shift = key.indexOf(w[i])-(i)-1
      while(shift <0){
        shift = 66-(shift*-1)
      }
      t = t.concat(key[shift])
    }
  }
  return t ; 
}
*/

//for(i=0; i<100;)console.log((++i%3?'':'Fizz')+(i%5?'':'Buzz')|| i)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const radixSort = (arr) =>{

  const getDigit = (num, i) =>{
    return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
  }

  const digitCount = (num) =>{
    if(num === 0) return 1;
    return Math.floor(Math.log10(Math.abs(num))) + 1;
  }

  const mostDigits = () =>{
    let maxLength = 0 
    for(let i = 0; i< arr.length; i++){
      maxLength = Math.max(maxLength, digitCount(arr[i]))
    }
    return maxLength
  }
  
  for(let i = 0; i<mostDigits(); i++){
    let bucket = Array.from({length: 10}, ()=>[])
    for(let t = 0; t< arr.length; t++){
      bucket[getDigit(arr[t], i)].push(arr[t])
    }
    arr = [].concat(...bucket)
  }
  return arr
}

//console.log(radixSort([12,322,343,4,5545,654,6,47,898,9]))

///////////////////////////////////////////////////////////////////////////////////////////////////////
function dblLinear(n) {
  const a = [1]
  let k = 0
  z = Math.ceil(n/3)*2
  for(let q = 0; q <= z; q++){
    p = a[q]*2+1
    f = a[q]*3+1
    for(let b = 0; b<a.length; b++){
      if(a[b+1]>p || a[b+1] === undefined){
        a.splice(b+1, 0, p);
        break
      }
    }
    for(let b = 0; b<a.length; b++){
      if(a[b+1]>f || a[b+1] === undefined){
        a.splice(b+1, 0, f);
        break
      }
    }
    console.log(`a`, a)
  }
  return a[n-1]
}

//https://www.codewars.com/kata/5672682212c8ecf83e000050/train/javascript
dblLinear(20)