// write a function to build a message card to be returned
export function buildMessageCard(
    messageTitle: string, 
    messageBody: string,
    messageColour: string,
    author: any,
    runNumber: string,
    runId: string,
    repoName: string,
    repoUrl: string,
    repoBranch: string): any {
        let avatar_url = 'https://avatars.githubusercontent.com/u/105098969';
        if (author) {
            if (author.avatar_url) {
                avatar_url = author.avatar_url;
            }
        }
        const card = {
            '@type': 'MessageCard',
            '@context': 'https://schema.org/extensions',
            '$schema': 'https://adaptivecards.io/schemas/adaptive-card.json',
            version: '1.0',
            summary: messageTitle,
            themeColor: messageColour,
            title: messageTitle,
            sections: [
                {
                    activityTitle: `[${repoName}](${repoUrl})`,
                    activitySubtitle: `by [${author.login}](${author.html_url})`,
                    activityImage: avatar_url,
                    facts: [
                        {
                            name: 'Run Number',
                            value: runNumber,
                        },
                        {
                            name: 'Run ID',
                            value: runId,
                        },
                        {
                            name: 'Branch',
                            value: repoBranch,
                        }
                    ],
                    text: messageBody,
                }
            ],
        };
  return card;
}