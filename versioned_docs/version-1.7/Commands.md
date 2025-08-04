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
- `/npc manage`, `/npc list` These commands bring up a chat dialogue showing every NPC with buttons to edit or delete
NPCs.
- `/npc clear_holograms` This command forcibly removes NPC holograms.
- `/npc wiki`, `/npc docs` These commands bring you here to the wiki!
- `/npc setsound` This command doesn't do anything unless the plugin is expecting you to supply a sound input! 
*The only time this is applicable is editing a `PLAY_SOUND` action.*
- `/npc goto <NPC>` This command teleports you to the specified NPC.
- `/npc clone <NPC>` This command clones the specified NPC, and places it in your current location.
- `/npc movehere <NPC>` This command moves the specified NPC to your current location.

:::note
 The `<NPC>` can be replaced wither either the NPC's name (It works with spaces!) or the NPC's UUID.
::: 


## The `/npcaction` Command
This command doesn't serve a purpose for players.
The plugin uses it to execute actions as the console.
Don't play with this even if you know what you're doing. 
