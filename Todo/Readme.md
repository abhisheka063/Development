#Functional components

 1.add task(task)
 
 2.delete task(task id)
 
 3.mark completed/toggle(taskId)
 
 4.display list()
 
 5.renderList()
 
 6.clear all
 
 7.completeAll()
 
 8.handleClickListener() to handle clck events
 
 9.gettingApiData()
 
 10.calculate pending tasks()

->steps followed:Summary

1.Created function to add task-> add task() will set values and push object in data array->created and call displaylist function.

2.display function will traverse through element(ul list-already cached in js) for every data and call renderList() function.

3.renderList function will create a list and put data in it according to variables.

4.In render list we have assigned the id ='list id ' so that we can catch the exact id and manipulate it (delete,mark completed etc).

5.handleClickListener will do event caching and if conditions will do according to user inputs=> call the functions(delete task,add task,mark completed,clear all).

6.calculatePending() will be called wherever required so that it can also updated.

7.clear all button will use clear all().

8.completeAll will be used by complete All button.

9.Fetch api button is added which will fetch data from a Api and data is assigned to data array.

filtering :
for filtering we are using filter function to filter data from data array which will return the array which fullgills the conditions
it is used in toggling task and deleting task.

##Note: As we are using Api -> Api will return id values in number so thats why i am converting id values to Number so that we can compare and manipulater it.
and later on when same id is assigned to lists at that place we are again convertingthem to string because id="" only accept string.

##Screenshot of Todo

![image](https://user-images.githubusercontent.com/40734291/151237644-965cb2c0-6468-43e8-a599-2c433381c726.png)


