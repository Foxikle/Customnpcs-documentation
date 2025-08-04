# Writing Custom Actions

:::note
This is an advanced tutorial, and I will be glazing over a few topics like inheritance.
:::

:::warning
This guide exposes a lot of the internals of the plugin, which are subject to change without proper deprecation and are likely to break as this new api gets ironed out.
:::

## Writing the Action class
To get started, create a class that extends `Action`.

## Creation Button
To start, write a method that will be the creation button, used by the player creating menus via the UI. For the
purposes of this demo, I will call it `creationButton()`. The method should be static. The method's return type should 
be `io.github.mqzen.menus.misc.button.Button`. This is a button that is clickable in the menu, from Mqzn's Lotus 
library. Here is the creation button method for the ActionBar action.
```java
public static Button creationButton(Player player) {
        return Button.clickable(ItemBuilder.modern(IRON_INGOT)
                        .setDisplay(Utils.mm("Actionbar"))
                        .setLore(Utils.mm("Displays an Actionbar"))
                        .build(),
                ButtonClickAction.plain((menuView, event) -> {
                    event.setCancelled(true);
                    Player p = (Player) event.getWhoClicked();
                    ActionBar actionImpl = new ActionBar("", 0, Condition.SelectionMode.ONE, new ArrayList<>());
                    CustomNPCs.getInstance().editingActions.put(p.getUniqueId(), actionImpl);
                    menuView.getAPI().openMenu(p, actionImpl.getMenu());
                }));
    }
```

> If you want a MiniMessage parser, you can use `Utils.mm()` or `Msg.format()`. They both work!

It is important that you include the `CustomNPCs.getInstance().editingActions.put(p.getUniqueId(), actionImpl);`, as
that tells the plugin which action is being edited by the given player. 
*While I acknowledge that this isn't ideal, this is the current structure of the internals.*

## Serializing and Deserializing

Continuing with the trend of copying the ActionBar class, here is how CustomNPCs helps you write actions that can be
serialized and deserialize without much work from the action developer. In the Action superclass, there are a handful
of utility methods to parse individual "fields" of the serialized blob of data, which is defined during serialization,
more on that in a bit. Without further ado, here is the deserializer for the ActionBar class.
```java
 public static <T extends Action> T deserialize(String serialized, Class<T> clazz) {
        if (!clazz.equals(ActionBar.class)) {
            throw new IllegalArgumentException("Cannot deserialize " + clazz.getName() + " to " + ActionBar.class.getName());
        }
        String rawMessage = parseString(serialized, "raw");
        ParseResult pr = parseBase(serialized);

        ActionBar message = new ActionBar(rawMessage, pr.delay(),  pr.mode(), pr.conditions());

        return clazz.cast(message);
    }
```

:::warning
It is critical the method is named "deserialize", as the method is accessed via reflection.
:::

Here is a list of the helper methods:

**parseString(String, String)**
: Allows you to parse a string value from the serialized string data, and the key associated with the value to fetch.

**parseArray(String, String)**
: Allows you to parse a serialized JSON array. It is imperative the data is formatted as a json array or the parsing
will fail. The main use case for this is the conditions every action has.

**parseDouble(String, String)**
: Allows you to parse a double value from the serialized string data, and the key associated with the double value.

**parseBoolean(String, String)**
: Allows you to parse a boolean value from the serialized string data, and the key associated with the double value.

**parseFloat(String, String)**
: Allows you to parse a float value from the serialized string data, and the key associated with the double value. This
is almost the same as `parseDouble`, but it's a float instead.

**parseEnum(String, String, Class&lt;T>**)
: Allows you to parse an enum constant directly from the String data, the key, and the class of the enum type. This 
will probably throw errors if the constant doesn't exist, so you may want to handle those.

**parseInt(String, String)**
: Allows you to parse an integer from the serialized string and key. Does basically what it sounds like.

**parseBase(String)**
: Parses 3 things. The delay (integer), the Condition SelectionMode (Condition.SelectionMode), and the conditions
(List&lt;Condition>). These three values are packaged into a ParseResult record. 

Then when it comes to serialization, there is also a helper method to aid in that.
:::warning 
Do not include the "base" values of the action, (Delay, SelectionMode, or Conditions) as the plugin already handles this for you.
:::

```java
    @Override
    public String serialize() {
        return generateSerializedString("ActionBar", Map.of("raw", rawMessage));
    }
```
You should use the `generateSerializedString(String, Map<String, Object>)` method to generate your serialized strings.
The first argument should be the same id used to register your action in the action registry. The keys used in the map
are the exact keys used in the serialized action string.

## Customizer Menu
This is the point where I begin to glaze over things. This isn't a Lotus tutorial, but you should use 
`Customnpcs.getInstance().getLotus()` as your lotus instance. But, you can use `MenuUtils.actionBase(action, player)`
which will add a few buttons. These include the delay customizer, a go back button, and a confirm button. When you're
done writing your menu class, make the `getMenu()` method return an instance of the menu.

## Favicon
The Action Favicon is similar to the Creation button, in that it is an item. It serves two purposes, it
lets your users know the details of the action instance, and lets them edit the action. Here is ActionBar's 
`getFavicon()` method. 
```java
    @Override
    public ItemStack getFavicon(Player player) {
        return ItemBuilder.modern(IRON_INGOT)
                .setDisplay(Msg.translate(player.locale(), "customnpcs.favicons.actionbar"))
                .setLore(Msg.translate(player.locale(), "customnpcs.favicons.delay", getDelay()),
                        Msg.translate(player.locale(), "customnpcs.favicons.preview", Msg.format(getRawMessage())),
                        Msg.format(getRawMessage().isEmpty() ? "<dark_gray><i>" + Msg.translatedString(player.locale(), "customnpcs.messages.empty_string") : getRawMessage()),
                        Msg.format(""),
                        Msg.translate(player.locale(), "customnpcs.favicons.edit"),
                        Msg.translate(player.locale(), "customnpcs.favicons.remove")
                ).build();
    }
```

Your action will probably be cleaner, as you (probably) won't care about localization.

## Performing the Action
This is the part you probably care about, the part that makes your action, well..., an action. You achieve this by
implementing the `perform()` method. Keeping up with the trend of internals, you won't have an API NPC object, but the 
internal one. If this is a problem, the API NPC object has a constructor with an InternalNpc. On top of that, you
should call the `processConditions(Player)` method as the first thing you do. I could probably come up with a way to 
make this the default behaviour, at the cost of becoming opinionated. On top of that, rather than checking if the 
server has PlaceholderApi, you can use the boolean field of the CustomNPCs class, `papi`. If its true, the server
has PAPI installed, otherwise its false.

```java
    @Override
    public void perform(InternalNpc npc, Menu menu, Player player) {
        if (!processConditions(player)) return;
        player.sendActionBar(Msg.format(CustomNPCs.getInstance().papi ? PlaceholderAPI.setPlaceholders(player, rawMessage) : rawMessage));
    }
```

## Registering Your Action
Before you try to use your shiny new action, you should probably register it. :)

To do so, add it to the `CustomNPCs.ACTION_REGISTRY`.
```java
    CustomNPCs.ACTION_REGISTRY.register("ActionBar", ActionBar.class, ActionBar::creationButton);
```

:::warning 
The ID specified must match the ID used in the serialize method.
:::

Tada! You now have made a custom Action!
