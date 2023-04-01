import { FC, useCallback, useEffect, useState } from 'react'
import { Component } from './Component'
import { environments } from '@/environments'

export type ContainerProps = {}

export const Container: FC<ContainerProps> = ({ ...props }) => {
  const [isSpeeching, setSpeeching] = useState(false)
  const [speech, setSpeech] = useState<SpeechRecognition | null>(null)
  const [results, setResults] = useState<string[]>([])

  const onSpeechReady = useCallback(() => {
    if (!speech || isSpeeching) return
    speech.start()
    setSpeeching(true)
  }, [isSpeeching, speech])

  useEffect(() => {
    if (environments.isServer) return
    const SpeechRecognition =
      window.SpeechRecognition || webkitSpeechRecognition
    const s = new SpeechRecognition()
    s.lang = 'ja-JP'

    setSpeech(s)
  }, [])

  useEffect(() => {
    if (speech) {
      console.log({ speech })
      speech.addEventListener('result', (e) => {
        // 音声認識で取得した情報を、コンソール画面に表示
        console.log(e)
        setResults((prev) => [...prev, e.results[0][0].transcript])
        setSpeeching(false)
      })
    }
  }, [speech])

  return (
    <Component
      {...props}
      {...{
        isSpeeching,
        onSpeechReady,
        results,
      }}
    />
  )
}
