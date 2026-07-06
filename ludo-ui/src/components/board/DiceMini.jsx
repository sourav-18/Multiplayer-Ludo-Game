import React from 'react'

function DiceMini({ color }) {
    return (
        <div className="dice-place">
            <div className='dice small-dice red-dice' id={`${color}-dice`}>
                <div className="dice-dots"></div>
                <div className="dice-dots"></div>
                <div className="dice-dots"></div>
                <div className="dice-dots"></div>
                <div className="dice-dots"></div>
                <div className="dice-dots"></div>

                <div className="roll-value D1" id="D1">
                    <div className="dice-dots"></div>
                </div>
                <div className="roll-value D2" id="D2">
                    <div className="dice-dots"></div>
                    <div className="dice-dots"></div>
                </div>
                <div className="roll-value D3" id="D3">
                    <div className="dice-dots"></div>
                    <div className="dice-dots"></div>
                    <div className="dice-dots"></div>

                </div>
                <div className="roll-value D4" id="D4">
                    <div className="dice-dots"></div>
                    <div className="dice-dots"></div>
                    <div className="dice-dots"></div>
                    <div className="dice-dots"></div>
                </div>
                <div className="roll-value D5" id="D5">
                    <div className="dice-grid five">
                        <span className="dice-dots"></span>
                        <span className="dice-dots"></span>
                        <span className="dice-dots center"></span>
                        <span className="dice-dots"></span>
                        <span className="dice-dots"></span>
                    </div>
                </div>
                <div className="roll-value D6" id="D6">
                    <div className="dice-dots"></div>
                    <div className="dice-dots"></div>
                    <div className="dice-dots"></div>
                    <div className="dice-dots"></div>
                    <div className="dice-dots"></div>
                    <div className="dice-dots"></div>
                </div>
            </div>
        </div>
    )
}

export default DiceMini