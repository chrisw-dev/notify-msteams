import {buildMessageCard} from '../src/messagecard'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {expect, test} from '@jest/globals'

test('wait 500 ms', async () => {
  const start = new Date()
  const messageTitle = 'This is a title'
  const messageBody = 'This is some text'
  const messageColour = 'HEXCOL'
  const author = 'XXXXXX'
  const runNumber = 'XXXXXX'
  const runId = 'XXXXXX'
  const repoName = 'XXXXXX'
  const repoUrl = 'XXXXXX'
  const repoBranch = 'XXXXXX'
  const message = await buildMessageCard(
    messageTitle, 
    messageBody, 
    messageColour, 
    author, 
    runNumber, 
    runId, 
    repoName, 
    repoUrl, 
    repoBranch)
  expect(message.summary).toBe(messageTitle)
})

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_GITHUB-TOKEN'] = 'sometoken'
  process.env['INPUT_TEAMS-WEBHOOK-URL'] = 'https://google.com'
  process.env['INPUT_MESSAGE-TITLE'] = 'This is a title'
  process.env['INPUT_MESSAGE-TEXT'] = 'This is some text'
  process.env['INPUT_MESSAGE-COLOUR'] = 'HEXCOL'
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  console.log(cp.execFileSync(np, [ip], options).toString())
})
