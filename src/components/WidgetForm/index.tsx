import { useState } from "react";

import { FeadbackTypeStep } from "./Steps/FeedBackTypeStep";
import { FeedBackContentStep } from "./Steps/FeedBackContentStep";

import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import toughtImageUrl from '../../assets/bug.svg'
import { FeedBackSuccessStep } from "./Steps/FeedBackSuccessStep";

export const feadBackTypes = {
  BUG: {
    title: "Problema",
    image: {
      source: bugImageUrl,
      alt: 'Imagem de um inseto'
    }
  },
  IDEA: {
    title: "Ideia",
    image: {
      source: ideaImageUrl,
      alt: 'Imagem de um Lanpada'
    }
  },
  OTHER: {
    title: "Outro",
    image: {
      source: toughtImageUrl,
      alt: 'Imagem de um Balão de pensamento'
    }
  },
}

export type FeedbackType = keyof typeof feadBackTypes

export function WidgetForm() {
  const [feedbackType, setfeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSend, setFeedbackSend] = useState(false)

  function handleRestartFeedback() {
    setFeedbackSend(false)
    setfeedbackType(null)
  }
  return (
    <div className='bg-zinc-900 p-4 relative rounded-2xl mb-4 flex  flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto' >


      {feedbackSend ? (<FeedBackSuccessStep onFeedBackRestartResquested={handleRestartFeedback} />) : (<>
        {!feedbackType ? (
          <FeadbackTypeStep onFeedbackTypeChange={setfeedbackType} />

        ) : (<FeedBackContentStep
          feedbackType={feedbackType}
          onFeedBackRestartResquested={handleRestartFeedback}
          onFeedbackSend={() => setFeedbackSend(true)}
        />)
        }
      </>)}

      <footer className='text-xs text-neutral-400'>
        Feito com ♥ pelo <a className='underline underline-offset-2'>MoraesDev</a>
      </footer>
    </div >
  )
}