# Configuring CustomNPCs

CustomNPCs offers a wide range of configuration options, allowing you to tailor the behavior, appearance, and
functionality of your NPCs to suit your server's unique needs. In this section, we'll explore the key configuration
aspects and how to make the most of them. 

## General Configuration
The primary configuration file for CustomNPCs is named "config.yml" and can be found in your server's 
"plugins/CustomNPCs" folder. You can modify this file using a text editor to customize various aspects of the plugin. 
Some configurable options are: 
- Preset NPC skins
- Data Storage
- <tooltip term="Interactable Hologram">Interactable hologram</tooltip> text
- <tooltip term="Interactable Hologram">Interactable hologram</tooltip> visibility
- Update Alerts

## NPC Data Storage
In 1.8.0, new methods of data storage were added. There are currently 3 option:
- Local File Storage:
  The same way the plugin has been doing it for years, Its just a file on the server. 
- MySQL:
  Uses a standard relational database for something its not really designed for. Its a good choice if you already have a SQL database,
  and want to sync NPC configurations across servers.
- MongoDB:
  The gold standard for NPC data storage. Allows you to store configurations remotely and share them between servers. Use this if you
  already have MongoDB setup.

## Default Configurations
CustomNPCs includes default configurations that serve as a starting point for your server. You can modify these defaults
to match your preferences or create entirely new configurations to suit specific areas of your server.
