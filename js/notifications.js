//This file is a template to use Local Notifications, as defined by the W3C to the fullest of its ability. It is wrapped inside of a function (notify(heading, message, uniqueTag)), so it can be called later
function notify(title, body, tag){
  //First, we have to make sure that the title is a string
  if(typeof title != "string"){
    //If it's not, we try to convert it to a string and continue
    try{
      title.toString();
    }
    //If that can't be done, we log the instance to the console and stop executing
    catch(e){
      console.log("The notification title wasn't given, or was not a string or value that could be converted to a string");
    return;
    }
  }
  //We also have to make sure that body is a string
  if(typeof body != "string"){
    //If it's not, we try to convert it to a string
    try{
      body.toString();
    }
    //If that can't be done, we log the instance to the console and stop executing
    catch(e){
      console.log("The notification title body wasn't given, or was not a string or value that could be converted to a string");
    return;
    }
  }
  //Finally, we make sure that the tag is a string
  if(typeof tag != "string"){
    //If it's not, we try to convert it to one
    try{
      tag.toString();
    }
    //If that can't be done, we generate a random number between 0 and 999,999,999,999 and convert that to a string, and assign it to tag (so the parameter can be optional). This method probably won't produce identical tags, ever, so it probably won't stop duplicate notifications, but we return the tag later, in the hopes that the programmer might use it for their own duplicates prevention. Finally, we log this instance to the console
    catch(e){
      tag = Math.round(Math.random()*999999999999).toString();
      console.log("No unique tag given, or was not a data type compatibe for assignment");
    }
  }
  //Now the magic can actually begin.. First, we check if the host actually supports notifications
  if(window.Notification){
    //Now we make sure we have permission to show notifications. The default state means that the user hasn't decided yet, probably because they haven't been prompted
    if(Notification.permission === 'default'){
      //As the name states, this requests the user for permission to display notifications. It recursively calls notify() so this function runs (but throught one of the else if statements) as soon as the user decides whether or not we're allowed to notify them of stuff
      Notification.requestPermission(function(){notify(title, body, tag);});
    }
    //This is what happens if the user says we can't give them notifications
    else if(Notification.permission === 'denied'){
      //We can just remain silent, except for a log to the console saying what happened
      console.log("Permission denied");
      return;
    }
    //This is the case if the user allows us to notify them of stuff. You could simply just use an else statement here, but I'm trying to be verbose
    else if(Notification.permission === 'granted'){
      //This creates the actual notification, sets all of its values, and displays it
      var n = new Notification(title,{"body":body,"tag":tag});
      n.onshow = function(){
        //You can execute code here as soon as the notification is shown onscreen if you want, but we won't do anything right now
        console.log("onshow ran");
      };
      n.onclick = function(){
        //You can execute whatever you want when the user clicks the notification here, but for now, we'll just dismiss the Notification
        this.close();
        console.log("onclick ran");
      };
      n.onclose = function(){
        //You can execute whatever you want when the notification is closed here, but we won't do anything right now
        console.log("onclose ran");
      };
      n.onerror = function(){
        //This usually shouldn't execute (it usually only would if Notification.permission is either default or denied), but if it does, you can do whatever you want here, but we'll just log to the console that it did run right now
        console.log("There was an error displaying the notification");
      };
    }
  }
  //When it's all done, we can just return the unique tag, so that it can be used again, so duplicates can be prevented by the programmer
  return tag;
}