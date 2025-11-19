const validationString = function(str, numb){
  if(str.length <+ numb){
    return true;
  }else{
    return false;
  }
};

validationString('Hello', 5);

const palindrome = function(str){
  const myStr = str.replaceAll(' ', '').toLowerCase();
  let reverse = '';
  for(let i = myStr.length - 1; i >= 0; i--){
    reverse += myStr[i];
  }
  if(myStr === reverse){
    return true;
  }else{
    return false;
  }
};

palindrome('Лёша на полке клопа нашёл ');

const countNumberInString = function(str){
  let resNumb = '';
  const numbToStr = str.toString();
  for(let i = 0; i < numbToStr.length; i++){

    if(Number.isNaN(parseInt(numbToStr[i], 10)) === false){
      resNumb += numbToStr[i];
    }
  }
  return resNumb;
};

countNumberInString('1 кефир, 0.5 батона');
