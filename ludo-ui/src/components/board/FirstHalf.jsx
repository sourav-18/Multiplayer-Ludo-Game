import React from 'react'
import redToken from "../../assets/red_token.png";
import greenToken from "../../assets/green_token.png";
import Avatar from '../common/Avatar';

function FirstHalf() {
    return (
        <div className="1st-half equal-up-down">
            <div className="player-spot ps1 relative">
                <Avatar classNames='-left-25 top-3' id='red-avatar'/>
                <div className="player p1">
                    <div className="disks p1-disk redPath0"><img src={redToken} className="redToken" alt="red token "
                        name="redToken" id="redToken1"/></div>
                    <div className="disks p1-disk redPath0"><img src={redToken} className="redToken" alt="red token "
                        name="redToken" id="redToken2"/></div>
                    <div className="disks p1-disk redPath0"><img src={redToken} className="redToken" alt="red token "
                        name="redToken" id="redToken3"/></div>
                    <div className="disks p1-disk redPath0"><img src={redToken} className="redToken" alt="red token "
                        name="redToken" id="redToken4"/></div>
                </div>
            </div>
            <div className="vertical-path">
                <div className="cube-move-spot RGYB bluePath24 yellowPath37 greenPath50 redPath11"></div>
                <div className="cube-move-spot RGYB bluePath25 yellowPath38 greenPath51 redPath12"></div>
                <div className="cube-move-spot RYB bluePath26 yellowPath39 redPath13"></div>
                <div className="cube-move-spot  RGYB bluePath23 yellowPath36 greenPath49 redPath10"></div>
                <div className="cube-move-spot green-spot G greenPath52"></div>
                <div className="cube-move-spot tokenStart green-spot RGYB bluePath27 yellowPath40 greenPath1 redPath14">
                </div>
                <div className="cube-move-spot star-place RGYB bluePath22 yellowPath35 greenPath48 redPath9"></div>
                <div className="cube-move-spot green-spot G greenPath53"></div>
                <div className="cube-move-spot RGYB bluePath28 yellowPath41 greenPath2 redPath15"></div>
                <div className="cube-move-spot RGYB bluePath21 yellowPath34 greenPath47 redPath8"></div>
                <div className="cube-move-spot green-spot G greenPath54"></div>
                <div className="cube-move-spot RGYB bluePath29 yellowPath42 greenPath3 redPath16"></div>
                <div className="cube-move-spot RGYB bluePath20 yellowPath33 greenPath46 redPath7"></div>
                <div className="cube-move-spot green-spot G greenPath55"></div>
                <div className="cube-move-spot RGYB bluePath30 yellowPath43 greenPath4 redPath17"></div>
                <div className="cube-move-spot RGYB bluePath19 yellowPath32 greenPath45 redPath6"></div>
                <div className="cube-move-spot green-spot G greenPath56"></div>
                <div className="cube-move-spot RGYB bluePath31 yellowPath44 greenPath5 redPath18"></div>
            </div>

            <div className="player-spot ps2 relative">
                <Avatar classNames='-right-25 top-3' id='green-avatar'/>
                <div className="player p2">
                    <div className="disks p2-disk greenPath0"><img src={greenToken} className="greenToken"
                        alt="green token " name="greenToken" id="greenToken1"/></div>
                    <div className="disks p2-disk greenPath0"><img src={greenToken} className="greenToken"
                        alt="green token " name="greenToken" id="greenToken2"/></div>
                    <div className="disks p2-disk greenPath0"><img src={greenToken} className="greenToken"
                        alt="green token " name="greenToken" id="greenToken3"/></div>
                    <div className="disks p2-disk greenPath0"><img src={greenToken} className="greenToken"
                        alt="green token " name="greenToken" id="greenToken4"/></div>
                </div>
            </div>
        </div>
    )
}

export default FirstHalf