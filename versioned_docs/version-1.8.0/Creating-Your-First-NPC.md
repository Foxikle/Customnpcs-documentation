import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Creating Your First NPC

Start by creating your first NPC. You can use the in-game command, `/npc create` to design characters with unique
appearances and behaviors. Consider crafting NPCs that enhance your server's role play or gameplay experience

From there, you will be greeted by the NPC configuration menu. You can change the NPC's name, skin, armor, persistence,
actions, and much more!

## Changing the NPC's Name

To change an NPC's name, open the editing menu. This will be opened, initialized to an NPC with no data, if you just ran
the `/npc create` command.

1. Click on the name tag.
2. Type the desired name in [MiniMessage format](https://docs.advntr.dev/minimessage/format.html) into the Minecraft Chat
3. Click your enter key to finalize the name.


## Changing the NPC's Skin

To change an NPC's skin, open the editing menu. This will be opened, initialized to an NPC with no data, if you just ran
the `/npc create` command.
<Tabs>
  <TabItem value="Skin Catalog">
    <list type="decimal">
      <li>Open the skin editor by clicking on the player head with a missing texture icon</li>
      <li>Open the skin catalogue by clicking on the armor stand</li>
      <li>Browse and select your desired Skin!</li>
    </list>
  </TabItem>
  <TabItem value="Import from Player">
    <list type="decimal">
      <li>Open the skin editor by clicking on the player head with a missing texture icon</li>
      <li>Click the anvil to select importing from a player name</li>
      <li>Type the player's name to import the skin from. <note>This imports the player's CURRENT skin, and it will not change
        if the player changes their skin.</note></li>
      <li>Hit &quot;enter&quot; to confirm</li>
    </list>
  </TabItem>
  <TabItem value="Import from URL">
    <list type="decimal">
      <li>Open the skin editor by clicking on the player head with a missing texture icon</li>
      <li>Click the Book &amp; Quil to select importing from a URL</li>
      <li>Paste the URL into the chat</li>
      <li>Hit &quot;enter&quot; to confirm</li>
    </list>
  </TabItem>
</Tabs>


## Changing the NPC's Equipment

To change an NPC's equipment, open the editing menu. This will be opened, initialized to an NPC with no data, if you
just ran the `/npc create` command.

1. Open the equipment editor by clicking on the armor stand.
2. Click any slot with an item to equip it on the NPC. <note>For Boots, Leggings, and Chest plates, the item type must
  be compatible with the slot.</note>
3. To reset a slot, right-click on it.
4. Alternatively, you can import your current armor by clicking the armor stand in the top right of the menu.

<note>
    The armor is serialized as the EXACT item you supplied. This means the NPC can have items with:
    <list>
       <li>Custom Model Data</li>
       <li>Colors (Leather Armor)</li>
       <li>Enchantments</li>
    </list>
</note>

## Changing the NPC's Persistence

NPC Persistence determines if the NPC should persist or stay on server restarts.

To change an NPC's persistence, open the editing menu.
This will be opened, initialized to an NPC with no data, if you
just ran the `/npc create` command.

By clicking the bell, you can toggle
<tooltip term="NPC Persistence">NPC Persistence</tooltip>.

## Changing the NPC's Facing Direction

The facing direction is the direction the NPC faces when there isn't a player within five blocks, and it doesn't have
<tooltip term="Tunnel Vision"> Tunnel Vision</tooltip>. The possible options are the cardinal directions and the yaw
of the player currently editing the NPC. For your convenience, you can click the ender eye to easily change your
current facing direction. This applies to the NPC's pitch, too.

## Changing the NPC's Tunnel Vision
Tunnel vision determines if the NPC looks at nearby players.

This can be toggled by clicking the spyglass under the equipment menu.

## Editing the NPC's Extra Settings
In the top right of the NPC menu, there is a button to take you to the extra settings menu.
In this menu, you can customize if the NPC's Interactable Hologram is visible, and what the contents of the hologram
are. If nothing is specified here, it defaults to the config value `ClickText`.


## Adding Actions to an NPC

To change the NPC's Actions, first open the editing menu.
This will be opened, initialized to an NPC with no data, if you
just ran the `/npc create` command.

From there, ensure the NPC is interactable.
Non-interactable NPCs cannot have actions.
This can be achieved by clicking
on the dead bush if it is in the menu.
You will know the NPC is interactable if you can see a Recovery Compass in the
bottom right of the menu.

You can then add actions by clicking on the Lilly pad.

For a more in-depth guide to using Actions, look [here](Using-the-Action-System.md).

