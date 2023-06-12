export const channelSelector = (state)=>state.channel.channels;

export const channelChosenSelector = (state)=>state.channel.channelCurrent;

export const channelSearchSelector = (state)=>state.channel.searchedChannels;

export const channelChosenUsersSelector = (state) => state.channel.channelCurrent.users_info;

export const channelChosenAdminSelector = (state) => state.channel.channelCurrent.creator_id;