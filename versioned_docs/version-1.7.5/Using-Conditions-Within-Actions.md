# Using Conditions

The conditional execution system within the action system is where CustomNPCs really shines.
Conditions allow you to create interactive stories, utilities, and characters!
To add a condition to an existing action, enter the action's editing menu.
Click the comparator in the bottom right to enter the action's condition menu.

## Selection Modes
Selection Modes determine how many conditions must be met for the action to be executed.

**Available Selection Modes**
- The `ALL` mode requires all conditions to be satisfied to execute the action.
- The `ONE` mode only requires one condition to be satisfied to execute the action. 

## Condition Types
CustomNPCs currently supports two types of conditions. 

**Numeric conditions** compare numeric inputs to a target value with a variety of comparators.

**Logical Conditions** compare non-numeric values like game mode
or having a specific effect or permission with a target value.
Some boolean (true/false) conditions are stuck into the logical category.
These conditions don't have a target value. 

## Condition Values
A Condition Value is a property a player possesses. For example, a numeric value would be experience levels.

### Numeric Values
- Experience Points
- Experience Levels
- X Coordinate
- Y Coordinate
- Z Coordinate
- Health
- Absorption

### Logical Values
- Game mode
- Has an Effect
- Has Permission
- Is Frozen
- Is Sneaking
- Is Gliding
- Is Sprinting

## Comparators
Condition comparators are the logical operations used to compute the
<tooltip term="Boolean Value">boolean value</tooltip>
of the condition.

### Currently Supported Comparators:
- Greater Than
- Greater Than or Equal To
- Less Than
- Less Than or Equal To
- **Equal To**
- **Not Equal To**

:::note
Logical Conditions can only use the bolded Comparators.
:::
