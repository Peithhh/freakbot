// Import the necessary Discord.js classes
import { Client, GatewayIntentBits, PermissionsBitField, ChannelType} from 'discord.js';
// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers, // Intent to manage guild members
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
});

// When the bot is ready, run this code (after logging in)
client.once('ready', () => {
  console.log('Bot is online!');
});

// Event listener for when a member joins the server
client.on('guildMemberAdd', async (member) => {
  try {
    // Log available channels
    const channels = member.guild.channels.cache;
    console.log('Available channels:');
    if (channels.size > 0) {
      channels.forEach(channel => {
        console.log(`${channel.name} (ID: ${channel.id}) - Type: ${channel.type}`);
      });
    } else {
      console.log('No channels found in this guild.');
    }

    // Replace 'YOUR_WELCOME_CHANNEL_ID' with the ID of the channel you want to use
    const welcomeChannelId = '1296199082540404839';
    const welcomeChannel = member.guild.channels.cache.get(welcomeChannelId);

    // Check if the channel exists and is a text channel
    if (!welcomeChannel || !welcomeChannel.type =='GUILD_TEXT') {
      console.log('Channel not found or is not a text channel!');
      return; // Exit if the channel is not valid
    }

    // Send a welcome message
    await welcomeChannel.send(`Welcome to the server, ${member.user.tag}! Time to get touched!`);
    
    // Replace 'YOUR_ROLE_ID' with the ID of the role you want to assign
    const roleId = '1296197721656524841'; 
    const role = member.guild.roles.cache.get(roleId);

    // Check if the role exists
    if (role) {
      await member.roles.add(role);
      console.log(`Assigned role ${role.name} to ${member.user.tag}`);
    } else {
      console.log('Role not found!');
    }
  } catch (error) {
    // This catch block will handle any errors that occur within the try block
    console.error('Error handling guildMemberAdd event:', error);
  } // <-- This is where the try block closes
});


// Event listener for message creation
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
 // Kick command
 if (message.content.startsWith('!kick')) {
  // Check if the user has permission to kick members
  if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
    return message.channel.send('You do not have permission to kick members!');
  }

  // Get the user to be kicked and the reason
  const args = message.content.split(' ').slice(1);
  const member = message.mentions.members.first();
  const reason = args.slice(1).join(' ') || 'No reason provided';

  if (!member) {
    return message.channel.send('Please mention a valid member to kick.');
  }

  // Check if the bot can kick the member
  if (!member.kickable) {
    return message.channel.send('I cannot kick this member. They might have a higher role than me.');
  }

  // Kick the member with the reason
  try {
    await member.kick(reason);
    message.channel.send(`${member.user.tag} has been kicked from the server👅. Reason: ${reason}`);
  } catch (error) {
    console.error('Error kicking member:', error);
    message.channel.send('An error occurred while trying to kick the member.');
  }
}

// Ban command
if (message.content.startsWith('!ban')) {
  // Check if the user has permission to ban members
  if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
    return message.channel.send('You do not have permission to ban members!');
  }

  // Get the user to be banned and the reason
  const args = message.content.split(' ').slice(1);
  const member = message.mentions.members.first();
  const reason = args.slice(1).join(' ') || 'No reason provided';

  if (!member) {
    return message.channel.send('Please mention a valid member to ban.');
  }

  // Check if the bot can ban the member
  if (!member.bannable) {
    return message.channel.send('I cannot ban this member. They might have a higher role than me.');
  }

  // Ban the member with the reason
  try {
    await member.ban({ reason });
    message.channel.send(`${member.user.tag} has been banned from the server👅. Reason: ${reason}`);
  } catch (error) {
    console.error('Error banning member:', error);
    message.channel.send('An error occurred while trying to ban the member.');
  }
}
  if (message.content.startsWith('!clear')) {
    // Split the command to get the number of messages to delete
    const args = message.content.split(' ');
    const amount = parseInt(args[1]);

    // Check if the user has permission to manage messages
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
      return message.channel.send('You do not have permission to manage messages!');
    }

    // Check if the amount is a number and within a valid range (1-100)
    if (isNaN(amount) || amount <= 0 || amount > 100) {
      return message.channel.send('Please provide a number between 1 and 100.');
    }

    // Delete the messages
    try {
      const deletedMessages = await message.channel.bulkDelete(amount, true);
      message.channel.send(`Successfully deleted ${deletedMessages.size} messages!`).then(msg => {
        setTimeout(() => msg.delete(), 5000); // Deletes the confirmation message after 5 seconds
      });
    } catch (error) {
      console.error('Error deleting messages:', error);
      message.channel.send('There was an error trying to clear messages in this channel!');
    }
  }
  // Check if the message starts with the command '!hello'
  if (message.channel.type === ChannelType.DM || message.channel.type === ChannelType.GuildText)
  if (message.content === '!say gex') {
    // Send a message back to the channel
    await message.channel.send('Gex');
  }else if(message.content === '!Ghadi'){
    const imageUrl ='https://c.tenor.com/nrT1mIfhH9IAAAAd/tenor.gif';
    await message.channel.send('Shalom')
    await message.channel.send(`${imageUrl}`)
  }else if (message.content === '!Khodor'){
     await message.channel.send('freaky')
     await message.channel.send('https://c.tenor.com/E6k5wz879TcAAAAd/tenor.gif')
    }else if (message.content === '!Viki'){
    await message.channel.send('violence addict')
  }else if (message.content === '!Ezy'){
    await message.channel.send('touches minors')
  }else if (message.content === '!3arabiye'){
    await message.channel.send('sexiye')
  }else if (message.content === '!Emad'){
    await message.channel.send('First member of the server, it is what it is')
    await message.channel.send('https://cdn.discordapp.com/attachments/1296168078152831031/1296575076745089045/724830d8-83ce-42b0-b85e-5eb56535ff7e.jpeg?ex=6712c923&is=671177a3&hm=aeccad7e192b66ea6198c2b9b0e4a9000fa6082bf46581422a0734d6628c3771&')
  }
});

// Log in to Discord with your bot token
client.login('MTI5NjE4ODQyMDg4ODIwMzMwNA.Gsimay.eitjjl0iIRWi4dB6itN6U6LdZazLAKcpg5MuRM');
