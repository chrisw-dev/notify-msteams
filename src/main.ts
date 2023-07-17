import * as github from '@actions/github'
import * as core from '@actions/core'
import axios from 'axios'
import {buildMessageCard} from './messagecard'
import {escapeMarkdown} from './markdownhelper'

async function run() {
  try {
    const githubToken = core.getInput('github-token', {required: true})
    const teamsWebhookUrl = core.getInput('teams-webhook-url', {required: true})
    const messageTitle = core.getInput('message-title', {required: true})
    const messageBody = core.getInput('message-text', {required: true})
    const messageColour = core.getInput('message-colour', {required: false}) || '00cbff'
    
    const [owner, repoName] = (process.env.GITHUB_REPOSITORY || '').split('/') // https://docs.github.com/en/actions/learn-github-actions/variables#default-environment-variables
    const sha = process.env.GITHUB_SHA || ''
    const runNumber = process.env.GITHUB_RUN_NUMBER || ''
    const runId = process.env.GITHUB_RUN_ID || ''
    const repoUrl = `https://github.com/${owner}/${repoName}`
    const repoBranch = process.env.GITHUB_REF_NAME || ''

    console.log(owner)
    console.log(repoName)
    console.log(sha)

    const octokit = github.getOctokit(githubToken)
    const params = {owner, repo: repoName, ref: sha}
    console.log("about to get commit")
    const commit = await octokit.rest.repos.getCommit(params)
    const author = commit.data.author
    console.log(author)

    const messageCard = buildMessageCard(
      escapeMarkdown(messageTitle),
      escapeMarkdown(messageBody),
      messageColour,
      author,
      runNumber,
      runId,
      repoName,
      repoUrl,
      repoBranch
    )

    console.log("sending message to Teams")
    console.log(teamsWebhookUrl)
    console.log(messageCard)

    const response = await axios.post(teamsWebhookUrl, messageCard)
    console.log(response)
    core.debug(response.data)

    core.debug(`Response: ${JSON.stringify(response.data)}`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    // core.setOutput('time', new Date().toTimeString())
  }
   catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
