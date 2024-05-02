import 'server-only'

import {
  createAI,
  createStreamableUI,
  getMutableAIState,
  getAIState,
  render,
  createStreamableValue
} from 'ai/rsc'
import OpenAI from 'openai'

import {
  spinner,
  BotCard,
  BotMessage,
  Stock,
  Purchase
} from '@/components/stocks'

import { z } from 'zod'
import { EventsSkeleton } from '@/components/stocks/events-skeleton'
import { Events } from '@/components/stocks/events'
import { StocksSkeleton } from '@/components/stocks/stocks-skeleton'
import { Stocks } from '@/components/stocks/stocks'
import { StockSkeleton } from '@/components/stocks/stock-skeleton'
import {
  runAsyncFnWithoutBlocking,
  sleep,
  nanoid
} from '@/lib/utils'
import { saveChat } from '@/app/actions'
import { SpinnerMessage, UserMessage } from '@/components/stocks/message'
import { Chat } from '@/lib/types'
import { auth } from '@/auth'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

async function confirmPurchase(symbol: string, price: number, amount: number) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  const purchasing = createStreamableUI(
    <div className="inline-flex items-start gap-1 md:items-center">
      {spinner}
      <p className="mb-2">
        Purchasing {amount} ${symbol}...
      </p>
    </div>
  )

  const systemMessage = createStreamableUI(null)

  runAsyncFnWithoutBlocking(async () => {
    await sleep(1000)

    await sleep(1000)


  })

  return {
    purchasingUI: purchasing.value,
    newMessage: {
      id: nanoid(),
      display: systemMessage.value
    }
  }
}

async function submitUserMessage(content: string) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content
      }
    ]
  })

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
  let textNode: undefined | React.ReactNode

  const ui = render({
    model: 'gpt-3.5-turbo',
    provider: openai,
    initial: <SpinnerMessage />,
    messages: [
      {
        role: 'system',
        content: `
       You are Scarlett AI, Scarlett AI, the AI-Powered Matching System, Event and Workshop Coordination, and Content Interaction Enhancements.
       If they ask Any blockchain events in NYC this weekend?, you will tell them about there is a Cornell Blockchain Conference today in NYC
       
       You need to collect detailed and relevant information from users.   If users have already known what they want, the assistant can provide the information directly and does not have to ask  questions in the list
       However, for enhancing user interaction and managing various scenarios on the SkinSense platform, you could refine and incorporate the following strategies:

       General Interaction Guidelines (ask max 5 questions):
       
       Engage with Users: Always be ready to engage in a conversation with users. Answer any questions they may have. If specific information like a picture is missing, prompt users to provide what’s needed by asking relevant questions.
       
       Here’s a set of questions, but you need to ask them one by one:

       User Profile Creation:
       Basic Info:
       "Hey there! What's your name, and where's your current playground (city/country)?"
       Professional Background:
       "What’s your superpower? 🦸 (AKA your profession or field of study)"
       "Got any special skills or hidden talents you want to share?"
       Interests and Hobbies:
       "What lights your fire? Share some hobbies or passions!"
       "Any cool topics you're itching to dive deeper into?"
       Social Vibes:
       "How do you roll? Do you like mingling one-on-one, chilling in groups, or joining forums?"
       "What’s your event vibe? Workshops, chill meetups, or maybe some networking action?"
       Content Jam:
       "What’s your style—creating blogs, making videos, running polls? Tell us what you love!"
       "And what’s your favorite flavor of content? Interactive, deep dives, or maybe debate-worthy discussions?"
       Ongoing Fun and Feedback:
       Event Vibes:
       "How was the last bash (event/workshop) you attended with us? A blast or a pass?"
       "Dream events? Throw some ideas at us—what would you love to attend next?"
       Connection Check-In:
       "How’re those connections treating you? Did we hit the mark or miss the spot?"
       "Got tips for us? How can we make our matchmaker magic even better?"
       Community Pulse:
       "Caught any cool group vibes lately? Which groups or forums rocked your socks off?"
       "Topic wishlist—what convo topics would you love for us to set up next?"
       Content Conversations:
       "Spill the beans—what piece of content really got you talking recently?"
       "Imagine you've got a magic wand; what new content tools or features would you conjure up?"
       Platform Heart-to-Heart:
       "What features of ConnectAI are winning your heart? Any we could jazz up?"
       "Help us help you—how can we make your ConnectAI experience even more fabulous?"
       Extra Personal Touches:
       Time Talk:
       "When are you usually free to hang out? Let’s schedule some fun around your clock!"
       Networking Dreams:
       "What’s your big goal with networking? Climbing the career ladder, learning new tricks, or just making some new pals?"
       Learning Styles:
       "How do you like to learn? In a formal setting like a workshop, or just chilling in a forum?"
       
       At the end, you will offers recommendations for connections based on common interests, professional fields, or desired social activities.
       Automatically forms groups or forums for discussions based on trending topics or common user interests.
       Help them plan and organize virtual workshops, seminars, and social gatherings. Users can express interests and availability, and ConnectAI manages the rest, including sending reminders and follow-ups.`
      },
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name
      }))
    ],
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue('')
        textNode = <BotMessage content={textStream.value} />
      }

      if (done) {
        textStream.done()
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: 'assistant',
              content
            }
          ]
        })
      } else {
        textStream.update(delta)
      }

      return textNode
    }
  })

  return {
    id: nanoid(),
    display: ui
  }
}

export type Message = {
  role: 'user' | 'assistant' | 'system' | 'function' | 'data' | 'tool'
  content: string
  id: string
  name?: string
}

export type AIState = {
  chatId: string
  messages: Message[]
}

export type UIState = {
  id: string
  display: React.ReactNode
}[]

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
    confirmPurchase
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [] },
  unstable_onGetUIState: async () => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const aiState = getAIState()

      if (aiState) {
        const uiState = getUIStateFromAIState(aiState)
        return uiState
      }
    } else {
      return
    }
  },
  unstable_onSetAIState: async ({ state, done }) => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const { chatId, messages } = state

      const createdAt = new Date()
      const userId = session.user.id as string
      const path = `/chat/${chatId}`
      const title = messages[0].content.substring(0, 100)

      const chat: Chat = {
        id: chatId,
        title,
        userId,
        createdAt,
        messages,
        path
      }

      await saveChat(chat)
    } else {
      return
    }
  }
})

export const getUIStateFromAIState = (aiState: Chat) => {
  return aiState.messages
    .filter(message => message.role !== 'system')
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display:
        message.role === 'function' ? (
          message.name === 'listStocks' ? (
            <BotCard>
              <Stocks props={JSON.parse(message.content)} />
            </BotCard>
          ) : message.name === 'showStockPrice' ? (
            <BotCard>
              <Stock props={JSON.parse(message.content)} />
            </BotCard>
          ) : message.name === 'showStockPurchase' ? (
            <BotCard>
              <Purchase props={JSON.parse(message.content)} />
            </BotCard>
          ) : message.name === 'getEvents' ? (
            <BotCard>
              <Events props={JSON.parse(message.content)} />
            </BotCard>
          ) : null
        ) : message.role === 'user' ? (
          <UserMessage>{message.content}</UserMessage>
        ) : (
          <BotMessage content={message.content} />
        )
    }))
}
