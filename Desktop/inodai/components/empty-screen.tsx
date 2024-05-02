import { UseChatHelpers } from 'ai/react'

const exampleMessages = [
  {
    heading: 'Explain technical concepts',
    message: `What is a "serverless function"?`
  },
  {
    heading: 'Summarize an article',
    message: 'Summarize the following article for a 2nd grader: \n'
  },
  {
    heading: 'Draft an email',
    message: `Draft an email to my boss about the following: \n`
  }
]

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-lg font-semibold">
          Welcome to Scarlett AI
        </h1>
        <p className="leading-normal text-muted-foreground">
        Scarlett AI is your new hub for connecting, learning, and engaging with professionals and enthusiasts alike. Whether you&apos;re here to find networking opportunities, dive into tailored events and workshops, or explore interactive content, Scarlett AI is designed to enhance your personal and professional growth. Let&apos;s embark on a journey of discovery and connection, personalized just for you!</p>
      </div>
    </div>
  )
}
