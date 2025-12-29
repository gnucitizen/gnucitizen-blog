/**
 * Do you know what, SEO is difficult in 2024. Back in 2007 it was just enough to
 * make something cool and people will gladly link to it. GNUCITIZEN grew mostly
 * on this principle. Today, the Web as we used to know it is no longer. So we need
 * to lerverage our old domain to get some extra backlink love.
 * 
 * pdp 
 */

var keywords = {
    'agent': {
        url: 'https://chatbotkit.com/agents',
        times: 1
    },
    'chat bot': {
        url: 'https://chatbotkit.com',
        times: 1
    },
    'chatbot': {
        url: 'https://chatbotkit.com',
        times: 1
    },
    'answer': {
        url: 'https://chatbotkit.com/hub/bots/ai-answer-generator',
        times: 1
    },
    'need cookies': {
        url: 'https://chatbotkit.com/examples/cookie-bot',
        times: 1
    },
    'playground' :{
        url: 'https://chatbotkit.com/playground',
        times: 1
    },
    'chat': {
        url: 'https://chatbotkit.com',
        times: 1
    },
    'examples': {
        url: 'https://chatbotkit.com/examples',
        times: 1
    },
    'example': {
        url: 'https://chatbotkit.com/examples',
        times: 1
    },
}

module.exports = function(env, callback) {
    class KeywordLinkerPage extends env.plugins.MarkdownPage {
        getHtml(base) {
            for(const keyword in keywords) {
                if(keywords.hasOwnProperty(keyword)) {
                    var link = keywords[keyword].url;
                    var times = keywords[keyword].times;

                    var i = 0;

                    var regex = new RegExp(`\\b${keyword}\\b`, 'g');

                    this.markdown = this.markdown.replace(regex, (match) => {
                        i++;

                        return i <= times ? `[${match}](${link})` : match;
                    });
                }
            }

            return super.getHtml(base)
        }
    }

    env.registerContentPlugin('pages', '**/*.*(markdown|mkd|md)', KeywordLinkerPage)

    callback();
};
