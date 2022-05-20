import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feadBackTypes } from "..";
import { api } from "../../../lib/api";
import { ClouseButton } from "../../CloseButton"
import { Loading } from "../Loading";
import { ScreenshotButton } from "../ScreenshotButton";


interface FeedbackContentProps {
  feedbackType: FeedbackType;
  onFeedBackRestartResquested: () => void;
  onFeedbackSend: () => void;
}

export function FeedBackContentStep({ feedbackType, onFeedBackRestartResquested, onFeedbackSend }: FeedbackContentProps) {
  const feedbackTypeInfo = feadBackTypes[feedbackType];
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comments, setComments] = useState('')
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)

  async function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault()
    setIsSendingFeedback(true)
    console.log({
      type: feedbackType,
      screenshot, comments
    })

    await api.post('/feedbacks', {
      type: feedbackType,
      comments,
      screenshot
    })

    setIsSendingFeedback(false)
    onFeedbackSend()
  }


  return (
    <>
      <header>
        <button type='button'
          onClick={onFeedBackRestartResquested}
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100">
          <ArrowLeft weight="bold" className="w-4  h-4" />
        </button>
        <span className='text-xl leading-6 flex items-center  gap-2'>
          <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className='w-6 h-6' />
          {feedbackTypeInfo.title}
        </span>
        <ClouseButton />
      </header>

      <form className='my-4 w-full' onSubmit={handleSubmitFeedback}>
        <textarea
          className='min-w-[304px] w-full min-h-[112px text-sm placeholder-zinc-400 border-zinc-600  bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus-ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin'
          placeholder="Conte com detalhes o que está acontecendo"
          onChange={event => setComments(event.target.value)}
        />

        <footer className="flex  gap-2 mt-2">
          <ScreenshotButton onScreenshotTook={setScreenshot} screenshot={screenshot} />
          <button
            disabled={comments.length === 0 || isSendingFeedback}
            type='submit'
            className='p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors  disabled:opacity-50 disabled:hover:bg-brand-300'
          >
            {isSendingFeedback ? <Loading /> : 'Enviar Feedback'}

          </button>
        </footer>

      </form>
    </>
  )
}