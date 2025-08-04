# Commands
CustomNPCs provides a set of powerful commands that enable you to interact with and manage NPCs,
quests, and various aspects of the plugin.
Whether you're a server owner or administrator,
understanding these commands is essential for configuring and utilizing CustomNPCs to its full potential. 

## The `/npc` Command
The npc command provides your entrypoint to the plugin.
All the subcommands are as follows.

- `/npc help` This command brings up a help dialogue.
- `/npc create` This command creates opens the menu to create an NPC. <tip>The location of the NPC is the location of 
your player.</tip>
- `/npc edit <NPC>` This command opens the same creation menu, but it is preloaded with the data of the NPC. <tip>The
NPC's location is NOT altered while editing an NPC.</tip> <note>To skip running the command, `sneak + click` an
NPC!</note>
- `/npc delete <NPC>` This command deletes an NPC. <warning>This action cannot be undone!</warning> 
- `/npc reload` This command reloads all NPCs and the CustomNPCs config.
- `/npc manage`, `/npc list` These commands bring up a chat dialogue showing every NPC with buttons to edit or delete NPCs. Clicking the NPC's *name* will copy the NPC's UUID to your clipboard.
- `/npc fixconfig world <Valid World> <Strategy> <target>` Fixes NPCs whose location is in a world that is no longer valid. The strategy can be `NONE`, to simply place the npc in the exact same *location*, but a different world. `SAFE_LOCATION` tries to verify the NPC won't be stuck in any solid blocks. But it will fail if there is no valid location at the x & z coordinates. Lastly, the target can either be `all`, to target all broken NPCs, or a broken NPC's uuid.
- `/npc wiki`, `/npc docs` These commands bring you here to the wiki!
- `/npc setsound` This command doesn't do anything unless the plugin is expecting you to supply a sound input! 
*The only time this is applicable is editing a `PLAY_SOUND` action.*
- `/npc goto <NPC>` This command teleports you to the specified NPC.
- `/npc clone <NPC>` This command clones the specified NPC, and places it in your current location.
- `/npc movehere <NPC>` This command moves the specified NPC to your current location.
- `/npc debug` This command enables debug mode, making it easier for its developers to help you with an issue. You almost assuredly do not want this enabled during normal server operation. 
:::note
 The `<NPC>` can be replaced wither either the NPC's name (It works with spaces!) or the NPC's UUID.
::: 


