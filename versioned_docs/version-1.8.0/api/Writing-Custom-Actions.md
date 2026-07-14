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
purposes of this demo, I will call it `creationButton()`. The method's return type should 
be `io.github.mqzen.menus.misc.button.Button`. This is a button that is clickable in the menu, from Mqzn's Lotus 
library. Here is the creation button method for the ActionBar action.
```java
@Override
public Button creationButton(Player player) {
        return Button.clickable(ItemBuilder.modern(IRON_INGOT)
                        .setDisplay(Utils.mm("Actionbar"))
                        .setLore(Utils.mm("Displays an Actionbar"))
                        .build(),
                ButtonClickAction.plain((menuView, event) -> {
                    event.setCancelled(true);
                    Player p = (Player) event.getWhoClicked();
                    ActionBar actionImpl = new ActionBar("", 0, Selector.ONE, new ArrayList<>(), 0);
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

As of 1.8.0, actions are serialized in JSON, using Codecs. The plugin uses Minestom's codec implemention, and the (unofficial) 
documentation can be viewed [here](https://mudstom.pages.dev/docs/feature/serialization/codecs). If you had custom actions 
prior to or current with 1.7.10, please leave existing serialization logic untouched, as the plugin will still support migration
from the old format through version 1.10.0. If you are writing a new action, implemented after 1.8.0, there is no need to use the
old system.

Here is an example codec:
```java
public static final StructCodec<ActionBar> CODEC = StructCodec.struct(
            "raw", Codec.STRING, ActionBar::getRawMessage,
            "delay", Codec.INT, Action::getDelay,
            "selector", Codec.Enum(Selector.class), Action::getSelector,
            "conditions", Condition.CODEC.list(), Action::getConditions,
            "cooldown", Codec.INT, Action::getCooldown,
            ActionBar::new
    );
```

This corresponds to the constructor `ActionBar(String, int, Selector, List<Condition>, int)`. The last 4 elements of the codec 
are standard, and can be copied and pasted verbatim.

Then implement the `getCodec()` method.
```java
@Override
public StructCodec<ActionBar> getCodec() {
    return CODEC;
}
```

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
should call the `processConditions(Player)` method as the first thing you do. `processConditions(Player)` also processes cooldowns, as if they were a condition to execution. It should be noted that the `perform()` method should call `activateCooldown(UUID)` if cooldown functionality is desired. I could probably come up with a way to
make this the default behaviour, at the cost of becoming opinionated. On top of that, rather than checking if the 
server has PlaceholderApi, you can use the boolean field of the CustomNPCs class, `papi`. If its true, the server
has PAPI installed, otherwise its false.

```java
    @Override
    public void perform(InternalNpc npc, Menu menu, Player player) {
        if (!processConditions(player)) return;
        activateCooldown(player.getUniqueId());
        player.sendActionBar(Msg.format(CustomNPCs.getInstance().papi ? PlaceholderAPI.setPlaceholders(player, rawMessage) : rawMessage));
    }
```

## Registering Your Action
Before you try to use your shiny new action, you should probably register it. :)

To do so, add it to the `CustomNPCs.ACTION_REGISTRY`.
```java
    CustomNPCs.ACTION_REGISTRY.register(new ActionBar());
```

:::warning 
The ID specified must match the ID used in the serialize method.
:::

Tada! You now have made a custom Action!
