import React from 'react'
import redToken from "../../assets/red_token.png";
import greenToken from "../../assets/green_token.png";

function FirstHalf() {
    return (
        <div class="1st-half equal-up-down">
            <div class="player-spot ps1">
                <div class="player p1">
                    <div class="disks p1-disk redPath0"><img src={redToken} class="redToken" alt="red token "
                        name="redToken" id="redToken1"/></div>
                    <div class="disks p1-disk redPath0"><img src={redToken} class="redToken" alt="red token "
                        name="redToken" id="redToken2"/></div>
                    <div class="disks p1-disk redPath0"><img src={redToken} class="redToken" alt="red token "
                        name="redToken" id="redToken3"/></div>
                    <div class="disks p1-disk redPath0"><img src={redToken} class="redToken" alt="red token "
                        name="redToken" id="redToken4"/></div>
                </div>
            </div>
            <div class="vertical-path">
                <div class="cube-move-spot RGYB bluePath24 yellowPath37 greenPath50 redPath11"></div>
                <div class="cube-move-spot RGYB bluePath25 yellowPath38 greenPath51 redPath12"></div>
                <div class="cube-move-spot RYB bluePath26 yellowPath39 redPath13"></div>
                <div class="cube-move-spot  RGYB bluePath23 yellowPath36 greenPath49 redPath10"></div>
                <div class="cube-move-spot green-spot G greenPath52"></div>
                <div class="cube-move-spot tokenStart green-spot RGYB bluePath27 yellowPath40 greenPath1 redPath14">
                </div>
                <div class="cube-move-spot star-place RGYB bluePath22 yellowPath35 greenPath48 redPath9"></div>
                <div class="cube-move-spot green-spot G greenPath53"></div>
                <div class="cube-move-spot RGYB bluePath28 yellowPath41 greenPath2 redPath15"></div>
                <div class="cube-move-spot RGYB bluePath21 yellowPath34 greenPath47 redPath8"></div>
                <div class="cube-move-spot green-spot G greenPath54"></div>
                <div class="cube-move-spot RGYB bluePath29 yellowPath42 greenPath3 redPath16"></div>
                <div class="cube-move-spot RGYB bluePath20 yellowPath33 greenPath46 redPath7"></div>
                <div class="cube-move-spot green-spot G greenPath55"></div>
                <div class="cube-move-spot RGYB bluePath30 yellowPath43 greenPath4 redPath17"></div>
                <div class="cube-move-spot RGYB bluePath19 yellowPath32 greenPath45 redPath6"></div>
                <div class="cube-move-spot green-spot G greenPath56"></div>
                <div class="cube-move-spot RGYB bluePath31 yellowPath44 greenPath5 redPath18"></div>
            </div>

            <div class="player-spot ps2">
                <div class="player p2">
                    <div class="disks p2-disk greenPath0"><img src={greenToken} class="greenToken"
                        alt="green token " name="greenToken" id="greenToken1"/></div>
                    <div class="disks p2-disk greenPath0"><img src={greenToken} class="greenToken"
                        alt="green token " name="greenToken" id="greenToken2"/></div>
                    <div class="disks p2-disk greenPath0"><img src={greenToken} class="greenToken"
                        alt="green token " name="greenToken" id="greenToken3"/></div>
                    <div class="disks p2-disk greenPath0"><img src={greenToken} class="greenToken"
                        alt="green token " name="greenToken" id="greenToken4"/></div>
                </div>
            </div>
        </div>
    )
}

export default FirstHalf