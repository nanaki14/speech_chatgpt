import { NextSeo } from 'next-seo'
import { FC } from 'react'
import { ContainerProps } from './Container'

type Props = ContainerProps & {
  isSpeeching: boolean
  onSpeechReady: () => void
  results: string[]
}

export const Component: FC<Props> = (props) => {
  return (
    <div className="relative">
      <NextSeo title="ホーム" />

      <button onClick={props.onSpeechReady} type="button">
        {props.isSpeeching ? 'Speeching' : 'Start'}
      </button>

      <br />
      {props.results.map((str) => (
        <p key={str}>{str}</p>
      ))}
    </div>
  )
}
