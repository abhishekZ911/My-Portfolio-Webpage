const TypeWriter = function(txtElement, words, wait = 3000){
  this.txtElement = txtElement;
  this.words = words;
  this.wait = parseInt(wait,10);
  this.txt ='';
  this.wordIndex =0;
  this.type();
  this.isDeleting = false;
}

//type method
TypeWriter.prototype.type = function() {
//Current index of word
const current = this.wordIndex % this.words.length;

//Get full text of current words
const fullTxt = this.words[current];
console.log(fullTxt);

//check if isDeleting
if(this.isDeleting){
  //add a char
  this.txt = fullTxt.substring(0, this.txt.length-1);
}
else{
  //remove a char
  this.txt = fullTxt.substring(0, this.txt.length+1);
}

//insert txt into element
this.txtElement.innerHTML =`<span class="txt">${this.txt}</span>`;

//initial type speed
let typeSpeed = 150;

if(this.isDeleting)
{
  typeSpeed /= 3;
}

//If word is complete
if(!this.isDeleting && this.txt === fullTxt)
{
  typeSpeed =this.wait;
  //Set isDeleting to true i.e yes it should delete now
  this.isDeleting = true;
}
else if(this.isDeleting && this.txt ==='')
{
typeSpeed = 500;
//toggle the isDeleting to false
this.isDeleting = false;
//incrementing the wordIndex
this.wordIndex ++;
}

  setTimeout(() => this.type(), typeSpeed);
}



//initialise the values and object
document.addEventListener('DOMContentLoaded', init);

//init function
function init()
{
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  //initialise TypeWriter()
  new TypeWriter(txtElement,words,wait);

}
