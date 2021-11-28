import React from 'react'
import { css } from "@emotion/react"
import ClipLoader from 'react-spinners/ClipLoader'

const override = css`
  display: block;
  margin: 350px auto;
  border-color: #665df5;
`

const Loading = () => <ClipLoader css={ override } size={35} />

export default Loading
