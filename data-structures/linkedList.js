if(typeof DataStructure == "undefined"){
  var DataStructure = {};
}

var LinkedListNode = function(options){
  this.val = options.val;
  this.next = options.next;
};

LinkedListNode.prototype.toString = function(){
  return "{ value: " + this.val + "; next: " + (this.next? "[node]": "NULL") + "}";
}

var LinkedList = function(options){
  this.length = 0;

  this.head = options.head;
  if(this.head){
    this.length += 1;

    // Find last
    var node = this.head;
    while(node.next){
      this.length += 1;
      node = node.next;
    }
    this.last = node;
  }
}

LinkedList.prototype.reverse = function(){
  if(!this.head || !this.head.next){
    return this;
  }

  var current = this.head;
  var pre = null;
  var post = null;

  while(current){
    post = current.next;
    current.next = pre;
    pre = current;
    current = post;
  }

  this.head = pre;
  return this;
}

LinkedList.prototype.append = function(newNode){
  if(!newNode){ throw "New node cannot be NULL"; }
  this.last.next = newNode;
  this.last = newNode;
  this.length += 1;
}

LinkedList.prototype.subLinkedList = function(idx){
  var subHead = this.head;
  while(idx > 0){
    subHead = subHead.next;
    if(!subHead){ throw "Index exceeds total length."; }
    idx -= 1;
  }

  return new LinkedList({ head: subHead });
}

LinkedList.prototype.sharePrefix = function(otherLinkedList){
  var pointer1 = this.head;
  var pointer2 = otherLinkedList.head;

  while(pointer1 && pointer2){
    if(pointer1.val != pointer2.val){
      return false;
    }
    pointer1 = pointer1.next;
    pointer2 = pointer2.next;
  }

  return true;
}

LinkedList.prototype.isPalindrome = function(){
  return this.sharePrefix(this.subLinkedList(this.length/2).reverse());
}

LinkedList.prototype.print = function(){
  var node = this.head;
  var result = "";

  while(node){
    result += node.toString();
    node = node.next;
    if(node){ result += " => "; }
  }

  console.log(result);

  return 0;
}

DataStructure.LinkedListNode = LinkedListNode;
DataStructure.LinkedList = LinkedList;

module.exports = DataStructure;
