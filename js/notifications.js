//This file is a template to use Local Notifications, as defined by the W3C to the fullest of its ability. It is wrapped inside of a function (notify(heading, message, uniqueTag)), so it can be called later
function notify(title, body, tag){
  //If either title or body wasn't given, or has a data type unusable in this situation, we'll log it to the console and return, so the rest of the function doesn't run
  if(typeof title === "undefined" || typeof title === "object" || typeof title === "function" || typeof body === "undefined" || typeof body === "object" || typeof body === "function"){
    console.log("The notification title and/or body wasn't given, or was not a string or value that could be converted to a string");
    return;
  }
  //If title or body is something that can be converted to a string, we do so and continue
  else if(typeof title === "number" || typeof title === "boolean" || typeof body === "number" || typeof body === "boolean"){
    //First, we need to check to see if it's the title that's causing issues
    if(typeof title != "string"){
      //If it is, we convert it
      title = title.toString();
    }
    //Otherwise, we know it's body that's causing the issue, so we convert that
    else{
      body = body.toString();
    }
  }
  //Array doesn't have a typeof for some reason (?), so we need to conver it if body or title is that
  else if(typeof title != "string" || typeof body != "string"){
    //Again, we need to see if title is causing the problem
    if(typeof title != "string"){
      //Again, we convert switch
      title = title.toString();
    }
    //Otherwise, we know that body is the problem, and therefore convert
    else{
      body = body.toString();
    }
  }
  //So the uniqueTag paramater can be optional, if it's undefined or something else that's not useful in this situation, we set it to a random number between 0 and 999,999,999,999, which is probably never reproducible (we'll return it later, just in case, though), but it's worth a shot. It'll at least guarantee that they'll never be dismissed until the user dismisses it
  if(typeof tag === "undefined" || typeof tag === "object" || typeof tag === "function"){
    tag = Math.round(Math.random()*999999999999).toString();
    //If there wasn't a tag given, or it wasn't a useable data type for this purpose, we can loge that to the console
    console.log("No unique tag given, or was not a data type compatibe for assignment");
  }
  //If it's something that has a .toString() method, we can help the developer out and turn their bad type into a good one
  else if(typeof tag === "number" || typeof tag === "boolean"){
    tag = tag.toString();
  }
  //For some reason, typeof "array" doesn't exist (?), so we can know it's an array here, and convert it to a string
  else if(typeof tag != "string"){
    tag = tag.toString();
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