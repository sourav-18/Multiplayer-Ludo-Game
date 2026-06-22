import React from 'react'
import blueToken from "../../assets/blue_token.png";
import yellowToken from "../../assets/yellow_token.png";
import Avatar from '../common/Avatar';

function LastHalf() {
    return (
        <div className="last-half equal-up-down">
            <div className="player-spot ps3 relative">
                <Avatar classNames='-left-25 bottom-3' id='blue-avatar' />
                <div className="player p3">
                    <div className="disks p3-disk bluePath0"><img src={blueToken} className="blueToken"
                        alt="blue token " name="blueToken" id="blueToken1" /></div>
                    <div className="disks p3-disk bluePath0"><img src={blueToken} className="blueToken"
                        alt="blue token " name="blueToken" id="blueToken2" /></div>
                    <div className="disks p3-disk bluePath0"><img src={blueToken} className="blueToken"
                        alt="blue token " name="blueToken" id="blueToken3" /></div>
                    <div className="disks p3-disk bluePath0"><img src={blueToken} className="blueToken"
                        alt="blue token " name="blueToken" id="blueToken4" /></div>
                </div>
            </div>
            <div className="vertical-path">
                <div className="cube-move-spot RGYB bluePath5 yellowPath18 greenPath31 redPath44"></div>
                <div className="cube-move-spot blue-spot B bluePath56"></div>
                <div className="cube-move-spot RGYB bluePath45 yellowPath6 greenPath19 redPath32"></div>
                <div className="cube-move-spot RGYB bluePath4 yellowPath17 greenPath30 redPath43"></div>
                <div className="cube-move-spot blue-spot B bluePath55"></div>
                <div className="cube-move-spot RGYB bluePath46 yellowPath7 greenPath20 redPath33"></div>
                <div className="cube-move-spot RGYB bluePath3 yellowPath16 greenPath29 redPath42"></div>
                <div className="cube-move-spot blue-spot B bluePath54"></div>
                <div className="cube-move-spot RGYB bluePath47 yellowPath8 greenPath21 redPath34"></div>
                <div className="cube-move-spot RGYB bluePath2 yellowPath15 greenPath28 redPath41"></div>
                <div className="cube-move-spot blue-spot B bluePath53"></div>
                <div className="cube-move-spot RGYB star-place bluePath48 yellowPath9 greenPath22 redPath35"></div>
                <div className="cube-move-spot tokenStart blue-spot RGYB bluePath1 yellowPath14 greenPath27 redPath40">
                </div>
                <div className="cube-move-spot blue-spot B bluePath52"></div>
                <div className="cube-move-spot RGYB bluePath49 yellowPath10 greenPath23 redPath36"></div>
                <div className="cube-move-spot R  G Y greenPath26 redPath39 yellowPath13"></div>
                <div className="cube-move-spot RGYB bluePath51 yellowPath12 greenPath25 redPath38"></div>
                <div className="cube-move-spot RGYB bluePath50 yellowPath11 greenPath24 redPath37"></div>
            </div>

            <div className="player-spot ps4 relative">
                <Avatar classNames='-right-25 bottom-3' id='yellow-avatar' />
                <div className="player p4">
                    <div className="disks p4-disk yellowPath0"><img src={yellowToken} className="yellowToken"
                        alt="yellow token" name="yellowToken" id="yellowToken1" /></div>
                    <div className="disks p4-disk yellowPath0"><img src={yellowToken} className="yellowToken"
                        alt="yellow token" name="yellowToken" id="yellowToken2" /></div>
                    <div className="disks p4-disk yellowPath0"><img src={yellowToken} className="yellowToken"
                        alt="yellow token" name="yellowToken" id="yellowToken3" /></div>
                    <div className="disks p4-disk yellowPath0"><img src={yellowToken} className="yellowToken"
                        alt="yellow token" name="yellowToken" id="yellowToken4" /></div>
                </div>
            </div>
        </div>
    )
}

export default LastHalf