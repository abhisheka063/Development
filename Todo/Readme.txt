# Fuctional components
-> add task(task) 
-> delete task(task id)
-> mark completed/toggle(taskId)
-> display list()
-> renderList()
-> clear all
-> completeAll()
-> handleClickListener() to handle clck events
->Calculate pending tasks

#steps followed:
1. Created function to add task-> add task() will set values and push object in data array->created and call displaylist function
2.display function will traverse through element(ul list-already cached in js) for every data and call renderList() function
3.renderList function will create a list and put data in it according to variables
4. in render list we have assigned the id ='list id ' so that we can catch the exact id and manipulate it (delete,mark completed etc)
5.handleClickListener will do event caching and if conditions will do according to user inputs=> call the functions(delete task,add task,mark completed,clear all)
6.calculatePending() will be called wherever required so that it can also updated.
==================================================================================================================================================================
filtering :
for filtering we are using filter function to filter data from data array which will return the array which fullgills the conditions
it is used in toggling task and deleting task.