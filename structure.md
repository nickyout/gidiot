# Generic macro structure

## Git command
The actual git command. Receives input, passes output.

## Milestone
Can receive git command input. Stores input into report.
Its bridging logic will store output in the report data object,
as well as produce the input for the next command.

### (req) success/bridging logic
Logic for processing last git command output into the new input for the next git command.
Also, stores generic data that may be required at a later stage in the chain.

### (opt) fail/recover logic
Logic for recovering failure. Default behavior is pass to final handler, reporting the failure and aborting the macro.

### decision
The decision logic. Can be set to default auto-response, custom auto-response, or prompt.
Reports the means of decision in case of an abort (auto or prompt).
 - continue (default on success)
 - retry
 - back
 - cancel (default on failure)

## Report

### passed milestones
Each milestone point pushes its input data into the report.
 - execute order (push array)
 - command index
 - original input data

### data object
results are stored here. Strictly used by the success/bridging logic.

## End point
Receives a success or failure report, with further detail. A report without failure is automatically a success.
Follow-up actions are:
 - retry entire command (start at 0)
 - return to menu


## Combining macro commands
Two options:
 1) Nested macro commands (a macro within a macro). Requires extra logic for seamlessly jumping in/out of a new scope.
    Can make in-between branching easier.
 2) Macro array concatenation, based on menu input. Simplest to implement by far,
    but will make branching commands possibly more difficult, due to the fluidity of macro array lengths.

 The question is: how linear is a git process once it has been decided what to do? Or how linear can it be made?
