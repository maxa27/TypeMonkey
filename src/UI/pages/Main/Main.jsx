import React from 'react'
import './Main.scss'

const Main = () => {
	return (
		<div className="main">
      <div className="select-controls"></div>
      <div className="words-grid">
        <div className="word active"></div>
        <div className="word"></div>
      </div>
      <div className="hotkey-hint"></div>
		</div>
	)
}

export default Main
