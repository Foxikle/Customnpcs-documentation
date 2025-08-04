# Using Events

:::note
Please note the event system is still green, and likely to change substantially as the api gets ironed out. Furthermore, this is an advanced tutorial, and it is expected that you have a solid understanding of the structure of a Paper plugin and the Paper event system.
:::

## Default Methods
All of the events inherit from `NpcEvent`, which implements `Cancellable` and `PlayerEvent`. Meaning each event has a 
`getPlayer()`, `isCancelled()`, and `setCancelled()` method. On top of that, each event has a `getNpc()` method. That 
method returns an InternalNpc, which is rather unstable, and doesn't see proper deprecation. It's best to use the 
`apiNPC()` to use the wrapper object.

## NpcInjectEvent
Lets you cancel the injection of NPCs. Called when the NPC's InjectionManager determines a player needs to be injected.

### Unique Methods
**getDistance()**
: Gets the distance between the player and the NPC being injected.

**getDistanceSquared()**
: Gets the distance between the player and the NPC before it has been square rooted. This is slightly more performant,
and is generally better than `getDistance()`.


## NpcDeleteEvent
Lets you cancel the deletion of NPCs.

### Unique Methods
**getDeletionSource()**
: Gets the reason the NPC was deleted. The possible solutions are: `COMMAND`, `MENU`, `API`, and `UNKNOWN`. For more 
information about what each source means, check out the javadocs.


## NpcInteractEvent
Lets you cancel the deletion of NPCs.

### Unique Methods
**getExecutingActions()**
: Gets the actions that meet their conditions for execution. If the event is not cancelled, these are the actions that 
will be executed.

**getFailingActions()**
: Gets the actions that have failed their conditions for execution. Even if the event is cancelled, these actions won't
be executed.








