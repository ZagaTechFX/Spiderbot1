import React from 'react';
import Card from '../../components/Card';
import Icon from '../../components/Icon';

const CommunityView: React.FC = () => {
  const socialPlatforms = [
    {
      name: 'Discord',
      description: 'Join our Discord server for real-time discussions, strategy sharing, and community support',
      members: '12,500+',
      icon: 'chat',
      link: '#',
      color: 'indigo'
    },
    {
      name: 'Telegram',
      description: 'Get instant updates, announcements, and connect with fellow traders',
      members: '8,300+',
      icon: 'chat',
      link: '#',
      color: 'blue'
    },
    {
      name: 'Twitter/X',
      description: 'Follow us for platform updates, trading insights, and market analysis',
      members: '15,200+',
      icon: 'twitter',
      link: '#',
      color: 'sky'
    },
    {
      name: 'Reddit',
      description: 'Participate in discussions, ask questions, and share your trading journey',
      members: '5,600+',
      icon: 'community',
      link: '#',
      color: 'orange'
    }
  ];

  const communityEvents = [
    {
      title: 'Weekly Strategy Webinar',
      date: 'Every Monday, 2 PM EST',
      description: 'Learn advanced trading strategies from our expert traders',
      type: 'Recurring'
    },
    {
      title: 'Trading Competition',
      date: 'December 1-31, 2024',
      description: 'Compete for $50,000 in prizes. Best performing strategies win!',
      type: 'Contest'
    },
    {
      title: 'AMA with Development Team',
      date: 'First Friday of Month',
      description: 'Ask anything about platform features, roadmap, and trading',
      type: 'Recurring'
    }
  ];

  const topTraders = [
    { rank: 1, name: 'CryptoWhale88', profit: '+245%', followers: 1250 },
    { rank: 2, name: 'GridMaster', profit: '+198%', followers: 980 },
    { rank: 3, name: 'DCAKing', profit: '+167%', followers: 856 },
    { rank: 4, name: 'BotTrader42', profit: '+145%', followers: 723 },
    { rank: 5, name: 'AlgoQueen', profit: '+132%', followers: 654 },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold dark:text-white">Join Our Community</h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-dark-text-secondary mt-1">Connect with traders worldwide</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {socialPlatforms.map((platform) => (
          <Card key={platform.name} className="hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className={`p-3 rounded-lg bg-${platform.color}-500/10`}>
                <Icon name={platform.icon} className={`h-6 w-6 text-${platform.color}-500`} />
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-success/20 text-success">
                {platform.members} members
              </span>
            </div>
            <h3 className="text-lg font-bold dark:text-white mb-2">{platform.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{platform.description}</p>
            <a 
              href={platform.link}
              className="inline-flex items-center space-x-2 text-primary hover:text-primary-hover transition-colors text-sm font-medium"
            >
              <span>Join Now</span>
              <Icon name="arrow-right" className="h-4 w-4" />
            </a>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <h3 className="text-lg font-bold mb-4 dark:text-white">Community Events</h3>
          <div className="space-y-3">
            {communityEvents.map((event, index) => (
              <div key={index} className="p-3 border border-gray-200 dark:border-dark-border rounded-lg hover:bg-gray-50 dark:hover:bg-dark-bg-secondary/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold dark:text-white">{event.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    event.type === 'Contest' ? 'bg-warning/20 text-warning' : 'bg-primary/20 text-primary'
                  }`}>
                    {event.type}
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  <Icon name="clock" className="h-3 w-3 inline mr-1" />
                  {event.date}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{event.description}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-bold mb-4 dark:text-white">Leaderboard - Top Traders</h3>
          <div className="space-y-2">
            {topTraders.map((trader) => (
              <div key={trader.rank} className="flex items-center justify-between p-3 border border-gray-200 dark:border-dark-border rounded-lg hover:bg-gray-50 dark:hover:bg-dark-bg-secondary/50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                    trader.rank === 1 ? 'bg-warning text-gray-900' :
                    trader.rank === 2 ? 'bg-gray-300 text-gray-900' :
                    trader.rank === 3 ? 'bg-orange-400 text-gray-900' : 'bg-gray-100 dark:bg-dark-bg-secondary text-gray-600 dark:text-gray-400'
                  }`}>
                    {trader.rank}
                  </div>
                  <div>
                    <p className="font-medium dark:text-white">{trader.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{trader.followers} followers</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-success">{trader.profit}</p>
                  <button className="text-xs px-2 py-1 bg-primary hover:bg-primary-hover text-white rounded transition-colors mt-1">
                    Follow
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-lg font-bold mb-4 dark:text-white">Community Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <Icon name="check" className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium dark:text-white">Be Respectful</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Treat all community members with respect and courtesy</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="check" className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium dark:text-white">Share Knowledge</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Help others learn and grow through constructive discussion</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="check" className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium dark:text-white">No Financial Advice</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Share strategies, not personal investment recommendations</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <Icon name="warning" className="h-5 w-5 text-danger flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium dark:text-white">No Spam or Scams</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Promotional content and scams will result in immediate ban</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="warning" className="h-5 w-5 text-danger flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium dark:text-white">No Market Manipulation</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pump and dump schemes are strictly prohibited</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="warning" className="h-5 w-5 text-danger flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium dark:text-white">Stay On Topic</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Keep discussions relevant to trading and our platform</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CommunityView;
