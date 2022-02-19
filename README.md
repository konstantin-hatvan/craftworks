# Craftworks Challenge

## Run the application

To build and run the application execute `sh scripts/docker/start.sh`.
Then open http://localhost:8080 in your browser.

To stop and remove the application execute `sh scripts/docker/clean.sh`.

## The application

The initial screen of the application shows a list of tasks.
Some additional tasks are added at a random interval between 5 and 7 seconds.

The details of a task can be viewed when clicking the task in the list view.
In the task details, the user can perform several actions.
The user can resolve the task, update the task or delete the task.

In the top toolbar on the right, a user can also create a new task.
This opens a form to enter the task details.
On save, the user is returned to the list view and the new task appears.

### Design rationale

Initially, I wanted to implement only the list view and add dialogs for any action the user can take (e.g. create a new task, update an existing task).
Unfortunately, I could not do it the way I wanted to do it because of technical difficulties and a lack of experience with angular.
To be more precise, I had to open a dialog from the context of the toolbar (because this is the location of the responsible trigger) but the result of the dialog had to change members of the task-list component.
I tinkered with it but could only find hacky solutions, so in the end I created additional components and routes for creating a new task or updating an existing task.

Besides that, I tried to implement the user interface with a focus on the nielsen usability heuristics.
The interface focuses on the essentials and includes no superfluous elements in order to minimize user distractions and streamline processes to achieve the primary goals of the application.
Changes in the system state are reflected to the user with a snackbar in order to keep users informed about what is going on.
