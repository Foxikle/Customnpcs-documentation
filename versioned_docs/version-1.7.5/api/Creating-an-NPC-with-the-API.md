# Creating an NPC with the API


> You can visit the JavaDocs at `https://repo.foxikle.dev/javadoc/public/dev/foxikle/customnpcs/<VERSION>`
> [Here](https://repo.foxikle.dev/javadoc/public/dev/foxikle/customnpcs/1.7.5) are the latest javadocs!

## Creating the NPC object
To start, you need an NPC object. You can create one by calling `NPC::new` (The constructor)
Here is an example:

```java
World world = Bukkit.getWorld("world"); // the default world name
// But you should do a null check, as 
// an error will be thrown if the world is null 
NPC npc = new NPC(world);
```

## General Customization
### Position

From there, you have to do a few things in order for the NPC to be useful. For starters, you should set the 
spawn location. If you don't the NPC will spawn at (0, 0, 0).
```java
// arbitrary numbers for the sake of example
npc.setPosition(new Location(world, 100, 100, 100));
```

### Rotation
While you can customize the yaw and pitch of the NPC's head using the Location object, there is a method to set the pitch and yaw to arbitrary values.
```java
// arbitrary numbers for the sake of example
npc.setFacing(180, 0); // yaw, pitch
```


### Skin Data
If you want to specify a skin for the NPC, you should do so using the `setSkinData` method. To get the signature and
value, you can use InventiveTalent's [Mineskin](https://mineskin.org).
```java
String value = ...; // assume an actual value
String signature = ...; // assume an actual signature
String skinName = ...; // shown when a user tries to edit the NPC
npc.setSkinData(skinName, signature, value)
```

Furthermore, you can import the skin directly from a `Player` object.
```java
npc.getSettings().setSkin(youPlayerObject);
```

## The Settings Object
:::warning
It is imperative that you call `NPC#reloadSettings()` if you edit the Settings or Equipment objects **after** creating the NPC.
:::

### Interactability 
Interactability defines if the NPC will have the clickable hologram. (More info Later) If this is set to false, even if 
you give the NPC actions, they will be ignored. (Defaults to **false**)
To change it, simply call
```java
npc.getSettings().setInteractable(true);
```

### Tunnel Vision
Tunnel vision defines if the NPC will look at nearby players. (Defaults to **false**)
To change it, simply call
```java
npc.getSettings().setTunnelVision(true);
```

### Resilient
Resiliency, or being resilient, defines if the NPC should persist on server restarts or running `/npc reload`. This
defaults to **false**, unlike creating NPCs using the plugin's UI. Setting this to true may fill up your `npcs.yml` file
if you are not careful.
To change it, simply call
```java
npc.getSettings.setResilient(true);
```

### ~~Direction~~ (Deprecated -- To be removed in 1.8)
Lets you set the yaw of the NPC's head. Just set the Yaw in the NPC's location :)

### Skin Data (But settings)
The method on the NPC is just a wrapper around the settings object, it is functionally the same. You can view the docs
on it [here](#skin-data).

But there are methods directly on the Settings object, like this one:
```java
npc.getSettings().setSkinData(youPlayerObject);
```

### Hide Clickable Hologram
This option hides the Clickable hologram, making the NPC appear as if I wasn't interactable, yet still being 
interactable. (Defaults to **false**)
To change it, simply call
```java
npc.getSettings().setHideClickableHologram(true);
```

### Custom Interactable Hologram
This option allows you to override the global Clickable Hologram value. The string value can contain MiniMessage tags 
and PlaceholderAPI placeholders.
To change it, simply call
```java
npc.getSettings().setCustomInteractableHologram("<Your hologram>");
```


### The State of Being Upside Down
  The settings object allows for NPCs to have their appearance vertically mirrored, as if they were named `Dinnerbone` or `Grumm`. It defaults to false.
```
npc.getSettigns().setUpsideDown(true);
```


## The Equipment Object
:::warning
It is imperative that you call `NPC#reloadSettings()` if you edit the Settings or Equipment objects **after** creating the NPC.
:::
I am not going to go through every method, because their names are self-explanatory. The point is, you can set/get the 
itemstack object the NPC uses. 

If you would like to import that equipment from a player, for example, you can use the `importFromEntityEquipment()`
method.

Here is an example:
```java
Player player = ...; // pretend its valid
npc.getEquipment().importFromEntityEquipment(player.getEquipment());
```

## Using Actions
In 1.7, the Action system got a complete rewrite. This makes it way easier to use over its predecessors. Instead of 
using a string array and an enum, each action has its own class. If you want to add an action, you can just call 
`NPC#addAction(Action)`. [Here](Using-the-Action-System.md) is a list of available actions. For example, sending a message:
```java
npc.addAction(new SendMessage("Text Here", 0, ONE, List.of()));
```
All actions follow the same general constructor parameter layout:

First, are the action specific parameters, in our case, the message to send.

Then, there is an integer, specifying the number of ticks of delay to run the action after the initial interaction.

Then, there is a `Condition.SelectionMode` enum constant, signifying if one, or all of the following conditions must be
met in order for the action to execute.

Finally, the list of conditions the player must fulfil for the Action to be executed.

If you would like to write your own actions, check out [this](Writing-Custom-Actions.md) page.

If you would like to create your own Conditions, check out the [Roadmap](API-Roadmap.md), as that is a planned feature.

## Moving the NPC
You can move the NPC by calling the `moveTo(Location)` method. Please note that it takes the pitch and yaw into account.
The movements are only temporary, as reloading the npcs will put the NPC back to its spawn location.

## Looking at things
You can make the NPC look at things in two ways. First, you can use the `lookAt(Location)` to look at the specified 
location.
```java
npc.lookAt(new Location(world, 0, 0, 0);
```
Additionally, you can look at an entity instead.
```java
npc.lookAt(entity, true);
```
The first argument is the entity to look at. It cannot be null.

The second argument is true of the npc should look at the entity's head, or false for their feet


## Swinging the NPC's arm
You can swing the NPC's arm by calling `npc.swingArm()`.

## Manual Injection (Not recommended)
Even though the plugin handles injection, or making the NPCs actually appear, it is possible to handle it yourself.
This could be useful, for example, if you are creating per-player NPCs. (But even then, there are better ways of doing 
it) In order to inject NPCs yourself, you can call
```java
npc.injectPlayer(player);
```

Please note, if you want to do conditional injection, you should cancel the `NpcInjectEvent` instead :)
